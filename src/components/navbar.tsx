import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs/app-beta";
import SignInUpButtons from "./sign-in-up-buttons";
import { RectangleStackIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import CoffeeIcon from "./coffee-icon";


function Navbar() {
  return (
    <nav className="bg-neutral-50 text-neutral-600 shadow-sm px-3 py-2 flex justify-between items-center">
      <Link href={'/'} className="flex justify-center items-center">
        <CoffeeIcon />
        <span className="ml-1 font-semibold">ProMocha</span>
      </Link>
      <div className="flex items-center space-x-10">
        <SignedIn>
          <Link href={'/promocodes'} className="flex items-center justify-center">
            <RectangleStackIcon className="w-5 h-5" />
            <span className="ml-1">Promocodes</span>
          </Link>
          <Link href={'/dashboard'} className="flex items-center justify-center">
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-1">Dashboard</span>
          </Link>
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