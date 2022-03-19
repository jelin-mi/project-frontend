import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as StarActive } from '../../assets/starActive.svg';
import Navbar from '../../components/Navbar/Navbar';
import apiService from '../../services/api.service';
import Back from '../../components/Back';
import './Movies.css';

function MovieCreate() {
  const [movie, setMovie] = useState({
    title: '',
    year: '',
    country: '',
    director: '',
    channel: '',
    buddy: '',
    synopsis: '',
  });
  const [rating, setRating] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();

  const handleOnChange = e => {
    setMovie(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    apiService
      .uploadImage(uploadData)
      .then(response => {
        setImageUrl(response.data.fileUrl);
      })
      .catch(err => console.log('Error while uploading the file: ', err));
  };

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .createMovie({
        title: movie.title,
        imageUrl: imageUrl,
        year: movie.year,
        country: movie.country,
        director: movie.director,
        channel: movie.channel,
        buddy: movie.buddy,
        synopsis: movie.synopsis,
        rating: rating,
      })
      .then(response => {
        console.log(response);
        navigate('/movies');
      })
      .catch(err => {
        setErrorMessage(err.response.data.error);
        setTimeout(() => setErrorMessage(''), 2000);
      });
  };

  return (
    <>
      <div className="container newfilm">
        <div className="headline">
          <Back />
          <h1>Add new film</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="label-input">
            <label>Title</label>
            <input type="text" name="title" value={movie.title} onChange={handleOnChange} />
          </div>
          <div className="label-input">
            <label>Image</label>
            <input type="file" name="imageUrl" onChange={e => handleFileUpload(e)} />
            <p className="help-text">Recommended dimensions: 384 x 500 px</p>
          </div>
          <div className="label-input">
            <label>Year</label>
            <input type="number" name="year" value={movie.year} onChange={handleOnChange} />
          </div>
          <div className="label-input">
            <label>Country</label>
            <input type="text" name="country" value={movie.country} onChange={handleOnChange} />
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
            <textarea type="text" name="synopsis" value={movie.synopsis} onChange={handleOnChange} />
          </div>

          <div className="label-input">
            <label>Rating</label>
            {rating > 0 ? <StarActive onClick={() => setRating(1)} /> : <Star onClick={() => setRating(1)} />}
            {rating > 1 ? <StarActive onClick={() => setRating(1)} /> : <Star onClick={() => setRating(2)} />}
            {rating > 2 ? <StarActive onClick={() => setRating(2)} /> : <Star onClick={() => setRating(3)} />}
            {rating > 3 ? <StarActive onClick={() => setRating(3)} /> : <Star onClick={() => setRating(4)} />}
            {rating > 4 ? <StarActive onClick={() => setRating(4)} /> : <Star onClick={() => setRating(5)} />}
          </div>
          <button type="submit">Add</button>
        </form>
        <p className="error-message">{errorMessage}</p>
      </div>
      <Navbar />
    </>
  );
}

export default MovieCreate;
