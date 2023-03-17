import { Dispatch, SetStateAction } from "react";
import { FormSectionWrapper, Label } from "./form";

const types = ['amount', 'percent'] as const;
export type Type = typeof types[number]

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

export default TypeToggle;