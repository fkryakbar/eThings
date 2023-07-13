import Gradient from "@/components/GrandientBG";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Gradient />
      <div className='flex justify-center items-center h-screen p-2'>
        <div className='text-center'>
          <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#30c5d2] to-[#471069] p-2'>eThings</h1>
          <p className='text-xl mt-2 font-semibold text-gray-600'>Fast and Easy Storage Solutions for Your Digital World</p>
          <div className='flex justify-center gap-3 mt-3'>
            <Link href={"/login"} className='btn bg-[#471069] text-white hover:bg-[#30c5d2]'>Get Started</Link>
            <Link href={"/about"} className='btn bg-transparent hover:bg-[#30c5d2] hover:text-white'>Learn More</Link>
          </div>
        </div>
      </div>
    </>
  )
}
