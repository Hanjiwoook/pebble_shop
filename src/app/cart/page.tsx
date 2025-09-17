import React from 'react';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const mockCartItems: CartItem[] = [
  { id: 1, name: 'Stylish Summer Dress', price: 75000, quantity: 1, imageUrl: 'https://picsum.photos/seed/cart1/100/100' },
  { id: 2, name: 'Comfortable Sneakers', price: 120000, quantity: 1, imageUrl: 'https://picsum.photos/seed/cart2/100/100' },
];

export default function CartPage() {
  const subtotal = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 3000; // Example shipping cost
  const total = subtotal + shipping;

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="flex justify-center items-center text-center text-gray-500 mb-8">
          <div className="flex flex-col items-center">
            <span className="font-bold text-black">01</span>
            <span className="text-sm font-bold text-black">장바구니</span>
          </div>
          <span className="mx-4 text-gray-300">&gt;</span>
          <div className="flex flex-col items-center">
            <span className="font-bold">02</span>
            <span className="text-sm">주문서작성</span>
          </div>
          <span className="mx-4 text-gray-300">&gt;</span>
          <div className="flex flex-col items-center">
            <span className="font-bold">03</span>
            <span className="text-sm">주문완료</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8 text-center">장바구니</h1>

        {mockCartItems.length === 0 ? (
          <div className="text-center py-16 border-t border-b border-gray-200">
            <p className="text-xl text-gray-600">장바구니가 비어 있습니다.</p>
            <p className="text-gray-500 mt-2">장바구니에 담긴 상품은 7일 동안 보관됩니다.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items List */}
            <div className="flex-grow lg:w-2/3">
              <h2 className="text-xl font-bold mb-4">국내배송상품 ({mockCartItems.length})</h2>
              <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {mockCartItems.map((item) => (
                  <div key={item.id} className="flex items-center py-4">
                    <div className="relative w-24 h-24 mr-4 flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-gray-600">{item.price.toLocaleString()}원</p>
                      <div className="flex items-center mt-2">
                        <button className="px-2 py-1 border rounded-md">-</button>
                        <span className="mx-2">{item.quantity}</span>
                        <button className="px-2 py-1 border rounded-md">+</button>
                        <button className="ml-4 text-red-500 hover:text-red-700">삭제</button>
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      {(item.price * item.quantity).toLocaleString()}원
                    </div>
                  </div>
                ))}
              </div>
              {/* Action Buttons for Cart Items */}
              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">선택상품삭제</button>
                <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">장바구니비우기</button>
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
        )}

        {/* Usage Guide */}
        <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-xl font-bold mb-4">이용안내</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>장바구니에 담긴 상품은 7일 동안 보관됩니다.</li>
            <li>가격, 옵션 등 정보가 변경된 상품은 장바구니에 담은 시점의 정보로 유지됩니다.</li>
            <li>무이자 할부 혜택은 상품별로 적용 여부가 다를 수 있습니다.</li>
            <li>배송비는 상품별, 지역별로 다르게 적용될 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}