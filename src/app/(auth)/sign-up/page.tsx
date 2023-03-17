import { SignUp } from "@clerk/nextjs/app-beta";

export default function SignUpPage() {
  return <SignUp afterSignUpUrl="/promocodes" signInUrl="/sign-in" />;
}