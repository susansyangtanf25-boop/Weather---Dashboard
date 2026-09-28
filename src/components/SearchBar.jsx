import { useState } from "react";

function SearchBar({ onSearch, disabled }) {
  const [input, setInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSearch(trimmed);
    setInput("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a city..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
