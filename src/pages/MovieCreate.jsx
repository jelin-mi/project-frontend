import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api.service';

function MovieCreate() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState(null);
  const [director, setDirector] = useState('');
  const [channel, setChannel] = useState('');
  const [buddy, setBuddy] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [rating, setRating] = useState(null);

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
  /*   const newMovie = {
      title,
      year,
      director,
      channel,
      buddy,
      synopsis,
      rating,
    }; */

  useEffect(() => {
    apiService
      .createMovie()
      .then(response => {
        setTitle('');
        setYear(null);
        setDirector('');
        setChannel('');
        setBuddy('');
        setSynopsis('');
        setRating(null);
        navigate('/movies');
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (<>
    <h2>Add a movie</h2>
   {/*   <form onSubmit={handleSubmit} className="form">
        <div className="label-input">
          <label>Name</label>
          <input
            type="text"
            placeholder="Name of a beer"
            name="name"
            value={name}
            onChange={handleName}
          />
        </div>

        <button type="submit">Submit a Beer</button>
      </form> */}
  </>);
}

export default MovieCreate;