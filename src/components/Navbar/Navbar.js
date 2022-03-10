import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { ReactComponent as Watchlist } from '../../assets/watchlist.svg';
import { ReactComponent as Films } from '../../assets/films.svg';
import { ReactComponent as New } from '../../assets/new.svg';
import { ReactComponent as Profile } from '../../assets/profile.svg';

function Navbar() {
  return (
    <div className="navbar-bg">
      <nav>
        <div className="item">
          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/watchlist">
            <Watchlist /> Watchlist
          </NavLink>
        </div>
      
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/movies" end>
          <Films />Films
        </NavLink>

       
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/movies/add">
          <New />New film
        </NavLink>
        
        <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} to="/profile">
         <Profile /> Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;

//TODO if no need of separate 'active' images, delete them.
