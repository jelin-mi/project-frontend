import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import apiService from '../services/api.service';
import { ReactComponent as Star } from '../../src/assets/star.svg';
import { ReactComponent as StarActive } from '../../src/assets/starActive.svg';
import Back from '../components/Back';

function MovieEdit() {
  const { id } = useParams();
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

  const navigate = useNavigate();

  useEffect(() => {
    apiService.getOneMovie(id).then(response => {
      setMovie(response.data);
      setImageUrl(response.data.fileUrl);
      console.log(response.data);
      console.log(response.data.fileUrl);
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

  const handleFileUpload = e => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    apiService
      .uploadImage(uploadData)
      .then(response => {
        console.log(response.data);
        setImageUrl(response.data.fileUrl);
        console.log(response.data.fileUrl);
      })
      .catch(err => console.log(err));
  };
  console.log('image', imageUrl);

  const handleSubmit = e => {
    e.preventDefault();
    apiService
      .editMovie(movie._id, {
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
        navigate(`/movies/${movie._id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="container editfilm">
        <div className="headline">
          <Back />
          <h1>Movie edit</h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="label-input">
            <label>Title</label>
            <input type="text" name="title" value={movie.title} onChange={handleOnChange} />
          </div>
          <div className="label-input">
            <label>Image</label>
            <input type="file" name="imageUrl" onChange={handleFileUpload} />
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
            {/* <input type="text" name="synopsis" value={movie.synopsis} onChange={handleOnChange} /> */}
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

          <button type="submit">Save</button>
        </form>
      </div>
      <Navbar />
    </>
  );
}

export default MovieEdit;
