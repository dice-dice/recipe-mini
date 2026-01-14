import { z } from "zod";

const ingredientSchema = z.object({
  name: z.string(),
  amount: z.string(),
});

const ingredientGroupSchema = z.object({
  group_name: z.string(),
  items: z.array(ingredientSchema),
});

const stepSchema = z.object({
  value: z.string(),
});

export const recipeSchema = z.object({
  title: z
    .string()
    .min(1, "レシピ名は必須です")
    .max(100, "レシピ名は100文字以内で入力してください"),
  ingredients: z.array(ingredientSchema),
  ingredient_groups: z.array(ingredientGroupSchema),
  steps: z.array(stepSchema),
  image_url: z.string().optional(),
  image_file: z.any().optional(),
  category: z
    .string()
    .min(1, "カテゴリーは必須です")
    .max(50, "カテゴリーは50文字以内で入力してください"),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
