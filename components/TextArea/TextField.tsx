import cx from "classnames";
import { UseFormRegisterReturn } from "react-hook-form";

export type TextFieldProps = {
  label?: string;
  id: string;
  register: UseFormRegisterReturn;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  error?: string;
};

const shared =
  "rounded-sm bg-indigo-100 border-indigo-300 border-2 p-2 hover:bg-indigo-200 focus:bg-indigo-200 duration-150 transition-all outline-none focus:ring-2 ring-indigo-300";

const disabled = "opacity-50 hover:bg-indigo-100";

const errored =
  "bg-red-200 border-red-400 focus:bg-red-100 hover:bg-red-100 focus:ring-red-400";

const TextField = ({
  label,
  id,
  register,
  isDisabled = false,
  isRequired = false,
  placeholder,
  error,
}: TextFieldProps) => {
  return (
    <label htmlFor={id} className="flex flex-col">
      <span className="mb-1 text-sm">
        {label}
        <span className="font-semibold ml-0.5">{isRequired ? "*" : ""}</span>
      </span>

      <input
        {...register}
        placeholder={placeholder}
        autoComplete="off"
        disabled={isDisabled}
        id={id}
        type="text"
        className={cx(shared, { [disabled]: isDisabled, [errored]: error })}
      ></input>
      <span className="text-red-500 font-semibold text-sm">{error}</span>
    </label>
  );
};

export default TextField;