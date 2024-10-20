import { useMutation } from "@tanstack/react-query";

import { searchItemService } from "../services/Search";

export const useSearchItems = () => {
  return useMutation({
    mutationKey: ["SEARCH_ITEMS"],
    mutationFn: async (searchTerm: string) =>
      await searchItemService(searchTerm),
  });
};
