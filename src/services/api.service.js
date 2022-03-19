import axios from 'axios';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use(config => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  login = requestBody => {
    return this.api.post('/auth/login', requestBody);
  };

  signup = requestBody => {
    return this.api.post('/auth/signup', requestBody);
  };

  verify = () => {
    return this.api.get('/auth/verify');
  };

  // Watchlist
  getWatchlist = () => {
    return this.api.get('/api/watchlist');
  };

  addToWatchlist = body => {
    return this.api.post('/api/watchlist', body);
  };

  removeFromWatchlist = body => {
    return this.api.post('/api/watchlist/delete', body);
  };

  // Movies
  getAllMovies = () => {
    return this.api.get('/api/movies');
  };

  getOneMovie = id => {
    return this.api.get(`/api/movies/${id}`);
  };

  createMovie = body => {
    return this.api.post('/api/movies', body);
  };

  editMovie = (id, body) => {
    return this.api.put(`/api/movies/${id}`, body);
  };

  // Profile
  getProfile = () => {
    return this.api.get('/api/profile');
  };

  // Image
  uploadImage = file => {
    return this.api.post('/api/movies/upload', file);
  };
}

const apiService = new ApiService();

export default apiService;