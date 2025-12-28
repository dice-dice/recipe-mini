import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RecipeForm } from "../../types/recipe";
import { updateRecipe } from "../../services/recipe";

export function useEditRecipe() {
    const queryClient = useQueryClient();
     const { mutate: updateMutate, isLoading } = useMutation({
        mutationFn: ({ id, value }: { id: number; value: RecipeForm }) =>
          updateRecipe(id, value),
        onSuccess: (_data, valiables) => {
          queryClient.invalidateQueries({ queryKey: ["recipe", valiables.id] });
          queryClient.refetchQueries({ queryKey: ["recipe", valiables.id] });
          window.alert("更新されました");
          
        },
      });
      return {updateMutate, isLoading};
}