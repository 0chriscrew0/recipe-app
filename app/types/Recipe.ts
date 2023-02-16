export type RecipeType = {
  id: string;
  title: string;
  createdAt: string;
  user: {
    name: string;
    image: string;
  };
  comments?: {
    message: string;
    createdAt: string;
    id: string;
    postId: string;
    user: {
      name: string;
      image: string;
    };
  }[];
};
