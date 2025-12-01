import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { signup as signupApi } from "../../services/auth";

import { SignupFormValues } from "../../types/authType"; 

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("fullName", { required: "This field is required" })}
        />
        {errors?.fullName?.message}
        <input
          type="email"
          {...register("email", { required: "This field is required" })}
        />
        {errors?.email?.message}
        <input
          type="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.password?.message}

        <input
          type="password"
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
        <button type="submit">ユーザ登録</button>
      </form>
    </>
  );
}
