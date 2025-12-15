"use client"
import AuthProvider from '@/provider/auth-provider'
import CartContextProvider from '@/provider/cart-provider'
import React from 'react'
import { Provider } from 'react-redux'
import Navbar from '../common/navbar'
import Footer from '../common/footer'
import { store } from '@/redux/store'

export default function ProvidersComponent({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Provider store={store}>
                <AuthProvider>
                    <CartContextProvider>
                        <Navbar />
                        <div className="pt-[76px]">
                            {children}
                        </div>
                        <Footer />
                    </CartContextProvider>
                </AuthProvider>
            </Provider>
        </>
    )
}
