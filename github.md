 ### 1부: 당신이 할 일 (저장소 주인)

  먼저 저장소 주인인 당신이 친구를 프로젝트에 초대해야 합니다.


  1. GitHub 저장소 설정으로 이동하기


   - 웹 브라우저에서 당신의 GitHub 저장소 페이지로 접속합니다.
   - Settings 페이지에 들어오면 왼쪽 편에 여러 메뉴가 보입니다. 여기서 `Collaborators`를 클릭하세요.
   - Collaborators 페이지 중앙에 있는 초록색 `[Add people]` 버튼을 클릭합니다.
  이제 당신이 할 일은 끝났습니다. 친구에게 초대를 보냈다고 알려주세요.

  ---

  ### 2부: 친구가 할 일 (초대받은 공동 작업자)

  이제 친구가 초대를 수락하고 프로젝트를 자신의 컴퓨터에 설정할 차례입니다.

  1. 공동 작업자 초대 수락하기

  -   친구는 GitHub에 로그인하면 알림을 받게 됩니다. 또는 GitHub에서 보낸 초대 이메일을 확인할 수도 있습니다.
  -   이메일이나 알림에 있는 `Accept invitation` (초대 수락) 버튼을 클릭합니다.


  2. GitHub 저장소 복제하기 (Clone)


   - 중요: 친구는 Fork(포크) 버튼을 누르면 안 됩니다.
      `bash
      git clone https://github.com/Hanjiwoook/pebble_shop.git
      `
  -   이 명령어를 실행하면 pebble-shop이라는 폴더가 생기고 그 안에 프로젝트 코드가 모두 다운로드됩니다.

  3. 프로젝트 실행 환경 설정하기

  -   복제된 프로젝트 폴더로 이동합니다.
      `bash
      cd pebble-shop
      `
  -   필수 패키지를 설치합니다.

  `bash
      npm install
      `
  -   `.env.local` 파일을 생성하고 Supabase 접속 정보를 채워 넣습니다. (이 파일은 Git으로 공유되지 않으므로 친구가 직접 만들어야
  합니다.)

  `
      NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
      NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
      `

  4. 개발 서버 실행 및 확인

  -   모든 설정이 끝났으면, 개발 서버를 실행해서 프로젝트가 잘 뜨는지 확인합니다.

  `bash
      npm run dev
      `


  이제 친구도 모든 준비를 마쳤습니다. 이제부터 두 분 모두 이전에 배운 Feature Branch 워크플로우(git pull -> git checkout -b ... ->
  ...)에 따라 안전하게 협업을 진행할 수 있습니다.


