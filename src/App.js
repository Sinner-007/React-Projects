// import React, {useEffect, useState} from 'react';
// import './App.css';

// const App = () => {
//   const APP_ID = "223edd18"
//   const APP_KEY = "9b6b434615cab472ebda9b586da3e691"

//   useEffect(() => {
//     getRecipes();
//   },[])

//   const getRecipes = async () => {
//     const response = await fetch( `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`)
//     const data = await response.json()
//     console.log(data)
//   }

//   return (
//     <div className='App'>
//       <form className='search-form'>
//         <input className='search-bar' type='text' />
//         <button onClick className='search-button' type='submit'>search

//         </button>
//       </form>
//     </div>
//   )



// }

// export default App;



import React, { useEffect, useState } from 'react'
import './App.css'; 
import Recipe from './Recipe'; 

const App = () => { 
const APP_ID = "c4a63842"; 
const APP_KEY = "27ad6eb9eb5a4ff399f1be15d87c0eb0"; 
const [recipes, setRecipes] = useState([]); 
const [search, setSearch] = useState(""); 
const [query, setQuery] = useState("chicken"); 
useEffect(() => { 
	getRecipes(); 
}, [query]) 
const getRecipes = async () => { 
	const response = await fetch 
		(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
	const data = await response.json(); 
	setRecipes(data.hits); 
	// console.log(data); 

}; 
const updateSearch = e => { 
	setSearch(e.target.value); 
}; 
const getSearch = e => { 
	e.preventDefault(); 
	setQuery(search); 
	setSearch(""); 
} 

return ( 
	<div className="App"> 
	<form className="search-form" onSubmit={getSearch} > 
		<input className="search-bar" type="text" value={search} 
			onChange={updateSearch} /> 
		<button className="search-button" type="submit" > 
			Search 
		</button> 
	</form> 
	<div className="recipes"> 
		{recipes.map(recipe => ( 
		<Recipe 
			key={recipe.recipe.label} 
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
