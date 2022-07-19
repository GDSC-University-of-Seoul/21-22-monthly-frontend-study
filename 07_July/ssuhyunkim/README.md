# esbuild 알아보기

## INTRO

`esbuild`는 새롭게 떠오르는 웹 기술입니다. `esbuild`의 개발자이자 Figma의 공동창설자인 Evan W는, `esbuild`는 웹을 위한 연결고리(linker)라고 표현을 했습니다. 
또한 `esbuild`를 실제로 사용해본 개발자들은 `esbuild`가 곧 `webpack`의 대체재가 될 것이라고 이야기하고 있습니다. 
`esbuild`의 등장이 웹 생태계에 어떤 변화를 가져올 지, esbuild가 가진 강점이 무엇인지 차근차근 알아보겠습니다.

## esbuild란?

`esbuild`는 `javaScript` 번들을 빠르게 읽을 수 있는 CLI, NPM package 입니다. 
`Go`와 `javascript` / `typeScript`로 개발되었으며 2020년 초에 처음 출시되었습니다. 
`esbuild`는 잘 짜여진 documentation과 쉬운 CLI 환경을 갖추고 있으며 결과적으로 매우 빠릅니다.

> 그렇다면 `esbuild`를 무엇에 사용할 수 있을까요?

먼저 자바 스크립트와 `CSS` 등을 배포가능한 형태로 링크할 수 있습니다. 
그리고 번들링 또는 코드 분할, 플러그인 등을 사용가능하고, `esbuild`의 핵심 기능이라고 할 수 있는 부분컴파일, 감시 모드 및 서비스 모드 등 의 기능을 사용가능합니다.

## esbuild의 기능

1.Bundling & Code-spliting

`javaScript` 및 `CSS` 소스를 번들링하거나 코드 분할 할 수 있습니다.

번들링은 단일 app.js대상 을 배포하려는 경우에 사용됩니다.
코드 분할은 메인 파일인 app.js를 Sidebar.js, Header.js등의 파일로 세분화하는 방법이며 ES 모듈을 지원합니다.

2.Plugins

Plugin API를 사용하면 빌드 과정에서 다양한 부분에 코드를 주입할 수 있습니다. 플러그인은 `Markdown`을 `HTML`, `JSX`로 변환하거나, `Sass`를 `CSS`로 변환하려는 경우 매우 유용하게 쓰입니다. 
다른 API와는 달리 command line에서는 사용할 수 없고 `javaScript` 또는 `Go` 코드를 별도로 작성해야 합니다.

3.부분 컴파일 (Incremental Compilation)

코드가 변경 될 때, 같은 파일을 반복적으로 컴파일해야하는 경우, 부분 컴파일을 사용하면 성능 저하없이 효율적으로 빌드를 수행 할 수 있습니다. 
이는 `esbuild`가 변경된 소스에 대해서만 작업을 수행하기 때문입니다.

4.Watch mode
Watch mode는 `esbuild`가 소스 코드의 변경 사항을 바로 인식해서 결과에 반영할 수 있음을 뜻합니다.
nodemon 또는 chokidar 와 같은 라이브러리의 기능을 `esbuild `자체에서 가지고 있기때문에 부가적인 툴을 다운받을 필요가 없으며 watch mode를 사용하지 않는 경우 기능을 끌 수도 있습니다. 
또한 커스텀된 watch mode도 만들 수 있습니다.

5.Serve mode

Serve 모드는 `esbuild`를 웹 서버로 사용하고 들어오는 요청에 대한 자체 서비스 핸들러를 구현하여 이벤트를 관찰하고 기록하는 등의 작업을 수행 할 수 있음을 의미합니다. 
`esbuild`는 실제로 디스크가 아닌 메모리에서 번들 또는 코드 분할 대상을 제공합니다. 
이것은 요청 당 필요한 총 작업량을 줄이므로 `esbuild`는 믿을 수 없을 정도로 성능이 뛰어난 웹 서버가됩니다.

# esbuild 사용해보기

1.`esbuild` 설치하기

먼저 `esbuild `명령을 로컬로 다운로드하여 설치합니다. 
npm을 사용하여 미리 빌드된 기본 실행 파일을 설치할 수 있습니다.

```shell
npm install esbuild
```

2.첫번째 번들

`react` 및 `react-dom` 패키지를 설치 합니다.

```shell
npm install react react-dom
```

그런 다음 다음 코드가 포함된 app.jsx 라는 파일을 만듭니다.

```javascript
// app.jsx
import * as React from 'react'
import * as Server from 'react-dom/server'

let Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />))
```

마지막으로 esbuild에게 파일을 번들로 묶으라고 지시합니다.

```shell
./node_modules/.bin/esbuild app.jsx --bundle --outfile=out.js
```

3.Build scripts

```json
// pacakge.json
{
  "scripts": {
    "build": "esbuild app.jsx --bundle --outfile=out.js"
  }
}
```

빌드 스크립트는 다음과 같이 호출할 수 있습니다.

```shell
npm run build
```

## reference

[[프론트엔드 101] esbuild](https://velog.io/@joyact/esbuild)  
[esbuild 0.14 [한국어]](https://runebook.dev/ko/docs/esbuild/getting-started/index)  
[esbuild](https://esbuild.github.io/getting-started/)
