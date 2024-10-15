import { DatePicker } from "@nextui-org/react";
import { Controller } from "react-hook-form";

import { IInput } from "@/src/types";
interface IProps extends IInput {}

const FXDatePicker = ({ label, name, variant = "bordered" }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <DatePicker
          className="min-w-full sm:min-w-[225px]"
          label={label}
          variant={variant}
          {...fields}
        />
      )}
    />
  );
};

export default FXDatePicker;
