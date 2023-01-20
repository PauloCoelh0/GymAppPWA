import React, { useState } from "react";
import "./SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ placeholder, handleFilterAulas, data }) {
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    handleFilterAulas(newFilter);
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={
            <span>
              Search <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </span>
          }
          value={wordEntered}
          onChange={handleFilter}
        />
      </div>
    </div>
  );
}
export default SearchBar;
