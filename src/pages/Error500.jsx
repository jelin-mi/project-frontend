import { Link } from 'react-router-dom';
import image from '../assets/dog.jpg';

function Error500() {
  return (
    <div>
      <img src={image} alt="" />
      <h2>Error 500</h2>
      <p>Server error</p>
      <Link to="/">
        <button>Go home</button>
      </Link>
    </div>
  );
}

export default Error500;
