# CRA 대신 Webpack 한 입 어때요?

## 1. Webpack를 통한 bundler + react 설정

### 1.1 Wepback이란?

---

일단 간단하게 이야기하자면 웹팩은 모듈 번들러입니다. 여기서 모듈이 무엇이고 번들러란 무슨 말일까요? 일단 아주 간단하게 모듈에 대해서 이야기해보자면 모듈은 분리된 파일입니다. 예를 들어 우리는 React를 통해 웹을 구성할 때 Router나 Component, Style 등 수많은 파일들을 사용합니다. 이러한 파일들을 통해 웹을 구성하고 사용자가 브라우저를 통해 우리가 만든 웹을 보고자 한다면 이러한 각각의 파일들을 가지고 있어야 하고 이를 위해 브라우저는 HTTP 통신을 통해 각 파일들, 모듈들을 받아옵니다. 이 때, 주목할 점은 HTTP 통신은 그렇게 효율적이지 못하다는 점입니다. 그렇기에 우리가 만든 파일들을 각각 다 받는다면 이는 굉장히 긴 시간을 소모할 것입니다. 그렇기에 이러한 파일들을 묶어서 보낼 번들러가 필요합니다. 웹팩은 우리가 만든 자바스크립트, 스타일 시트 등을 모듈로 여기고 이들을 묶어서 최소한의 HTTP 통신을 통해 웹이 작동하도록 해줍니다.

이러한 웹팩에는 핵심이 되는 속성이 4가지가 있습니다.

1.Entry

entry는 웹팩에서 웹 자원을 변환하기 위해 필요한 최초의 진입점이자 자바스크립트 파일 경로입니다. 웹팩은 entry를 통해 모듈을 로딩하고 하나의 파일로 묶습니다.

2.Output

entry를 통해 찾은 모듈들을 웹팩으로 묶은 결과물을 반환할 위치입니다.

3.Loader

웹팩은 기본적으로 자바스크립트와 JSON만 빌드할 수 있습니다. 자바스크립트가 아닌 자원들(HTML, CSS, Image)를 빌드할 수 있도록 도와주는 속성입니다.

4.Plugin

plugin은 웹팩이 기본적으로 제공하는 기능 외에 추가적인 기능을 제공하는 속성입니다. loader는 파일을 해석하고 변환하는 과정에 관여하고 plugin은 결과물의 형태를 바꾸는 역할을 합니다.

### 1.2 Babel이란?

---

> Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

바벨은 주로 ECMAScript 2015+ 코드를 현재 및 과거의 브라우저와 같은 환경에서 호환되는 버전으로 변환하는데 주로 사용하는 도구입니다. JS의 문법은 계속 새로운 것들이 추가하며 변화하고 있습니다.

하지만 브라우저들은 이러한 변화를 즉각적으로 반영할 수 없습니다. 하지만 그렇다고 새로운 문법들을 사용하지 못하는 것은 너무 아쉽습니다. 추가적으로 이러한 것을 생각하자면 각 브라우저별로 다르게 반영되고 있는 것들도 고려해야 합니다. 이러한 불편함을 해결하기 위해 나온 것이 Babel입니다. Babel은 브라우저가 이해할 수 없는 최신 문법들을 추상화 수준을 유지한 채 브라우저가 읽을 수 있는 이전 버전의 코드로 변화시킵니다.

### 1.3 실제 설정

---

1.작업 폴더 만들기

작업할 폴더를 만듭니다.

2.바벨 설정

바벨을 위한 패키지를 구성하며 바벨은 개발 단계에서만 사용되기에 -D를 추가하여 devDependencies로 추가합니다.

```shell
yarn add -D @babel/core @babel/preset-env @babel/preset-react
```

추가적으로 babel과 관련된 설정 파일 .babelrc를 만들고 아래의 코드들을 추가합니다.

```shell
{
    "presets" : [
        "@babel/preset-env",
        "@babel/preset-react"
    ]
}
```

이렇게 진행을 마쳤다면 babel의 기본적인 설정은 끝이 났습니다.

3.웹팩 설정

이제 웹팩을 사용하기 위한 패키지를 설정해보겠습니다.

```javascript
yarn add -D webpack webpack-cli webpack-dev-server
// webpack: 모듈 번들러인 웹팩, webpack-cli: 웹팩의 커맨드 라인 인터페이스, webapck-dev-server: 개발 서버 제공

//webpack.config.js 
//module.export = {} 부분에서 웹팩을 설정합니다.
module.exports = {
    mode: 'development', // 현재 모드를 개발 환경으로 설정
    entry: './src/index.js' or './src/index.tsx', // 웹팩의 코어 중 하나인 entry로 Application 진입점을 의미합니다.
    output: { // 웹팩 코어 중 하나로 번들될 파일을 저장할 경로를 나타냅니다.
        filenem: 'bundle.[hash].js' // 번들된 파일의 이름을 나타냅니다. [hash]는 application이 컴파일 될 때 웹팩에서 생성한 해시를 사용합니다.
    }
}
```

다음으로 loader에 대해서 살펴보겠습니다.

```javascript
yarn add -D babel-loader html-loader
// babel-loader : es6를 es5로 바꿔주는 바벨을 웹팩에서 사용할 수 있게 해줍ㄴ디ㅏ
// html-loader : 웹팩이 html을 읽을 수 있게 해줍니다

// loader는 module과 rules라는 키워드를 사용하며 해당 내용은 webpack.config.js에 포함됩니다.

module.exports = {
    // ...

    module: {
        { // es6 바벨 관련 loader로 .js, .jsx, .ts, .tsx 확장자를 번들하며 node_modules 안에 있는 파일은 번들에서 제외합니다.
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      { // html loader로 minimize : true는 코드 최적화를 진행하는 옵션입니다.
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    }
}
```

다음으로 plugin에 대해서 소개하겠습니다.

```javascript
yarn add -D html-webpack-plugin
// html-webpack-plugin은 html 관련 plugin입니다.

//이 또한 webpack.config.js에 내에 정의됩니다.
module.exports = {
    // ...

    module: {
        // ...

        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            })
        ]
    }
}

```
