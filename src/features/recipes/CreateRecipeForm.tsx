import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addRecipe as addRecipeApi } from "../../services/recipe";
import { useForm } from "react-hook-form";
import { RecipeForm } from "../../types/recipe";

export default function CreateRecipeForm() {
  const{register, handleSubmit, reset, formState:{ errors }} = useForm<RecipeForm>();
    
    const queryClient = useQueryClient();
    const {mutate: addRecipe, isLoading } = useMutation({
        mutationFn: addRecipeApi,
        onSuccess: () => {
            alert("追加成功しました");
            queryClient.invalidateQueries({queryKey: ["recipes"]});
          reset()
        }
    });
    function onSubmit(data: RecipeForm){
      addRecipe(data)
    }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text"
      disabled={isLoading} 
      {...register("title", { required: "This field is required" })}/>
       {errors?.title?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("ingredients", { required: "This field is required" })}/>
       {errors?.ingredients?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("step1", { required: "This field is required" })}/>
      {errors?.step1?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("step2", { required: "This field is required" })}/>
       {errors?.step2?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("step3", { required: "This field is required" })}/>
       {errors?.step3?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("image_url")}/>
       {errors?.image_url?.message}
      <input type="text"
      disabled={isLoading} 
      {...register("category", { required: "This field is required" })}/>
      {errors?.category?.message}
     <button type="submit">追加</button>
    </form>
      
    
  )
}
