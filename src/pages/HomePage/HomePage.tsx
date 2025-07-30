import type { UserGetType } from "@/entities/user/model/user.type";
import { UsersDataTable } from "@/features/users-data-table";
import { request } from "@/shared/lib/request";
import { Button, Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {

    const navigate = useNavigate();

    const { isPending, data } = useQuery({
        queryKey: ["user-data"],
        queryFn: async () => request<UserGetType[]>("/api/v1/users", "GET"),
        gcTime: 0,
        staleTime: 0
    })

    useEffect(() => {
        if (!isPending && data?.statusCode !== 200) {
            navigate("/login");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isPending ])

    if (isPending) return (
        <Center w={"100%"} h={"100vh"}>
            <Spinner />
        </Center>
    )

    if (data?.statusCode !== 200) return (
        <Center w={"100%"} h={"100vh"}>
            <Text>Not allowed</Text>
        </Center>
    )

    return (
        <>
            <Stack w={"fit"} p={"10px"} gap={"10px"} overflow={"auto"}>
                <Flex gap={"10px"} alignItems={"center"} w={"full"} justifyContent={"flex-start"}>
                    <Text>Добро пожаловать, {"user"}</Text>
                    <Button w={"fit"}>Добавить пользователя</Button>
                    <Button justifySelf={"flex-end"} w={"fit"} onClick={() => {request("/api/v1/auth/logout", "POST");navigate("/login")}}>Выйти</Button>
                </Flex>
                <UsersDataTable users={data.data} />
            </Stack>
        </>
    )
}
