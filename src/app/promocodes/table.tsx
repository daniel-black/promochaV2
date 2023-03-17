'use client';

import type { Promocode } from "@prisma/client";
import Link from "next/link";

type TableProps = {
  promocodes: Promocode[];
};

export default function Table(props: TableProps) {
  return (
    <main className="w-full px-2 sm:px-4 md:px-8 lg:px-16">
      <TableHeader />
      <TableBody {...props} />
      <TableFooter />
    </main>
  );
}

function TableHeader() {
  return (
    <header className="flex justify-between items-center py-3 rounded-t-md bg-neutral-200 border border-b-0 border-neutral-300">
      <button className="text-center w-1/4 text-neutral-600">Code</button>
      <button className="text-center w-1/4 text-neutral-600">Discount</button>
      <button className="text-center w-1/4 text-neutral-600">Start</button>
      <button className="text-center w-1/4 text-neutral-600">Stop</button>
    </header>
  );
}

function TableBody({ promocodes }: TableProps) {
  return (
    <section className="bg-neutral-100 border-x border-neutral-300">
      {promocodes && promocodes.length > 0 ? (
        <>{JSON.stringify(promocodes, null, 2)}</>
      ) : (
        <div className=" py-10 flex justify-center">
          <span className="px-4 py-2 text-xl bg-yellow-200 text-yellow-700 rounded-lg border border-yellow-400">No promocodes found!</span>
        </div>
      )}
    </section>
  )
}

function TableFooter() {
  return (
    <footer className="transparent">
      <Link href={'/promocodes/new'} className="block text-center text-neutral-600 hover:text-neutral-900 bg-neutral-200 py-3 rounded-b-md border border-b-0 border-neutral-300">
        ＋ New
      </Link>
    </footer>
  );
}