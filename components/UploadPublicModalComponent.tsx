import useBelongs from "@/utils/useBelongs";
import { Transition, Dialog } from "@headlessui/react";
import axios, { AxiosError } from "axios";
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
export default function UploadModalComponent(props: { isOpen: boolean, setIsOpen: any }) {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const belongs_to = useBelongs();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        const formElement = e.currentTarget
        setIsLoading(true)
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        if (belongs_to != 'root') {
            formData.append('belongs_to', belongs_to);
        }
        try {
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/public/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'public-key': `${process.env.NEXT_PUBLIC_TOKEN}`
                },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setProgress(progress)
                    }
                },

            })
            Toast.fire({
                icon: 'success',
                title: `${data.message}`
            })
            mutate(`${process.env.NEXT_PUBLIC_API}/api/public/view/${belongs_to}`)
            formElement.reset()
            props.setIsOpen(false)
        } catch (err: any) {
            const error = err
            if (error.response) {
                Toast.fire({
                    icon: 'error',
                    title: error.response.data.message
                })
            }
        }
        setProgress(0)
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
                                    Upload File
                                </Dialog.Title>
                                <form action="" method="POST" onSubmit={handleSubmit}>
                                    <div className="mt-2">
                                        <input type="file" name="file[]" className="file-input file-input-bordered w-full" multiple disabled={isLoading} />
                                    </div>
                                    {
                                        isLoading ? (<>
                                            <progress className="progress progress-success" value={progress} max="100"></progress>
                                        </>) : null
                                    }
                                    <div className="mt-2">
                                        <button
                                            type="submit" disabled={isLoading}
                                            className="btn btn-sm bg-green-500 hover:bg-green-700 text-white"
                                        >
                                            Upload
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