'use client';

import { useState } from "react";
import DiscountInput from "./discount-input";
import TypeToggle, { Type } from "./type-toggle";
import TextInput from "./text-input";
import StartAndEndDateInputs from "./start-and-end-date-inputs";

export default function Form() {
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<Type>('amount');
  const [amountDiscount, setAmountDiscount] = useState<number>(5);
  const [percentDiscount, setPercentDiscount] = useState<number>(5);
  const [maxDiscount, setMaxDiscount] = useState<number>(Infinity);
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');

  return (
    <section className="rounded p-6 bg-neutral-100 w-full max-w-lg border border-neutral-200">
      <form className="space-y-6">
        <TextInput
          name="code"
          value={code}
          onChange={setCode}
        />
        <TypeToggle
          type={type}
          setType={setType}
        />
        <DiscountInput
          type={type}
          amountDiscount={amountDiscount}
          percentDiscount={percentDiscount}
          maxDiscount={maxDiscount}
          setAmountDiscount={setAmountDiscount}
          setPercentDiscount={setPercentDiscount}
          setMaxDiscount={setMaxDiscount}
        />
        <StartAndEndDateInputs
          start={start}
          end={end}
          setStart={setStart}
          setEnd={setEnd}
        />
        <FormSectionWrapper>
          <input
            type="submit"
            value={'CREATE'}
            className="w-full py-3 rounded-md shadow bg-neutral-300 text-neutral-700 font-semibold"
          />
        </FormSectionWrapper>
      </form>
    </section>
  );
}

export function Label({ name }: { name: string }) {
  return <label htmlFor={name.replaceAll(' ', '-')} className="block text-neutral-500 capitalize">{name}</label>;
}

export function FormSectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1 w-full">{children}</div>;
}