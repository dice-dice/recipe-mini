import { useForm } from "react-hook-form";
import { LoginFormValues } from "../../types/authType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"],data.session?.user);
      navigate("/app/recipes", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<LoginFormValues>();

  function onSubmit({ email, password }: LoginFormValues) {
    login({ email, password });
    reset({ email: "",password: ""});
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        disabled={isLoading}
        {...register("email", { required: "This field is required" })}
      />
      {errors?.email?.message}
      <input
        type="password"
        disabled={isLoading}
        {...register("password", { required: "This field is required" })}
      />
      {errors?.password?.message}
      <button type="submit">ログイン</button>
    </form>
  );
}
