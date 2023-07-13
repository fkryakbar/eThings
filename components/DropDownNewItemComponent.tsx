"use client"
import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment, useState } from "react";
import UploadModalComponent from "./UploadModalComponent";
import CreateFolderModalComponent from "./CreateFolderModalComponent";

export default function DropDownNewItemComponent() {
    let [isUploadOpen, setIsUploadOpen] = useState(false)
    let [isCreateOpen, setIsCreateOpen] = useState(false)

    return (
        <div>
            <UploadModalComponent isOpen={isUploadOpen} setIsOpen={setIsUploadOpen} />
            <CreateFolderModalComponent isOpen={isCreateOpen} setIsOpen={setIsCreateOpen} />
            <Menu as="div" className="relative inline-block text-left z-[10000]">
                <Menu.Button className={'btn bg-white'}>
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
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white drop-shadow ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item as={'div'} className={'mt-2'} onClick={e => setIsUploadOpen(true)}>
                            {({ active }) => (
                                <button className={`flex gap-2 w-full hover:bg-gray-200 px-2 py-2 ${active ? 'bg-gray-200' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <p>Upload</p>
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item as={'div'} className={'mt-2'} onClick={e => setIsCreateOpen(true)}>
                            {({ active }) => (
                                <button className={`flex gap-2 w-full hover:bg-gray-200 px-2 py-2 ${active ? 'bg-gray-200' : ''}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                                    </svg>
                                    <p>Create Folder</p>
                                </button>
                            )}
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}