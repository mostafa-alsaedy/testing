import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is Required").min(3, "Min Length 3").max(10, "Max Length 10"),
    email: z.email().nonempty("Email is Required"),
    password: z.string().nonempty("Password is Required").min(6, "Min Length is 6"),
    rePassword: z.string().nonempty("RePassword is Required"),
    phone: z.string().nonempty("Phone Number is Required").regex(/^01[0125][0-9]{8}$/, "Phone Number must be Egyptain")
}).refine((data) => data.password == data.rePassword, {
    path: ["rePassword"],
    error: "Password and RePassword must Match"
})


export type registerSchemaType = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.email().nonempty("Email is Required"),
    password: z.string().nonempty("Password is Required").min(6, "Min Length is 6"),
})


export type loginSchemaType = z.infer<typeof loginSchema>