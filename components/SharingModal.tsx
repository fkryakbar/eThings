import { ItemData } from "@/types/ItemData";
import useBelongs from "@/utils/useBelongs";
import { Transition, Dialog } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { Fragment, useState } from "react";
import Swal from "sweetalert2";
import { mutate } from "swr";
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
export default function SharingModal(props: { isOpen: boolean, setIsOpen: any, itemData: ItemData }) {
    const { itemData } = props
    const params = useBelongs();
    const [isLoading, setIsLoading] = useState(false)
    async function setTo(access: string) {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('access', access);
        formData.append('name', itemData.name);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/storage/update/${itemData.item_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${getCookie('token_session')}`
            },
            body: formData

        })
        if (response.status == 200) {
            Toast.fire({
                icon: 'success',
                title: `Access set to ${access}`
            })
            mutate(`${process.env.NEXT_PUBLIC_API}/api/storage/${params}`)

        } else {
            const { message } = await response.json()
            Toast.fire({
                icon: 'error',
                title: message
            })
        }
        setIsLoading(false)

    }
    async function copyLink() {
        if (itemData.type == 'folder') {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST}/share/${itemData.item_id}`).then(() => {
                Toast.fire({
                    icon: 'success',
                    title: `Link Copied`
                })
            })
            return true;
        }
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API}/api/public/download/${itemData.item_id}`).then(() => {
            Toast.fire({
                icon: 'success',
                title: `Link Copied`
            })
        })
    }
    return <>
        <Transition appear show={props.isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={e => props.setIsOpen(false)}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="div"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    <h2 className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                                        </svg>
                                        Sharing
                                    </h2>
                                </Dialog.Title>
                                <div className="form-control mt-3">
                                    <label className="cursor-pointer flex items-center gap-2 my-1">
                                        <input type="radio" name="radio-10" className="radio checked:bg-green-500" defaultChecked={itemData.access == 'private'} disabled={isLoading} onChange={e => setTo('private')} />
                                        <span className="label-text">Private</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="cursor-pointer flex items-center gap-2 my-1" >
                                        <input type="radio" name="radio-10" className="radio checked:bg-blue-500" defaultChecked={itemData.access == 'public'} disabled={isLoading} onChange={e => setTo('public')} />
                                        <span className="label-text">Public</span>
                                    </label>
                                </div>
                                <div className="flex gap-2 justify-between mt-3">
                                    <button className="btn btn-sm btn-outline flex items-center" onClick={copyLink}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                                        </svg>
                                        Copy Link
                                    </button>
                                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-800 text-white" onClick={e => props.setIsOpen(false)}>Done</button>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>
}