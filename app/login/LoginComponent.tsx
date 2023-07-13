"use client"

import useAuth from "@/utils/useAuth"
import useUser from "@/utils/useUser"
import { FormEvent } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
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

export default function Login() {
    const { data } = useAuth();
    if (data) {
        setTimeout(() => {
            window.location.href = '/lib'
        }, 500)
    }

    const { login, setError, isLoading, error, isSuccess } = useUser({ redirectTo: '/lib' })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);

        login(formData)
    }

    if (error.length > 0) {
        let message = ''
        error.forEach((e) => [
            message += e + '\n'
        ])
        Toast.fire({
            icon: 'error',
            title: message
        })
        setError([])
    }

    if (isSuccess) {
        Toast.fire({
            icon: 'success',
            title: 'Login Success'
        })
    }
    return <>
        <form action="" method="POST" className="mt-4" autoComplete="off" onSubmit={handleSubmit}>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-gray-500">Email</span>
                </label>
                <input type="email" name="email" placeholder="whoever@example.com" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text text-gray-500">Password</span>
                </label>
                <input type="password" name="password" placeholder="Password123" className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full mt-4">
                <button className='btn bg-[#471069] text-white hover:bg-[#30c5d2]' disabled={isLoading}>Login</button>
            </div>
        </form>
    </>
}
