'use client'
import { Sidebar } from 'lucide-react'
import React from 'react'
import { Store } from './Store'

const Header = () => {
  const {setIsSidebarOpen,isSidebaropen,SelectedUser}=Store()
  return (
    <div className='w-full h-24 bg-indigo-400 px-10 flex items-center justify-between'> 
<div className='gap-x-5 flex items-center'>
    <Sidebar  className='cursor-pointer' onClick={()=>setIsSidebarOpen(!isSidebaropen)}/>
<h1 className='text-black capitalize text-2xl '>{SelectedUser}</h1>
</div>
    </div>
  )
}

export default Header
