import * as React from "react";
import Input from "../input";
import { ExtraInputType } from "../input/Input.props";
import { InputHTMLAttributes } from "react";

export function onBeforeInput(event: any) {
  if (event) {
    // @ts-ignore
    const lastChar = event?.data || 0;
    // @ts-ignore
    const lastValue = event?.target?.value;
    const value = lastValue + lastChar;
    const pattern = /^\d+\.?\d*$/;
    if (value.length > 19 || !pattern.test(lastChar)) event.preventDefault();
  }
}
const InputNumber = (
  props: InputHTMLAttributes<HTMLInputElement> & ExtraInputType
) => {
  return <Input {...props} onBeforeInput={onBeforeInput} type={"tel"}
        inputMode="numeric"
        autoComplete="one-time-code" />;
};
export default InputNumber;
