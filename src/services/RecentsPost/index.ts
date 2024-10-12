import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getRecentsPosts = async () => {
  const res = await fetch(
    `${envConfig.baseApi}/items?sortBy=-createdAt&limit=3`,
  );

  await delay(5000);

  return res.json();
};
