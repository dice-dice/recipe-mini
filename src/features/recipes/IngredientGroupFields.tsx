import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import { RecipeForm } from "../../types/recipe";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

type Props = {
  control: Control<RecipeForm>;
  register: UseFormRegister<RecipeForm>;
  groupIndex: number;
  onRemoveGroup: () => void;
  appendGroup: () => void
};

export function IngredientGroupFields({
  control,
  register,
  groupIndex,
  onRemoveGroup,
}: Props) {
  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: `ingredient_groups.${groupIndex}.items`,
  });

  return (
    <div>
      <Input
        placeholder="グループ名"
        {...register(`ingredient_groups.${groupIndex}.group_name`)}
      />

      {itemFields.map((item, itemIndex) => (
        <div key={item.id}>
          <Input
            placeholder="材料名"
            {...register(
              `ingredient_groups.${groupIndex}.items.${itemIndex}.name`
            )}
          />
          <Input
            placeholder="分量"
            {...register(
              `ingredient_groups.${groupIndex}.items.${itemIndex}.amount`
            )}
          />

          <Button
            type="button" size="form"
            onClick={() => removeItem(itemIndex)}
          >
            削除
          </Button>
        </div>
      ))}

      <Button
        type="button" size="form"
        onClick={() => appendItem({ name: "", amount: "" })}
      >
        材料を追加
      </Button>
      
    { groupIndex >= 1 &&
      <Button
        type="button"
        size="form"
        variation="secondary"
        onClick={onRemoveGroup}
      >
        グループ削除
      </Button>
}
    </div>
  );
}
