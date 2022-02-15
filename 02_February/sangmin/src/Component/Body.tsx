import { useNumberState } from '../Context/Custom';
import { State } from '../Context/type';

const Body: React.FC = () => {
  const { number } = useNumberState() as State;

  return (
    <div className='body-container'>
      <h2> Body </h2>
      <h3> {number} </h3>
    </div>
  );
};

export default Body;
