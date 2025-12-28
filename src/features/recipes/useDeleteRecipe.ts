import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe } from "../../services/recipe";
import { useNavigate } from "react-router-dom";

export default function useDeleteRecipe(id: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: () => deleteRecipe(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe"] });
      navigate("/app/recipes");
    },
  });
  return { mutate };
}
