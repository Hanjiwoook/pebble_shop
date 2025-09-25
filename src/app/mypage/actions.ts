'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

// Define a simplified Profile type for this context
export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  email?: string; // Optional email
};

// Get the current user's profile
export async function getProfile() {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { data: null, error: { message: 'User not found.' } };
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, full_name, updated_at')
    .eq('id', user.id)
    .maybeSingle();
    
  // Add email to the profile data
  const profileData = data ? { ...data, email: user.email } : null;

  return { data: profileData, error };
}

// Update the user's profile
export async function updateProfile(profile: Partial<Profile>) {
  const supabase = createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: { message: 'User not found for update.' } };
  }

  const { error } = await supabase
    .from('profiles')
    .update(profile)
    .eq('id', user.id);

  if (!error) {
    revalidatePath('/mypage'); // Revalidate the mypage path to show updated info
  }

  return { error };
}