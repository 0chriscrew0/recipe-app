"use client";

import axios from "axios";
import AddRecipe from "./components/AddRecipe";
import { useQuery } from "@tanstack/react-query";
import Recipe from "./components/Recipe";

// Get all recipes
const allRecipes = async () => {
  const response = await axios.get("/api/recipes/getRecipes");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: allRecipes,
    queryKey: ["recipes"],
  });

  if (error) return error;
  if (isLoading) return "Loading...";
  return (
    <main>
      <AddRecipe />
      {data?.map((recipe) => (
        <Recipe
          key={recipe.id}
          id={recipe.id}
          name={recipe.user.name}
          avatar={recipe.user.image}
          title={recipe.title}
        />
      ))}
    </main>
  );
}
