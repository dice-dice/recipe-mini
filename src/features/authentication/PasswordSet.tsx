import { useMutation } from "@tanstack/react-query";
import { resetPassword as resetPasswordApi } from "../../services/auth";
import { useForm } from "react-hook-form";
import { ResetPasswordFormValues } from "../../types/authType";

export default function PasswordSet() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<ResetPasswordFormValues>();
  const { mutate: resetPassword, isLoading } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      console.log("password reset success!");
      reset();
    },
  });

  function onSubmit({ new_password }: { new_password: string }) {
    resetPassword({ new_password });
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          disabled={isLoading}
          {...register("new_password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
        {errors?.new_password?.message}

        <input
          type="password"
          disabled={isLoading}
          {...register("new_passwordConfirm", {
            required: "This field is required",
            validate: (value) => {
              const password = getValues("new_password");
              if (!password) return true;
              return value === password || "Passwords need to match";
            },
          })}
        />
        {errors?.new_passwordConfirm?.message}
        <button type="submit">再設定</button>
      </form>
    </>
  );
}
