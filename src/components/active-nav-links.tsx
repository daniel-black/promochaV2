'use client';

import {
  RectangleStackIcon,
  Squares2X2Icon } from "@heroicons/react/24/outline";
import {
  RectangleStackIcon as RectangleStackIconSolid,
  Squares2X2Icon as  Squares2X2IconSolid
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const classes = 'h-5 w-5';

export default function ActiveNavLinks() {
  const selectedLayoutSegment = useSelectedLayoutSegment();

  return (
    <>
      <ActiveNavLink
        name="promocodes"
        selectedLayoutSegment={selectedLayoutSegment}
        outlineIcon={<RectangleStackIcon className={classes} />}
        solidIcon={<RectangleStackIconSolid className={classes} />}
      />
      <ActiveNavLink
        name="dashboard"
        selectedLayoutSegment={selectedLayoutSegment}
        outlineIcon={<Squares2X2Icon className={classes} />}
        solidIcon={<Squares2X2IconSolid className={classes} />}
      />
    </>
  )
}

type ActiveNavLinkProps = {
  name: string;
  selectedLayoutSegment: string | null;
  outlineIcon: React.ReactNode;
  solidIcon: React.ReactNode;
}

function ActiveNavLink({ name, selectedLayoutSegment, outlineIcon, solidIcon }: ActiveNavLinkProps) {
  const isActive = selectedLayoutSegment === name;
  return (
    <Link href={`/${name}`} className={`flex items-center justify-center px-3 py-0.5 border rounded ${isActive ? 'bg-neutral-100 border-neutral-200' : 'hover:bg-neutral-200 border-transparent'}`}>
      {isActive ? solidIcon : outlineIcon}
      <span className="ml-1 capitalize">{name}</span>
    </Link>
  )
}