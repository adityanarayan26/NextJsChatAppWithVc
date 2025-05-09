import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen w-full bg-gradient-to-br from-indigo-600/30 to-blue-600/30'>

  <SignUp />
    </div>
  )
}