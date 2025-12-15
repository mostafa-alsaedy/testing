"use client"

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatcher, RootState } from "@/redux/store";
import { incrementByAmount } from "@/redux/slices/counterSlice";
import { productsAction } from "@/redux/slices/productsSlice";


export default function Home() {

  const { count } = useSelector((state: RootState) => state.counter)
  const {products} = useSelector((state:RootState) => state.product)
  console.log("dfsfsdf",products);
  
  const dispatcher = useDispatch<AppDispatcher>()
  console.log("dfafdadfa", count);

  useEffect(()=> {
    dispatcher(productsAction())
  },[dispatcher])


  return (
    <section className="text-center min-h-screen flex justify-center items-center flex-col">

      <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
        Welcome to ShopMart {count}
      </h1>
      <div className="flex">
        <Button onClick={() => dispatcher(incrementByAmount(10))}>+</Button>
        <Button>-</Button>
      </div>
      <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
        Discover the latest technology, fashion, and lifestyle products.
        Quality guaranteed with fast shipping and excellent customer service.
      </p>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-10">

        <Button
          asChild
          className="px-10 py-6 text-lg rounded-xl"
        >
          <Link href="/products">Shop Now</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="px-10 py-6 text-lg rounded-xl border-2"
        >
          <Link href="/categories">Browse Categories</Link>
        </Button>

      </div>
    </section>
  );
}
