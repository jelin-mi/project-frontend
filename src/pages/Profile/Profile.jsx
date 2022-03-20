import { useContext, useEffect, useState } from 'react';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { ReactComponent as Glasses } from '../../assets/glasses.svg';
import { AuthContext } from '../../context/auth.context';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import apiService from '../../services/api.service';
import Back from '../../components/Back';
import Loading from '../../components/Loading/Loading';
import './Profile.css';

function Profile() {
  const [profile, setProfile] = useState({});
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { logOutUser } = useContext(AuthContext);

  // List of all movies
  useEffect(() => {
    apiService
      .getAllMovies()
      .then(response => {
        setMovies(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // List of Watchlist
  useEffect(() => {
    apiService
      .getProfile({})
      .then(response => {
        setProfile(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const getWhatchlist = () => {
    apiService
      .getWatchlist()
      .then(response => {
        setWatchlist(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getWhatchlist();
    setIsLoading(false);
  }, []);

  if (isLoading)
    return (
      <div className="loading">
        <Loading />
      </div>
    );

  return (
    <>
      <div className="container profile">
        <div className="headline">
          <Back />
          <h1>Your profile</h1>
          <div className="logout-icon">
            <Logout onClick={logOutUser} />
          </div>
        </div>
        <div className="email">
          <h2>Email</h2>
          <p>{profile.email}</p>
        </div>
        <div className="status">
          <h2>Status</h2>
          <ul>
            <li>
              <strong>Films:</strong> <Link to={'/movies'}>{movies.length} films</Link>
            </li>
            <li>
              <strong>Watchlist:</strong> <Link to={'/watchlist'}>{watchlist.length} films</Link>
            </li>
          </ul>
        </div>
        <div className="recommendation">
          <Glasses />
          <h3>
            <strong>Cannot find what you are looking for?</strong>
          </h3>
          <p>Ask your friend for a recommendation and add a New Film to BuddyFilms!</p>
        </div>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;
