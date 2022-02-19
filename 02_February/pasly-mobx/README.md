# Try MobX

MobX는 Redux, Recoil과 함께 React에서 많이 사용되는 상태 관리 라이브러리입니다. MobX는 그 중에서도 가장 미니멀하고 가장 쉽다고 생각되는 상태관리 라이브러리입니다. OOP 기반 상태관리 라이브러리기에 공식 예제에도 class를 활용하여 적응이 조금 어려울 수는 있으나 익힌다면 쉽고 간단한 상태관리를 통해 코드 구조를 더욱 직관적으로 만들 수 있을 겁니다. 그럼 MobX에 대해서 설명을 시작해보도록 하겠습니다.

## MobX 기본

MobX 역시 다른 상태관리 라이브러리와 마찬가지로 비슷한 구조를 가지고 있습니다. 크게 MobX에는 4가지가 있습니다. 이는 Action, observable, computed values, slide effects가 되겠습니다.

- observable, action

```javascript
import { observable, action } from 'mobx';

const appState = observable({
  count: 0,
  decrement: action(function () {
    appState.count -= 1;
  }),
  increment: action(function () {
    appState.count += 1;
  }),
});
export default appState;
```

상태관리란 말 그대로 상태를 관리하는 것입니다. 전역적으로 관리해야할 상태를 다루는 것이고 그러한 것을 MobX에서는 observable이라고 부르게 됩니다. MobX에서 감시하는 상태인 것입니다. 이러한 상태는 일반적인 컴포넌트에서 사용하는 것이 아니라 이제 전역적으로 사용이 가능하기에 이 로직과 state(observable)을 빼서 단독으로 존재하도록 하게 하고 이러한 공간을 대개 Store라고 부릅니다. MobX의 특이점은 다른 상태관리 라이브러리의 경우 이러한 Store에 대한 제약을 두는 편(redux의 경우 Store를 하나만 가질 수 있음)이지만 이에 반해 MobX는 여러 개의 Store를 가질 수 있고 또 서버 개발자들에게 친숙한 JAVA의 OOP를 중점으로 한다는 것 역시 다른 점이 될 수 있겠습니다만 이러한 차이에 대해서는 추후 더 자세하게 다뤄보도록 하겠습니다. 이러한 상태관리의 대상이 되는 상태를 어떻게 수정할 수 있을까요?? 상태관리의 대상이 되는 상태를 아무렇게나 접근해서 편한 방식대로 바꿔버릴 수 있다면 이는 상태 관리로서의 신뢰도가 상당히 떨어지게 될 것입니다. 이러한 상태를 변경시킬 수 있는 유일한 방법은 Action입니다. 위의 경우 observable은 count이고 action은 decrement, increment입니다. 이 두 가지 방법을 통해서만 상태를 변경시킬 수 있는 것입니다.

- computed values

computed values란 이제 observable을 통해 자동으로 계산되는 값이라고 보면 되겠습니다.

```javascript
import { makeObservable, observable, computed, action } from 'mobx';

class Doubler {
  value;

  constructor(value: number) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
    });
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    this.value++;
  }
}

const doubleClass = new Doubler(1);
export default doubleClass;
```

위의 예시에서는 이제 observable의 2배인 double을 computed value로 삼았고 이러한 computed value는 observable이 수정됨에 따라서 자동으로 값이 변환되게 됩니다. 이는 observable로부터 값을 자동으로 도출하는데 사용이 가능합니다.

- slide effects

slide effects는 간단한 내용입니다. 이러한 observable을 사용하는 컴포넌트가 observable의 변화에 따라 리렌더링 되는 것입니다. 코드로 한 번 살펴보겠습니다.

