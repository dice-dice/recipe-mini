export type Recipe = {
  id: number;
  created_at: string;
  user_id: string;
  title: string | null;
  ingredients: string | null;
  step1: string | null;
  step2: string | null;
  step3: string | null;
  image_url: string | null;
  category: string | null;
};

export type RecipeForm = Omit<
  Recipe,
  "id" | "created_at" | "user_id"
> & {
  image_file?: FileList;
};

