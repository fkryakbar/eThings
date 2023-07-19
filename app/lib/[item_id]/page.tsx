import { Metadata } from "next";
import LibCompoenent from "../LibComponent";
import { getCookie } from "cookies-next";
import { cookies } from 'next/headers'
type Props = {
    params: { item_id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/storage/${params.item_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${cookies().get('token_session')?.value}`
        }

    });
    if (res.status == 200) {
        const { folder } = await res.json()
        return {
            title: folder.name + ' | eThings',
            description: 'Fast and Easy Storage Solutions for Your Digital World',
        }
    }
    return {
        title: 'Not Found',
        description: 'Fast and Easy Storage Solutions for Your Digital World',
    }

}
export default function Lib() {
    return <>
        <LibCompoenent />
    </>
}