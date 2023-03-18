'use client';

import type { Promocode } from "@prisma/client";
import TableFooter from "./table-footer";
import Link from "next/link";
import { Type } from "./new/type-toggle";

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

function TableHeader() {
  return (
    <header className="flex justify-between items-center py-3 rounded-t-md bg-neutral-200 border border-neutral-300">
      <button
        className="text-center w-1/4 text-neutral-600"
      >
        Code
      </button>
      <button
        className="text-center w-1/4 text-neutral-600"
      >
        Discount
      </button>
      <button
        className="text-center w-1/4 text-neutral-600"
      >
        Start
      </button>
      <button
        className="text-center w-1/4 text-neutral-600"
      >
        End
      </button>
    </header>
  );
}

function TableBody({ promocodes }: TableProps) {
  return (
    <section className="bg-neutral-100 border-x border-neutral-300 max-h-[73vh] overflow-y-auto">
      {promocodes && promocodes.length > 0 ? (
        promocodes.map(p =>
          <div key={p.code} className="flex justify-between items-center py-3 hover:bg-neutral-50 group">
            <PromocodeLink code={p.code} />
            {/* <div className="text-center w-1/4">{p.discount}</div> */}
            <DiscountCell discount={p.discount} type={p.type as Type} />
            <DateCell date={p.start} />
            <DateCell date={p.end} />
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

type PromocodeLinkProps = {
  code: string;
};

function PromocodeLink({ code }: PromocodeLinkProps) {
  return (
    <div className="text-center w-1/4">
      <Link href={`/promocodes/${code}`} className="block w-full h-full font-mono group-hover:underline text-neutral-800">
        {code}
      </Link>
    </div>
  );
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  currencyDisplay: 'symbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

type DiscountCellProps = {
  discount: number;
  type: Type;
};

function DiscountCell({ discount, type }: DiscountCellProps) {
  const [style, discountText] = type === 'amount'
    ? ['bg-green-200 text-green-700 border-green-300', currencyFormatter.format(discount)]
    : ['bg-indigo-200 text-indigo-700 border-indigo-300', `${discount}%`];

  return (
    <div className="text-center w-1/4 flex justify-center items-center">
      <span className={`block w-14 rounded-lg text-sm text-center border ${style}`}>
        {discountText}
      </span>
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: '2-digit',
  month: '2-digit',
  day: '2-digit',
});

type DateCellProps = {
  date: Date | string;
};

function DateCell({ date }: DateCellProps) {
  return (
    <div className="text-center w-1/4 text-neutral-500">
      {dateFormatter.format(new Date(date))}
    </div>
  );
}