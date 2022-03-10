import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import apiService from '../services/api.service';

function MovieCreate() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState();
  const [director, setDirector] = useState('');
  const [channel, setChannel] = useState('');
  const [buddy, setBuddy] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [rating, setRating] = useState();

  const handleTitle = (e) => setTitle(e.target.value);
  const handleYear = (e) => setYear(e.target.value);
  const handleDirector = (e) => setDirector(e.target.value);
  const handleChannel = (e) => setChannel(e.target.value);
  const handleBuddy = (e) => setBuddy(e.target.value);
  const handleSynopsis = (e) => setSynopsis(e.target.value);
  const handleRating = (e) => setRating(e.target.value);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title,
      year,
      director,
      channel,
      buddy,
      synopsis,
      rating,
    };

    apiService
      .createMovie(newMovie)
      /*  .addToWatchlist({
        movieId: movieId,
      }) */
      .then(response => {
        console.log(response);

        setTitle('');
        setYear();
        setDirector('');
        setChannel('');
        setBuddy('');
        setSynopsis('');
        setRating();
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      });
    }


  return (
  <>
    <h2>Add a movie</h2>
     <form onSubmit={handleSubmit} className="form">
        <div className="label-input">
          <label>Title</label>
          <input
            type="text"
            name="name"
            value={title}
            onChange={handleTitle}
          />
        </div>
         <div className="label-input">
          <label>Year</label>
          <input
            type="number"
            name="year"
            value={year}
            onChange={handleYear}
          />
        </div>
         <div className="label-input">
          <label>Director</label>
          <input
            type="text"
            name="director"
            value={director}
            onChange={handleDirector}
          />
        </div>
         <div className="label-input">
          <label>Channel</label>
          <input
            type="text"
            name="channel"
            value={channel}
            onChange={handleChannel}
          />
        </div>
         <div className="label-input">
          <label>Buddy</label>
          <input
            type="text"
            name="buddy"
            value={buddy}
            onChange={handleBuddy}
          />
        </div>
         <div className="label-input">
          <label>Synopsis</label>
          <input
            type="text"
            name="synopsis"
            value={synopsis}
            onChange={handleSynopsis}
          />
        </div>
         <div className="label-input">
          <label>Rating</label>
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={handleRating}
            placeholder="1, 2 or 3"
          />
        </div>

        <button type="submit">Add new movie</button>
      </form>
      <Navbar />
  </>
  );
}

export default MovieCreate;