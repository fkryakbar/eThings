import useBelongs from "@/utils/useBelongs";
import useItems from "@/utils/useItems";
import MenuItemComponent from "./MenuItemComponent";
import { ItemData } from "@/types/ItemData";
import LoadingItems from "./LoadingItems";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
export default function ItemTableComponent(props: { setFolder: any }) {
    const router = useRouter()
    const folder = useBelongs()
    const { data, error, isLoading } = useItems({ folder });
    useEffect(() => {
        if (data) {
            if (data.folder) {
                props.setFolder(data.folder.name)
            } else {
                props.setFolder('root')
            }
        }

    }, [isLoading, data])
    if (isLoading) return <LoadingItems />
    if (error) return <>Something Went Wrong</>


    const handleDoubleClick = (e: any, item: ItemData) => {
        if (item.type == 'folder') {
            localStorage.setItem('folder', item.name);
            router.push(`/lib/${item.item_id}`)
            return true
        }
        const link = document.createElement('a');
        link.href = `${process.env.NEXT_PUBLIC_API}/api/redirect?u=${getCookie('token_session')}&item=${item.item_id}`
        link.download = item.name;
        link.target = '_blank';
        link.click();
        link.remove();



    }
    return <>
        {
            data.data.length == 0 ? (<>
                <div className="flex flex-col items-center gap-1 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <p className="text-xs">
                        Still empty...
                    </p>
                </div>

            </>) : (
                <table className="table lg:table-md table-xs">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th></th>
                            <th>Size</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.data.map((item: ItemData, key: number) => {
                                return (
                                    <tr key={key} className="hover:bg-gray-100 transition-all group cursor-pointer" onDoubleClick={e => { handleDoubleClick(e, item) }}>
                                        <th>
                                            {
                                                item.type == 'folder' ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                                    </svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                    </svg>
                                                )
                                            }
                                        </th>
                                        <td>{item.name}</td>
                                        <td>
                                            {item.file_size ? (item.file_size) : ('-')}
                                        </td>
                                        <td className="relative">
                                            <MenuItemComponent ItemData={item} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            )
        }


    </>
}