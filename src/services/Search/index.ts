"use server";

import AxiosInstance from "@/src/lib/AxiosInstance";

export const searchItemService = async (searchTerm: string) => {
  try {
    console.log("rrr", searchTerm);
    const res = await AxiosInstance.get(
      `search-items?searchTerm=${searchTerm}`,
    );
    return res.data;
  } catch (error) {
    console.log("this is error", error);
    throw new Error("failed to search items");
  }
};
