import { Button, Group, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { onSubmit, onInvalid } from "../model/formHandlers"
import type { LoginBody } from "@/entities/login";
import { Toaster } from "@/shared/components/Toast";
import { useNavigate } from "react-router";
import { PasswordInput } from "@/shared/components/PasswordInput";

export function LoginForm() {

    /*
        Тут по хорошему стоило прописать логику того,
        что если пользователь уже залогинен, то ему
        либо не нужно логиниться заного, либо нужно выйти
        из текущего аккаунта, чтобы зайти в новый. Но
        текущий api не жалуется, если пользователь пытается
        будучи залогиненым зайти на другой аккаунт. Поэтому
        необходимости в проверке на авторизацию просто нет.
    */
    
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<LoginBody>();
    const navigate = useNavigate();

    return (
        <>
            <Stack gap="10px" as={"form"} onSubmit={handleSubmit(onSubmit(navigate), onInvalid)}>
                <Group gap={"20px"}>
                    <Stack gap={"23px"}>
                        <Text userSelect={"none"}>Email</Text>
                        <Text userSelect={"none"}>Password</Text>
                    </Stack>
                    <Stack gap={"10px"}>
                        <Input type="email" placeholder="Ваш Email..."
                            {...register("email", {
                                required: {
                                    message: "Введите email",
                                    value: true
                                }
                            })} />
                        <PasswordInput type="password" placeholder="Ваш пароль..."
                            {...register("password", {
                                required: {
                                    message: "Введите пароль",
                                    value: true
                                },
                                minLength: {
                                    message: "Минимальная длинна пароля 5 символов",
                                    value: 5
                                }
                            })} />
                    </Stack>
                </Group>
                <Button width="100%" type="submit" variant={isSubmitting ? "outline" : "solid"}>{isSubmitting ? <Spinner /> : "Login"}</Button>
            </Stack>
            <Toaster />
        </>
    )
}
