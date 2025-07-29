import { LoginForm } from "@/features/login-form"
import { Center } from "@chakra-ui/react"

export default function LoginPage() {

    return (
        <Center width={"100%"} height={"100vh"} p="10px">
            <LoginForm />
        </Center>
    )
}
