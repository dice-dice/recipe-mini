import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  resetPasswordSchema,
  ResetPasswordFormValues,
} from "../../schemas/authSchema";
import { Form } from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

export default function PasswordSet() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success("パスワードを変更しました");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message || "パスワード変更に失敗しました");
    },
  });

  function onSubmit({ new_password }: { new_password: string }) {
    resetPassword({ new_password });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="password"
          disabled={isPending}
          placeholder="新しいパスワード"
          {...register("new_password")}
        />
        {errors?.new_password?.message && (
          <span>{errors.new_password.message}</span>
        )}

        <Input
          type="password"
          disabled={isPending}
          placeholder="新しいパスワードの再入力"
          {...register("new_passwordConfirm")}
        />
        {errors?.new_passwordConfirm?.message && (
          <span>{errors.new_passwordConfirm.message}</span>
        )}
        <Button type="submit">再設定</Button>
      </Form>
    </>
  );
}
