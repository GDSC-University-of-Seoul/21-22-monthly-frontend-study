import { useNumberDispatch } from '../Context/Custom';
import { NumberDispatch } from '../Context/type';

const Footer: React.FC = () => {
  const dispatch = useNumberDispatch() as NumberDispatch;

  const handleZeroClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    dispatch({ type: 'ZERO', payload: 0 });
  };

  return <button onClick={handleZeroClick}>Make Zero</button>;
};

export default Footer;
