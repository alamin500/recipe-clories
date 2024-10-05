import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import MealCard from "./Components/MealCard/MealCard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="main-container">
      <Navbar />
      <HeroSection />
      <MealCard/>
    </div>
  );
}

export default App;
