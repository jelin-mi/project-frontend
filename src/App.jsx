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
import Protected from './pages/Protected';
import SignupPage from './pages/SignupPage';
import Watchlist from './pages/Watchlist';

function App() {
  return (
    <AuthProviderWrapper>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
     {/*    <Route
          path="/protected"
          element={
            <IsPrivate>
              <Protected />
            </IsPrivate>
          } */}
        />
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
        <Route path="/movies/add" element={<MovieCreate />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/movies/:id" element={<MovieDetail />} />

        <Route path="*" element={<Error404 />} />
      </Routes>
    </AuthProviderWrapper>
  );
}

export default App;
