import { ProductI } from '@/interfaces/product'
import { Params } from 'next/dist/server/request/params'
import React from 'react'
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, ShoppingCart, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import {
    Carousel,
    CarouselContent,
    CarouselItem
} from "@/components/ui/carousel"


export default async function ProductDetails({ params }: { params: Promise<Params> }) {
    const { productId } = await params

    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
    const data = await response.json()
    const { data: product } = data as { data: ProductI }



    return (
        <>
            <main>
                <div className="container mx-auto p-10">
                    <Breadcrumb className='py-5'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link className='text-lg' href="/">Home</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link className='text-lg' href="/products">Products</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage className='text-xl font-bold'>Product Details</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <Card className='grid grid-cols-3 mt-10'>
                        <div className="col-span-1">
                            <Carousel>
                                <CarouselContent>
                                    {product.images.map((img, index) =>
                                        <CarouselItem key={index} >
                                            <Image width={1000} height={1000} src={img} alt='product' className='w-full object-cover h-90' />
                                        </CarouselItem>
                                    )}
                                </CarouselContent>
                            </Carousel>
                        </div>
                        <div className="col-span-2 flex justify-center items-center flex-col gap-10">
                            <div className='w-full'>
                                <CardHeader>
                                    <h4 className='card-brand text-gray-400'>{product.brand.name}</h4>
                                    <CardTitle className='text-xl'>{product.title}</CardTitle>
                                    <h4 className='card-brand'>{product.description}</h4>
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
                            </div>
                            <CardFooter className='gap-3 w-full'>
                                <Button className='grow'>
                                    <ShoppingCart />
                                    Add to Cart
                                </Button>
                                <Heart className='size-7' />
                            </CardFooter>
                        </div>
                    </Card>
                </div>
            </main>
        </>
    )
}
