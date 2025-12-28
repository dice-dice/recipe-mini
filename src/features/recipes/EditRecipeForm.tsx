import { FormProvider, useForm } from "react-hook-form";
import { Recipe, RecipeForm } from "../../types/recipe";
import { Form } from "../../ui/Form";
import Input from "../../ui/Input";
import RecipeFormFields from "./RecipeFormFields";
import { useEditRecipe } from "./useEditRecipe";

export default function EditRecipeForm({
  recipe,
  onCancel,
}: {
  recipe: Recipe;
  onCancel: () => void;
}) {
  
  const  methods  = useForm<RecipeForm>({
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

  const {updateMutate, isLoading} = useEditRecipe();

  function onSubmit(value: RecipeForm) {
    
    updateMutate({id: recipe.id, value},
      {onSuccess:() => {
        methods.reset(value);
      }}
    );
  }
  return (
    <FormProvider {...methods} >
    <Form onSubmit={methods.handleSubmit(onSubmit)}>
      <RecipeFormFields
                title="レシピを編集"
                submitLabel="更新"
                isLoading={isLoading}
                onCancel={onCancel}
              />
      <Input
        type="hidden"
        {...methods.register("image_url")}
      />
    </Form>
    </FormProvider>
  );
}
