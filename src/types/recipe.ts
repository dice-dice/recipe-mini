export type Ingredient = {
  name: string;
  amount: string;
}

export type IngredientGroup = {
  group_name: string;
  items: Ingredient[];
};

export type Recipe = {
  id: number;
  created_at: string;
  user_id: string;
  title: string | null;
  
  ingredients: Ingredient[];
  ingredient_groups?: IngredientGroup[];
  steps:  string[];
  image_url: string | null;
  category: string | null;
};

export type RecipeForm = {
  title: string;
  ingredients: Ingredient[];
  ingredient_groups?: IngredientGroup[];
  steps: { value: string; }[];
  category: string;
  image_url?: string;
  image_file?: FileList;
};

export interface FormProps {
  $type?: "modal" | "default";
}

