import { useQuery } from "@tanstack/react-query";
import { Recipe } from "../../types/recipe";
import { getAllRecipes } from "../../services/recipe";

export default function useGetAllRecipes() {
const {
    isLoading,
    data,
    error,
  } = useQuery<Recipe[]>({ queryKey: ["recipes"], queryFn: getAllRecipes });
  return { isLoading, data, error };
}