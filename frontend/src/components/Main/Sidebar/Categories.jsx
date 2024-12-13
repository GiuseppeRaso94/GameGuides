const Categories = () => {
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <span id="categories">Categories</span>
      <ul className="w-100 p-0 m-0 d-flex flex-column gap-3">
        <li>
          <input type="radio" id="All" name="category" value="All" />
          <label for="All">All</label>
        </li>
        <li>
          <input
            type="radio"
            id="Adventure"
            name="category"
            value="Adventure"
          />
          <label for="Adventure">Adventure</label>
        </li>
        <li>
          <input type="radio" id="RPG" name="category" value="RPG" />
          <label for="RPG">RPG</label>
        </li>
        <li>
          <input type="radio" id="MMORPG" name="category" value="MMORPG" />
          <label for="MMORPG">MMORPG</label>
        </li>
        <li>
          <input type="radio" id="MOBA" name="category" value="MOBA" />
          <label for="MOBA">MOBA</label>
        </li>
        <li>
          <input type="radio" id="RTS" name="category" value="RTS" />
          <label for="RTS">RTS</label>
        </li>
        <li>
          <input type="radio" id="FPS" name="category" value="FPS" />
          <label for="FPS">FPS</label>
        </li>
        <li>
          <input type="radio" id="Fighting" name="category" value="Fighting" />
          <label for="Fighting">Fighting</label>
        </li>
        <li>
          <input type="radio" id="Survival" name="category" value="Survival" />
          <label for="Survival">Survival</label>
        </li>
        <li>
          <input type="radio" id="Sandbox" name="category" value="Sandbox" />
          <label for="Sandbox">Sandbox</label>
        </li>
        <li>
          <input type="radio" id="Horror" name="category" value="Horror" />
          <label for="Horror">Horror</label>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