```javascript
import React from 'react'
import { observer } from 'mobx-react'
import store from './store'

// 컴포넌트를 observer로 감싸주어 state가 실시간으로 변경되는 것을 감지합니다.
const App: React.FC = observer(() => {
  const { countClass, countObject } = store

  return (
    <div style={{ padding: '50px' }}>
      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Class)</h1>
        <div>number: {countClass.number}</div>
        <button onClick={() => countClass.increase()}>plus</button>
        <button onClick={() => countClass.decrease()}>minus</button>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <h1>Count (Object)</h1>
        <div>num: {countObject.num}</div>
        <button onClick={() => countObject.increase()}>increment</button>
      </div>
    </div>
  )
})

export default App
// export default observer(App) // 이렇게 감싸줄 수도 있습니다.
```

observer로 감싸어 변화를 감시하고 이를 통해 적절한 리렌더링을 일으킵니다. 이러한 요소들을 통해 MobX는 전역적인 상태 관리를 이루어냅니다.

- MobX의 장단점

1. 장점
 장점이라 한다면 무엇보다도 가장 큰 것은 간단함일 것입니다. MobX는 Redux보다 훨씬 간단합니다. Redux를 사용하다 보면 Redux로만 끝나지 않고 필연적으로 redux saga, 등등 여러 가지 선택의 기로에 서게 됩니다. 이것 뿐만이 아니라 단지 기본의 Redux를 사용하더라 하더라도 mapDispatchToprops 등 MobX와는 달리 복잡한 방법을 사용하여야 같은 결과를 도출할 수 있습니다.
 두 번째로는 Store입니다. Redux를 사용해보시면 알겠지만 Redux는 하나의 Store만을 사용할 수 있고 이로 인해 다양한 것들을 하나의 Store에 우겨넣어야 하는 단점이 있습니다. 이에 반해 MobX는 이러한 제약이 존재하지 않아 원하는 곳에 자유롭게 나누어 Store를 적용할 수 있습니다.

2. 단점

간단명료한 장점에도 불구하고 확실한 단점이 존재합니다.

첫 번째로는 이렇다할 디버깅 툴이 없다는 것입니다. Redux만 하더라도 훌륭한 디버깅 툴 Redux Devtools가 있고 이를 비롯하여 Redux Saga, thunk 등의 훌륭한 미들웨어들이 존재합니다. 그러한 것에 비해 MobX는 이러한 상태를 추적하려면 일일히 콘솔에 찍어보든지 해야합니다. 또한 Redux에 비견될 훌륭한 미들웨어도 없습니다. 아마 이는 MobX의 생태계가 상대적으로 얕고 좁기 때문으로 보입니다.

두 번째로는 코드가 더러워지기 쉽다는 것입니다. MobX가 Redux보다 코드가 적어져서 오히려 보기 쉬울텐데, 어째서 코드가 더러워지기 쉬운건지 의문일 수 있습니다.MobX가 Redux보다 코드가 적은 것은 사실이지만, MobX를 사용하다보면 이렇다할 구조를 잡지않고 개발하게 될 위험이 큽니다. Redux같은 경우에는 Ducks 패턴을 따르면서 reducer, action 등을 체계적으로 분리해서 개발해야하지만, MobX는 그렇지 않기 때문입니다. 처음에는 괜찮지만, 시간이 흐르면서 MobX가 코드를 관리하기에 어려워지는 것을 체감할 수도 있습니다. 다른 스토어에 접근할 경우가 점점 많아지면 코드가 더욱 더러워질 것입니다.
추가적으로 MobX가 데코레이터로 편하게 사용할 수 있다고 하지만, 가끔은 이게 독이 되는 경우가 많습니다. 때로는 Redux에서 mapDispatchToProps 등을 사용해서 스토어와 컴포넌트를 연결해주는 것이 큰 프로젝트에서는 더 명확하고, 안전한 방법일 수 있기 때문입니다.
또한, 이번에 redux-observable을 비견되는 장점은, action, reducer, epic이 완전히 분리되면서 비즈니스 로직이 MobX를 사용할 때보다 더 명확하게 분리될 수 있었다는 것입니다.
