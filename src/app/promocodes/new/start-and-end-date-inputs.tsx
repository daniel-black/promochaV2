import { Dispatch, SetStateAction } from "react";
import { FormSectionWrapper, Label } from "./form";

type StartAndEndDateInputsProps = {
  start: string;
  end: string;
  setStart: Dispatch<SetStateAction<string>>;
  setEnd: Dispatch<SetStateAction<string>>;
}

function StartAndEndDateInputs(props: StartAndEndDateInputsProps) {
  return (
    <div className="flex gap-2">
      <FormSectionWrapper>
        <Label name="start date" />
        <input
          type="date"
          value={props.start}
          onChange={e => props.setStart(e.target.value)}
          className="w-full rounded-md p-3 bg-white border border-neutral-200 outline-none"
        />
      </FormSectionWrapper>
      <FormSectionWrapper>
        <Label name="end date" />
        <input
          type="date"
          value={props.end}
          min={props.start}
          onChange={e => props.setEnd(e.target.value)}
          className="w-full rounded-md p-3 bg-white border border-neutral-200 outline-none"
        />
      </FormSectionWrapper>
    </div>
  );
}

export default StartAndEndDateInputs;