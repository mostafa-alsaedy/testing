import { getUserToken } from '@/lib/auth'
import React from 'react'

export default async function Brands() {
  const data = await getUserToken()

  console.log(data);




  return (
    <div>Brands</div>
  )
}
