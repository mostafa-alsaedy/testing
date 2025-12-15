"use client"
import { clearUserCart, getLoggedUserCart } from '@/app/_actions/cart.action'
import CartItem from '@/components/cart/cart-item'
import { Checkout } from '@/components/cart/checkout'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { CartDataI, CartI, CartProductI } from '@/interfaces/cart'
import { Trash2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

export default function Cart() {
  const [isLoading, setIsLoading] = useState(true)

  const [products, setProducts] = useState<CartProductI[] | []>([])
  const [cart, setCart] = useState<CartI | null>(null)
  const [cartData, setCartData] = useState<CartDataI | null>(null)

  async function getUserCart() {
    try {
      const data: CartI = await getLoggedUserCart()
      console.log(data);
      setProducts(data.data.products)
      setCart(data)
      setCartData(data.data)
    } catch (error) {
      console.log(error);

    } finally {
      setIsLoading(false)
    }
  }

  async function clearCart() {
    try {
      setIsLoading(true)
      const response = await clearUserCart()
      console.log(response);
      if (response.message == "success") {
        toast.success("Cart Cleared Successfully", { position: 'top-center' })
      }
      setProducts([])
    } catch (error) {
      console.log(error);
      toast.error("Error Occurred", { position: 'top-center' })
    } finally {
      setIsLoading(false)
    }

  }



  useEffect(() => {
    getUserCart()
  }, [])


  if (isLoading) {
    return <>
      <div className='h-screen flex justify-center items-center'>
        <Spinner /> Loading....
      </div>
    </>
  }

  if (products.length == 0) {
    return <>
      <div className='h-screen flex justify-center items-center'>
        Cart is Empty, Go Shop NOW! <Link href="/products">🛒</Link>
      </div>
    </>
  }


  return (
    <>
      <div className="container mx-auto py-6 px-4">
        <h1 className='text-3xl font-bold tracking-tight'>Shopping Cart</h1>
        <p className='text-muted-foreground mt-1'>{cart?.numOfCartItems}  items in your cart</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:items-start mt-6">
          {/* items details */}
          <div className="lg:col-span-2 space-y-4">
            {products.map((prod) => <React.Fragment key={prod.product._id}>
              <CartItem setProducts={setProducts} product={prod} />
            </React.Fragment>)}
          </div>
          {/* order summary */}
          <div className="lg:col-span-1 sticky top-18">
            <div className="rounded-xl border p-5 shadow-sm">
              <h2 className='text-lg font-semibold'> Order Summary</h2>
              <div className="mt-4 space-y-2">
                <div className='flex items-center justify-between' >
                  <span className='text-sm text-muted-foreground '>
                    Subtotal :{cart?.numOfCartItems} items
                  </span>
                  <span className='font-semibold'>{cartData?.totalCartPrice} EGP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className='text-sm text-muted-foreground'>Shipping</span>
                  <span className='text-emerald-600 font-medium'>Free</span>
                </div>
              </div>
              <div className="my-4 border-t" />
              <div className='flex items-center justify-between'>
                <span className='text-base font-semibold'>Total</span>
                <span className='text-base font-bold'>{cartData?.totalCartPrice} EGP</span>
              </div>
              <Link href={"/products"}>
                <Button variant={"outline"} className='w-full text-lg  mt-2'>Continue Shopping</Button>

              </Link>
              {cart && <Checkout cartId={cart?.cartId} />}
            </div>
            <Button onClick={clearCart} variant={'outline'} className='mt-2  ms-auto text-destructive hover:text-destructive  flex' > <Trash2 />{isLoading ? <Spinner /> : "Clear Cart"}</Button>
          </div>

        </div>
      </div>
    </>
  )
}
