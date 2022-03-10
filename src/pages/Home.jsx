import cover from '../assets/popcorn.png';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';

function Home() {
  const { isLoggedIn, /* user, */ } = useContext(AuthContext);

  return (
    <div>
      <h1>BuddyFilms</h1>
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
            Do you want to look around a bit before signing up? Check the <Link to={'/movies'}>movies</Link>.
          </p>{' '}
        </>
      )}
      {isLoggedIn && (
        <>
          <p>
            Hello buddy{/*  {user && user.name} */}, check your <Link to={'/watchlist'}>Watchlist</Link>. {/* //TODO si user existe --> user.name, si no 'buddy' */}
          </p>{' '}
        </>
      )}
    </div>
  );
}

export default Home;