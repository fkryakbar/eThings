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
export default function CreateFolderModalComponent(props: { isOpen: boolean, setIsOpen: any }) {
    const [isLoading, setIsLoading] = useState(false);
    const params = useBelongs();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        const formElement = e.currentTarget
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData(e.currentTarget);
        formData.append('belongs_to', params);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/storage/create-folder`, {
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
                title: 'Folder Created'
            })
            mutate(`${process.env.NEXT_PUBLIC_API}/api/storage/${params}`)
            formElement.reset()
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
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create Folder
                                </Dialog.Title>
                                <form action="" method="POST" onSubmit={handleSubmit}>
                                    <div className="mt-2">
                                        <input type="text" name="name" placeholder="Type here" className="input input-bordered w-full" disabled={isLoading} />
                                    </div>
                                    <div className="mt-4">
                                        <button
                                            type="submit" disabled={isLoading}
                                            className="btn btn-sm bg-green-500 hover:bg-green-700 text-white"
                                        >
                                            Create
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