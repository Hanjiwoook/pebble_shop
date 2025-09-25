'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSession } from '@/components/providers/SessionProvider';
import { addToCart, getDefaultVariantId } from '@/app/cart/actions';

type Product = {
  id: number;
  name: string;
  price: number;
  image_urls?: string[];
};

type ProductCardProps = {
  product: Product;
};

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useSession();
  const [variantId, setVariantId] = useState<number | null>(null);
  const [loadingVariant, setLoadingVariant] = useState(true);
  const imageUrl = product.image_urls && product.image_urls[0];

  useEffect(() => {
    const fetchVariant = async () => {
      setLoadingVariant(true);
      const defaultVariant = await getDefaultVariantId(product.id);
      setVariantId(defaultVariant);
      setLoadingVariant(false);
    };
    fetchVariant();
  }, [product.id]);

  // Debugging logs
  console.log(`ProductCard for ${product.name}:`);
  console.log(`  loadingVariant: ${loadingVariant}`);
  console.log(`  variantId: ${variantId}`);
  console.log(`  Button disabled: ${loadingVariant || variantId === null}`);

  const handleAddToCart = async () => {
    if (!variantId) {
      console.error('Variant ID not available yet.');
      return;
    }

    if (user) {
      // Logged-in user: Add to DB via Server Action
      const result = await addToCart(variantId, 1); // Add 1 quantity
      if (result.success) {
        alert('상품이 장바구니에 추가되었습니다!');
      } else {
        alert(`장바구니 추가 실패: ${result.error}`);
      }
    } else {
      // Guest user: Add to Local Storage
      const storedCart = localStorage.getItem('guestCart');
      let cart: CartItem[] = storedCart ? JSON.parse(storedCart) : [];

      const existingItem = cart.find(item => item.id === product.id); // Using product.id for guest cart for simplicity

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          imageUrl: imageUrl || '/placeholder.png',
        });
      }
      localStorage.setItem('guestCart', JSON.stringify(cart));
      alert('상품이 장바구니에 추가되었습니다! (비회원)');
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="relative bg-gray-200 aspect-square w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">{product.name}</h4>
        </div>
        <p className="text-gray-800 mt-2 text-right font-semibold">{product.price.toLocaleString()}원</p>
        <button
          onClick={handleAddToCart}
          disabled={loadingVariant || variantId === null}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loadingVariant ? '로딩 중...' : '장바구니 담기'}
        </button>
      </div>
    </div>
  );
}
