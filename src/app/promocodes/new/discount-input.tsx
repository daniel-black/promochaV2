import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormSectionWrapper, Label } from "./form";
import { Type } from "./type-toggle";

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
          <span className="absolute h-full w-12 bg-neutral-50 rounded-l-md border text-neutral-400 flex justify-center items-center pointer-events-none">{isAmount ? '$' : '%'}</span>
          <input
            type="number"
            value={isAmount ? props.amountDiscount : props.percentDiscount}
            min={0}
            max={isAmount ? 1000 : 100}
            onChange={handleDiscountChange}
            id="discount"
            className="w-full outline-none font-mono rounded-md p-3 pl-16 bg-white border border-neutral-200"
            required
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

export default DiscountInput;