"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    recipeId: string;
    userId: string;
  }[];
};

export default function EditRecipe({
  avatar,
  name,
  title,
  comments,
  id,
}: EditProps) {
  const [toggle, setToggle] = useState(false);

  const { mutate } = useMutation(
    async (id: string) =>
      await axios.delete("/api/recipes/deleteRecipe", { data: id }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const deleteRecipe = () => {
    mutate(id);
  };

  return (
    <>
      <div className='bg-white my-8 p-8 rounded-lg'>
        <div className='flex items-center gap-2'>
          <Image width={32} height={32} src={avatar} alt='avatar' />
          <h3 className='font-bold text-gray-700'>{name}</h3>
        </div>
        <div className='my-8'>
          <p className='break-all'>{title}</p>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <p className='text-sm font-bold text-gray-700'>
            {comments?.length} comments
          </p>
          <button
            onClick={(e) => {
              setToggle(true);
            }}
            className='text-sm font-bold text-white px-4 py-2 bg-red-500'
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deleteRecipe={deleteRecipe} setToggle={setToggle} />}
    </>
  );
}