import { loginSchemaType, registerSchemaType } from "@/schema/auth.schema"

export async function registerUser(formData: registerSchemaType) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function loginUser(formData: loginSchemaType) {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signIn", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}