import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe as addRecipeApi } from "../../services/recipe";
import { FormProvider, useForm } from "react-hook-form";
import { RecipeForm } from "../../types/recipe";
import { Form } from "../../ui/Form";
import RecipeFormFields from "./RecipeFormFields";

export default function CreateRecipeForm() {
  const methods = useForm<RecipeForm>();

  const queryClient = useQueryClient();
  const { mutate: addRecipe, isLoading } = useMutation({
    mutationFn: addRecipeApi,
    onSuccess: () => {
      alert("追加成功しました");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      methods.reset();
    },
  });
  function onSubmit(data: RecipeForm) {
    addRecipe(data);
  }
  return (
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(onSubmit)}>
        <RecipeFormFields
          title="レシピを追加"
          submitLabel="追加"
          isLoading={isLoading}
        />
      </Form>
    </FormProvider>
  );
}
