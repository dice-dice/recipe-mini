import LoginForm from "../features/authentication/LoginForm"
import AuthLayout from "../ui/AuthLayout"


export default function Login() {
  
  return (
    <AuthLayout>
      <LoginForm buttonName="ログイン" />
    </AuthLayout>
  )
}
