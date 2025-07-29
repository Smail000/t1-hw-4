import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RootPage } from "@/pages/RootPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootPage,
        children: [
            {
                index: true,
                Component: HomePage
            },
            {
                path: "/login",
                Component: LoginPage
            }
        ]
    }
]);
