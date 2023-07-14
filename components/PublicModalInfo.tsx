import { ItemData } from "@/types/ItemData";
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
function dateConvert(date: string) {
    const dt = new Date(date);
    return dt.toLocaleString("en-EN", { day: 'numeric', month: 'short', year: 'numeric', minute: 'numeric', hour: 'numeric' })
}
export default function PublicModalInfo({ openInfo, setOpenInfo, item }: { openInfo: boolean, setOpenInfo: any, item: ItemData }) {
    return <>
        <Transition appear show={openInfo} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={e => setOpenInfo(false)}>
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
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                        </svg>
                                        Detail
                                    </h2>
                                </Dialog.Title>
                                <table className="table-auto w-full mt-3 text-gray-500 text-sm">
                                    <tbody>
                                        <tr>
                                            <td className="font-semibold">Name</td>
                                            <td>: {item.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Type</td>
                                            <td>: {item.type}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Owner</td>
                                            {
                                                item.user ? (<>
                                                    <td>: {item.user.name}</td>

                                                </>) : (<>
                                                    <td>: {item.user_id}</td>
                                                </>)
                                            }
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Size</td>

                                            <td>: {item.file_size ? (<>{item.file_size}</>) : (<>-</>)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Access</td>
                                            <td>: {item.access}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Created at</td>
                                            <td>: {dateConvert(item.created_at)}</td>
                                        </tr>
                                        <tr>
                                            <td className="font-semibold">Updated at</td>
                                            <td>: {dateConvert(item.updated_at)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>
}