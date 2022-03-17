import './Search.css';

function Search({ onFilter }) {
  const handleSearch = e => {
    onFilter(e.target.value);
  };

  return (
    <div className="search">
      <input type="text" placeholder="Search a movie..." onChange={handleSearch} />
    </div>
  );
}
export default Search;