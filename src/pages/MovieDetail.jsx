import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiService from '../services/api.service';

function MovieDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();

  useEffect(() => {
    apiService
      .getOneMovie(id)
      .then(response => {
        console.log(response.data);
        setMovie(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (isLoading) return null;

  return (
    <>
      <h2>Movie detail</h2>
      <div key={movie._id}>
        <Link to={`/movies/${movie._id}`}>
          <h2>{movie.title}</h2>
          <p>{movie.buddy}</p>
          <span>{movie.rating}</span>
        </Link>
      </div>
    </>
  );
}

export default MovieDetail;
