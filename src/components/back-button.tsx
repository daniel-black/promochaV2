import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BackButton({ backTo }: { backTo: string }) {
  return (
    <Link href={backTo} className='flex w-fit items-center space-x-2 text-neutral-500 hover:text-neutral-700 transition-all duration-75'>
      <ArrowLeftIcon className='h-4 w-4' />
      <span>Back</span>
    </Link>
  );
}