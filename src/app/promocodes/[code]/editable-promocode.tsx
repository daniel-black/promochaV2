'use client';

import type { Promocode } from "@prisma/client";
import { useState } from "react";
import { Type } from "../new/type-toggle";

type Props = { promocode: Promocode };

export default function EditablePromocode({ promocode }: Props) {
  const [code, setCode] = useState<string>(promocode.code);
  const [discount, setDiscount] = useState<number>(promocode.discount);
  const [maxDiscount, setMaxDiscount] = useState<number | null>(promocode.maxDiscount);
  const [start, setStart] = useState<Date>(new Date(promocode.start));
  const [end, setEnd] = useState<Date>(new Date(promocode.end));

  const { type, id, createdAt, updatedAt } = promocode;

  return (
    <main className="space-y-5 w-full max-w-2xl rounded-lg border border-neutral-200 p-5 bg-neutral-100">
      <div className="flex space-x-3">
        <TypeIndicator type={type as Type} />
        
        <div className="relative grow">
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className="w-full text-3xl bg-transparent outline-none p-3 border border-transparent hover:border-neutral-200 focus:bg-neutral-50 focus:border-neutral-200 rounded-lg"
          />
          {code !== promocode.code &&
            <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setCode(promocode.code)} /></span>
          }
        </div>
      </div>
      
      <hr />
      
    </main>
  );
}

function TypeIndicator({ type }: { type: Type }) {
  const colors = type === 'amount'
    ? 'bg-green-200 text-green-700 border-green-300' 
    : 'bg-indigo-100 text-indigo-600 border-indigo-200';
  return <div className={`${colors} border rounded-lg w-[60px] h-[60px] text-4xl flex justify-center items-center`}>{type === 'amount' ? '$' : '%'}</div>;
}

type ResetButtonProps = {
  handleClick: () => void;
}

function ResetButton({ handleClick }: ResetButtonProps) {
  return (
    <button
      className="z-10 w-8 h-8 shrink-0 rounded-full bg-neutral-50 border border-neutral-200 flex justify-center items-center text-neutral-500"
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`h-4 w-4 rotate-180`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
      </svg>
    </button>
  )
}