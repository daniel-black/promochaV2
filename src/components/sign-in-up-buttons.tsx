'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import { SignInButton, SignUpButton } from "@clerk/nextjs";

function SignInUpButtons() {
  const segment = useSelectedLayoutSegment();

  if (segment === '(auth)') return null;

  return (
    <>
      <SignInButton afterSignInUrl="/promocodes" mode="modal" />
      <SignUpButton afterSignUpUrl="/promocodes" mode="modal" />
    </>
  );
}

export default SignInUpButtons