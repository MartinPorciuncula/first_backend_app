import z from "zod";
import { extractValidationData } from "../commons/utils/extractErrorData.js";

export const userSchema = z.object({
  name: z.string().min(4).max(10),
  email: z.string().min(8).max(20),
  password: z.string().min(6).max(20),
  role: z.enum(["user", "admin", "developer"]),
});

export function validateUser(data) {
  const result = userSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

export function validatePartialUser(data) {
  const result = userSchema.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
}

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name is too short" })
    .max(199, { message: "Name is too long" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
  role: z.enum(["employee", "client"]),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Password is too short" }),
});

export const validateRegister = (data) => {
  const result = registerSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
