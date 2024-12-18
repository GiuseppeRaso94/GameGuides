const SearchBar = () => {
  return (
    <form className="d-flex align-items-center" id="searchBar">
      <input
        type="text"
        placeholder="Search here"
        className="border border-0 w-100"
      />
      <button type="submit" className="border border-0">
        <img src="/assets/search.svg" alt="" />
      </button>
    </form>
  );
};

export default SearchBar;
