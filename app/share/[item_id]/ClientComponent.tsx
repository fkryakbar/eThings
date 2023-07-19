"use client"
import LoadingPage from "@/components/LoadingPage";
import PublicMenuItem from "@/components/PublicMenuItem";
import UploadPublicModalComponent from "@/components/UploadPublicModalComponent";
import { ItemData } from "@/types/ItemData";
import { Dialog, Menu, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`
    }

}).then(async (r) => {
    if (r.status == 200) {
        return await r.json()
    } else {
        const error = await r.json();
        throw new Error(error.message)
    }

})
export default function Share({ item_id }: { item_id: string }) {
    let [isUploadOpen, setIsUploadOpen] = useState(false)
    const [folder, setFolder] = useState('root')

    const router = useRouter()
    const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API}/api/public/view/${item_id}`, fetcher);
    if (isLoading) return <LoadingPage />
    const handleDoubleClick = (e: any, item: ItemData) => {
        if (item.type == 'folder') {
            localStorage.setItem('folder', item.name);
            router.push(`/share/${item.item_id}`)
            return true
        }
        const link = document.createElement('a');
        link.href = `${process.env.NEXT_PUBLIC_API}/api/public/download/${item.item_id}`
        link.download = item.name;
        link.target = '_blank';
        link.click();
        link.remove();
    }
    function dateConvert(date: string) {
        const dt = new Date(date);
        return dt.toLocaleString("en-EN", { day: 'numeric', month: 'short', year: 'numeric', minute: 'numeric', hour: 'numeric' })
    }
    return <>
        <div className="relative p-2 mt-8">
            <div className="mx-auto lg:w-[500px] w-full text-center">
                <Link href={'/'}>
                    <h1 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#30c5d2] to-[#471069] p-2'>eThings</h1>
                </Link>
                <p className='text-xs lg:text-sm font-semibold text-gray-600'>Fast and Easy Storage Solutions for Your Digital World</p>
            </div>
            <div className="relative mt-5 rounded-lg bg-base-100 drop-shadow p-3 mx-auto lg:w-[500px] w-full">
                <div className="flex justify-between items-center">
                    <div className="text-sm breadcrumbs">
                        <ul>
                            {
                                !error ? (<>
                                    <li><p className="font-semibold">{data.folder.name}</p></li>
                                </>) : <li><p className="font-semibold">Access Denied</p></li>
                            }
                            {
                                folder != 'root' ? (<>
                                    <li><p>{folder}</p></li>
                                </>) : null
                            }
                        </ul>
                    </div>
                    <div className="flex gap-2 items-center">
                        {
                            !error ? (<>
                                {
                                    data.folder.access == 'open' ? (<>
                                        <UploadPublicModalComponent isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />
                                        <Menu as="div" className="relative inline-block text-left z-[10000]">
                                            <Menu.Button className={'btn bg-white btn-sm'}>
                                                +
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
                                                <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md bg-white drop-shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item as={'div'} className={''} onClick={e => setIsUploadOpen(true)}>
                                                        {({ active }) => (
                                                            <button className={`flex gap-2 w-full hover:bg-gray-200 px-2 py-2 ${active ? 'bg-gray-200' : ''}`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                                                </svg>
                                                                <p>Upload</p>
                                                            </button>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </>) : null
                                }
                            </>) : null
                        }
                        {
                            !error ? (
                                <>
                                    <Popover className="relative">
                                        <Popover.Button className={'btn bg-white btn-sm focus:outline-none'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                            </svg>
                                        </Popover.Button>
                                        <Popover.Panel className="absolute z-10 bg-white drop-shadow p-3 rounded w-80 right-0">
                                            <table className="w-full text-sm">
                                                <tbody>
                                                    <tr>
                                                        <td className="font-semibold">Owner</td>
                                                        <td>{data.folder.user.name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Access</td>
                                                        <td>{data.folder.access}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Created at</td>
                                                        <td>{dateConvert(data.folder.created_at)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="font-semibold">Last Update</td>
                                                        <td>{dateConvert(data.folder.updated_at)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </Popover.Panel>
                                    </Popover>
                                </>
                            ) : null
                        }
                    </div>
                </div>
                <div className="mt-4">
                    {
                        error ? (
                            <>
                                <div className="flex flex-col items-center gap-1 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                    <p className="text-xs">
                                        {error.message}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
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
                                                                    <div className="relative">
                                                                        <PublicMenuItem item={item} folder_data={data.folder} />
                                                                    </div>

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
                        )
                    }


                </div>
            </div>
        </div>
    </>
}