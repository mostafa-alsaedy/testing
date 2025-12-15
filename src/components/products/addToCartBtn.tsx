"use client"
import React, { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'
import { addToCart } from '@/app/_actions/cart.action'
import { Spinner } from '../ui/spinner'
import { toast } from 'sonner'
import { cartContext } from '@/provider/cart-provider'
import { useRouter } from 'next/navigation'


export default function AddCartButton({ prodId }: { prodId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)
    const router = useRouter()
    
    async function addProductToCart(productId: string) {
        try {
            setIsLoading(true)
            const response = await addToCart(productId)
            console.log(response);
            
            if (response.status === "success") {
                toast.success(response.message, { position: "top-center" })
                handleCart()
            } else {
                toast.error(response.message || "Failed to add product to cart", { position: "top-center" })
                if (response.message?.toLowerCase().includes("login") || response.message?.toLowerCase().includes("authorized")) {
                    router.push("/login")
                }
            }
        } catch (error) {
            console.log(error);
            const errorMessage = (error as Error).message
            toast.error(errorMessage, { position: "top-center" })
            
            if (errorMessage.toLowerCase().includes("logged in") || errorMessage.toLowerCase().includes("authorized")) {
                router.push("/login")
            }
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <Button disabled={isLoading} onClick={() => {
                addProductToCart(prodId)
            }} className='grow'>
                {isLoading ? <Spinner /> : <>
                    <ShoppingCart />
                    Add to Cart
                </>}
            </Button>
        </>
    )
}
