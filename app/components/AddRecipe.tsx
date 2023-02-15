"use client";

import { useState } from "react";

export default function CreateRecipe() {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <form className='bg-white my-8 p-8 rounded-md'>
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
