# Vite

This is Vite + React-ts template examples

## How to start with vite?

```shell
# default vite + yarn
yarn create vite

# vue + yarn
yarn create vite my-vue-app --template vue

# react + yarn
yarn create vite my-react-app --template react

# react-ts + yarn
yarn create vite my-react-app --template react

```

## Why vite?

- HMR(Hot Module Replacement)과 같이 기본 ES 모듈에 비해 향상된 기능 제공

- Production을 위해 최적화된 static resource를 출력하도록 미리 구성된 Rollup 과 코드를 번들로 묶는 빌드 과정

- esbuild를 활용하여 번들링

- 그렇지만, esbuild 단점 극복

- prod 번들링은 rollup 을 이용함. (code 분할, css 처리 미흡)

## vite.config.ts

### Default Vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
```

### Option for production

기본적으로, dev 명령으로 실행되는 개발 서버는 development 모드로 동작하고, build 명령으로 실행되는 경우에는 production 모드로 동작

Production으로 앱을 배포할 때 `vite build` 를 사용하기만 하면 됌

기본적인 Rollup 옵션을 직접적으로 조정할 수 있음

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
    },
  },
});
```

### Option for Library

Library build Option을 따로 지정할 수 있음

```typescript
// vite.config.ts
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'MyLib',
      // the proper extensions will be added
      fileName: 'my-lib',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
```

## Feature of Vite

- 사전 번들링 된 디펜던시

  - CommonJS 그리고 UMD 모듈을 ESM으로 가져오기

  - ESM 모듈을 하나의 모듈로 변환하여 페이지 로드에 대한 퍼포먼스를 향상
