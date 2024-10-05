import { useEffect, useState } from "react";
import styles from "./CookingSummary.module.css";
import PropTypes from "prop-types";

const CookingSummary = (props) => {
  const { selectedRecipes, setSelectedRecipes, recipes } = props;

  const [currentlyCooking, setCurrentlyCooking] = useState([]);

 const selectedRecipe = selectedRecipes?.map((id)=>
    recipes.find((recipe)=> recipe.recipe_id === id)
 ).filter((recipe) => recipe !== undefined);

const currentlyCookingItem = currentlyCooking.map((id)=>
  recipes.find((recipe)=> recipe.recipe_id === id)
)


  useEffect(() => {
    // Fetch data from localStorage for "currentlyCooking" if available
    const cookingFromStorage = JSON.parse(localStorage.getItem("currentlyCooking")) || [];
    setCurrentlyCooking(cookingFromStorage);
    // const storedRecipes = JSON.parse(localStorage.getItem("selectedRecipes")) || [];
    // setSelectedRecipes(storedRecipes);
  }, []);


  const handlePreparing = (id) => {
    // Find the recipe that is being prepared
    const recipeToMove = selectedRecipes.find((selectedRecipe) => selectedRecipe === id);
    // Remove recipe ID from wantToCook
    const updatedWantToCook = selectedRecipes.filter((recipeId) => recipeId !== id);

    setSelectedRecipes(updatedWantToCook);
    localStorage.setItem("selectedRecipes", JSON.stringify(updatedWantToCook));

    // Add recipe to currentlyCooking
    const updatedCurrentlyCooking = [...currentlyCooking, recipeToMove];
    setCurrentlyCooking(updatedCurrentlyCooking);
    localStorage.setItem("currentlyCooking", JSON.stringify(updatedCurrentlyCooking));
  };

  const handleCookingDone = (id)=>{
    const cookingLeft = currentlyCooking.filter(cooking => cooking !== id)
    // const updatedCurrentlyCooking = [...currentlyCooking, cookingLeft];
    setCurrentlyCooking(cookingLeft);
    localStorage.setItem("currentlyCooking", JSON.stringify(cookingLeft));
  }

  const totalCookingTime = currentlyCooking.length * 30; // Example for static data
  const totalCalories = currentlyCooking.length * 600; // Example for static data

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3>Want to cook: {selectedRecipes.length}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Calories</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {selectedRecipe.map((item, index) => (
              <tr key={index}>
                <td>{item.recipe_name}</td>
                <td>{item.preparing_time}</td>
                <td>{item.calories}</td>
                <td>
                <button className={styles.button} onClick={() => handlePreparing(item.recipe_id)}>Preparing</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.section}>
        <h3>Currently cooking: {currentlyCooking.length}</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Time</th>
              <th>Calories</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentlyCookingItem.map((item, index) => (
              <tr key={index}>
                <td>{item.recipe_name}</td>
                <td>{item.preparing_time}</td>
                <td>{item.calories}</td>
                <td onClick={()=>handleCookingDone(item.recipe_id)}>Done</td>
              </tr>
            ))}
            <tr className={styles.total}>
              <td></td>
              <td>Total Time = {totalCookingTime} minutes</td>
              <td>Total Calories = {totalCalories} calories</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
CookingSummary.propTypes = {
  setSelectedRecipes: PropTypes.func.isRequired,
  selectedRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      calories: PropTypes.string.isRequired,
    })
  ).isRequired,
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      calories: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CookingSummary;
