import { deleteCartProduct, updateCartProductCount } from '@/app/_actions/cart.action'
import { CartProductI } from '@/interfaces/cart'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'
import { Spinner } from '../ui/spinner'
import { cartContext } from '@/provider/cart-provider'

export default function CartItem({ product, setProducts }: { product: CartProductI, setProducts: (products: CartProductI[]) => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const { handleCart } = useContext(cartContext)


    async function deleteProduct(id: string) {
        try {
            setIsLoading(true)
            const data = await deleteCartProduct(id)
            console.log(data);
            if (data.status == "success") {
                toast.success("Product Removed Successfully", { position: 'top-center' })
            }
            setProducts(data.data.products)
        } catch (error) {
            console.log(error);
            toast.error("Error Occurred", { position: 'top-center' })

        } finally {
            setIsLoading(false)
        }

    }

    async function updateProductCount(id: string, newCount: number) {
        try {
            setIsLoading(true)

            const response = await updateCartProductCount(id, newCount)
            console.log(response);
            toast.success("Product Quantity Updated Successfully", { position: 'top-center' })
            setProducts(response.data.products)
            handleCart()
        } catch (error) {
            console.log(error);
            toast.error("Error Occurred", { position: 'top-center' })

        } finally {
            setIsLoading(false)

        }

    }
    return (
        <>
            <div className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card">
                <Image width={100} height={100} src={product.product.imageCover} alt={product.product.title}
                    className='w-24 h-24 rounded-lg object-cover md:w-28 md:h-28' />
                <div className="flex-1 ">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between  gap-3">
                        <div className=''>
                            <h3 className='font-semibold text-base md:text-lg line-clamp-2'>
                                {product.product.title}
                            </h3>
                            <p className='text-sm text-muted-foreground mt-1'>
                                {product.product.brand.name}
                                {product.product.category.name}
                            </p>
                        </div>

                        <div className='text-right '>
                            <div className="font-semibold">
                                <span className='text-gray-400 block text-xs'>{product.count} x {product.price}EGP</span>
                                {product.price * product.count} EGP
                            </div>
                        </div>
                    </div>

                    <div className='mt-3 flex items-center justify-between'>
                        <div className="flex items-center gap-2">
                            <button disabled={isLoading} onClick={() => {
                                updateProductCount(product.product._id, product.count - 1)
                            }} aria-label='decrease' className='size-8 rounded-lg border hover:bg-accent disabled:bg-slate-400 disabled:cursor-not-allowed'>
                                -
                            </button>
                            <span className="w-6 text-center font-medium">
                                {isLoading ? <Spinner /> : <>
                                    {product.count}
                                </>}
                            </span>
                            <button disabled={isLoading} onClick={() => {
                                updateProductCount(product.product._id, product.count + 1)
                            }} aria-label='increase' className='size-8 rounded-lg border hover:bg-accent disabled:bg-slate-400 disabled:cursor-not-allowed'>
                                +
                            </button>
                        </div>
                        <button onClick={() => { deleteProduct(product.product._id) }} aria-label='remove' className='text-sm cursor-pointer flex text-destructive hover:underline items-center'>

                            {isLoading ? <Spinner /> : "Remove"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
