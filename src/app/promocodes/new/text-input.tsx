import { Dispatch, SetStateAction } from "react";
import { FormSectionWrapper, Label } from "./form";

type TextInputProps = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

function TextInput({ name, value, onChange }: TextInputProps) {
  return (
    <FormSectionWrapper>
      <Label name={name} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        type="text"
        id={name}
        className="uppercase font-mono w-full rounded-md p-3 bg-white border border-neutral-200"
        required
      />
    </FormSectionWrapper>
  );
}

export default TextInput;