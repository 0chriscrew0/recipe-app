"use client";

import Image from "next/image";
import Link from "next/link";

export type RecipeProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
};

export default function Recipe({ id, avatar, name, title }: RecipeProps) {
  return (
    <div className='bg-white my-8 p-8 rounded-lg'>
      <div className='flex item-center gap-2'>
        <Image
          className='rounded-full'
          width={32}
          height={32}
          src={avatar}
          alt='avatar'
        />
        <h3>{name}</h3>
      </div>
      <div className='my-8'>
        <p className='break-all'>{title}</p>
      </div>
      <div className='flex gap-4 cursor-pointer items-center'>
        <Link href={`/recipe/${id}`}>
          <p className='text-sm font-bold text-gray-700'>Comments</p>
        </Link>
      </div>
    </div>
  );
}
