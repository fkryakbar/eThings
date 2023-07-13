"use client"
import { usePathname } from "next/navigation";

export default function useBelongs() {
    const params = usePathname()
    if (params == '/lib') {
        return 'root'
    }

    return params.split('/')[2]
}