// import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/app/recipes", { replace: true });
    },
    onError: (err) => {
      console.log("Error", err);
    },
  });

  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  //   getValues,
  //   reset,
  // } = useForm<LoginFormValues>();

  // function onSubmit({ email, password }: LoginFormValues) {
  //   login({ email, password });
  // }

const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
 

  function handleSubmit(e: any) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        disabled={isLoading}
        value={email}
          onChange={(e) => setEmail(e.target.value)}
        // {...register("email", { required: "This field is required" })}
      />
      {/* {errors?.email?.message} */}
      <input
        type="password"
        disabled={isLoading}
        value={password}
          onChange={(e) => setPassword(e.target.value)}
        // {...register("password", { required: "This field is required" })}
      />
      {/* {errors?.password?.message} */}
      <button type="submit">ログイン</button>
    </form>
  );
}
