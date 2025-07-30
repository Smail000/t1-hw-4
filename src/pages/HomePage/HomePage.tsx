import type { UserGetType } from "@/entities/user/model/user.type";
import { Header } from "@/features/header";
import { UsersDataTable } from "@/features/users-data-table";
import { toaster } from "@/shared/components/Toast";
import { request } from "@/shared/lib/request";
import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {

    const navigate = useNavigate();

    const { isPending, data, refetch } = useQuery({
        queryKey: ["user-data"],
        queryFn: async () => request<UserGetType[]>("/api/v1/users", "GET"),
        refetchOnWindowFocus: false,
        gcTime: 0,
        staleTime: 0
    })

    useEffect(() => {
        if (!isPending && data?.statusCode !== 200) {
            toaster.create({
                title: "Не авторизован",
                type: "error"
            })
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isPending ]);

    if (isPending) return (
        <Spinner />
    )

    if (data?.statusCode !== 200) return (
        <Text>Not allowed</Text>
    )

    return (
        <>
            <Stack w={"fit"} p={"10px"} gap={"10px"} overflow={"auto"}>
                <Header to="add" />
                {/* <Button onClick={() => refetch()}>Refetch</Button> */}
                <UsersDataTable users={data.data} refetch={refetch as never}/>
            </Stack>
        </>
    )
}
