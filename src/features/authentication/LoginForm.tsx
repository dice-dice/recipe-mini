import { useForm } from "react-hook-form";
import { LoginFormValues } from "../../types/authType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Form } from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Heading from "../../ui/Heading";

export default function LoginForm({buttonName}:{buttonName:string}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();
  
  const { mutate: login, isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"],data.session?.user);
     if(location.pathname === "/login") navigate("/app/recipes", { replace: true });
     if(location.pathname === "/app/profile") navigate("/app/password", { replace: true });
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
    <>
    <Heading as="h2">ログイン</Heading>
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        disabled={isLoading}
        {...register("email", { required: "This field is required" })}
      />
      {errors?.email?.message}
      <Input
        type="password"
        disabled={isLoading}
        {...register("password", { required: "This field is required" })}
      />
      {errors?.password?.message}
      <Button type="submit">{buttonName}</Button>
    </Form>
    </>
  );
}
