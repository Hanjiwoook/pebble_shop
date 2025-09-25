import React from 'react';
import { createClient } from '@/utils/supabase/server';
import GuestCart from '@/components/cart/GuestCart';
import MemberCart from '@/components/cart/MemberCart';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default async function CartPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // For debugging: check if user is logged in or not
  console.log({ user });

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

        {user ? (
          <MemberCart />
        ) : (
          <GuestCart initialCartItems={[]} />
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