import { Toaster } from "@/shared/components/Toast";
import { Outlet } from "react-router";

export function RootPage() {
    return (
        <>
            <Toaster />
            <Outlet />
        </>
    )
}
