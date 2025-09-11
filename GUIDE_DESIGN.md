# Pebble Shop - 디자인 가이드라인

## 1. 핵심 컨셉
-   **"잡지처럼 깔끔하고 감성적인 디자인"**
-   사용자가 콘텐츠(옷)에 집중할 수 있도록 미니멀리즘을 지향합니다.

## 2. 색상 팔레트 (Color Palette)
-   **Primary (주조색)**:
    -   `#FFFFFF` (White): 배경 및 기본 영역
    -   `#F9F9F9` (Off-White): 구분되는 배경 영역
-   **Secondary (보조색)**:
    -   `#111827` (Gray-900): 기본 텍스트, 제목
    -   `#6B7280` (Gray-500): 보조 텍스트, 아이콘
    -   `#E5E7EB` (Gray-200): 구분선, 비활성 요소
-   **Accent (강조색)**:
    -   필요시 부드러운 파스텔 톤의 색상을 포인트로 사용 (예: `#A0C4FF`)

## 3. 타이포그래피 (Typography)
-   **기본 폰트**: `Inter` (현재 `layout.tsx`에 설정됨)
-   **폰트 크기 (Tailwind Class 기준)**:
    -   `h1` (페이지 제목): `text-4xl`, `font-bold`
    -   `h2` (섹션 제목): `text-3xl`, `font-bold`
    -   `h3` (소제목): `text-xl`, `font-semibold`
    -   `p` (본문): `text-base`, `font-normal`
    -   `caption` (부가설명): `text-sm`, `text-gray-500`

## 4. 레이아웃 및 간격
-   **기본 레이아웃**: `max-w-7xl`, `mx-auto`, `px-4` (컨테이너)
-   **간격 (Spacing)**: Tailwind CSS의 4px 기반 간격 시스템을 따릅니다. (예: `p-4`, `m-8`)

## 5. 핵심 컴포넌트 스타일
-   **버튼 (Button)**:
    -   Primary: 배경색(`bg-gray-900`), 텍스트색(`text-white`), 호버 시 밝기 변경
    -   Secondary: 테두리(`border`), 텍스트색(`text-gray-900`), 호버 시 배경색 변경
-   **상품 카드 (Product Card)**:
    -   그림자 없는 깔끔한 디자인 (`shadow-none`)
    -   이미지 영역과 정보 영역이 명확히 구분
