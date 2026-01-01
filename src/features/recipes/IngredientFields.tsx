import { UseFormRegister } from "react-hook-form";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import { RecipeForm } from "../../types/recipe";

type Props = {
  register: UseFormRegister<RecipeForm>;
  index: number;
  removenNormal: () => void;
};

export default function IngredientFields({
  register,
  index,
  removenNormal,
}: Props) {
  return (
    <div>
      <Input
        placeholder="材料名"
        {...register(`ingredients.${index}.name`, {
          required: "材料名は必須です",
        })}
      />

      <Input
        placeholder="分量（例：大さじ1）"
        {...register(`ingredients.${index}.amount`, {
          required: "分量は必須です",
        })}
      />

      {index > 0 && (
        <Button type="button" size="form" variation="tertiary" onClick={removenNormal
        }>
          削除
        </Button>
      )}
    </div>
  );
}
