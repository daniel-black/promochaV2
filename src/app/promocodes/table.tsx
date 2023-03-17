'use client';

import type { Promocode } from "@prisma/client";
import TableFooter from "./table-footer";

type TableProps = {
  promocodes: Promocode[];
};

export default function Table(props: TableProps) {
  return (
    <main className="w-full">
      <TableHeader />
      <TableBody {...props} />
      <TableFooter />
    </main>
  );
}

const columnNames = ['Code', 'Discount', 'Start', 'End'] as const;

function TableHeader() {
  return (
    <header className="flex justify-between items-center py-3 rounded-t-md bg-neutral-200 border border-b-0 border-neutral-300">
      {columnNames.map(c =>
        <button
          key={c}
          className="text-center w-1/4 text-neutral-600"
        >
          {c}
        </button>
      )}
    </header>
  );
}

function TableBody({ promocodes }: TableProps) {
  return (
    <section className="bg-neutral-100 border-x border-neutral-300">
      {promocodes && promocodes.length > 0 ? (
        promocodes.map(p =>
          <div key={p.code} className="flex justify-between items-center py-3">
            <div className="text-center w-1/4">{p.code}</div>
            <div className="text-center w-1/4">{p.discount}</div>
            <div className="text-center w-1/4">{new Date(p.start).toDateString()}</div>
            <div className="text-center w-1/4">{new Date(p.end).toDateString()}</div>
          </div>  
        )
      ) : (
        <div className=" py-10 flex justify-center">
          <span className="px-4 py-2 text-xl bg-yellow-200 text-yellow-700 rounded-lg border border-yellow-400">No promocodes found!</span>
        </div>
      )}
    </section>
  );
}