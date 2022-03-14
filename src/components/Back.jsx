import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../../src/assets/back.svg';

function Back() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(-1)}>
      <BackIcon />
    </div>
  );
}

export default Back;