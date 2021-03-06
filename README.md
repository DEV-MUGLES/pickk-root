# PICKK 관리자 어드민 어플리케이션 ✨

> 옷 잘 입는 형들의 선택, PICKK

Next.js, Apollo Client, Emotion, Yarn Berry를 사용했어요!

## 🙋 시작해볼까요?

### 1. 저장소를 기기에 Clone합니다.

```shell
git clone https://github.com/DEV-MUGLES/pickk-root.git

cd pickk-root
```

### 2. (VSCode 사용자라면) Custon TS setting을 해주세요

1. Press ctrl+shift+p in a TypeScript file
2. Choose "Select TypeScript Version"
3. Pick "Use Workspace Version"

### 3. 의존성 설치 📦

[Yarn Berry](https://yarnpkg.com/getting-started)를 사용합니다!

```shell
# 이미 설치했다면 스킵!
npm i -g yarn

# yarn version 확인 (2 이상이어야합니다)
yarn -v

# 설치~
yarn install
```

### 4. 환경 변수 설정 🔧

**1. DEV-MUGLES 멤버라면**

```sh
# DEV-MUGLES pickk-root 프로젝트에 연결합니다.
vercel link

# development 환경 변수들을 가져옵니다.
vercel env pull
```

**2. 이방인이라면**

다음 내용의 `.env` 파일을 생성해주세요!

```sh
NEXT_PUBLIC_API_URL="YOUR_API_URL"
```

### 5. 실행 🏃

```shell
# 개발 서버 실행
yarn dev

# type check
yarn type-check

# lint
yarn lint

# 빌드 (lint, 타입체크를 포함합니다.)
yarn build

# 프로덕션 모드로 실행
yarn start
```
