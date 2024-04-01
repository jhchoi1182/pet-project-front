## 🗺프로젝트 아키텍처

![image](https://github.com/jhchoi1182/pet-project-front/assets/116577489/9d9e9a3e-ef7f-4032-a656-401389b101dc)

## 🎉소개

이 프로젝트는 배운 기술을 실제로 적용하며 점진적으로 기능을 추가해 나가는 것을 목표로 진행되고 있는 개인 프로젝트입니다.

<br>

현재 서비스 포맷 - 게시판 서비스  
백엔드 코드 - https://github.com/jhchoi1182/pet-project-back

<br>

## ✨특징

- Next.js + 스프링 부트 풀스택 게시판 서비스
- PWA 적용

### 성능 최적화

- JavaScript로 정의된 CSS 스타일을 Tailwind CSS의 설정으로 이전하여 **FCP 속도 개선**(약 3~5%)
- **페이지네이션에 데이터 캐싱** 전략을 적용해 **페이지 이동 간 API 호출 최적화** 및 **리렌더링 속도70.86% 개선**
- promise.all 대신 React-query를 사용하여 상세 페이지 **API 요청 병렬처리 (최종 TTI 시간 28.38% 단축)**
- invalidateQueries를 **optimistic uptade**로 대체
  - patch, get요청 이후 리렌더링 → 변경과 동시에 patch 요청, 실패 시 롤백
  - **리렌더링 속도 69.64% 개선**
  - get요청 제거로 **불필요한 api 호출 횟수 감소**

### 인증

- OAuth 2.0을 이용한 소셜 로그인
- axios에 **withCredentials**을 설정해 **인증 헤더 요청 자동화**
- 닉네임을 쿠키, 전역 상태값으로 관리하여 **새로고침에 대비**
- 인증 필요한 요청 성공 시 닉네임이 없으면 닉네임을 받아오는 api를 호출하여 **쿠키 수동 삭제에 대비**
- 미들웨어를 통한 비인가 처리 자동화 (애플리케이션 2.0 버전)

### SEO 최적화

- 상세페이지를 SSR에서 ISR + SSR 혼합 방식으로 변경(**페이지 전환 속도 30.49% 개선**)
  - 상세 페이지에 ISR 방식을 사용해 SEO를 최적화하고 최신 데이터 유지를 위해 내용에 SSR을 사용
- 사이트맵 생성 후 Google Search Console에 등록(**구글 검색 결과에 서비스 노출**)
