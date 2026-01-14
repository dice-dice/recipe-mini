import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecipeForm } from "../../types/recipe";
import { recipeSchema } from "../../schemas/recipeSchema";
import { Form } from "../../ui/Form";
import RecipeFormFields from "./RecipeFormFields";
import { useCreateRecipe } from "./useCreateRecipe";

export default function CreateRecipeForm() {
  const methods = useForm<RecipeForm>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      ingredients: [{ name: "", amount: "" }],
      ingredient_groups: [
        { group_name: "", items: [{ name: "", amount: "" }] },
      ],
      steps: [{ value: "" }],
      image_url: "",
      category: "",
    },
  });

  const { addRecipe, isLoading } = useCreateRecipe();
  function onSubmit(data: RecipeForm) {
    addRecipe(data, {
      onSuccess: () => methods.reset(),
    });
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
