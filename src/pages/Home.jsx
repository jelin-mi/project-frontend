import cover from '../assets/popcorn.png';
import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from './../context/auth.context';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';

function Home() {
  const { isLoggedIn, isLoading /* , user */ } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.backgroundColor = '#370906'; // Background color of Homepage

    return () => {
      document.body.style.backgroundColor = '#FFF'; // Background color of the rest of the pages #FFEBE4
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <Loading />
        </div>
      )}

      {!isLoading && (
        <div className="container home">
          <img src={cover} alt="" />
          <h1>BuddyFilms</h1>

          {!isLoggedIn && (
            <>
              <Link to="/signup">
                <button>Sign up</button>
              </Link>
              <Link to="/login">
                <button>Log in</button>
              </Link>
              <p>
                Do you want to look around a bit before signing up? Check the <Link to={'/movies'}>movies</Link>.
              </p>
            </>
          )}
          {isLoggedIn && (
            <p>
              Hello buddy{/* {user.name ? user.name : 'buddy'} */}, check your <Link to={'/movies'}>movies</Link>.
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
