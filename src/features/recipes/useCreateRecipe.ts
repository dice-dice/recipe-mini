import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe as addRecipeApi } from "../../services/recipe";

export function useCreateRecipe() {
    const queryClient = useQueryClient();
    
     const { mutate: addRecipe, isLoading } = useMutation({
        mutationFn: addRecipeApi,
        onSuccess: () => {
          alert("追加成功しました");
          queryClient.invalidateQueries({ queryKey: ["recipes"] });
        },
      });
      return {addRecipe, isLoading}

}