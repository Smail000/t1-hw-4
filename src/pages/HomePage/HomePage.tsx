import { Box, Button, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";


export default function HomePage() {

    const { isPending, isError, data, error } = useQuery({
        queryKey: ["auth"],
        queryFn: () => fetch("/api/v1/auth/me", { method: "GET" }).then(value => value.json())
    })

    return (
        <Box w={"100%"} p={"10px"} display={"flex"} gap={"10px"}>
            {
                isPending ? <Spinner /> :
                isError ? JSON.stringify(error) :
                JSON.stringify(data)
            }
            <Button
                onClick={async () => fetch("/api/v1/auth/logout", { method: "POST" })}
            >Logout</Button>
        </Box>
    )
}
