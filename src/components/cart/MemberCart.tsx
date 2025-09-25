import React from 'react';
import Image from 'next/image';
import { getCartItems, updateCartItemQuantity, removeCartItem, clearUserCart } from '@/app/cart/actions';

export default async function MemberCart() {
  const cartItems = await getCartItems();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price || 0) * item.quantity, 0);
  const shipping = 3000; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Cart Items List */}
      <div className="flex-grow lg:w-2/3">
        <h2 className="text-xl font-bold mb-4">국내배송상품 ({cartItems.length})</h2>
        <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-gray-600">장바구니가 비어 있습니다.</div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cart_id} className="flex items-center py-4">
                <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                  <Image
                    src={item.image_url || '/placeholder.png'}
                    alt={item.product_name || 'Product image'}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold">{item.product_name}</h2>
                  <p className="text-gray-600">{item.product_price?.toLocaleString()}원</p>
                  <p className="text-sm text-gray-500">옵션: {item.size} / {item.color}</p>
                  <div className="flex items-center mt-2">
                    <form action={async () => {
                      'use server';
                      await updateCartItemQuantity(item.cart_id!, Math.max(1, item.quantity - 1));
                    }}>
                      <button type="submit" className="px-2 py-1 border rounded-md">-</button>
                    </form>
                    <span className="mx-2">{item.quantity}</span>
                    <form action={async () => {
                      'use server';
                      await updateCartItemQuantity(item.cart_id!, item.quantity + 1);
                    }}>
                      <button type="submit" className="px-2 py-1 border rounded-md">+</button>
                    </form>
                    <form action={async () => {
                      'use server';
                      await removeCartItem(item.cart_id!);
                    }}>
                      <button type="submit" className="ml-4 text-red-500 hover:text-red-700">삭제</button>
                    </form>
                  </div>
                </div>
                <div className="text-lg font-semibold">
                  {((item.product_price || 0) * item.quantity).toLocaleString()}원
                </div>
              </div>
            ))
          )}
        </div>
        {/* Action Buttons for Cart Items */}
        <div className="flex justify-end space-x-2 mt-4">
          {/* TODO: Implement selected item deletion */}
          <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">선택상품삭제</button>
          <form action={async () => {
            'use server';
            await clearUserCart();
          }}>
            <button type="submit" className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
              장바구니비우기
            </button>
          </form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">결제 예정 금액</h2>
        <div className="flex justify-between mb-2">
          <span>총 상품 금액</span>
          <span>{subtotal.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>배송비</span>
          <span>{shipping.toLocaleString()}원</span>
        </div>
        <div className="flex justify-between font-bold text-xl border-t border-gray-300 pt-4 mt-4">
          <span>총 주문 금액</span>
          <span>{total.toLocaleString()}원</span>
        </div>
        <button className="w-full bg-black text-white py-3 rounded-md mt-6 hover:bg-gray-800 transition-colors">
          전체상품주문
        </button>
        <button className="w-full bg-blue-600 text-white py-3 rounded-md mt-2 hover:bg-blue-700 transition-colors">
          선택상품주문
        </button>
      </div>
    </div>
  );
}
