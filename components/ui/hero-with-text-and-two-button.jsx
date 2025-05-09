'use client'
import { MagnetizeButton } from "./magnetize-button";
import { useRouter } from "next/navigation";

function Hero1() {
  const router = useRouter()
  const handleCLick =()=>{
setTimeout(() => {
  router.push('/chat')
}, 500);
  }
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="container mx-auto">
        <div
          className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
         
          <div className="flex gap-4 flex-col">
            <h1
              className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
InstaChat
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Build a highly scalable and fast chat app for your business. Avoid
              outdated methods and embrace modern, efficient communication tools.
              Our platform is designed to streamline SMB trade and communication.
            </p>
          </div>
          <div className="flex flex-row gap-3">
 <MagnetizeButton onClick={handleCLick} particleCount={14}attractRadius={50} className={'cursor-pointer'} />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero1 };
