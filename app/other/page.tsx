"use client"
import useAuth from "@/utils/useAuth";
import useUser from "@/utils/useUser";
import Link from "next/link";
import { useEffect } from "react";

export default function Other() {
    const { data, error, isLoading } = useAuth();

    return <>
        {
            data ? (<>{data.data.name}</>) : (<><span className="loading loading-infinity loading-lg"></span></>)
        }
        <br />
        <Link href={'/lib'}>Lib</Link>
    </>
}