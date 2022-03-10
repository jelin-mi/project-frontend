import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import apiService from '../services/api.service';

function MovieEdit() {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    director: '',
    channel: '',
    buddy: '',
    synopsis: '',
    rating: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    apiService
    .getOneMovie(id)
    .then(response => {
      setMovie(response.data);
    });
  }, []);

  const handleOnChange = e => {
    setMovie(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .editMovie(movie._id, {
        title: movie.title,
        year: movie.year,
        director: movie.director,
        channel: movie.channel,
        buddy: movie.buddy,
        synopsis: movie.synopsis,
        rating: movie.rating,
      })
      .then(response => {
        console.log(response);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <h2>Movie edit</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="label-input">
          <label>Title</label>
          <input type="text" name="title" value={movie.title} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Year</label>
          <input type="number" name="year" value={movie.year} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Director</label>
          <input type="text" name="director" value={movie.director} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Channel</label>
          <input type="text" name="channel" value={movie.channel} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Buddy</label>
          <input type="text" name="buddy" value={movie.buddy} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Synopsis</label>
          <input type="text" name="synopsis" value={movie.synopsis} onChange={handleOnChange} />
        </div>
        <div className="label-input">
          <label>Rating</label>
          <input type="number" name="rating" min="1" max="3" value={movie.rating} onChange={handleOnChange} />
        </div>
        
        <button type="submit">Edit movie</button>
      </form>
      <Navbar />
    </>
  );
}

export default MovieEdit;
