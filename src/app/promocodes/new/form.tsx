'use client';

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function Form() {
  const [code, setCode] = useState<string>('');
  const [type, setType] = useState<Type>('amount');
  const [amountDiscount, setAmountDiscount] = useState<number>(5);
  const [percentDiscount, setPercentDiscount] = useState<number>(5);
  const [maxDiscount, setMaxDiscount] = useState<number>(Infinity);

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => setCode(e.target.value.toUpperCase());

  return (
    <section className="rounded p-6 bg-neutral-100 w-full max-w-lg border border-neutral-200">
      <form className="space-y-6">
        <TextInput
          name="code"
          value={code}
          onChange={handleCodeChange}
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
        className="uppercase font-mono w-full rounded-md p-3 bg-white border border-neutral-200"
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
      <Label name="discount type" />
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

type DiscountInputProps = {
  type: Type;
  amountDiscount: number;
  percentDiscount: number;
  maxDiscount: number;
  setAmountDiscount: Dispatch<SetStateAction<number>>;
  setPercentDiscount: Dispatch<SetStateAction<number>>;
  setMaxDiscount: Dispatch<SetStateAction<number>>;
};

function DiscountInput(props: DiscountInputProps) {
  const isAmount = props.type === 'amount';

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (isAmount) {
      props.setAmountDiscount(e.target.valueAsNumber);
    } else {
      props.setPercentDiscount(e.target.valueAsNumber);
    }
  }

  return (
    <>
      <FormSectionWrapper>
        <Label name="discount" />
        <div className="relative">
          <span className="absolute h-full w-12 bg-neutral-50 rounded-l-md border text-neutral-400 flex justify-center items-center">{isAmount ? '$' : '%'}</span>
          <input
            type="number"
            value={isAmount ? props.amountDiscount : props.percentDiscount}
            min={0}
            max={isAmount ? 1000 : 100}
            onChange={handleDiscountChange}
            id="discount"
            className="w-full outline-none font-mono rounded-md p-3 pl-16 bg-white border border-neutral-200"
          />
        </div>
      </FormSectionWrapper>
      {!isAmount &&
        <FormSectionWrapper>
          <div className="flex justify-between items-center">
            <Label name="max discount" />
            {props.maxDiscount !== Infinity &&
              <button
                className="text-xs underline text-neutral-500"
                onClick={e => {
                  e.preventDefault();
                  props.setMaxDiscount(Infinity);
                }}
              >
                Remove Max
              </button>
            }
          </div>
          <div className="relative">
            <span className="absolute h-full w-12 bg-neutral-50 rounded-l-md border text-neutral-400 flex justify-center items-center">$</span>
            <input
              type="number"
              value={props.maxDiscount}
              min={0}
              max={1000}
              onChange={e => props.setMaxDiscount(e.target.valueAsNumber)}
              id="discount"
              className="w-full outline-none font-mono rounded-md p-3 pl-16 bg-white border border-neutral-200"
            />
          </div>
        </FormSectionWrapper>
      }
    </>
  );
}

function Label({ name }: { name: string }) {
  return <label htmlFor={name.replaceAll(' ', '-')} className="block text-neutral-500 capitalize">{name}</label>;
}

function FormSectionWrapper({ children }: { children: React.ReactNode }) {
  return <div className="space-y-1">{children}</div>;
}