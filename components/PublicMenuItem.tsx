import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PublicModalInfo from "./PublicModalInfo";
import { ItemData } from "@/types/ItemData";
async function handleDownload(ItemData: ItemData) {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_API}/api/public/download/${ItemData.item_id}`
    link.target = '_blank';
    link.click();
    link.remove();

}
export default function PublicMenuItem({ item }: { item: ItemData }) {
    const [openInfo, setOpenInfo] = useState(false);
    return <>
        <PublicModalInfo openInfo={openInfo} setOpenInfo={setOpenInfo} item={item} />
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
                </Menu.Items>
            </Transition>
        </Menu>
    </>
}