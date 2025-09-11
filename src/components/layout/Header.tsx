
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/">pebble shop</Link>
        </h1>
        <nav>
          <ul className="flex space-x-6">
            <li><Link href="/products?category=BEST" className="hover:text-gray-500">BEST</Link></li>
            <li><Link href="/products?category=NEW" className="hover:text-gray-500">NEW</Link></li>
            <li><Link href="/products?category=TOP" className="hover:text-gray-500">상의</Link></li>
            <li><Link href="/products?category=BOTTOM" className="hover:text-gray-500">하의</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-4">
          <Link href="/cart" className="hover:text-gray-500">Cart</Link>
          <Link href="/login" className="hover:text-gray-500">Login</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
