'use client';

import { useState } from 'react'; // Keep useState for activeTab
import Link from 'next/link';
import ProfileEditor from '@/components/mypage/ProfileEditor';
import OrderHistory from '@/components/mypage/OrderHistory';
import PasswordChanger from '@/components/mypage/PasswordChanger';
import { useSession } from '@/components/providers/SessionProvider'; // Import useSession

type Tab = 'profile' | 'orders' | 'password';

const MyPage = () => {
  const { user, loading } = useSession(); // Use session from provider
  const [activeTab, setActiveTab] = useState<Tab>('profile'); // Default to profile tab

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다.</h1>
        <Link href="/login" className="text-blue-500 hover:underline">로그인 페이지로 이동</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4 text-black pt-20"> {/* Added pt-20 for header */}
      <h1 className="text-4xl font-bold mb-8">마이페이지</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('profile')}
              className={`${
                activeTab === 'profile'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              프로필 수정
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              주문 내역
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`${
                activeTab === 'password'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              비밀번호 변경
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'profile' && <ProfileEditor />} 
          {activeTab === 'orders' && <OrderHistory />} 
          {activeTab === 'password' && <PasswordChanger />} 
        </div>
      </div>
    </div>
  );
};

export default MyPage;
