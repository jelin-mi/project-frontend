import { useContext, useEffect, useState } from 'react';
import { ReactComponent as Loading } from '../../assets/loading.svg';
import { ReactComponent as Logout } from '../../assets/logout.svg';
import { AuthContext } from '../../context/auth.context';
import Navbar from '../../components/Navbar/Navbar';
import apiService from '../../services/api.service';
import Back from '../../components/Back';
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
        <h2>Email</h2>
        <p>{profile.email}</p>
        <h2>Status</h2>
        <ul>
          {' '}
          {/* //TODO */}
          <li>Films: {movies.length} movies available</li>
          <li>Watchlist: {watchlist.length} movies</li>
        </ul>
        {watchlist.length <= 1 && (
          <>
            <h3>Congratulations! You have won BuddyFilms Oscar.</h3>
            <img></img>
          </>
        )}
        {watchlist.length > 1 && watchlist.length <= 5 && (
          <>
            <h3>Good job! You have won BuddyFilms Goya.</h3>
            <img></img>
          </>
        )}
        {watchlist.length > 5 && (
          <>
            <h3>Ou! It seems you do not have time to watch the movies.</h3>
            <img></img>
          </>
        )}
        <p>Cannot find what you are looking for?</p>
        <p>Ask your friend for a recomendation and add a New Film to BuddyFilms!</p>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;
