import type { UserGetType } from "@/entities/user/model/user.type";
import { UserManage } from "@/features/user-manage";
import { toaster } from "@/shared/components/Toast";
import { request } from "@/shared/lib/request";
import { Center, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";

export function UserEditPage() {
    const params = useParams();

    const navigate = useNavigate();

    const { isPending, data } = useQuery({
        queryKey: ["get-user", params.id],
        queryFn: async () => request<UserGetType>(`/api/v1/users/${params.id}`, "GET"),
        refetchOnWindowFocus: false,
        gcTime: 0,
        staleTime: 0
    })

    useEffect(() => {
        if (!isPending && data?.statusCode === 401) {
            toaster.create({
                title: "Не авторизован",
                type: "error"
            })
            navigate("/login");
        } else if (!isPending && data?.statusCode === 404) {
            toaster.create({
                title: "Пользователь не найден",
                type: "info"
            })
            navigate("/");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ isPending ]);

    if (isPending) return (
        <Spinner />
    )

    if (data?.statusCode !== 200) return (
        <Center w={"100%"} h={"100vh"}>
            <Text>Not allowed</Text>
        </Center>
    )

    return <UserManage user={data.data} />
}
