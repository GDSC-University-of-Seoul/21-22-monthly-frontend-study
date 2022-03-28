# [React] react-hooks/exahaustive-deps 린트를 지켜보자

리액트 훅에서 종속에 관한 린트 경고 `react-hooks/exahaustive-deps` 가 있습니다.

개발을 하다가 보면 "이런 것도 넣어야 해?" 라는 생각에 의해서 넣지 않고 싶은데 노란 줄의 경고가 심히 거슬리는 경우가 종종 생깁니다.

경고가 거슬려서 배열에 종속을 추가했을 때, 무한 재렌더링 또는 원하지 않은 동작으로 끝나는 경우가 생깁니다. 그래서 이 종속을 안 넣는게 맞지 않나? 라는 생각을 할 수 있습니다.

그 외에도 자신이 생각했을 때 변하지 않는 정적인 값을 종속으로 넣지 않으려고 하거나, 아니면 생명주기 상으로 특정값일 때만 렌더링이 되는 것을 원해서, 혹은 다른 이유에 의해서 아래와 같이 사용하는 경우도 있습니다.

```javascript
useEffect(() => {
  setCount(count + 1);
  // eslint-disable-next-line.
}, []);
```

위와 같은 코드는 단기적으로 보면 효과적입니다. 그러나 경고를 비활성화하는 것보다는 Lint 를 충족하는 방법을 찾는 것이 중요합니다.

해당 코드를 리팩토링 하거나, 기능을 추가해야 하는 경우 미래의 종속에 대한 경고를 포기하게 되거나 변수가 변경되었을 때 Virtual DOM 이 제대로 감지를 못하는 경우가 생길수도 있습니다.

특히 class에서 function 컴포넌트로 넘어오면서 생명주기가 완벽하게 대응이 되는 것이 아니기 때문에 주의해야 하는 경우가 있습니다.

그래서 Lint 는 웬만하면 지키는 것이 좋습니다. 아래와 같이 Lint 를 깔끔하게 처리해 봅시다.

## Stateful dependency

내부에 접근하는 상태가 있어서 useEffect 의 종속으로 추가해야 했던 방법은 다음과 같이 콜백 함수를 통해서 해결할 수 있습니다.

```javascript
useEffect(() => {
  setCount((prev) => prev + 1);
}, []);
```

### Function dependency

아래와 같이 함수를 추가해야 하는 경우도 있습니다.

```javascript
const arrFn = (count) => {
  // do something
};

useEffect(() => {
  arrFn(count);
}, [count]); // Lint Error, recommend add arrFn in dependency of useEffect
```

그러나 arrFn에 종속을 단순하게 추가해버리면 함수는 각 렌더에 대해서 참조가 서로 다르기 때문에 무한 루프라 발생할 수 있다고 경고를 받습니다.

그리고 실제로 구동해보면 무한루프에 의해서 웹 사이트가 느린 모습을 볼 수 있습니다.

디펜던시 Lint 를 지키려고 하면 다른 Lint 가 뜨고, 오류가 발생하기 때문에 어느 장단에 맞춰야 하는지 잘 모를 수도 있습니다.

이러한 경우에는 `useCallback` 함수를 사용할 수 있습니다. 해당 훅을 이용하여 arrFn 이 렌더링 간에 참조를 변경하지 않도록 하게 만들어 줍니다.

```javascript
const arrFn = useCallback((count) => {
  // do something
}, []);

useEffect(() => {
  arrFn(count);
}, [count, arrFn]);
```

혹은 useEffect 내부에서 함수를 정의해도 됩니다. 그러나 해당 방법은 함수가 많아지면 많아질수록 가시성이 떨어지고, useEffect 내부에서 어떻게 동작하는지 파악하기가 어려워지기도 합니다.

```javascript
useEffect(() => {
  const arrFn = (count) => {
    // do something
  };
  arrFn(count);
}, [count]);
```

### Basic comparision

렌더링이 원하는 대로 않는 등 필요한 경우에는 useEffect 를 빠르게 끝내 해결하는 방법도 있습니다.

```javascript
useEffect(() => {
  if (post.id === undefined) {
    return;
  }
  arrFn(post);
}, [post]);
```
