import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/auth.context";
import apiService from "../services/api.service";
import Back from '../components/Back';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';

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
          <h1>User profile</h1>
        </div>
        <p>{profile.email}</p>
        <p>You have already uploaded {movies.length} movies.</p>
        {movies.length <= 5 && <p>You can make better.</p>}
        {movies.length > 5 && <p>Seems you like movies.</p>}

        {/* //TODO if X > 10 --> 'great job' */}

        <p>You have {watchlist.length} movies.</p>

        <button onClick={logOutUser}>Logout</button>
      </div>
      <Navbar />
    </>
  );
}

export default Profile;