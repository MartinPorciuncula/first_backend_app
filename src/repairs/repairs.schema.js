import z from "zod"
import {extractValidationData} from "../commons/utils/extractErrorData.js"

export const userSchema = z.object({
  motorsNumber: z.string({
    invalid_type_error: "Motors number must be a current format",
    required_error:"motors number is required"
  }).min(4).max(30)
})
