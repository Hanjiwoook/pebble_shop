# Pebble Shop - 개발 환경 및 규칙 명세서

## 1. 기술 스택 (Tech Stack)
- **Framework**: Next.js v15.5.2
- **UI Library**: React v19.1.0
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Backend & DB**: Supabase
- **Deployment**: Vercel
- **Payment**: 토스페이먼츠
- **AI**: Google Gemini API

## 2. 개발 환경 설정
1.  **Node.js 설치**: `v20.x` LTS 버전 사용을 권장합니다.
2.  **저장소 복제**: `git clone <repository-url>`
3.  **의존성 설치**: 프로젝트 루트에서 `npm install` 명령어 실행
4.  **환경 변수 설정**:
    -   프로젝트 루트에 `.env.local` 파일을 생성합니다.
    -   Supabase 프로젝트 대시보드의 `Project Settings > API` 메뉴에서 키 값을 복사하여 아래 형식으로 붙여넣습니다.
    ```
    NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    ```
5.  **개발 서버 실행**: `npm run dev` 명령어를 실행하고 `http://localhost:3000` 에서 확인합니다.

## 3. 코드 컨벤션
-   **네이밍 규칙**:
    -   컴포넌트 파일 및 함수: `PascalCase` (예: `ProductCard.tsx`)
    -   일반 함수 및 변수: `camelCase` (예: `getUserInfo`)
    -   페이지 및 폴더: `kebab-case` (예: `/my-page`)
-   **스타일링**:
    -   모든 스타일은 Tailwind CSS 유틸리티 클래스를 사용합니다.
    -   재사용성이 높은 스타일 조합은 `@apply`를 사용하여 `globals.css`에 별도 클래스로 정의할 수 있습니다.
-   **Git 브랜치 전략**:
    -   `main`: 최종 배포되는 브랜치
    -   `develop`: 개발의 중심이 되는 브랜치
    -   `feature/기능이름`: 각 기능 개발을 위한 브랜치 (예: `feature/login`)
    -   작업 완료 후 `develop` 브랜치로 Pull Request(PR)를 생성하여 코드 리뷰 후 병합합니다.
