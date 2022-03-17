import { Link } from 'react-router-dom';
import './Error404.css';

function Error404() {
  return (
    <div className='container'>
      <h2>Error 404</h2>
      <p>Page not found</p>
      <Link to="/">
        <button>Go home</button>
      </Link>
    </div>
  );
}

export default Error404;
