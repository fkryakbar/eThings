import { ItemData } from "@/types/ItemData";
import useBelongs from "@/utils/useBelongs";
import { Transition, Dialog } from "@headlessui/react";
import { getCookie } from "cookies-next";
import { FormEvent, Fragment, useState } from "react";
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
export default function RenameModal(props: { isOpen: boolean, setIsOpen: any, itemData: ItemData }) {
    const { itemData } = props
    const params = useBelongs();
    const [isLoading, setIsLoading] = useState(false)
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        const formElement = e.currentTarget
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/public/update/${itemData.item_id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`,
            },
            body: formData

        })
        if (response.status == 200) {
            Toast.fire({
                icon: 'success',
                title: 'Item renamed'
            })
            mutate(`${process.env.NEXT_PUBLIC_API}/api/public/view/${params}`)
            props.setIsOpen(false)

        } else {
            const { message } = await response.json()
            Toast.fire({
                icon: 'error',
                title: message
            })
        }
        setIsLoading(false)

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
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                        Rename
                                    </h2>
                                </Dialog.Title>
                                <form action="" method="POST" onSubmit={handleSubmit} className="mt-3">
                                    <div className="mt-2">
                                        <input type="text" name="name" placeholder="Type here" defaultValue={itemData.name} className="input input-bordered w-full" disabled={isLoading} />
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit" disabled={isLoading}
                                            className="btn btn-sm bg-green-500 hover:bg-green-700 text-white"
                                        >
                                            Rename
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    </>
}