import { useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";
import { RecipeForm } from "../../types/recipe";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import FormError from "../../ui/FormError";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";
import { IngredientGroupFields } from "./IngredientGroupFields";
import IngredientFields from "./IngredientFields";

const IngredientSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

type Props = {
  title: string;
  submitLabel: string;
  isLoading: boolean;
  onCancel?: () => void;
};

export default function RecipeFormFields({
  title,
  submitLabel,
  isLoading,
  onCancel,
}: Props) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<RecipeForm>();

  const {
    fields: normalFields,
    append: appendNormal,
    remove: removenNormal,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: groupFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control,
    name: "ingredient_groups",
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
    move: moveStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  return (
    <>
      <h3>{title}</h3>
      <Label htmlFor="title">レシピ名</Label>
      <Input
        id="title"
        disabled={isLoading}
        {...register("title")}
        placeholder="タイトル"
      />
      {errors.title?.message && <FormError>{errors.title.message}</FormError>}

      <Label>材料</Label>

      <IngredientSection>
        {normalFields.map((field, index) => (
          <div key={field.id}>
            <IngredientFields
              register={register}
              index={index}
              removenNormal={() => removenNormal(index)}
            />
          </div>
        ))}
        <Button
          type="button"
          size="form"
          variation="tertiary"
          onClick={() => appendNormal({ name: "", amount: "" })}
          style={{ alignSelf: "flex-start", marginTop: "0.4rem" }}
        >
          材料を追加
        </Button>

        <Label>(だしグループ)</Label>

        {groupFields.map((group, index) => (
          <div key={group.id}>
            <IngredientGroupFields
              control={control}
              register={register}
              groupIndex={index}
              appendGroup={() =>
                appendGroup({
                  group_name: "",
                  items: [{ name: "", amount: "" }],
                })
              }
              onRemoveGroup={() => removeGroup(index)}
            />
          </div>
        ))}
        <Button
          type="button"
          size="form"
          variation="tertiary"
          onClick={() =>
            appendGroup({
              group_name: "",
              items: [{ name: "", amount: "" }],
            })
          }
          style={{ alignSelf: "flex-start", marginTop: "0.4rem" }}
        >
          グループを追加
        </Button>
      </IngredientSection>

      {stepFields.map((field, index) => (
        <div key={field.id}>
          <Label htmlFor={`steps.${index}.value`}>STEP {index + 1}</Label>
          <Textarea
            id={`steps.${index}.value`}
            disabled={isLoading}
            {...register(`steps.${index}.value`)}
            placeholder={`手順${index + 1}`}
          />
          {errors.steps?.[index]?.value?.message && (
            <FormError>{errors.steps[index].value.message}</FormError>
          )}

          {index >= 1 && (
            <Button
              type="button"
              variation="tertiary"
              onClick={() => removeStep(index)}
            >
              STEPを削除
            </Button>
          )}
          {index > 0 && (
            <Button
              type="button"
              variation="secondary"
              size="small"
              disabled={index === 0}
              onClick={() => moveStep(index, index - 1)}
            >
              ↑
            </Button>
          )}

          {index < stepFields.length - 1 && (
            <Button
              type="button"
              variation="secondary"
              size="small"
              disabled={index === stepFields.length - 1}
              onClick={() => moveStep(index, index + 1)}
            >
              ↓
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variation="tertiary"
        onClick={() => appendStep({ value: "" })}
      >
        STEPを追加
      </Button>
      <Label htmlFor="image_file">画像</Label>
      <Input
        id="image_file"
        type="file"
        accept="image/*"
        {...register("image_file")}
        disabled={isLoading}
      />

      <Label htmlFor="category">カテゴリー</Label>
      <Input
        id="category"
        disabled={isLoading}
        {...register("category")}
        placeholder="カテゴリー"
      />
      {errors.category?.message && (
        <FormError>{errors.category.message}</FormError>
      )}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "送信中" : submitLabel}
      </Button>

      {onCancel && (
        <Button type="button" onClick={onCancel} disabled={isLoading}>
          キャンセル
        </Button>
      )}
    </>
  );
}
