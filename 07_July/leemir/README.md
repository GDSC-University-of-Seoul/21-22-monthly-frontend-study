---
marp: true
paginate: true
backgroundImage: url('https://www.slidebackground.com/uploads/white-background-ppt/abstact-soft-white-backgrounds-powerpoint-1.jpg')
footer: LeeMir
---

# Parcel

*: The zero configuration build tool for the web.*

이 Parcel은 무료로 해드립니다. [[공식 홈페이지]](https://parceljs.org/)

- - -

## Install

```bash
  yarn global add parcel
  yarn add react # 또는 npm install react
  yarn add react-dom # 또는 npm install react-dom
```

- - -

## Init

1. index.html 작성
2. index.jsx 작성
3. App.jsx 작성

- - -

## Run

```bash
parcel ./src/index.html # 또는 스크립트 작성 후 yarn start
```

- - -

## 특징

- - -

## Hot Reloading

자동으로 적용되어 있음

- - -

## Sass

scss 파일이 있으면 parcel이 알아서 적용해줌

## TypeScript

`yarn add -D @types/react @types/react-dom typescript`

tsconfig을 작성하면 typescript는 설치해주긴 함

- - -

### Caching

`--no-cache`

빌드된 내용은 캐시에 저장해 다음 번에 빌드할 때 시간을 줄임

### Lazy Mode

`--lazy`

전체 빌드 과정 없이 그때그때 필요한 부분만 빌드해서 개발할 때 빌드시간 단축

- - -

### HTTPS

`--https`

`https://localhost:1234`로 실행함

이 상태로 진행하면 크롬에서 unsafe하다고 경고창을 띄우는데,
명령어에 추가적인 옵션을 붙여 로컬에 있는 인증서 파일을 연동할 수도 있음

- - -

## Build

실행하면 알아서 `.dist` 생김

`parcel build ./src/index.html`하면 조금 더 최적화된 파일로 빌드

- - -

## Bundle Analyze

`parcel build src/index.html --reporter @parcel/reporter-bundle-analyzer`

웹팩에 있는 그거

![bg right:50% 100%](https://parceljs.org/bundle-analyzer.5dffa65d.png)

- - -

## 장단점 정리

- - -

## **장점**

- 알아서 해주는 게 많음
- 가볍고, 빠름
- 빌드 / 실행 옵션이 굉장히 다양

- - -

## **단점**

- 뭐가 어떻게 돌아가고 있는지 모르겠음
- **parcel**이 알아서 이것저것 찾아주는 모듈들이 버전이 안맞을 수 있음
- CRA에 비해, `index.html` `index.tsx`를 직접 작성해야하는 번거로움
- 생각보다 `package.json`에 각박

- - -

## parcel-bundler는 **deprecate** 되었다

- - -

## **끝**

- - -

## 참고 자료

생각보다 한글 자료가 얼마 없음
[공식 문서](https://parceljs.org/)가 친절하지는 않지만 잘 되어 있음
대부분의 오류는 킹갓 오버플로우 및 [깃헙 레포의 이슈 탭](https://github.com/parcel-bundler/parcel/issues)에서 해결

### Nomad Coder

2018년 강의로, 강의 사이트에서는 이미 404이고 유튜브에서 하나하나 발굴함
4년전 정보라서 그렇게 유용한 내용은 없었음

- [#1 Parcel What and Why](https://www.youtube.com/watch?v=Xe3aQx9nx4Y)
- [#2 Hello world with Parcel](https://www.youtube.com/watch?v=ZNCADEw21Dw)
- [#3 React and ES6 with Parcel](https://www.youtube.com/watch?v=gRR9xvT8uDo)
- [#4 CSS Modules And SCSS with Parcel](https://www.youtube.com/watch?v=88vpOi9PyZk)
