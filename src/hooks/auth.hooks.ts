import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/authService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => {
      toast.success("user successfully registered");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
