
'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@/app/mypage/actions';
import type { Order } from '@/utils/supabase/types';

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await getOrders();
      if (error) {
        setError(error.message);
      } else {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>주문 내역을 불러오는 중...</div>;
  }

  if (error) {
    return <div className="text-red-500">오류: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">주문 내역</h2>
        <p>주문 내역이 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">주문 내역</h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">주문 번호: {order.id}</p>
              <p className="text-sm text-gray-600">주문일: {new Date(order.create_at).toLocaleDateString()}</p>
            </div>
            <p>총 금액: {order.total_price.toLocaleString()}원</p>
            <p>상태: {order.status}</p>
            {order.order_items && order.order_items.length > 0 && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-medium mb-2">주문 상품</h3>
                <ul className="space-y-2">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm text-gray-700">
                      <span>상품 ID: {item.varnt_id}</span>
                      <span>수량: {item.qutitay}</span>
                      <span>가격: {item.price_at_purchase.toLocaleString()}원</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
