'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

interface CartItemData {
  variant_id: number;
  quantity: number;
}

// Helper function to get user ID
async function getUserId() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated.');
  }
  return user.id;
}

export async function getCartItems() {
  const userId = await getUserId();
  const supabase = createClient();

  const { data, error } = await supabase
    .from('carts')
    .select(
      `
      id,
      quantity,
      created_at,
      product_variants (
        id,
        product_id,
        size,
        color,
        stock_quantity,
        products (
          id,
          name,
          description,
          price,
          image_urls
        )
      )
      `
    )
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }

  // Flatten the data structure for easier consumption in components
  const cartItems = data.map((cart) => {
    const variant = cart.product_variants;
    const product = variant?.products;

    return {
      cart_id: cart.id,
      quantity: cart.quantity,
      variant_id: variant?.id,
      product_id: product?.id,
      product_name: product?.name,
      product_price: product?.price,
      image_url: product?.image_urls ? product.image_urls[0] : '/placeholder.png', // Use first image or placeholder
      size: variant?.size,
      color: variant?.color,
      stock_quantity: variant?.stock_quantity,
    };
  });

  return cartItems;
}

export async function addToCart(variant_id: number, quantity: number) {
  const userId = await getUserId();
  const supabase = createClient();

  // Check if item already exists in cart
  const { data: existingCartItem, error: fetchError } = await supabase
    .from('carts')
    .select('id, quantity')
    .eq('user_id', userId)
    .eq('variant_id', variant_id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error checking existing cart item:', fetchError);
    return { success: false, error: fetchError.message };
  }

  if (existingCartItem) {
    // Update quantity if item exists
    const newQuantity = existingCartItem.quantity + quantity;
    const { error } = await supabase
      .from('carts')
      .update({ quantity: newQuantity })
      .eq('id', existingCartItem.id);

    if (error) {
      console.error('Error updating cart item quantity:', error);
      return { success: false, error: error.message };
    }
  } else {
    // Insert new item if it doesn't exist
    const { error } = await supabase
      .from('carts')
      .insert({ user_id: userId, variant_id, quantity });

    if (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    }
  }

  revalidatePath('/cart'); // Revalidate cart page to show updated items
  return { success: true };
}

export async function updateCartItemQuantity(cart_id: number, quantity: number) {
  const userId = await getUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from('carts')
    .update({ quantity })
    .eq('id', cart_id)
    .eq('user_id', userId); // Ensure user owns the cart item

  if (error) {
    console.error('Error updating cart item quantity:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function removeCartItem(cart_id: number) {
  const userId = await getUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('id', cart_id)
    .eq('user_id', userId); // Ensure user owns the cart item

  if (error) {
    console.error('Error removing cart item:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function clearUserCart() {
  const userId = await getUserId();
  const supabase = createClient();

  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', userId);

  if (error) {
    console.error('Error clearing user cart:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/cart');
  return { success: true };
}

export async function getDefaultVariantId(productId: number): Promise<number | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('product_variants')
    .select('id')
    .eq('product_id', productId)
    .limit(1)
    .single();

  console.log(`getDefaultVariantId for product ${productId}:`);
  console.log(`  Data:`, data);
  console.log(`  Error:`, error);

  if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
    console.error('Error fetching default variant ID:', error);
    return null;
  }

  return data ? data.id : null;
}

interface GuestCartItem {
  id: number; // This is product.id from local storage
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export async function mergeGuestCart(guestCart: GuestCartItem[]) {
  const userId = await getUserId();
  const supabase = createClient();

  for (const guestItem of guestCart) {
    // For each guest item, find its default variant_id
    const variantId = await getDefaultVariantId(guestItem.id); // guestItem.id is product.id

    if (variantId) {
      // Use the existing addToCart logic to add/update in the user's DB cart
      await addToCart(variantId, guestItem.quantity);
    } else {
      console.warn(`Could not find default variant for product ID ${guestItem.id}. Skipping.`);
    }
  }

  revalidatePath('/cart'); // Revalidate cart page after merging
  return { success: true };
}
