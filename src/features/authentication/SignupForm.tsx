import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/auth";
import { signupSchema, SignupFormValues } from "../../schemas/authSchema";

import { Form } from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function SignupForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("登録しました");
      reset();
    },
    onError: (err: Error) => {
      toast.error(err.message || "登録に失敗しました");
    },
  });

  function onSubmit({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) {
    signup({ fullName, email, password });
  }

  return (
    <>
      <Heading as="h2">新規登録</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="氏名"
          type="text"
          disabled={isPending}
          {...register("fullName")}
        />
        {errors?.fullName?.message && <span>{errors.fullName.message}</span>}
        <Input
          placeholder="メールアドレス"
          type="text"
          disabled={isPending}
          {...register("email")}
        />
        {errors?.email?.message && <span>{errors.email.message}</span>}
        <Input
          placeholder="パスワード"
          type="password"
          disabled={isPending}
          {...register("password")}
        />
        {errors?.password?.message && <span>{errors.password.message}</span>}

        <Input
          placeholder="パスワード再確認"
          type="password"
          disabled={isPending}
          {...register("passwordConfirm")}
        />
        {errors?.passwordConfirm?.message && (
          <span>{errors.passwordConfirm.message}</span>
        )}
        <Button type="submit">ユーザ登録</Button>
      </Form>
    </>
  );
}
