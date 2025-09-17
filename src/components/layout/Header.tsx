
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart, Menu } from 'lucide-react';
import SideMenu from './SideMenu'; // Assuming SideMenu is in the same directory
import { createClient } from '@/utils/supabase/client';
import { logout } from '@/app/auth/actions';
import type { User as SupabaseUser } from '@supabase/supabase-js';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-40 bg-white text-black border-b border-gray-200"
      >
        <div className="relative flex items-center justify-between h-16">
          {/* Left: Menu Button */}
          <div className="pl-4 sm:pl-6 lg:pl-8 flex items-center">
            <button onClick={toggleMenu} className="hover:opacity-75 cursor-pointer p-0">
              <Menu size={22} />
            </button>
          </div>

          {/* Center: Logo (Absolutely Positioned) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link href="/" className="text-2xl font-bold">
              pebble shop
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-6 pr-4 sm:pr-6 lg:pr-8">
            <div className="relative group flex items-center">
              <button className="hover:opacity-75 cursor-pointer">
                <Search size={22} />
              </button>
              <span className="absolute top-full mt-2 -translate-x-1/2 left-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                검색
              </span>
            </div>
            {!loading && user ? (
              <>
                <div className="relative group flex items-center">
                  <Link href="/mypage" className="hover:opacity-75">
                    <User size={22} />
                  </Link>
                  <span className="absolute top-full mt-2 -translate-x-1/2 left-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                    마이페이지
                  </span>
                </div>
                <form action={logout}>
                  <button className="hover:opacity-75 text-sm">Logout</button>
                </form>
              </>
            ) : !loading && (
              <div className="relative group flex items-center">
                <Link href="/login" className="hover:opacity-75">
                  <User size={22} />
                </Link>
                <span className="absolute top-full mt-2 -translate-x-1/2 left-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                  마이페이지
                </span>
              </div>
            )}
            <div className="relative group flex items-center">
              <Link href="/cart" className="hover:opacity-75">
                <ShoppingCart size={22} />
              </Link>
              <span className="absolute top-full mt-2 -translate-x-1/2 left-1/2 w-max bg-black text-white text-xs rounded py-1 px-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity">
                장바구니
              </span>
            </div>
          </div>
        </div>
      </header>
      <SideMenu isOpen={isMenuOpen} onClose={toggleMenu}>
        <nav className="flex flex-col space-y-4">
          <Link href="/products?category=BEST" className="hover:text-gray-500">BEST</Link>
          <Link href="/products?category=NEW" className="hover:text-gray-500">NEW</Link>
          <Link href="/products?category=TOP" className="hover:text-gray-500">상의</Link>
          <Link href="/products?category=BOTTOM" className="hover:text-gray-500">하의</Link>
        </nav>
      </SideMenu>
    </>
  );
};

export default Header;
