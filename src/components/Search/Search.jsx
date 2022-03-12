import './Search.css';

function Search({ onFilter, handleReset }) {
  const handleSearch = e => {
    onFilter(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" placeholder="Search a movie..." onChange={handleSearch} />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
export default Search;
