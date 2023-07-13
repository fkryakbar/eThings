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
        throw new Error(error.message)
    }

})

export default function useItems({ folder }: { folder: string }) {
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API}/api/storage/${folder}`, fetcher);

    return { data, error, isLoading }
}