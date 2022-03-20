import { NavLink } from 'react-router-dom';
import { ReactComponent as Watchlist } from '../../assets/watchlist.svg';
import { ReactComponent as Films } from '../../assets/films.svg';
import { ReactComponent as New } from '../../assets/new.svg';
import { ReactComponent as Profile } from '../../assets/profile.svg';
import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar-bg">
      <nav className="navbar">
        {' '}
        <div className="item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/watchlist">
            <Watchlist /> <span>Watchlist</span>
          </NavLink>
        </div>
        <div className="item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/movies" end>
            <Films />
            <span>Films</span>
          </NavLink>
        </div>
        <div className="item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/movies/add">
            <New />
            <span>New film</span>
          </NavLink>
        </div>
        <div className="item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/profile">
            <Profile /> <span>Profile</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
