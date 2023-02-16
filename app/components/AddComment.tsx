"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type RecipeProps = {
  id?: string;
};

type Comment = {
  id?: string;
  title: string;
};

export default function AddComment({ id }: RecipeProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;

  const { mutate } = useMutation(
    async (data: Comment) => axios.post("/api/recipes/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setIsDisabled(false);
        toast.success("Comment added", { id: commentToastId });
      },
      onError: (error) => {
        setIsDisabled(false);
        if (error instanceof AxiosError) {
          toast.error("Error adding comment", { id: commentToastId });
        }
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    commentToastId = toast.loading("Adding comment...", { id: commentToastId });
    console.log(title, id);
    mutate({ title, id });
  };

  return (
    <form onSubmit={submitComment} className='my-8'>
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
          type='submit'
          disabled={isDisabled}
          className='text-sm bg-teal-600 text-white py-4 px-2'
        >
          Add Comment
        </button>
      </div>
    </form>
  );
}
