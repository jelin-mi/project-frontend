import { Route, Routes } from 'react-router-dom';
import { AuthProviderWrapper } from './context/auth.context';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
import Error404 from './pages/Error404/Error404';
import './reset.css';
import './App.css';

import Home from './pages/Home/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MoviesList from './pages/MoviesList';
import MovieDetail from './pages/MovieDetail';
import MovieCreate from './pages/MovieCreate';
import MovieEdit from './pages/MovieEdit';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';

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
        <Route path="/movies/:id" element={<MovieDetail />} />
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
