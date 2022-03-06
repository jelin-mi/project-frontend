import { Link } from 'react-router-dom';
/* import { useContext } from 'react';
import { AuthContext } from './../context/auth.context'; */

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop

  /* const { isLoggedIn, user, logOutUser } = useContext(AuthContext); */

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/watchlist">Watchlist</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/movies/add">Add movie</Link>
      <Link to="/profile">Profile</Link>

      {/*  {isLoggedIn && (
        <>
          <Link to="/protected">
            <button>Protected</button>
          </Link>

          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {' '}
            <button>Sign Up</button>{' '}
          </Link>
          <Link to="/login">
            {' '}
            <button>Login</button>{' '}
          </Link>
        </>
      )} */}
    </nav>
  );
}

export default Navbar;
