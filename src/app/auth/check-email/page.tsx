'use client';

import Link from 'next/link';

export default function CheckEmailPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold text-gray-900">가입까지 거의 다 왔어요!</h2>
        <p className="text-gray-600">
          입력하신 이메일 주소의 수신함을 확인하여, <br />
          인증 링크를 클릭하면 회원가입이 완료됩니다.
        </p>
        <div className="pt-4">
          <Link
            href="/login"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            로그인 페이지로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
