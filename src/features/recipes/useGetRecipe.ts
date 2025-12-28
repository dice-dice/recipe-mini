import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../../services/recipe";
import { Recipe } from "../../types/recipe";

export default function useGetRecipe() {
  const { id } = useParams();
  const numericId = Number(id);
  const {
    isLoading,
    data,
    error,
  } = useQuery<Recipe>({
    queryKey: ["recipe", numericId],
    queryFn: () => getRecipeById(numericId!),
    enabled: !!numericId,
  });
  return { isLoading, data, error, numericId };
}
