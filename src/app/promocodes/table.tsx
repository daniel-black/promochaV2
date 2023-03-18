'use client';

import type { Promocode } from "@prisma/client";
import TableFooter from "./table-footer";
import Link from "next/link";
import { Type } from "./new/type-toggle";
import { Dispatch, SetStateAction, useState } from "react";
import { CalendarIcon, TagIcon, GiftIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline'

type TableProps = {
  promocodes: Promocode[];
};

const columnNames = ['code', 'discount', 'start', 'end'] as const;
type Column = typeof columnNames[number];

export default function Table({ promocodes }: TableProps) {
  const [sortBy, setSortBy] = useState<Column>();
  const [reverse, setReverse] = useState<boolean>(false);

  return (
    <main className="w-full">
      <TableHeader
        sortBy={sortBy}
        reverse={reverse}
        setSortBy={setSortBy}
        setReverse={setReverse}
      />
      <TableBody
        promocodes={promocodes}
        sortBy={sortBy}
        reverse={reverse}
      />
      <TableFooter />
    </main>
  );
}

type TableHeaderProps = {
  sortBy: Column | undefined;
  reverse: boolean;
  setSortBy: Dispatch<SetStateAction<Column | undefined>>
  setReverse: Dispatch<SetStateAction<boolean>>;
};

function TableHeader({ sortBy, reverse, setSortBy, setReverse }: TableHeaderProps) {
  return (
    <header className="flex justify-between items-center py-3 rounded-t-md bg-neutral-200 border border-neutral-300">
      <button
        className="w-1/4 text-neutral-600 flex justify-center items-center group"
        onClick={e => {
          e.preventDefault();
          if (sortBy === 'code') {
            setReverse(!reverse);
          } else {
            setSortBy('code');
          }
        }}
      >
        <GiftIcon className="w-5 h-5" />
        <span className="ml-2 mr-1">Code</span>
        <ChevronUpDownIcon className={`w-5 h-5 ${sortBy === 'code' ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-neutral-600'} transition-all duration-75`} />
      </button>
      <button
        className="w-1/4 text-neutral-600 flex justify-center items-center group"
        onClick={e => {
          e.preventDefault();
          if (sortBy === 'discount') {
            setReverse(!reverse);
          } else {
            setSortBy('discount');
          }
        }}
      >
        <TagIcon className="w-5 h-5" />
        <span className="ml-2 mr-1">Discount</span>
        <ChevronUpDownIcon className={`w-5 h-5 ${sortBy === 'discount' ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-neutral-600'} transition-all duration-75`} />
      </button>
      <button
        className="w-1/4 text-neutral-600 flex items-center justify-center group"
        onClick={e => {
          e.preventDefault();
          if (sortBy === 'start') {
            setReverse(!reverse);
          } else {
            setSortBy('start');
          }
        }}
      >
        <CalendarIcon className="w-5 h-5" />
        <span className="ml-2 mr-1">Start</span>
        <ChevronUpDownIcon className={`w-5 h-5 ${sortBy === 'start' ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-neutral-600'} transition-all duration-75`} />
      </button>
      <button
        className="w-1/4 text-neutral-600 flex justify-center items-center group"
        onClick={e => {
          e.preventDefault();
          if (sortBy === 'end') {
            setReverse(!reverse);
          } else {
            setSortBy('end');
          }
        }}
      >
        <CalendarIcon className="w-5 h-5" />
        <span className="ml-2 mr-1">End</span>
        <ChevronUpDownIcon className={`w-5 h-5 ${sortBy === 'end' ? 'text-neutral-600' : 'text-neutral-400 group-hover:text-neutral-600'} transition-all duration-75`} />
      </button>
    </header>
  );
}

function getSortedPromocodes(promocodes: Promocode[], sortBy: Column | undefined, reverse: boolean) {
  let sorted = promocodes;

  switch (sortBy) {
    case 'code':
      sorted = sortByCode(promocodes);
      break;
    case 'discount':
      sorted = sortByDiscount(promocodes);
      break;
    case 'start':
      sorted = sortByDate(promocodes, 'start');
      break;
    case 'end':
      sorted = sortByDate(promocodes, 'end');
      break;
  }

  return reverse ? sorted.reverse() : sorted;
}

function sortByCode(promocodes: Promocode[]) {
  return promocodes.sort((a, b) => {
    if (a.code < b.code) return -1;
    if (a.code > b.code) return 1;
    return 0;
  });
}

function sortByDiscount(promocodes: Promocode[]) {
  const amountSorted = promocodes.filter(p => p.type === 'amount').sort((a, b) => a.discount - b.discount);
  const percentSorted = promocodes.filter(p => p.type === 'percent').sort((a, b) => a.discount - b.discount);
  return amountSorted.concat(percentSorted);
}

function sortByDate(promocodes: Promocode[], sortBy: 'start' | 'end') {
  return promocodes.sort((a, b) => {
    const aDate = new Date(a[sortBy]);
    const bDate = new Date(b[sortBy]);
    if (aDate < bDate) return -1;
    if (aDate > bDate) return 1;
    return 0;
  });
}

type TableBodyProps = {
  promocodes: Promocode[];
  sortBy: Column | undefined;
  reverse: boolean;
}

function TableBody({ promocodes, sortBy, reverse }: TableBodyProps) {
  const sortedPromocodes = getSortedPromocodes(promocodes, sortBy, reverse);

  return (
    <section className="bg-neutral-100 border-x border-neutral-300 max-h-[73vh] overflow-y-auto">
      {promocodes && promocodes.length > 0 ? (
        sortedPromocodes.map(p =>
          <div key={p.code} className="flex justify-between items-center py-3 border-l-4 border-transparent hover:shadow-sm hover:border-neutral-300 hover:bg-neutral-50 group transition-all duration-75">
            <PromocodeLink code={p.code} />
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
    : ['bg-indigo-100 text-indigo-600 border-indigo-200', `${discount}%`];

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