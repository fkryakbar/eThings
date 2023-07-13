"use client"
import useAuth from "@/utils/useAuth";
import { logout } from "@/utils/useUser";
import Link from "next/link";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from "react";
function DropdownUser() {
    return (
        <div>
            <Menu as="div" className="relative inline-block text-left z-[10000]">
                <Menu.Button>
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                    </label>
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white drop-shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item as={'div'} onClick={handleLogout}>
                            {({ active }) => (
                                <button className={`text-red-500 transition-all px-2 py-2 flex gap-2 w-full ${active ? 'bg-gray-200' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                    </svg>
                                    <p>Logout</p>
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
const handleLogout = () => {
    logout()
}

export default function Navbar() {
    const { data } = useAuth();
    return <>
        <div className="navbar bg-base-100 drop-shadow fixed top-0 left-0 w-full z-[100]">
            <div className="flex-1">
                <Link href={'/'} className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#30c5d2] to-[#471069]'>eThings</Link>
            </div>
            <div className="flex-none">
                {
                    data ? (<p className="font-semibold">{data.data.name}</p>) : null
                }
                <DropdownUser />
            </div>
        </div>
    </>
}