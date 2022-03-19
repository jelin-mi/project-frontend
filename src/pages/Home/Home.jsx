import { Link } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/auth.context';
import { ReactComponent as Loading } from '../../assets/loading.svg';
import { ReactComponent as Cover } from '../../assets/popcorn.svg';
import './Home.css';

function Home() {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.backgroundColor = '#370906';

    return () => {
      document.body.style.backgroundColor = '#FFF';
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
          <Cover />
          <h1>BuddyFilms</h1>
          {!isLoggedIn && (
            <>
              <button className="signup">
                <Link to="/signup">Sign up </Link>
              </button>

              <button className="login">
                <Link to="/login">Log in </Link>
              </button>

              <p>
                Do you want to look around a bit before signing up? Check the <Link to={'/movies'}>movies</Link>.
              </p>
            </>
          )}
          {isLoggedIn && (
            <p>
              Hello buddy, check your <Link to={'/movies'}>movies</Link>.
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default Home;