-------------------------------------------------------------------------------------




  ### 1단계: 작업 시작 전, 둘 다 최신 코드로 동기화하기


  두 사람 모두, 작업을 시작하기 직전에 GitHub에 있는 master 브랜치의 최신 내용을 각자의 컴퓨터로 가져와야 합니다.

  > (당신과 친구 둘 다 실행)
  >
  `bash
  > # 1. master 브랜치로 이동
  > git checkout master
  >
  > # 2. GitHub(origin)에서 최신 코드를 가져옴
  > git pull origin master
  > `
  > 이유: 항상 최신 버전의 코드에서 내 작업을 시작해야 나중에 발생할 충돌(Conflict)을 예방할 수 있습니다.

  ---

  ### 2단계: 각자의 작업 공간(Feature Branch) 만들기


  이제 각자 맡은 기능에 대한 독립된 브랜치를 만듭니다.

  > (당신이 실행)
  > `bash
  > # 'footer' 기능 브랜치를 만들고 이동
  > git checkout -b feature/footer
  > `

  > (친구가 실행)
  >
  `bash
  > # 'about-page' 기능 브랜치를 만들고 이동
  > git checkout -b feature/about-page
  > `
  > 결과: 이제 두 사람은 서로에게 전혀 영향을 주지 않는 별도의 공간에서 작업하게 됩니다.

  ---


  3단계: 각자 브랜치에서 코드 작업 및 커밋하기
  > (당신: Footer 작업)
  > 1.  src/components/layout/Footer.tsx 파일을 열고 코드를 수정합니다.
  > 2.  작업이 어느 정도 완료되면 커밋합니다.
  > `bash
  > git add .
  > git commit -m "Feat: Footer 레이아웃 구성"
  > `


  > (친구: About Us 페이지 작업)
  > 1.  src/app/about/page.tsx 파일을 새로 만들고 내용을 채웁니다.
  > 2.  작업이 어느 정도 완료되면 커밋합니다.
  > `bash
  > git add .
  > git commit -m "Feat: About Us 페이지 기본 구조 생성"
  > `

  ---


  4단계: 먼저 끝난 사람이 Pull Request 보내기
  `bash
  >     git push origin feature/footer
  >     `
  > 2.  GitHub 저장소 페이지로 가서, feature/footer 브랜치에 대한 Pull Request(PR)를 생성합니다. (제목, 설명 작성)

  ---


  5단계: 코드 리뷰 및 첫 번째 작업물 병합(Merge)하기
  > (친구가 할 일)
  > 1.  당신이 보낸 PR을 GitHub에서 열어봅니다.
  > 2.  Files changed 탭에서 변경된 코드를 확인하고, 의견이 있으면 댓글을 남깁니다.
  > 3.  이상이 없으면 `Approve` (승인) 버튼을 눌러줍니다.
  >
  > (당신 또는 친구가 할 일)
  > 1.  PR이 승인되었으면, GitHub에서 `[Merge pull request]` 버튼을 눌러 Footer 코드를 master 브랜치에 최종적으로 합칩니다.

  결과: 이제 GitHub의 master 브랜치에는 당신이 만든 Footer 기능이 포함되었습니다. 하지만 친구의 컴퓨터에는 아직 이 내용이 없습니다.

  ---


  6단계: 두 번째 사람이 작업 내용 합치기 전, 최신 `master` 내용 반영하기 (매우 중요!)
  시나리오: 이제 친구가 About Us 페이지 작업을 마치고 PR을 보내려고 합니다. 하지만 그 사이에 `master` 브랜치가 당신의 `Footer` 작업으로 
  인해 변경되었습니다. 친구는 PR을 보내기 전에 이 최신 master 내용을 자신의 작업 브랜치(feature/about-page)에 먼저 반영해야 합니다.


  > (친구가 실행)
  > 1.  먼저, 자신의 로컬 master 브랜치를 최신 상태로 업데이트합니다.
  >     `bash
  >     git checkout master
  >     git pull origin master
  >     `
  > 2.  다시 자신의 작업 브랜치로 돌아옵니다.
  >
  `bash
  >     git checkout feature/about-page
  >     `
  > 3.  최신화된 `master` 브랜치의 내용을 내 작업 브랜치로 가져와 합칩니다.
  >     `bash
  >     git merge master
  >     `
  > 이유: 이 과정을 통해, 친구는 자신의 About Us 페이지와 당신의 Footer 코드가 합쳐졌을 때 충돌이 없는지 미리 자신의 컴퓨터에서
  확인하고 해결할 수 있습니다.

  ---

  ### 7단계: 두 번째 사람도 Pull Request 보내고 병합하기


  > (친구가 실행)
  > 1.  이제 최신 내용이 반영된 자신의 브랜치를 GitHub에 올립니다.
  >     `bash
  >     git push origin feature/about-page
  >     `
  > 2.  GitHub에서 About Us 페이지에 대한 Pull Request를 생성합니다.
  >
  > (당신이 할 일)
  > 1.  친구가 보낸 PR을 리뷰하고 승인합니다.
  > 2.  GitHub에서 `[Merge pull request]` 버튼을 눌러 master 브랜치에 합칩니다.

  ---


  8단계: 모두 다시 동기화하고 다음 작업 준비
  `bash
  > git checkout master
  > git pull origin master
  > `