import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import Back from '../components/Back';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';
import { ReactComponent as Logout } from '../../src/assets/logout.svg';
import { Link } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState({});
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { /* isLoggedIn, */ /* user, */ logOutUser } = useContext(AuthContext);

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
        console.log(response.data);
        console.table(response.data);
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

  console.log(profile);

   if (isLoading)
     return (
       <div className="loading">
         <Loading />
       </div>
     );

  return (
    <>
      <div className="container">
        <div className="headline">
          <Back />
          <h1>Your profile</h1>
          <Logout onClick={logOutUser} />
        </div>
        <h2>Email</h2>
        <p>{profile.email}</p>
        <h2>Status</h2>
        <p>There are {movies.length} movies you can choose from.</p>
        <button><Link to={'/movies'}>Check movies</Link></button>
        {/* //TODO if X > 10 --> 'great job' */}
        <p>You have {watchlist.length} movies in your Watchlist.</p>
        {/* {watchlist.length <= 5 && <p>You can make better.</p>} */}
        {watchlist.length < 5 && 
        <>
          <p>Seems you have few movies to watch.</p><br/><button><Link to={'/watchlist'}>See Watchlist</Link></button>
        </>}
        <p>Not in a mood for listed movies? Ask your friend for a recomendation and add a new movie to BuddyFilms!</p>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;