import { supabase } from "./supabase";
import { Recipe, RecipeForm } from "../types/recipe";

export async function getAllRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) throw error;
  return data as Recipe[];
}

export async function addRecipe(newRecipe: Omit<Recipe, "id" | "created_at" | "user_id">):Promise<Recipe> {
    const {data: {user}, error: userError} = await supabase.auth.getUser();
    
    if(userError) throw new Error(userError.message);
    if(!user) throw new Error("ログインユーザーが取得できませんでした");

    const { data, error } = await supabase
  .from('recipes')
  .insert([
    { ...newRecipe, user_id: user.id, },
  ])
  .select().single();
if(error) throw new Error(error.message);
return data as Recipe;
}

export async function getRecipeById(id: number) {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single(); 

  if (error) throw error;
  return data;
}


export async function updateRecipe(
  id: number,
  newRecipe: RecipeForm
) {
  const { data, error } = await supabase
    .from("recipes")
    .update(newRecipe)
    .eq("id", id)
    .select(); 

  if (error) throw error;

  return data;
}

export async function deleteRecipe(id: number) {
  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) throw error;
}
