import { Link } from 'react-router-dom';

function Error404() {
  return (
    <div>
      <h2>Error 404</h2>
      <p>Server error</p>
      <Link to="/">
        <button>Go home</button>
      </Link>
    </div>
  );
}

export default Error404;
