import { useFormContext } from "react-hook-form";
import { RecipeForm } from "../../types/recipe";
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import FormError from "../../ui/FormError";
import Textarea from "../../ui/Textarea";
import Button from "../../ui/Button";

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
    register,
    formState: { errors },
  } = useFormContext<RecipeForm>();
  return (
    <>
      <h3>{title}</h3>
      <Label htmlFor="title">レシピ名</Label>
      <Input
        id="title"
        disabled={isLoading}
        {...register("title", { required: "This field is required" })}
        placeholder="タイトル"
      />
      {errors?.title?.message && (
        <FormError>{errors?.title?.message}</FormError>
      )}
      <Label htmlFor="ingredients">材料</Label>
      <Textarea
        id="ingredients"
        disabled={isLoading}
        {...register("ingredients", { required: "This field is required" })}
        placeholder="材料"
      />
      {errors?.ingredients?.message && (
        <FormError>{errors?.ingredients?.message}</FormError>
      )}
      <Label htmlFor="step1">STEP1</Label>
      <Textarea
        className="step"
        id="step1"
        disabled={isLoading}
        {...register("step1", { required: "This field is required" })}
        placeholder="手順1"
      />
      {errors?.step1?.message && (
        <FormError>{errors?.step1?.message}</FormError>
      )}
      <Label htmlFor="step2">STEP2</Label>
      <Textarea
        className="step"
        id="step2"
        disabled={isLoading}
        {...register("step2")}
        placeholder="手順2"
      />
      {errors?.step2?.message && (
        <FormError>{errors?.step2?.message}</FormError>
      )}
      <Label htmlFor="step3">STEP3</Label>
      <Textarea
        className="step"
        id="step3"
        disabled={isLoading}
        {...register("step3")}
        placeholder="手順3"
      />
      {errors?.step3?.message && (
        <FormError>{errors?.step3?.message}</FormError>
      )}
      <Label htmlFor="file">アップロード</Label>
      <Input
        id="file"
        type="file"
        accept="image/*"
        {...register("image_file")}
        disabled={isLoading}
      />
      <Label htmlFor="category">カテゴリー</Label>
      <Input
        id="category"
        disabled={isLoading}
        {...register("category", { required: "This field is required" })}
        placeholder="カテゴリー"
      />
      {errors?.category?.message && (
        <FormError>{errors?.category?.message}</FormError>
      )}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "送信中" : submitLabel}
      </Button>
      {onCancel && (
        <Button type="button" onClick={onCancel}>
          キャンセル
        </Button>
      )}
    </>
  );
}
