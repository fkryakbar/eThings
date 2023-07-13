import Gradient from "@/components/GrandientBG";
import Link from "next/link";

export default function About() {
    return <>
        <Gradient />
        <div className='flex flex-col justify-center items-center h-screen p-2 gap-5'>
            <div className="rounded-xl drop-shadow-lg bg-white w-[80%] lg:w-[350px] p-6">
                <Link href={'/'} className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#30c5d2] to-[#471069]'>eThings</Link>
                <div className="mt-5">
                    <h1 className="font-bold text-xl">
                        About
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">Something about <b>eThings</b></p>
                    <p className="mt-4 text-sm text-gray-500">
                        I developed this stuff just for personal use. I can use this stuff for CDN and transfer file securely
                    </p>
                    <p className="mt-1 text-sm text-gray-500 font-semibold">
                        -fkryakbar
                    </p>
                </div>
            </div>

        </div>
    </>
}