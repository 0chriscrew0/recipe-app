// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: "Please sign in to create a recipe" });

    const title: string = req.body.title;

    // Get user
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Check length of title
    if (title.length > 300)
      return res.status(403).json({ message: "Please write a shorter post" });

    if (!title.length)
      return res.status(403).json({ message: "Please give recipe a title" });

    // Create Recipe
    try {
      const result = await prisma.recipe.create({
        data: {
          title,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured while creating recipe" });
    }
  }
}