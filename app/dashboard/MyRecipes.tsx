"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthRecipes } from "../types/AuthRecipes";
import EditRecipes from "./EditRecipe";

const fetchAuthRecipes = async () => {
  const response = await axios.get("/api/recipes/authRecipes");
  return response.data;
};

export default function MyRecipes() {
  const { data, isLoading, error } = useQuery<AuthRecipes>({
    queryFn: fetchAuthRecipes,
    queryKey: ["auth-recipes"],
  });

  if (isLoading) return <h1>Getting your recipes...</h1>;

  return (
    <div>
      {data?.recipes.map((recipe) => (
        <EditRecipes
          key={recipe.id}
          id={recipe.id}
          title={recipe.title}
          name={data.name}
          avatar={data.image}
          comments={recipe.comments}
        />
      ))}
    </div>
  );
}
