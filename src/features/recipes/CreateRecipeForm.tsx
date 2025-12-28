import { FormProvider, useForm } from "react-hook-form";
import { RecipeForm } from "../../types/recipe";
import { Form } from "../../ui/Form";
import RecipeFormFields from "./RecipeFormFields";
import { useCreateRecipe } from "./useCreateRecipe";

export default function CreateRecipeForm() {
  const methods = useForm<RecipeForm>();

  const {addRecipe, isLoading} = useCreateRecipe();
  function onSubmit(data: RecipeForm) {
    addRecipe(data, {
      onSuccess:() => methods.reset()
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
