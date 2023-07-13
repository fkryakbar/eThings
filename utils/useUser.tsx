"use client"

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { mutate } from "swr";

interface UserData {
    user_id: string,
    name: string,
    email: string,
    role: string,
    remember_token?: null,
}

export default function useUser(params: { redirectTo?: string | null }) {
    const router = useRouter()

    const [error, setError] = useState<Array<string>>([]);
    const [isLoading, setIsloading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [data, setData] = useState<null | UserData>(null);
    async function register(formData: FormData) {
        setIsSuccess(false)
        setIsloading(true)
        setError([])
        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/register`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }

        })
        if (req.status == 200) {
            setIsSuccess(true)
        } else {
            const errors = await req.json();
            const errorMessage = errors.errors;
            const arrayMessage: string[] = []
            for (let key in errorMessage) {
                arrayMessage.push(errorMessage[key][0])
            }
            setError(arrayMessage)
        }
        setIsloading(false)

    }

    async function login(formData: FormData) {
        setIsSuccess(false)
        setIsloading(true)
        setError([])

        const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/login`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }

        })
        if (req.status == 200) {
            setIsSuccess(true)
            const data = await req.json();
            // setCookie('token_session', data.access_token, { maxAge: 60 * 60 * 24 * 7, domain: 'ninepmx.my.id', path: '/' }) // 7 days
            setCookie('token_session', data.access_token, { maxAge: 60 * 60 * 24 * 7 }) // 7 days
            if (params.redirectTo) {
                window.location.href = params.redirectTo
            }
        } else {
            const errors = await req.json();
            const errorMessage = errors.errors;
            const arrayMessage: string[] = []
            for (let key in errorMessage) {
                arrayMessage.push(errorMessage[key][0])
            }
            setError(arrayMessage)
        }

        setIsloading(false)



    }

    async function checkAuth() {
        const cookie = getCookie('token_session');
        if (cookie) {
            // setIsloading(true);
            // setIsSuccess(false);
            const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/user`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${cookie}`
                }

            })
            if (req.status == 200) {
                const data = await req.json();
                setData(data.data);
                // setIsSuccess(true)
                // setIsloading(false)
                return true
            }
        }
        if (params.redirectTo) {
            router.push(params.redirectTo)
        }
        // setIsloading(false)

    }
    return { register, login, setError, error, isLoading, isSuccess, data }

}
export async function logout() {
    const req = await fetch(`${process.env.NEXT_PUBLIC_API}/api/auth/logout`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${getCookie('token_session')}`
        }

    })
    deleteCookie('token_session')
    mutate(`${process.env.NEXT_PUBLIC_API}/api/auth/user`);
}