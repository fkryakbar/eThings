"use client"

import LoadingPage from "@/components/LoadingPage";
import Navbar from "@/components/Navbar";
import useAuth from "@/utils/useAuth";
import DropDownNewItemComponent from "@/components/DropDownNewItemComponent";
import ItemTableComponent from "@/components/ItemTableComponent";
import Link from "next/link";
import { useState } from "react";




export default function LibCompoenent() {
    const [folder, setFolder] = useState('root')
    const { data, error, isLoading } = useAuth();
    if (error) return window.location.href = "/login"
    if (isLoading) return <LoadingPage />

    return <>
        <Navbar />
        <div className="relative p-2 mt-16">
            <div className="relative mt-5 rounded-lg bg-base-100 drop-shadow p-3 mx-auto lg:w-[500px] w-full">
                <div className="flex justify-between items-center">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            <li><Link href={'/lib'} onClick={() => { localStorage.removeItem('folder') }} className="font-semibold">My Drive</Link></li>
                            {
                                folder != 'root' ? (<>
                                    <li><a>{folder}</a></li>
                                </>) : null
                            }
                        </ul>
                    </div>
                    <DropDownNewItemComponent />
                </div>
                <div className="mt-4">
                    <ItemTableComponent setFolder={setFolder} />
                </div>
            </div>
        </div>
    </>

}