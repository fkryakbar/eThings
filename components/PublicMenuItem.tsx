import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PublicModalInfo from "./PublicModalInfo";
import { ItemData } from "@/types/ItemData";
import Swal from "sweetalert2";
import { mutate } from "swr";
import useBelongs from "@/utils/useBelongs";
import PublicRenameModal from "./PublicRenameModal";

async function handleDownload(ItemData: ItemData) {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API}/api/public/download/${ItemData.item_id}`
    link.target = '_blank';
    link.click();
    link.remove();

}

export default function PublicMenuItem({ item, folder_data }: { item: ItemData, folder_data: any }) {
    const [openInfo, setOpenInfo] = useState(false);
    let [isRenameOpen, setIsRenameOpen] = useState(false)
    const params = useBelongs();
    async function deleteItem() {
        const itemIds = {
            item_ids: [item.item_id]
        }
        const folder_id = new FormData();
        folder_id.append('item_id', item.item_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                if (item.type == 'folder') {
                    return fetch(`${process.env.NEXT_PUBLIC_API}/api/public/file-delete`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`,
                        },
                        body: folder_id
                    })
                }
                return fetch(`${process.env.NEXT_PUBLIC_API}/api/public/file-delete`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemIds)
                })
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { message } = await result.value?.json()
                if (result.value?.ok) {
                    Swal.fire(
                        'Deleted!',
                        `${message}`,
                        'success'
                    )
                } else {
                    Swal.fire(
                        'Failed to delete',
                        `${message}`,
                        'error'
                    )
                }
                mutate(`${process.env.NEXT_PUBLIC_API}/api/public/view/${params}`)
            }
        })
    }
    return <>
        <PublicModalInfo openInfo={openInfo} setOpenInfo={setOpenInfo} item={item} />
        <PublicRenameModal isOpen={isRenameOpen} setIsOpen={setIsRenameOpen} itemData={item} />
        <Menu as="div" className="relative inline-block text-left">
            <Menu.Button>
                <label tabIndex={0} className="btn btn-xs border-0 m-1 bg-white group-hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
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
                <Menu.Items className="absolute right-0 w-56 origin-top-right rounded-md bg-white drop-shadow ring-1 ring-black ring-opacity-5 focus:outline-none z-[100000000]">
                    {
                        folder_data.access == 'open' && item.type != 'folder' ? (<>
                            <Menu.Item
                                as={"div"} onClick={() => setIsRenameOpen(true)}
                                className={""}
                            >
                                {({ active }) => (
                                    <>
                                        <button className={`flex items-center gap-2 hover:bg-gray-200 px-2 py-2 w-full ${active ? 'bg-gray-200' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            <p>
                                                Rename
                                            </p>
                                        </button>
                                    </>

                                )}
                            </Menu.Item>
                        </>) : null
                    }
                    {
                        item.type != 'folder' ? (<>
                            <Menu.Item
                                as={"div"} onClick={() => handleDownload(item)}
                                className={""}
                            >
                                {({ active }) => (
                                    <button className={`flex items-center gap-2 hover:bg-gray-200 px-2 py-2 w-full ${active ? 'bg-gray-200' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                        <p>
                                            Download
                                        </p>
                                    </button>
                                )}
                            </Menu.Item>
                        </>) : null
                    }
                    <Menu.Item
                        as={"div"} onClick={() => setOpenInfo(true)}
                        className={""}
                    >
                        {({ active }) => (
                            <button className={`flex items-center gap-2 hover:bg-gray-200 px-2 py-2 w-full ${active ? 'bg-gray-200' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>
                                <p>
                                    Info
                                </p>
                            </button>
                        )}
                    </Menu.Item>
                    {
                        folder_data.access == 'open' && item.type != 'folder' ? (<>
                            <Menu.Item
                                as={"div"} onClick={deleteItem}
                                className={""}
                            >
                                {({ active }) => (
                                    <button className={`flex items-center gap-2 hover:bg-gray-200 px-2 py-2 w-full ${active ? 'bg-gray-200' : ''} text-red-500`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        <p>
                                            Delete
                                        </p>
                                    </button>
                                )}
                            </Menu.Item>
                        </>) : null
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    </>
}