import { Route, Routes } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Error404 from './pages/Error404/Error404';
import Home from './pages/Home/Home';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import MoviesList from './pages/Movies/MoviesList';
import MovieDetail from './pages/Movies/MovieDetail';
import MovieCreate from './pages/Movies/MovieCreate';
import MovieEdit from './pages/Movies/MovieEdit';
import Watchlist from './pages/Watchlist/Watchlist';
import Profile from './pages/Profile/Profile';
import './reset.css';
import './App.css';

function App() {
  return (
    <AuthProviderWrapper>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <Signup />
            </IsAnon>
          }
        />
        <Route path="/movies" element={<MoviesList />} />
        <Route
          path="/movies/add"
          element={
            <IsPrivate>
              <MovieCreate />
            </IsPrivate>
          }
        />
        <Route path="/movies/:id" element={<IsPrivate><MovieDetail /></IsPrivate>} />
        <Route
          path="/movies/:id/edit"
          element={
            <IsPrivate>
              <MovieEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/watchlist"
          element={
            <IsPrivate>
              <Watchlist />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;
