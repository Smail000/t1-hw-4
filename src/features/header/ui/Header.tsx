import type { AboutMe } from "@/entities/aboutMe";
import { request } from "@/shared/lib/request";
import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

type HeaderProps = {
    to: "add" | "list"
}

export function Header({ to }: HeaderProps) {
    const navigate = useNavigate();

    const { isPending, data } = useQuery({
        queryKey: ["about-me"],
        queryFn: async () => request<AboutMe>("/api/v1/auth/me", "GET"),
        gcTime: 0,
        staleTime: 0
    });

    return (
        <Flex gap={"10px"} alignItems={"center"} w={"full"} justifyContent={"flex-start"} wrap="wrap">
            <Text>Добро пожаловать, { isPending ? <Spinner/> : data?.data.email}</Text>
            {
                to === "add" ?
                <Button w={"fit"} onClick={() => navigate("/user/create")}>Добавить пользователя</Button> :
                <Button w={"fit"} onClick={() => navigate("/")}>Список пользователей</Button>
            }
            <Button justifySelf={"flex-end"} w={"fit"}onClick={
                () => {request("/api/v1/auth/logout", "POST").then(() => navigate("/login"))}}
            >Выйти</Button>
        </Flex>
    )
}
