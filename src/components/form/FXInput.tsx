"use client";

import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface InputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  size?: "lg" | "md" | "sm";
  required?: boolean;
  type?: string;
  label: string;
  name: string;
}

const FXInput = ({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      {...register(name)}
      variant={variant}
      size={size}
      required={required}
      type={type}
      label={label}
    />
  );
};

export default FXInput;
