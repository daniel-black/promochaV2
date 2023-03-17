import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";
import SignInUpButtons from "./sign-in-up-buttons";


function Navbar() {
  return (
    <nav className="bg-neutral-50 text-neutral-600 shadow-sm px-3 py-2 flex justify-between items-center">
      <Link href={'/'} className="font-semibold">ProMocha</Link>
      <div className="flex items-center space-x-5">
        <SignedIn>
          <Link href={'/promocodes'}>Promocodes</Link>
          <Link href={'/dashboard'}>Dashboard</Link>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <SignInUpButtons />
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;