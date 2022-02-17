import { useNumberDispatch, useNumberState } from '../Context/Custom';
import { NumberDispatch, State } from '../Context/type';

const Header: React.FC = () => {
  const { number } = useNumberState() as State;
  const dispatch = useNumberDispatch() as NumberDispatch;

  const handleUpClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: 'UP', payload: number + 1 });
  };

  const handleDownClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: 'DOWN', payload: number - 1 });
  };

  return (
    <header className='header-container'>
      <h2> Welcome to Number Change with CONTEXT API</h2>
      <h3> {number} </h3>
      <div className='header-btn'>
        <button onClick={handleUpClick}>UP</button>
        <button onClick={handleDownClick}>DOWN</button>
      </div>
    </header>
  );
};
export default Header;
