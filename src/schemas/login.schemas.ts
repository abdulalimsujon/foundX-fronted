import { z } from "zod";
const loginValidationSchema = z.object({
  email: z.string().trim().email("Email is required"),
  password: z.string().trim().min(6, "password will be min 6 characters"),
});

export default loginValidationSchema;
