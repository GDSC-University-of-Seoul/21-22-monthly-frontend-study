import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseNum, decreaseNum } from "../modules/counter";

const CounterContainer = () => {
  const count = useSelector((state) => state.num);
  /* useSelector란, connect 함수를 이용하지 않고 리덕스 스토어의 상태값을 조회하기 위한 Hook 함수이다 */

  const dispatch = useDispatch();
  /* useDispatch는 action을 발생시키기 위한 함수로써,  파라미터로 import 해온 액션생성함수를 받는다. 스토어의 dispatch를 함수에서 사용할 수 있게 해주는 Hook이다 */

  return (
    <div>
      <h1>Counter by Redux</h1>
      <div className="count">{count}</div>
      <button onClick={() => dispatch(increaseNum())}> +1 </button>
      <button onClick={() => dispatch(decreaseNum())}> -1 </button>
    </div>
  );
};

export default CounterContainer;
