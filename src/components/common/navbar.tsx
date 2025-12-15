"use client"
import Link from 'next/link'
import React, { useContext } from 'react'
import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, UserRound } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useSession } from 'next-auth/react'
import { signOut } from "next-auth/react"
import { cartContext } from '@/provider/cart-provider'
import { Spinner } from '../ui/spinner'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function Navbar() {
    const { data: session, status } = useSession()
    const { noOfCartItems, isLoading } = useContext(cartContext)
    const { count } = useSelector((state: RootState) => state.counter)
    console.log(session);
    console.log(status);

    function logoutUser() {
        signOut({ callbackUrl: "/login" })
    }



    return (
        <nav className='bg-[#F5F5F5E5] p-5 fixed top-0 w-full'>
            <div className="container mx-auto flex items-center justify-between">
                <div className="nav-logo flex items-center gap-1">
                    <Avatar className="rounded-lg bg-black text-white font-bold text-xl">

                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <Link href="/" className='text-2xl font-bold'>
                        ShopMart
                    </Link>
                    {count}
                </div>
                <div className="nav-links grow flex justify-center items-center">
                    <NavigationMenu className='gap-2'>
                        <NavigationMenuItem >
                            <NavigationMenuLink asChild>
                                <Link href="/products" className=''>Products</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/brands">Brands</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink asChild>
                                <Link href="/categories">Categories</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenu>
                </div>
                <div className="nav-actions flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger className='flex gap-2'>
                            <p>{session && `Welcome, ${session.user?.name}`}</p>
                            <UserRound className='size-6 ' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {session ? <>
                                <Link href="/orders">
                                    <DropdownMenuItem>Your Orders</DropdownMenuItem>
                                </Link>

                                <DropdownMenuItem onClick={logoutUser} className='cursor-pointer'>Logout</DropdownMenuItem>


                            </> : <>
                                <Link href="/login">
                                    <DropdownMenuItem>Login</DropdownMenuItem>
                                </Link>
                                <Link href="/register">
                                    <DropdownMenuItem>Register</DropdownMenuItem>
                                </Link>
                            </>}

                        </DropdownMenuContent>
                    </DropdownMenu>
                    {session && <Link href="/cart" className='relative'>
                        <Badge className="h-5 min-w-5 absolute bottom-full start-full  -translate-x-1/2 translate-y-1/2 rounded-full px-1 font-mono tabular-nums">
                            {isLoading ? <Spinner /> : noOfCartItems}
                        </Badge>
                        <ShoppingCart className='size-6' />
                    </Link>}
                </div>
            </div>
        </nav >
    )
}
