import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api.service';
import Navbar from '../components/Navbar/Navbar';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import { ReactComponent as Loading } from '../../src/assets/loading.svg';
import { ReactComponent as Remove } from '../../src/assets/remove.svg';
import wheel from '../../src/assets/wheel.png';
import Back from '../components/Back';

function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleOnClick = watchlistId => {
    apiService
      .removeFromWatchlist({ watchlistId })
      .then(response => {
        console.log(response.data);
        getWhatchlist();
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(watchlist);

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
          <h1>My Watchlist</h1>
        </div>
        {watchlist.length === 0 && (
          <>
            <p>
              You do not have any movies in your Watchlist yet.
              <br />
              Go to the <Link to={'/movies'}>Movies</Link> page and add some by clicking at 👍 icon.
            </p>
            <img src={wheel} alt="wheel" />
          </>
        )}
        {watchlist.map(watchlist => {
          console.log('wathclist', watchlist);
          return (
            <div className="item-movie" key={watchlist._id}>
              <Link to={`/movies/${watchlist.movie._id}`}>
                <div className="info">
                  <h2>{watchlist.movie.title}</h2>
                  <p>{watchlist.movie.buddy}</p>
                </div>
              </Link>
              <div className="icons">
                {/* //TODO  */}
                <div className="stars">
                  {watchlist.movie.rating === 1 && (
                    <>
                      <StarActive /> <StarActive /> <Star /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 2 && (
                    <>
                      <StarActive /> <StarActive /> <Star /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 3 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <Star /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 4 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <StarActive /> <Star />
                    </>
                  )}
                  {watchlist.movie.rating === 5 && (
                    <>
                      <StarActive /> <StarActive /> <StarActive /> <StarActive /> <StarActive />
                    </>
                  )}
                </div>

                <div onClick={() => handleOnClick(watchlist._id)}>
                  <Remove />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Navbar />
    </>
  );
}

export default Watchlist;
