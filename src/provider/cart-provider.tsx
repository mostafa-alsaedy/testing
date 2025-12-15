"use client"
import { getLoggedUserCart } from '@/app/_actions/cart.action'
import { CartI } from '@/interfaces/cart'
import React, { createContext, useEffect, useState } from 'react'

interface CartContextI {
    noOfCartItems: number,
    handleCart: () => void,
    isLoading: boolean
}

export const cartContext = createContext<CartContextI>({
    noOfCartItems: 0,
    handleCart: () => { },
    isLoading: false
})
export default function CartContextProvider({ children }: { children: React.ReactNode }) {
    const [noOfCartItems, setNoOfCartItems] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    async function handleCart() {
        try {
            setIsLoading(true)
            const data: CartI = await getLoggedUserCart()
            const total = data.data.products.reduce((accu, prod) => prod.count + accu, 0)
            setNoOfCartItems(total)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleCart()
    }, [])
    return (
        <cartContext.Provider value={{ noOfCartItems, handleCart, isLoading }}>
            {children}
        </cartContext.Provider>
    )
}
