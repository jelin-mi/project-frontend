import './Search.css';
import { ReactComponent as Refresh } from '../../assets/refresh.svg';

function Search({ onFilter, handleReset }) {
  const handleSearch = e => {
    onFilter(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" placeholder="Search a movie..." onChange={handleSearch} />

      <div onClick={handleReset}>
        <Refresh />
      </div>
    </div>
  );
}
export default Search;
