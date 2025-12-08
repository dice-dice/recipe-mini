import { useForm } from "react-hook-form";
import { Recipe, RecipeForm } from "../../types/recipe";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe } from "../../services/recipe";

export default function EditRecipeForm({
  recipe,
  onCancel,
}: {
  recipe: Recipe;
  onCancel: () => void;
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<RecipeForm>({
    defaultValues: {
      title: recipe.title ?? "",
      ingredients: recipe.ingredients ?? "",
      step1: recipe.step1 ?? "",
      step2: recipe.step2 ?? "",
      step3: recipe.step3 ?? "",
      image_url: recipe.image_url ?? "",
      category: recipe.category ?? "",
    },
  });

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: ({ id, value }: { id: number; value: RecipeForm }) =>
      updateRecipe(id, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", recipe.id] });
      queryClient.refetchQueries({ queryKey: ["recipe", recipe.id] });
      window.alert("更新されました");
      onCancel();
    },
  });

  function onSubmit(value: RecipeForm) {
    updateMutate({ id: recipe.id, value });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>レシピを編集</h3>

      <input
        disabled={isLoading}
        {...register("title")}
        placeholder="タイトル"
      />

      <textarea
        disabled={isLoading}
        {...register("ingredients")}
        placeholder="材料"
      />

      <textarea
        disabled={isLoading}
        {...register("step1")}
        placeholder="手順1"
      />
      <textarea
        disabled={isLoading}
        {...register("step2")}
        placeholder="手順2"
      />
      <textarea
        disabled={isLoading}
        {...register("step3")}
        placeholder="手順3"
      />

      <input
        disabled={isLoading}
        {...register("image_url")}
        placeholder="画像URL"
      />

      <input
        disabled={isLoading}
        {...register("category")}
        placeholder="カテゴリー"
      />

      <button type="submit" disabled={isLoading}>
        更新
      </button>
      <button type="button" onClick={onCancel}>
        キャンセル
      </button>
    </form>
  );
}
