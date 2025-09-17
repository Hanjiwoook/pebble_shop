
'use server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?error=Could not authenticate user');
  }

  return redirect('/');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect('/login');
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const supabase = createClient();

  if (password !== confirmPassword) {
    return redirect('/signup?error=Passwords do not match');
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing up:', error);
    // TODO: Implement more specific error handling and user feedback
    return redirect('/signup?error=Could not authenticate user');
  }

  return redirect('/auth/check-email');
}
