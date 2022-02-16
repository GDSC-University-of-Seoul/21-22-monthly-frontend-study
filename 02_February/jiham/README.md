# Counter by Redux

상태 관리 도구 Redux를 사용해서 Counter를 만들어보았습니다.

Redux를 간단히 정리하자면, Redux는 `Store`에 `Action`(상태 정보를 가진 객체)를 넣어 두고 `Action`이 `Dispatch` 되었을 때 `Reducer` 함수를 이용하여 상태를 변화시킵니다.

## Action

`Store`에서 상태 변화를 일으킬 때 참조하는 객체이고, 반드시 `type` 값을 가지고 있어야 합니다. `Action`은 액션 생성 함수를 이용하여 만듭니다.

## Reducer

상태에 변화를 일으키는 함수로써 이전 상태와 `Action`을 합쳐서 새로운 상태를 만듭니다. `switch`문을 사용해서 `action.type`에 따라 새로운 상태를 만들어서 반환합니다.

## Store

`Store`에서 모든 상태 관리가 일어납니다. 하나의 앱에는 하나의 `Store`를 만들어서 사용합니다.

## Dispatch

`Action`을 `Store`에 전달하는 것을 의미합니다.
