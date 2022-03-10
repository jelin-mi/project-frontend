import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LikeButton from '../components/LikeButton';
import Navbar from '../components/Navbar/Navbar';
import { AuthContext } from '../context/auth.context';
import apiService from '../services/api.service';

function MovieDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const { id } = useParams();
  const { user } = useContext(AuthContext);

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
        {movie.rating === 1 && '★☆☆'}
        {movie.rating === 2 && '★★☆'}
        {movie.rating === 3 && '★★★'}
        <LikeButton>👍</LikeButton>
        <LikeButton>👎</LikeButton>
        {movie.owner === user._id && (<Link to={`/movies/${movie._id}/edit`}>Edit</Link>)}
        <Navbar />
      </div>
    </>
  );
}

export default MovieDetail;
