"use server"

import { getUserToken } from "@/lib/auth"

export async function addToCart(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("You must be Logged in to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function getLoggedUserCart() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function deleteCartProduct(productId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function updateCartProductCount(productId: string, newCount: number) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({ count: newCount }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function clearUserCart() {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}
export async function checkoutUser(values: unknown, cartId: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("you are not authorized to do this action")
    }
    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}