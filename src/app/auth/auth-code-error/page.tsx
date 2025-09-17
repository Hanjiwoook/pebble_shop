
import Link from 'next/link';

export default function AuthCodeError() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">인증 실패</h1>
        <p className="text-gray-700 mb-6">
          로그인 과정에서 오류가 발생했습니다. 다시 시도해주세요.
        </p>
        <Link href="/login">
          <a className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
            로그인 페이지로 돌아가기
          </a>
        </Link>
      </div>
    </div>
  );
}
