import { supabase } from "./supabase";
import { Recipe, RecipeForm } from "../types/recipe";
import { v4 as uuid } from "uuid";

export async function getAllRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase.from("recipes").select("*");

  if (error) throw error;
  return data as Recipe[];
}

export async function addRecipe(
  newRecipe: RecipeForm
): Promise<Recipe> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw new Error(userError.message);
  if (!user) throw new Error("ログインユーザーが取得できませんでした");

  const { data: createRecipe, error: insertError } = await supabase
    .from("recipes")
    .insert([
      {
        title: newRecipe.title,
        ingredients: newRecipe.ingredients,
        ingredient_groups: newRecipe.ingredient_groups,
        steps: newRecipe.steps.map(step => step.value),
        category: newRecipe.category,
        user_id: user.id,
        image_url: null,
      },
    ])
    .select()
    .single();

    if(insertError) throw insertError;

let image_url: string | null = null;

if(newRecipe.image_file && newRecipe.image_file[0]) {
  image_url = await imageUpload(newRecipe.image_file[0], createRecipe.id);
  const {data: updateRecipe, error: updateError } = 
  await supabase.from("recipes").update({image_url: image_url})
  .eq("id", createRecipe.id)
  .select()
  .single();
  
    if (updateError) throw updateError;
    return updateRecipe as Recipe;
}
return createRecipe as Recipe;
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

export async function imageUpload(file: File, id: number) {
  const ext = file.name.split(".").pop();
  const filePath = `recipes/${id}/${uuid()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("recipe_img")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("recipe_img")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
}

export async function updateRecipe(id: number, newRecipe: RecipeForm) {
  let imageUrl = newRecipe.image_url;

  if (newRecipe.image_file && newRecipe.image_file[0]) {
    const file = newRecipe.image_file[0];
    imageUrl = await imageUpload(file, id);
  }

  const { data, error } = await supabase
    .from("recipes")
    .update({
      title: newRecipe.title,
      ingredients: newRecipe.ingredients,
      ingredient_groups: newRecipe.ingredient_groups,
      steps: newRecipe.steps.map(step => step.value),
      category: newRecipe.category,
      image_url: imageUrl,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteRecipe(id: number) {
  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) throw error;
}
