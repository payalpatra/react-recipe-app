import React, { useEffect, useState } from "react";
import Recipe from "./Recipe"
import "./App.css";
require('dotenv').config();

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, SetQuery] = useState('Pizza')


  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits)
  }

  function updateSearch(event) {
    setSearch(event.target.value);
  }
  function getSearch(event) {
    event.preventDefault();
    SetQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search__form">
        <input className="search__bar" type="text" placeholder= "Search For A Recipe" onChange={updateSearch} value={search} />
        <button className="search__button" type="submit">Search</button>
      </form>

      <div className="recipes">

        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.calories}
            id={recipe.recipe.calories}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>

    </div>
  );
}

export default App;
