import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import Back from '../components/Back';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';
import { ReactComponent as Logout } from '../../src/assets/logout.svg';

function Profile() {
  const [profile, setProfile] = useState({});
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { /* isLoggedIn, */ /* user, */ logOutUser } = useContext(AuthContext); //TODO for movies and watchlist too? to pass all the details and do not have to run all this code...

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
          <h1>User profile</h1>
          <Logout onClick={logOutUser} />
        </div>
        <p>{profile.email}</p>
        <p>There are {movies.length} movies you can choose from.</p>
        {/* //TODO if X > 10 --> 'great job' */}
        <p>You have {watchlist.length} movies in your Watchlist to watch.</p>
        {watchlist.length <= 5 && <p>You can make better.</p>}
        {watchlist.length > 5 && <p>Seems you have a lot to watch.</p>}
      </div>
      <Navbar />
    </>
  );
}

export default Profile;