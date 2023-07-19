import { Metadata } from "next";
import ClientComponent from "./ClientComponent";
type Props = {
    params: { item_id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/public/view/${params.item_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`
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


export default function Page(props: { params: { item_id: string } }) {
    console.log(props);

    return <ClientComponent item_id={props.params.item_id} />
}