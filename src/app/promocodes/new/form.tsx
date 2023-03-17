'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Form() {
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<Type>('amount');

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value.toUpperCase());

  return (
    <section className="rounded p-6 bg-neutral-100 w-full max-w-lg border border-neutral-200">
      <form className="space-y-6">
        <TextInput name="code" value={code} onChange={handleCodeChange} />
        <TypeToggle type={type} setType={setType} />
      </form>
    </section>
  );
}

type TextInputProps = {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({ name, value, onChange }: TextInputProps) {
  return (
    <FormSectionWrapper>
      <Label name={name} />
      <input
        value={value}
        onChange={onChange}
        type="text"
        id={name}
        className="uppercase w-full rounded-md p-3 bg-white border border-neutral-200"
      />
    </FormSectionWrapper>
  );
}

const types = ['amount', 'percent'] as const;
type Type = typeof types[number]

type TypeToggleProps = {
  type: Type;
  setType: Dispatch<SetStateAction<Type>>;
}

function TypeToggle({ type, setType }: TypeToggleProps) {
  const isAmount = type === 'amount';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setType(e.currentTarget.value as Type);
  }

  return (
    <FormSectionWrapper>
      <Label name="Discount Type" />
      <div className="flex gap-2">
        <button
          className={`w-full ${isAmount ? 'bg-green-200 border-green-300 text-green-700' : 'bg-neutral-200 text-neutral-600 border-neutral-300 hover:bg-neutral-300'} py-3 rounded-md border disabled:cursor-not-allowed transition-all duration-100`}
          value={'amount'}
          onClick={handleClick}
          disabled={isAmount}
        >
          Amount
        </button>
        <button
          className={`w-full ${!isAmount ? 'bg-indigo-200 border-indigo-300 text-indigo-700' : 'bg-neutral-200 text-neutral-600 border-neutral-300 hover:bg-neutral-300'} py-3 rounded-md border disabled:cursor-not-allowed transition-all duration-100`}
          value={'percent'}
          onClick={handleClick}
          disabled={!isAmount}
        >
          Percent
        </button>
      </div>
    </FormSectionWrapper>
  );
}

function Label({ name }: { name: string }) {
  return <label htmlFor={name} className="block text-neutral-500 capitalize">{name}</label>;
}

function FormSectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}