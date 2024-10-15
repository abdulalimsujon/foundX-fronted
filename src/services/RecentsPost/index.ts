import envConfig from "@/src/config/envConfig";

export const getRecentsPosts = async () => {
  const fetchOptions = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt`,
    fetchOptions,
  );

  return res.json();
};
