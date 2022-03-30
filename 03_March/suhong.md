이번에 프로젝트를 새로 시작하면 Next.js를 처음 사용해보게 되었습니다. Next.js란 어떤 것이고 어떻게 시작하는지 차근차근 알아보았습니다!

## Next.js란

----

[Next.js](https://nextjs.org/)

**Next.js**는 Vercel에서 만든 SSR(서버 사이드 렌더링)을 위한 **React 프레임워크** 입니다 .

SSR은 초기 렌더링 속도가 빠르고 검색 엔진 최적화가 가능하다는 장점이 있지만, 간단한 데이터 수정에도 서버를 거쳐야하기 때문에, 매번 서버에 요청을 하는 행위는 서버에 많은 부하를 주게 됩니다.

사용자가 초기에 서버에 페이지 접속을 요청한 경우 SSR방식으로 렌더링 될 HTML을 보내주고, Link 라이브러리를 통해 클라이언트 사이드 렌더링 방식으로 페이지 이동을 함으로써 SPA의 장점도 갖추었습니다.

----

### Next.js 사용법

#### 설치
`npx create-next-app@latest`
`yarn create next-app`

Typescript로 시작하고 싶다면 `--typescript`를 뒤에 추가해줍니다.

설치를 하게되면 `react`, `react-dom`, `next` 등 기본적으로 의존성이 있는 모듈들이 설치가 됩니다. 이후 `npm run dev` 또는 `yarn dev` 명령어를 입력하면 local 3000번 포트에서 실행이 됩니다.


#### `_app.tsx`
```jsx
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```
최초로 실행되는 `_app.tsx` 입니다. 실행되면서 내부에 컴포넌트가 있다면 전부 실행하고 html의 body로 구성합니다.


#### Link
Next.js에서 페이지는 파일 이름에 따라 경로와 연결됩니다.

예를 들어, 
`pages/index.js`는 `'/'`와 연결이 되고,
`pages/posts/first-post.js`는 `'/posts/first-post'`와 연결됩니다.

```jsx
import Link from 'next/link'

export default function FirstPost() {
  return (
    <>
      <h1>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h1>
    </>
  )
}
```
Next.js에서는 원하는 a 태그에 링크를 걸어서 href형식으로 주게 됩니다.

#### 동적 Routes
`pages/post/[pid].js`와 같이 파일명에 `[]`를 넣음으로써 동적인 url을 만들 수 있습니다.

```jsx
import { useRouter } from "next/router";

const Post () => {
  const router = useRouter();
  const { pid } = router.query;
  return (
    <>
      <p>id: {pid}</p>
    </>
  );
};
```
`qeury` object에는 `{"pid": "abc"}`와 같이 담기게 됩니다.

`'/page/post/abc?foo=bar'`와 같은 경로에서는 `qeury` object에 `{"foo": "bar", "pid": "abc"}`와 같이 담기게 됩니다.
같은 이름의 `query parameter`에 대해서는 override 될 것입니다.

#### css
css 파일의 이름을 `.module.css`와 같은 확장자명으로 만들면 다음과 같이 모듈 사용이 가능합니다.

```css
/* index.module.css */
.title {
    text-align: center;
}
```
```jsx
//index.js
import styles from './index.module.css';

export default function Home() {
  return(
    <>
      <h1 className={styles.title}></h1>
    </>
  )
};
```
Next.js에서 `.scss`, `.sass` 확장자를 통해 Sass를 사용할 수도 있습니다.

이 역시 `.module.sass`처럼 css 모듈 방식의 사용도 가능합니다.

---
[Next.js Documents](https://nextjs.org/docs/getting-started)

Data Fetching 등 Next.js에 대한 더 많은 내용에 대해 궁금하다면 위에 Next.js Documents에서 확인하실 수 있습니다!