import { Link } from 'react-router-dom';
import './Error404.css';

function Error404() {
  return (
    <div className="bg-error">
      <div className="container error">
        <h1>Error 404</h1>
        <p>Page not found</p>
        <button>
          <Link to="/">Go home</Link>
        </button>
      </div>
    </div>
  );
}

export default Error404;
