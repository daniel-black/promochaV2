import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormSectionWrapper, Label } from "./form";

type TextInputProps = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
};

function TextInput({ name, value, onChange }: TextInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sanitizedInput = e.target.value.trim().replaceAll(' ', '').replace(/[^a-zA-Z0-9]/g, '')
    onChange(sanitizedInput);
  }

  return (
    <FormSectionWrapper>
      <Label name={name} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value.toUpperCase())}
        type="text"
        id={name}
        className="uppercase font-mono w-full rounded-md p-3 bg-white border border-neutral-200"
        pattern="^[A-Z0-9]+$"
        required
      />
    </FormSectionWrapper>
  );
}

export default TextInput;