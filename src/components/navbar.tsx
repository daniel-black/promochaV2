import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";
import SignInUpButtons from "./sign-in-up-buttons";
import CoffeeIcon from "./coffee-icon";
import ActiveNavLinks from "./active-nav-links";



function Navbar() {
  return (
    <nav className="bg-neutral-50 text-neutral-600 shadow-sm p-3 flex justify-between items-center">
      <Link href={'/'} className="flex justify-center items-center">
        <CoffeeIcon />
        <span className="ml-1 font-semibold">ProMocha</span>
      </Link>
      <div className="flex items-center space-x-10">
        <SignedIn>
          <ActiveNavLinks />
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