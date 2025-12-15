"use client"
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaType } from '@/schema/auth.schema'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { toast } from "sonner"

export default function Login() {

  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function handleLogin(values: loginSchemaType) {
    // const data = await loginUser(values)
    // console.log(data);
    // if (data.message == "success") {
    //   router.push("/products")
    // }
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: "/products"
    })

    if (response?.ok) {
      // router.push("/product")
      toast.success("Logged in Successfully ✅", { position: "top-center", duration: 3000 })
      router.push("/products")
    } else {
      toast.error(response?.error, { position: "top-center", duration: 3000 })

    }
    console.log(response);

  }


  return (
    <>
      <main className='container mx-auto p-5'>
        <h1 className='text-3xl font-semibold'>Welcome to ShopMart 🛒</h1>
        <p className='my-5'>Login Now!</p>
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className='space-y-6'>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full cursor-pointer'>
                {form.formState.isSubmitting ? <Spinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
