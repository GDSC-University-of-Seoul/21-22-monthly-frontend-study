/* 모듈에는 액션 타입, 액션생성함수, 리듀서가 있고 서로 다른 파일에 저장할 수도 있지만 하나의 파일에 한꺼번에 작성할 수도 있다. 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성하는 것을 Ducks 패턴이라고 부른다 */

/* 액션 타입 정의 */
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

/* 액션 생성 함수: 반드시 'type'이 있어야 한다 */
export const increaseNum = () => {
  return { type: INCREASE };
};
export const decreaseNum = () => {
  return { type: DECREASE };
};

/* 리듀서의 초기상태 */
const initState = {
  num: 0,
};

/* 리듀서: 액션생성함수를 통해 새로운 상태를 만든다 */
export default function counterReducer(state = initState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        num: state.num + 1,
      };
    case DECREASE:
      return {
        ...state,
        num: state.num - 1,
      };
    default:
      /* 기존 state 반환 */
      return {
        ...state,
      };
  }
}
