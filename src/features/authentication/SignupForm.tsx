import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signup as signupApi } from "../../services/auth";

import { SignupFormValues } from "../../types/authType";
import { Form } from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignupFormValues>();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      console.log("signup success!");
      reset();
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
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.fullName?.message}
        <Input
          placeholder="メールアドレス"
          type="email"
          disabled={isLoading}
          {...register("email", { required: "This field is required" })}
        />
        {errors?.email?.message}
        <Input
          placeholder="パスワード"
          type="password"
          disabled={isLoading}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message}

        <Input
          placeholder="パスワード再確認"
          type="password"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            // validate: (value) => value === getValues().password || "Passwords need to match",
            validate: (value) => {
              const password = getValues("password");
              if (!password) return true;
              return value === password || "Passwords need to match";
            },
          })}
        />
        {errors?.passwordConfirm?.message}
        <Button type="submit">ユーザ登録</Button>
      </Form>
    </>
  );
}
