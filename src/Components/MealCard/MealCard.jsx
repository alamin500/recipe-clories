import styles from "./MealCard.module.css";
import mealImage from "../../assets/meal.png";
import { useEffect, useState } from "react";
import CookingSummary from "../CookingSummary/CookingSummary";


const MealCard = () => {
  const [selectedRecipes, setSelectedRecipes] = useState([]); 
  const [recipes, setRecipes] = useState([]); // State to store recipes
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for handling errors
  useEffect(() => {
    fetch("https://recipe-clories.netlify.app/recipes.json")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false); 
      })
      .catch((error) => {
        setError(error); // Handle any errors
        setLoading(false); // Data failed to load, stop loading indicator
      });
      const storedRecipes = JSON.parse(localStorage.getItem("selectedRecipes")) || [];
      setSelectedRecipes(storedRecipes);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }



  const handleClick = (recipeId) => {
    // Get the current list of recipe IDs from local storage (or set an empty array if none)
 
    // Check if the recipeId is already in the array
    if (!selectedRecipes.includes(recipeId)) {
      // Add the new recipeId to the array
      // selectedRecipes.push(recipeId);
      setSelectedRecipes([...selectedRecipes,recipeId])
      // Save the updated array back to local storage
      localStorage.setItem("selectedRecipes", JSON.stringify(selectedRecipes));
    } 
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {recipes && recipes?.length > 0 ? (
          recipes.map((recipe) => (
            <div className={styles.card} key={recipe.recipe_id}>
              <img
                src={mealImage} // Replace with dynamic image path
                alt={recipe.recipe_name}
                className={styles.image}
              />
              <h3 className={styles.title}>{recipe.recipe_name}</h3>
              <p className={styles.description}>{recipe.short_description}</p>
              <div className={styles.ingredients}>
                <h4>Ingredients: {recipe.ingredients.length}</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.footer}>
                <span>{recipe.preparing_time}</span>
                <span>{recipe.calories}</span>
              </div>
              <button  onClick={() => handleClick(recipe.recipe_id)} className={styles.button}>Want to Cook</button>
            </div>
          ))
        ) : (
          <p>No recipes available.</p> // Display if recipes array is empty
        )}

        {/* Add more meal cards here */}
      </div>

      {/* Cooking Summary Section */}
      <CookingSummary setSelectedRecipes={setSelectedRecipes} recipes={recipes} selectedRecipes={selectedRecipes}/>
    </div>
  );
};

export default MealCard;
