"use client";

import { useState } from "react";
import { useMutation, usQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function AddComment({ id }) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <form className='my-8'>
      <h3>Add comment</h3>
      <div className='flex flex-col my-2'>
        <input
          type='text'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name='title'
          className='p-4 text-lg rounded-md my-2'
        />
      </div>
      <div className='flex items-center gap-2'>
        <button
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-4 px-2'
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}
