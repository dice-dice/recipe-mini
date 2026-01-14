import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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

const imageFileSchema = z
  .any()
  .optional()
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return files[0]?.size <= MAX_FILE_SIZE;
    },
    { message: "画像サイズは5MB以下にしてください" }
  )
  .refine(
    (files) => {
      if (!files || files.length === 0) return true;
      return ACCEPTED_IMAGE_TYPES.includes(files[0]?.type);
    },
    { message: "JPEG、PNG、WebP形式の画像を選択してください" }
  );

export const recipeSchema = z.object({
  title: z
    .string()
    .min(1, "レシピ名は必須です")
    .max(100, "レシピ名は100文字以内で入力してください"),
  ingredients: z.array(ingredientSchema),
  ingredient_groups: z.array(ingredientGroupSchema).optional(),
  steps: z.array(stepSchema),
  image_url: z.string().optional(),
  image_file: imageFileSchema,
  category: z
    .string()
    .min(1, "カテゴリーは必須です")
    .max(50, "カテゴリーは50文字以内で入力してください"),
});

export type RecipeFormValues = z.infer<typeof recipeSchema>;
