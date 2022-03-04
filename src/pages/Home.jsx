import cover from '../assets/dog.jpg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';

function Home() {
  const { isLoggedIn, /* user, */ logOutUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Buddy Films</h1>
      <img src={cover} alt="" />

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            {' '}
            <button>Sign up</button>{' '}
          </Link>
          <Link to="/login">
            {' '}
            <button>Login</button>{' '}
          </Link>
          <p>
            Do you want to look around a bit before signing up? Check the <Link to={'/movies'}>movies</Link>{' '}
            Buddies uploaded.
          </p>{' '}
        </>
      )}
      {isLoggedIn && (
        <>
          <p>
            Hello buddy{/*  {user && user.name} */}, check your <Link to={'/watchlist'}>Watchlist</Link>.
          </p>{' '}
        </>
      )}
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
}

export default Home;