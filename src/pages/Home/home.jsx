import React, { useState } from "react";
import "./home.css";
import Header from "../../components/Header/header";
import ExploreMenu from "../../components/ExploreMenu/exploreMenu";
import FoodDisplay from "../../components/FoodDisplay/foodDisplay";
import AppDownload from "../../components/AppDownload/appdownload";

function Home() {
  const [category, setCategory] = useState("all");

  return (
    <div className="home">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
}

export default Home;
