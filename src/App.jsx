import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate';
/* import Navbar from './components/Navbar'; */
import { AuthProviderWrapper } from './context/auth.context';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import MovieDetail from './pages/MovieDetail';
import MovieCreate from './pages/MovieCreate';
import MoviesList from './pages/MoviesList';
/* import Protected from './pages/Protected'; */
import SignupPage from './pages/SignupPage';
import Watchlist from './pages/Watchlist';
import MovieEdit from './pages/MovieEdit';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProviderWrapper>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/*    <Route
          path="/protected"
          element={
            <IsPrivate>   add some pages if needed
              <Protected />
            </IsPrivate>
          }
        /> */}
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
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
