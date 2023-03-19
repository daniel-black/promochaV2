'use client';

import type { Promocode } from "@prisma/client";
import { useState } from "react";
import { Type } from "../new/type-toggle";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { UpdatePromocodeSchemaType } from "@/lib/zod";
import { useRouter } from "next/navigation";

function formatDateString(dateString: string | Date) {
  return new Date(dateString).toISOString().slice(0, 10);
}

async function updatePromocode(args: UpdatePromocodeSchemaType) {
  const res = await fetch('/api/promocode', {
    method: 'PATCH',
    body: JSON.stringify(args),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export default function EditablePromocode({ promocode }: { promocode: Promocode }) {
  const [code, setCode] = useState<string>(promocode.code);
  const [discount, setDiscount] = useState<number>(promocode.discount);
  const [maxDiscount, setMaxDiscount] = useState<number>(promocode.maxDiscount ?? Infinity);
  const [start, setStart] = useState<string>(formatDateString(promocode.start));
  const [end, setEnd] = useState<string>(formatDateString(promocode.end));

  const [updating, setUpdating] = useState<boolean>(false);

  const router = useRouter();

  const { id, type, createdAt, updatedAt } = promocode;

  const codeModified = code !== promocode.code;
  const discountModified = discount !== promocode.discount;
  const maxDiscountModified = type === 'percent' ? maxDiscount !== promocode.maxDiscount : false;
  const startModified = start !== formatDateString(promocode.start);
  const endModified = end !== formatDateString(promocode.end);

  const anyModified = codeModified || discountModified || maxDiscountModified || startModified || endModified;

  async function handleSaveClick() {
    const updatedCode = await updatePromocode({
      id,
      code,
      discount,
      maxDiscount: maxDiscount === Infinity ? null : maxDiscount,
      start,
      end,
    }) as string;

    setUpdating(false);
    if (updatedCode === promocode.code) {
      router.refresh();
    } else {
      router.push(`/promocodes/${updatedCode}`);
    }
  }

  return (
    <main className="space-y-5 w-full max-w-2xl rounded-lg border border-neutral-200 p-5 bg-neutral-100">
      <div className="flex space-x-3">
        <TypeIndicator type={type as Type} />
        <div className="relative grow">
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase())}
            className={`w-full text-3xl bg-transparent outline-none p-3 border ${codeModified ? 'border-neutral-200' : 'border-transparent'} hover:border-neutral-200 focus:bg-neutral-50 focus:border-neutral-200 rounded-lg`}
            disabled={updating}
          />
          {codeModified && <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setCode(promocode.code)} /></span>}
        </div>
      </div>
      <hr />
      <div className="space-y-5">
        {/* Discounts */}
        <div className="flex space-x-6">
          <div className="relative w-fit">
            <div className="absolute top-0 left-2 h-full flex justify-end items-center text-2xl pointer-events-none">$</div>
            <input
              type="number"
              value={discount}
              onChange={e => setDiscount(e.target.valueAsNumber)}
              className={`text-2xl py-2 pl-6 pr-2 w-36 rounded-lg bg-transparent outline-none border ${discount !== promocode.discount ? 'border-neutral-200': 'border-transparent'} hover:border-neutral-300 focus:border-neutral-300 focus:bg-neutral-50 max-w-fit`}
              disabled={updating}
            />
            <div className="absolute top-0 left-[70px] h-full flex justify-end items-center text-2xl pointer-events-none">off</div>
            {discountModified && <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setDiscount(promocode.discount)} /></span>}
          </div>

          {type === 'percent' && promocode.maxDiscount !== null &&
            <div className="relative w-fit">
              <div className="absolute top-0 left-2 h-full flex justify-end items-center text-2xl pointer-events-none">up to $</div>
              <input
                type="number"
                value={maxDiscount}
                onChange={e => setMaxDiscount(e.target.valueAsNumber)}
                className={`text-2xl py-2 pl-[82px] pr-2 w-44 rounded-lg bg-transparent outline-none border ${maxDiscount !== promocode.maxDiscount ? 'border-neutral-200': 'border-transparent'} hover:border-neutral-300 focus:border-neutral-300 focus:bg-neutral-50 max-w-fit`}
                disabled={updating}
              />
              {maxDiscountModified && <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setMaxDiscount(promocode.maxDiscount ?? Infinity)} /></span>}
            </div>
          }
        </div>

        {/* Dates */}
        <div className="flex space-x-6">
          <div className="space-x-2 flex items-center">
            <span className="text-2xl pl-2">From</span>
            <div className="relative w-fit">
              <input
                type="date"
                value={start}
                onChange={e => setStart(e.target.value)}
                className={`text-2xl p-2 w-[182px] rounded-lg bg-transparent outline-none border ${start !== new Date(promocode.start).toISOString().slice(0, 10) ? 'border-neutral-200': 'border-transparent'} hover:border-neutral-300 focus:border-neutral-300 focus:bg-neutral-50 max-w-fit`}
                disabled={updating}
              />
              {startModified && <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setStart(formatDateString(promocode.start))} /></span>}
            </div>
          </div>
          <div className="space-x-2 flex items-center">
            <span className="text-2xl">To</span>
            <div className="relative w-fit">
              <input
                type="date"
                value={end}
                onChange={e => setEnd(e.target.value)}
                min={start}
                className={`text-2xl p-2 w-[182px] rounded-lg bg-transparent outline-none border ${end !== new Date(promocode.end).toISOString().slice(0, 10) ? 'border-neutral-200': 'border-transparent'} hover:border-neutral-300 focus:border-neutral-300 focus:bg-neutral-50 max-w-fit`}
                disabled={updating}
              />
              {endModified && <span className="absolute -top-3 -right-3"><ResetButton handleClick={() => setEnd(formatDateString(promocode.end))} /></span>}
            </div>
          </div>
        </div>
        <hr />
        <div className="flex justify-between items-end px-2">
          <div className="text-sm text-neutral-500">
            <div className="w-40 flex justify-between items-baseline">
              <span>Created</span>
              <p className="flex items-center space-x-1"><CalendarIcon className="h-3 w-3" /><span>{new Date(createdAt).toLocaleDateString()}</span></p>
            </div>
            <div className="w-40 flex justify-between items-baseline">
              <span>Updated</span>
              <p className="flex items-center space-x-1"><CalendarIcon className="h-3 w-3" /><span>{new Date(updatedAt).toLocaleDateString()}</span></p>
            </div>
          </div>
          {anyModified &&
            <div className="space-x-2">
              <button
                className="px-3 py-1.5 rounded text-neutral-600 hover:text-neutral-800 bg-neutral-300 hover:bg-neutral-400 border-neutral-400 hover:border-neutral-500 border transition-all duration-100"
                onClick={e => {
                  e.preventDefault();
                  setCode(promocode.code);
                  setDiscount(promocode.discount);
                  setMaxDiscount(promocode.maxDiscount ?? Infinity);
                  setStart(formatDateString(promocode.start))
                  setEnd(formatDateString(promocode.end))
                }}
                disabled={updating}
              >
                Reset All
              </button>
              <button
                className="px-3 py-1.5 rounded text-neutral-200 hover:text-neutral-50 bg-neutral-600 hover:bg-neutral-700 border-neutral-700 hover:border-neutral-800 border transition-all duration-100"
                onClick={e => {
                  setUpdating(true);
                  e.preventDefault();
                  handleSaveClick();
                }}
                disabled={updating}
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          }
        </div>
      </div>
    </main>
  );
}

function TypeIndicator({ type }: { type: Type }) {
  const colors = type === 'amount'
    ? 'bg-green-200 text-green-700 border-green-300' 
    : 'bg-indigo-100 text-indigo-600 border-indigo-200';
  return <div className={`${colors} border rounded-lg w-[60px] h-[60px] text-4xl flex justify-center items-center`}>{type === 'amount' ? '$' : '%'}</div>;
}

function ResetButton({ handleClick }: { handleClick: () => void }) {
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