"use client";

type URL = {
  params: {
    slug: string;
  };
};

import AddComment from "@/app/components/AddComment";
import Recipe from "@/app/components/Recipe";
import { RecipeType } from "@/app/types/Recipe";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/recipes/${slug}`);
  return response.data;
};

export default function RecipeDetail(url: URL) {
  const { data, isLoading } = useQuery<RecipeType>({
    queryKey: ["detail-recipe"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <Recipe
        key={data?.id}
        id={data?.id}
        name={data?.user.name}
        avatar={data?.user.image}
        title={data?.title}
        comments={data?.comments}
      />
      <AddComment id={data?.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className='my-6 bg-white p-8'>
          <div className='flex items-center gap-2'>
            <Image
              width={32}
              height={32}
              src={comment.user.image}
              alt='avatar'
            />
            <h3 className='font-bold'>{comment.user.name}</h3>
            <h2 className='text-sm'>{comment.createdAt}</h2>
          </div>
          <div className='py-4'>{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
