
'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { useSession } from '../providers/SessionProvider';
import { logout } from '@/app/auth/actions';
import { useRouter } from 'next/navigation';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu = ({ isOpen, onClose }: SideMenuProps) => {
  const { user } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    onClose(); // Close the menu
    router.push('/'); // Redirect to home
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Menu Panel */}
      <div
        className={`w-80 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 text-black">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={onClose} className="hover:opacity-75 cursor-pointer">
              <X size={24} />
            </button>
          </div>
          <nav>
            <ul className="space-y-4">
              <li><Link href="/products?category=BEST" onClick={onClose} className="text-lg hover:text-gray-500">BEST</Link></li>
              <li><Link href="/products?category=NEW" onClick={onClose} className="text-lg hover:text-gray-500">NEW</Link></li>
              <li><Link href="/products?category=TOP" onClick={onClose} className="text-lg hover:text-gray-500">상의</Link></li>
              <li><Link href="/products?category=BOTTOM" onClick={onClose} className="text-lg hover:text-gray-500">하의</Link></li>
            </ul>
          </nav>
          <div className="absolute bottom-6 left-6">
            {user ? (
              <form action={handleLogout}>
                <button className="text-lg hover:text-gray-500">Logout</button>
              </form>
            ) : (
              <Link href="/login" onClick={onClose} className="text-lg hover:text-gray-500">Login</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
