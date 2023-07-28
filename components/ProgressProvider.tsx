'use client'

import { AppProgressBar } from "next-nprogress-bar"

export default function ProgressProvider({ children }: { children: React.ReactNode }) {
    return <>
        {children}
        {/* <AppProgressBar
            height="4px"
            color="#471069"
            options={{ showSpinner: false }}
            shallowRouting
        /> */}
    </>

}