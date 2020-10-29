import React, {useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';
// React Async is a promised-based library that makes it possible for you to fetch data in your React application
const App = () => {
const APP_ID = "4daf7245";
const APP_KEY= "90f0f36b56e0c5eb4f3921de0ef1163f	";
const [recipes,setRecipes]= useState([]);  //using  the state to store the fetched data in an array 
const [search,setSearch] = useState("");   //usinng another state to perform search 
const [query,setQuery] = useState('chicken')
 useEffect (() => {
   getRecipes();
 },[query]);

const getRecipes= async () => {
const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
const data = await response.json();
   setRecipes(data.hits);
   console.log(data.hits);
 };
 
 const updateSearch= e => {
   setSearch(e.target.value);

   
 };

 const getSearch = e => {
   e.preventDefault();
   setQuery(search);
   setSearch('');
 
}

  return (
    <div className="App">
     <form onSubmit={getSearch} className="search-form">
       <input className="search-bar" type="text"  value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
         Search
         </button>
     </form> 
     <div className="recipes">
       {recipes.map(recipe => (        /* passing the states into the props to recipe components */
       <Recipe
       key= {recipe.recipe.title}
       title = {recipe.recipe.label}
       calories={recipe.recipe.calories}
       image = {recipe.recipe.image}
       ingredients = {recipe.recipe.ingredients}
       />
     ))}
     </div>                    
    </div>
  );
};
export default App;



