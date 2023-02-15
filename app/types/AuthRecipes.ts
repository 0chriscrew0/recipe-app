export type AuthRecipes = {
    email: string
    id: string
    image: string
    name: string
    recipes: {
        createdAt: string
        id: string
        title: string
        comments?: {
            createdAt: string
            id: string
            recipeId: string
            title: string
            userId: string
        }[]
    }[]
}