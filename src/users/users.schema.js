import z from "zod"
import {extractValidationData} from "../commons/utils/extractErrorData.js"

export const userSchema = z.object({
    name: z.string().min(4).max(10),
    email: z.string().min(8).max(20),
    password: z.string().min(6).max(20),
    role: z.enum(["user", "admin", "developer"]),
})

export function validateUser(data){
    const result = userSchema.safeParse(data)
    
    const { 
      hasError, 
      errorMessages, 
      data: userData
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      userData
    }
  }
  
  
  export function validatePartialUser(data){
    const result = userSchema.partial().safeParse(data)
  
    const { 
      hasError, 
      errorMessages, 
      data: userData
    } = extractValidationData(result)
    
    return {
      hasError,
      errorMessages,
      userData
    }
  }