# Context API로 상태관리를 해보자 😁

이번 테크톡은 전역적으로 상태관리를 하는 방식에 대해서 다룹니다!

해당 레포는 전역적으로 상태를 관리하는 방법 중 리액트 자체에서 제공하는 Context API를 사용해서 다루어 보는 법을 알려드리려고 합니다.

## Context API가 뭔데요?

일반적인 React 애플리케이션에서 데이터는 위에서 아래로 (즉, 부모로부터 자식에게) props를 통해 전달됩니다(props drilling).

애플리케이션 안의 여러 컴포넌트들에 전해줘야 하는 props의 경우 이 과정이 번거로울 수 있습니다.

Context API를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있습니다.

쉽게 풀어서 얘기하자면, 위에서 아래로 주면서 props가 너무 많이 전달되는 현상을 없애기 위해서 나왔다고 할 수 있습니다.

### 언제 Context API를 사용하면 좋을까요?

컴포넌트의 계층적인 관계가 너무 많거나, 너무 많은 데이터를 전달하는 경우 데이터를 전달하는 법이라고 리액트에서 명시합니다.

그러나 Context API를 사용하게 된다면 **재사용**하기가 어려워지므로 꼭 필요할 때만 쓰길 권장드립니다 :)

## 실제 사용법

### Context

전역적으로 사용할 수 있는 하나의 장치를 만들어야 합니다. 해당 부분은 전역적으로 사용해야 할 수 있으므로, 필요한 컴포넌트들의 레벨을 고려해서 사용하는 것이 좋겠죠?

```javascript
const Context = createContext(defaultValue);

<Context.Provider value={number}>{children}</Context.Provider>;
```

의 방식으로 사용한다면 `children`에 해당하는 컴포넌트들은 전역적으로 `number`를 가져다 쓸 수 있습니다.

그렇다면 사용해야 할 컴포넌트, 즉 children 가장 최소 공통 부모에 적용시키는 것이 좋습니다.

### Context API로 리덕스처럼 응용을 해보자 😎

해당 방식을 응용하면 리덕스와 비슷하게 사용할 수 있습니다.

```javascript
const DispatchContext = createContext(defaultDispatch);
```

의 방식으로 `dispatch`또한 전역적으로 가져다 쓸 수도 있습니다.

위에 있는 코드와 합치게 된다면 해당 방식으로 적을 수 있습니다.

```javascript
const [number, dispatch] = useReducer(numberReducer, defaultState);

<Context.Provider value={number}>
  <DispatchContext.Provider value={dispatch}>
    {children}
  </DispatchContext.Provider>
</Context.Provider>;
```

이처럼 Context API를 겹겹이 쌓아서도 사용이 가능합니다.

### Context API의 단점은 뭔가요?

Provider 컴포넌트는 value prop을 받아서 하위 컴포넌트에게 전달합니다. 그렇다면 value가 업데이트 되었을 때 리렌더링 되어야 하는 것들은 어디까지 리렌더링이 될까요? value를 직접적으로 쓰고 있는 Component?

실제로는 모든 컴포넌트가 다시 리렌더링이 됩니다.

Provider로부터 하위 consumer로의 전파는 `shouldComponentUpdate`메서드가 적용되지도 않고, 상위 컴포넌트가 업데이트를 건너 뛰더라도 consumer가 업데이트 됩니다.

그래서 전역적으로 상태관리라는 측면보다는, 전역적으로 상태를 사용할 수 있다. 정도가 제일 적합하지 않을까라고 생각이 듭니다.
