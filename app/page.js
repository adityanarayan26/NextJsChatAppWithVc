'use client'
import React, { useEffect } from 'react'
import SideBar from './(components)/SideBar'
import Header from './(components)/Header'
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from '@/components/ui/chat-bubble'
import axios from 'axios'
import { useAuth, useUser } from '@clerk/nextjs' // ✅ Corrected import

const Page = () => {
  const { user } = useUser();
  const { getToken } = useAuth(); // ✅ Get session token helper

useEffect(() => {
  const syncUserToDB = async () => {
    if (user) {
      try {
        const token = await getToken(); // Get the token
        console.log("Clerk Token:", token); // Log token value for debugging
        
        if (token) {
          const response = await fetch('/api/auth', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Pass token in header
            },
          });
          
          if (response.ok) {
            console.log("User sync successful");
          } else {
            console.error("Failed to sync user:", response.status); // Log failed response
          }
        } else {
          console.error('Token not found');
        }
      } catch (error) {
        console.error('User sync failed:', error); // Log any other errors
      }
    }
  };

  syncUserToDB();
}, [user]);

  return (
    <div className='h-screen w-full bg-white flex '>
      <SideBar />
      <div className='h-full w-full flex flex-col justify-between '>
        <Header />
        <div className="p-7 flex flex-col justify-start h-full w-full">
          <ChatBubble variant="sent">
            <ChatBubbleAvatar fallback="US" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=64&h=64&q=80&crop=faces&fit=crop" />
            <ChatBubbleMessage variant="sent">
              I have a question about the library.
            </ChatBubbleMessage>
          </ChatBubble>

          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&q=80&crop=faces&fit=crop" />
            <ChatBubbleMessage>
              Sure, I'd be happy to help!
            </ChatBubbleMessage>
          </ChatBubble>
        </div>
        <div className='w-full h-28 bg-zinc-600 flex justify-center items-center'>
          <input type="text" className='border-2 p-2 h-14 w-[90%] border-blue-500 bg-white/50 rounded-lg text-black px-2 py-1 shadow outline-none' placeholder='Type your message...' />
        </div>
      </div>
    </div>
  )
}

export default Page;