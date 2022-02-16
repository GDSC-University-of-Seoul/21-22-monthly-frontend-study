# Recoil

![image](https://user-images.githubusercontent.com/42960217/154282214-b3558ddb-75b9-4ff4-9e55-551c02cba567.png)

## 사용법

### `<RecoilRoot />` 씌우기

```jsx
// App.jsx

import { RecoilRoot } from 'recoil';
import Counter from './Counter';

const App = () => {
  return (
    <RecoilRoot>
      <Counter />
    </RecoilRoot>
  );
}

export default App;
```

### atom 생성

```jsx
// store.js

import { atom } from 'recoil';

const numberState = atom({
  key: 'numberState',
  default: 1
});

export default numberState;
```

### hooks처럼 사용

```jsx
// Display.jsx

import React from 'react';
import { useRecoilValue } from 'recoil';
import numberState from '../store';
import { Span, Wrapper } from './style';

const Display = () => {
  const [count, setCount] = useRecoilState(numberState);
  return (
    <Wrapper>
      <Span>{count}</Span>
    </Wrapper>
  );
};

export default Display;
```

### 다양한 hooks

```jsx
const [count, setCount] = useRecoilState(numberState);
const count = useRecoilValue(numberState);
const setCount = useSetRecoilState(numberState);
```

### useRecoilState vs useSetRecoilState

- `useSetRecoilState`를 쓰는 이유
  - `useRecoilState`를 사용하면 value를 무조건 구독해야 함
  - 값을 보여주는 `<Display />`가 따로 있고, 값을 조작하는 `<Button />`이 따로 있는데, 버튼을 누르면 버튼도 같이 리렌더링이 일어남
  - 값과 상관 없이 값을 조작만 하는 컴포넌트라면 `useSetRecoilState`를 써서 리렌더링 방지하기

## 작동 방식

![image](https://user-images.githubusercontent.com/42960217/154282385-e57be9c2-4bea-4ac2-9147-3f07ec421166.png)

- 각각의 atom: 독립적인 Store
- Dom Tree 구조를 무시하기 때문에 Context API와 달리 연결된 컴포넌트들이 불필요하게 렌더링되지 않음

### 야, 너도 Recoil 만들 수 있어

```jsx
<div class="database" data-id="1" data-name="hello"></div>
```

```jsx
const div = document.querySelector('.database');
console.log(div.dataset);

// { id: '1', name: 'hello' }
```

```jsx
div.dataset.id = '2'; // setId('2');
```

## 단점

### 아직 정식 출시가 되지 않았다

![image](https://user-images.githubusercontent.com/42960217/154282465-753bfbf8-383e-47ed-afce-2736136b1892.png)

### selector

- atom은 독립적인 상태에, selector는 관계가 존재하는 상태에 적용
- 다른 상태가 update되면 자동으로 update
- 같은 uri에 대해 캐싱이 됨
- 이렇게 좋은 친군데 관리하기 어려움
