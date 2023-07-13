import Gradient from "@/components/GrandientBG";
import LoginComponent from "@/app/login/LoginComponent";
import Link from "next/link";
export const metadata = {
    title: 'Login',
    description: 'Fast and Easy Storage Solutions for Your Digital World',
}

export default function Login() {
    return <>
        <Gradient />
        <div className='flex flex-col justify-center items-center h-screen p-2 gap-5'>
            <div className="rounded-xl drop-shadow-lg bg-white w-[80%] lg:w-[350px] p-6">
                <Link href={'/'} className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#30c5d2] to-[#471069]'>eThings</Link>
                <div className="mt-5">
                    <h1 className="font-bold text-xl">
                        Login
                    </h1>
                    <p className="text-gray-500 text-sm mt-2">to continue to <b>eThings</b></p>
                    <LoginComponent />
                </div>
            </div>
            <p className="text-center text-sm text-gray-600">
                Don&apos;t have any account? Register <Link className="text-[#471069] underline hover:text-[#30c5d2] transition-all" href={'/register'}>Here</Link>
            </p>
        </div>
    </>
}