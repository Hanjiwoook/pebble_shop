'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileEditor from '@/components/mypage/ProfileEditor';
import OrderHistory from '@/components/mypage/OrderHistory';
import PasswordChanger from '@/components/mypage/PasswordChanger';
import { useSession } from '@/components/providers/SessionProvider';
import { logout } from '@/app/auth/actions'; // Import logout action
import { getProfile } from '@/app/mypage/actions'; // Import getProfile from mypage actions

// Placeholder Components (will be created below)
const RewardPointsHistory = () => <div className="p-4">적립금 내역</div>;
const CouponHistory = () => <div className="p-4">쿠폰 내역</div>;
const ShippingAddressManagement = () => <div className="p-4">배송주소록 관리</div>;
const RecentlyViewedProducts = () => <div className="p-4">최근 본 상품</div>;
const MyWishlist = () => <div className="p-4">나의 위시 리스트</div>;
const MyReviews = () => <div className="p-4">나의 리뷰</div>;

type MenuItem = 'orderHistory' | 'rewardPoints' | 'coupon' | 'shippingAddress' | 'recentlyViewed' | 'wishlist' | 'myReviews' | 'editProfile' | 'passwordChange' | 'logout';

const MyPage = () => {
  const { user, loading } = useSession();
  const [profile, setProfile] = useState<{ username: string | null; full_name: string | null; } | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  console.log('MyPage: Rendered', { user, loading });
  const [activeItem, setActiveItem] = useState<MenuItem>('orderHistory'); // Default to Order History

  useEffect(() => {
    if (user) {
      const fetchProfileData = async () => {
        setLoadingProfile(true);
        const { data, error } = await getProfile();
        if (!error && data) {
          setProfile(data);
        }
        setLoadingProfile(false);
      };
      fetchProfileData();
    }
  }, [user]);

  if (loading || loadingProfile) {
    console.log('MyPage: Showing loading state', { user, loading, loadingProfile });
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!user) {
    console.log('MyPage: Showing login required state', { user, loading });
    return (
      <div className="flex flex-col items-center justify-center h-screen text-black">
        <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다.</h1>
        <Link href="/login" className="text-blue-500 hover:underline">로그인 페이지로 이동</Link>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeItem) {
      case 'orderHistory':
        return <OrderHistory />;
      case 'rewardPoints':
        return <RewardPointsHistory />;
      case 'coupon':
        return <CouponHistory />;
      case 'shippingAddress':
        return <ShippingAddressManagement />;
      case 'recentlyViewed':
        return <RecentlyViewedProducts />;
      case 'wishlist':
        return <MyWishlist />;
      case 'myReviews':
        return <MyReviews />;
      case 'editProfile':
        return <ProfileEditor />;
      case 'passwordChange':
        return <PasswordChanger />;
      default:
        return <OrderHistory />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black pt-20">
      <div className="w-full max-w-5xl mx-auto px-4 mb-8 text-center">
        <h1 className="text-2xl font-bold">안녕하세요 {profile?.full_name || profile?.username || user?.email} 고객님!</h1>
      </div>
      <div className="bg-white w-full flex p-8">
        {/* Sidebar Navigation */}
        <div className="w-64 pr-8">
          <nav className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">쇼핑 정보</h2>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveItem('orderHistory')} className={`block text-left w-full ${activeItem === 'orderHistory' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>주문내역 조회</button></li>
                <li><button onClick={() => setActiveItem('rewardPoints')} className={`block text-left w-full ${activeItem === 'rewardPoints' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>적립금 내역</button></li>
                <li><button onClick={() => setActiveItem('coupon')} className={`block text-left w-full ${activeItem === 'coupon' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>쿠폰 내역</button></li>
                <li><button onClick={() => setActiveItem('shippingAddress')} className={`block text-left w-full ${activeItem === 'shippingAddress' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>배송주소록 관리</button></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">나의 활동</h2>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveItem('recentlyViewed')} className={`block text-left w-full ${activeItem === 'recentlyViewed' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>최근 본 상품</button></li>
                <li><button onClick={() => setActiveItem('wishlist')} className={`block text-left w-full ${activeItem === 'wishlist' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>나의 위시 리스트</button></li>
                <li><button onClick={() => setActiveItem('myReviews')} className={`block text-left w-full ${activeItem === 'myReviews' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>나의 리뷰</button></li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">나의 정보</h2>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveItem('editProfile')} className={`block text-left w-full ${activeItem === 'editProfile' ? 'font-bold text-gray-900' : 'text-gray-600 hover:text-gray-900'}`}>회원정보 수정</button></li>
                <li>
                  <form action={logout}>
                    <button type="submit" className="block text-left w-full text-gray-600 hover:text-gray-900">로그아웃</button>
                  </form>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 pl-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyPage;