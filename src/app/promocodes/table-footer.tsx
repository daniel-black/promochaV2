import Link from "next/link";

export default function TableFooter() {
  return (
    <footer className="transparent">
      <Link href={'/promocodes/new'} className="block text-center text-neutral-600 hover:text-neutral-900 bg-neutral-200 py-3 rounded-b-md border border-b-0 border-neutral-300">
        ＋ New
      </Link>
    </footer>
  );
}