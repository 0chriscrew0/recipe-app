// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: "Please sign in" });

    // Get user posts
    try {
      const postId = req.body;
      const result = await prisma.recipe.delete({
        where: {
            id: postId
        }
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(403).json({ err: "Error has occured while trying to delete recipe" });
    }
  }
}
