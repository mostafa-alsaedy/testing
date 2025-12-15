import { ProductI } from '@/interfaces/product'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import AddCartButton from '@/components/products/addToCartBtn'

export default async function Products() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/products")
  const data = await response.json()
  const { data: products } = data as { data: ProductI[] }
  

  return (
    <>
      <main>
        <div className="container mx-auto p-5">
          <div className="grid grid-cols-12 gap-7">
            {products.map((product) => {
              return <React.Fragment key={product._id}>
                <div className="col-span-3">
                  <Card>
                    <Link href={`products/${product._id}`}>
                      <Image width={1000} height={1000} src={product.imageCover} alt='product' className='w-full object-cover h-90' />
                      <CardHeader>
                        <h4 className='card-brand text-gray-400'>{product.brand.name}</h4>
                        <CardTitle className='text-xl'>{product.title}</CardTitle>
                        <CardDescription>{product.category.name}</CardDescription>
                        <h4 className='card-price text-black font-bold'>EGP: {product.price}</h4>

                      </CardHeader>
                      <CardContent className='flex items-center gap-1'>
                        {[0, 1, 2, 3, 4].map((star, index) => {
                          const filledStar = index < Math.floor(product.ratingsAverage) // 3
                          return <React.Fragment key={index}>
                            <Star className={`${filledStar ? "text-yellow-500 fill-yellow-500" : "text-gray-500 fill-gray-500"} `} />
                          </React.Fragment>
                        })}
                        <span>({product.ratingsAverage})</span>

                      </CardContent>
                    </Link>
                    <CardFooter className='gap-3'>
                      <AddCartButton prodId={product._id} />
                      <Heart className='size-7' />
                    </CardFooter>
                  </Card>
                </div>

              </React.Fragment>
            })}
          </div>
        </div>

      </main>

    </>
  )
}
