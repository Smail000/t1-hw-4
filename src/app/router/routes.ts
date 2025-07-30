import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { RootPage } from "@/pages/RootPage";
import { UserCreatePage } from "@/pages/UserCreatePage";
import { UserEditPage } from "@/pages/UserEditPage";
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
                path: "/user/create",
                Component: UserCreatePage
            },
            {
                path: "/user/edit/:id",
                Component: UserEditPage
            },
            {
                path: "/login",
                Component: LoginPage
            }
        ]
    }
]);
