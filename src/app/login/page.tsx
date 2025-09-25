'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { login } from '@/app/auth/actions';
import { createClient } from '@/utils/supabase/client';
import { Provider } from '@supabase/supabase-js';
import { mergeGuestCart } from '@/app/cart/actions';
import { useRouter } from 'next/navigation';

interface GuestCartItem {
  id: number; // This is product.id from local storage
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function LoginPage() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const error = searchParams.get('error');
  const router = useRouter();

  const supabase = createClient();

  const handleOAuthSignIn = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLoginSubmit = async (formData: FormData) => {
    const result = await login(formData); // Call the server action

    // The login server action redirects on success or error, so we won't reach here on direct success/failure.
    // However, if it returns an error message (e.g., for client-side validation before redirect),
    // or if we want to handle the redirect client-side after merging.

    // Assuming successful login means no redirect happened from the server action itself
    // and we are handling the redirect client-side after merging.
    // If the server action always redirects, this client-side merge logic needs to be in the callback route.

    // For now, let's assume the server action does NOT redirect on success, and we handle it here.
    // If the server action *does* redirect, this logic needs to be moved to the auth callback route.

    // Check for guest cart and merge
    const storedCart = localStorage.getItem('guestCart');
    if (storedCart) {
      const guestCart: GuestCartItem[] = JSON.parse(storedCart);
      if (guestCart.length > 0) {
        console.log('Merging guest cart:', guestCart);
        await mergeGuestCart(guestCart);
        localStorage.removeItem('guestCart'); // Clear guest cart after merging
        console.log('Guest cart merged and cleared.');
      }
    }

    // Redirect to home page after successful login and cart merge
    router.push('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-gray-900 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {message && (
          <div className="p-4 text-sm text-center text-green-800 bg-green-100 rounded-lg">
            {message}
          </div>
        )}
        {error && (
          <div className="p-4 text-sm text-center text-red-800 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <form className="space-y-6" action={handleLoginSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-900"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm text-gray-900"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <button
              onClick={() => handleOAuthSignIn('kakao')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#FEE500] text-sm font-medium text-[#391B1B] hover:bg-yellow-400"
            >
              Kakao
            </button>
          </div>
          <div>
            <button
              onClick={() => handleOAuthSignIn('naver')}
              className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-[#03C75A] text-sm font-medium text-white hover:bg-green-600"
            >
              Naver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
