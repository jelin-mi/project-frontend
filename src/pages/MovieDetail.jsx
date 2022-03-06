import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
        <h2>{movie.title}</h2>
        <p>Year: {movie.year}</p>
        <p>Director: {movie.director}</p>
        <p>Synopsis: {movie.synopsis}</p>
        <p>Channel: {movie.channel}</p>
        <p>Buddy: {movie.buddy}</p>
        <p>{movie.rating}</p>
      </div>
    </>
  );
}

export default MovieDetail;
