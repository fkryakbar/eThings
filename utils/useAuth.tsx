"use client"
import { getCookie } from "cookies-next";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${getCookie('token_session')}`
    }

}).then(async (r) => {
    if (r.status == 200) {
        return await r.json()
    } else {
        const error = await r.json();
        // window.location.href = '/login'
        throw new Error(error.message)
    }

})

export default function useAuth() {
    const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API}/api/auth/user`, fetcher)
    return { data, isLoading, error }
}