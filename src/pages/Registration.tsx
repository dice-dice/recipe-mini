import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";


export default function Registration() {
  return (
    <>
     <Heading as="h1">新規登録フォーム</Heading> 
     <SignupForm />
    </>
  )
}
