"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Create Recipe
  const { mutate } = useMutation(
    async (title: string) =>
      await axios.post("/api/recipes/addRecipe", { title }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
        setTitle("");
        setIsDisabled(false);
      },
    }
  );

  const submitRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(title);
  };

  return (
    <form onSubmit={submitRecipe} className='bg-white my-8 p-8 rounded-md'>
      <div className='flex flex-col my-4'>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          name='title'
          value={title}
          placeholder='Recipe Title'
          className='p-4 text-lg rounded-md my-2 bg-gray-200'
        ></input>
      </div>
      <div className='flex'>
        <button
          type='submit'
          disabled={isDisabled}
          className='text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25'
        >
          Create Recipe
        </button>
        <button className='text-sm bg-gray-700 text-white py-2 px-6 rounded-xl disabled:opacity-25'>
          Cancel
        </button>
      </div>
    </form>
  );
}
