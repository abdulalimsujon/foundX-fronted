import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPost } from "../services/Posts";

export const useCreatePost = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (userData) => await createPost(userData),
    onSuccess: () => {
      toast.success("user successfully registered");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
