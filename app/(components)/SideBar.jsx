'use client'
import React, { useRef } from 'react'
import { Seed } from './seed'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LogOut, Send, User } from 'lucide-react';
import { Store } from './Store';
import { Dots_v1, Dots_v4 } from '@/components/ui/spinner';
import { SignOutButton, useUser } from '@clerk/nextjs';
const SideBar = () => {
    const searchUserRef = useRef()
    const dialogCloseRef = useRef()
    const {user}=useUser()
    console.log(user);
    
    const {isSidebaropen,setIsSidebarOpen,setSelectedUser}= Store()
    const [searchUser, setSearchUser] = React.useState('')
    const handleEnterClick = (e) => {
        if (e.key === 'Enter') {
            searchUserRef.current.click()
            setIsSidebarOpen(false)
        }
    }
const filteredUsers = Seed.filter((user) =>
  user.username.toLowerCase().includes(searchUser.toLowerCase())
);

  return (
    <div className={`${ isSidebaropen ? " w-[20rem]" : "w-0" } relative ease duration-300 h-full bg-neutral-200 flex flex-col overflow-hidden `}>

<div className='w-full flex '>

      <input type="text" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)} placeholder='search user...' onKeyDown={handleEnterClick} className=' outline-none w-1/2 bg-zinc-600 text-white border border-blue-400 text-lg p-2' />
      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" ref={searchUserRef} onClick={()=>setIsSidebarOpen(false)}>Search</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-lg [&>button:last-child]:hidden">
        <ScrollArea className="flex max-h-full flex-col">
          <DialogHeader className="contents space-y-0 text-left">
            <DialogTitle className="px-6 h-16 flex gap-x-2 items-center justify-start bg-zinc-500 ">Searched Users 
                <input type="text" value={searchUser} onChange={(e)=>setSearchUser(e.target.value)} className='border border-blue-300 bg-white/50 rounded text-black px-2 py-1 shadow outline-none' placeholder='search for user...'/>
            </DialogTitle>
            <DialogDescription asChild className='h-[20rem]'>
              <div>
                {searchUser.trim() === '' ? (
                  <div className='flex items-center justify-center h-full text-blue-500'>

<div className="flex justify-center items-center h-full">
                    <p className="text-gray-500 text-lg">Search for user</p>
                  </div>

                  </div>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div key={user.username} onClick={()=>{setSelectedUser(user.username),dialogCloseRef.current.click(),setSearchUser('')}} className='flex items-center gap-2 p-3 hover:bg-blue-300 cursor-pointer px-5 justify-between'>
                      <div className='flex items-center gap-x-2'>
                      <img src={user.image} alt="user" className='w-10 h-10 rounded-full' />
                        <div className='flex flex-col'>

                        <h1 className='text-lg font-semibold'>{user.username}</h1>
                        <p className='text-sm text-gray-500'>{user.email}</p>
                        </div>
                      </div>
                      <Send className='size-5 text-blue-500'/>
                    </div>
                  ))
                ) : (
                  <div className='flex items-center justify-center h-full'>
                    <User className='w-10 h-10 text-gray-500' />
                    <p className='text-gray-500'>No users found</p>
                  </div>
                )  
                }
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogClose>
            <button className='hidden' ref={dialogCloseRef}></button>
          </DialogClose>
        </ScrollArea>
      </DialogContent>
    </Dialog>
</div>
      <div className='h-full w-full overflow-y-scroll'>
        {Seed.map((user) => (
            <div key={user.username} onClick={()=>setSelectedUser(user.username)} className='flex items-center gap-2 p-3 hover:bg-blue-300 cursor-pointer'>
                <img src={user.image} alt="user" className='w-10 h-10 rounded-full' />
                <div>
                <h1 className='text-lg font-semibold'>{user.username}</h1>
                <p className='text-sm text-gray-500'>{user.email}</p>
                </div>
            </div>
        ))}
      </div>
      <div className='w-full h-20 p-3 bg-zinc-600 '>
        {user  ? <div className='flex items-center gap-x-2'>
            <img src={user?.image} alt="user" className='w-10 h-10 rounded-full' />
            <div className='flex flex-col'>
              <div className='flex  items-center '>
                
                <h1 className='text-lg font-semibold'>{user.firstName}</h1>
<SignOutButton>
<LogOut className='text-red-500 cursor-pointer' />

</SignOutButton>
              </div>
                <p className='text-sm text-gray-500'>{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
        </div> :
        <div className='text-blue-500'>

        <Dots_v4 />
        </div>
        
        }
      </div>
    </div>
  )
}

export default SideBar
