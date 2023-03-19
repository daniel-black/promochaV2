'use client';

import { FormEvent, useState } from "react";
import DiscountInput from "./discount-input";
import TypeToggle, { Type } from "./type-toggle";
import TextInput from "./text-input";
import StartAndEndDateInputs from "./start-and-end-date-inputs";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { NewPromcodeSchema, NewPromcodeSchemaType } from "@/lib/zod";

async function postPromocode(body: NewPromcodeSchemaType) {
  const res = await fetch(`/api/promocode`, {
    method: 'POST',
    body: JSON.stringify(body),
  });

  return res.json();
}

export default function Form() {
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<Type>('amount');
  const [amountDiscount, setAmountDiscount] = useState<number>(5);
  const [percentDiscount, setPercentDiscount] = useState<number>(5);
  const [maxDiscount, setMaxDiscount] = useState<number>(Infinity);
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const auth = useAuth();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = {
      userId: auth.userId,
      code,
      type,
      discount: type === 'amount' ? amountDiscount : percentDiscount,
      maxDiscount: maxDiscount === Infinity ? null : maxDiscount,
      start: start,
      end: start,
    };

    const parsedFormData = NewPromcodeSchema.parse(formData);
    const data = await postPromocode(parsedFormData);

    console.log(data);

    setIsSubmitting(false);
    router.push('/promocodes');
  }

  return (
    <section className="rounded p-6 bg-neutral-100 w-full max-w-lg border border-neutral-200">
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            className="w-full py-3 cursor-pointer disabled:cursor-not-allowed rounded-md shadow hover:shadow-lg bg-neutral-300 hover:bg-neutral-400 text-neutral-700 hover:text-neutral-800 font-semibold transition-all duration-100 ease-in-out"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'CREATING...' : 'CREATE'}
          </button>
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