'use client';

import { useEffect, useState } from 'react';
import { getProfile, updateProfile } from '@/app/mypage/actions';
import type { Profile } from '@/utils/supabase/types';

const ProfileEditor = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const { data, error } = await getProfile();
      if (error) {
        setError(error.message);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;

    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    const updatedProfile = {
      username: formData.get('username') as string,
      full_name: formData.get('full_name') as string,
    };

    const { error } = await updateProfile(updatedProfile);

    if (error) {
      setError(error.message);
    } else {
      setSuccess('프로필이 성공적으로 업데이트되었습니다.');
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          이메일
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={profile?.email ?? ''}
          disabled
          className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          사용자 이름
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={profile?.username ?? ''}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
          성명
        </label>
        <input
          type="text"
          id="full_name"
          name="full_name"
          defaultValue={profile?.full_name ?? ''}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        프로필 업데이트
      </button>
      {success && <div className="text-green-500 mt-2">{success}</div>}
    </form>
  );
};

export default ProfileEditor;