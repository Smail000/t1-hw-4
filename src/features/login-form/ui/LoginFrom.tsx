import { Button, Group, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { onSubmit, onInvalid } from "../model/formHandlers"

export function LoginForm() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    return (
        <Stack gap="10px" as={"form"} onSubmit={handleSubmit(onSubmit, onInvalid)}>
            <Group gap={"20px"}>
                <Stack gap={"23px"}>
                    <Text userSelect={"none"}>Email</Text>
                    <Text userSelect={"none"}>Password</Text>
                </Stack>
                <Stack gap={"10px"}>
                    <Input type="email" placeholder="Ваш Email..."
                        {...register("email", { required: true, })} />
                    <Input type="password" placeholder="Ваш пароль..."
                        {...register("password", { required: true, minLength: 5 })} />
                </Stack>
            </Group>
            <Button width="100%" type="submit" variant={isSubmitting ? "outline" : "solid"}>{isSubmitting ? <Spinner /> : "Click"}</Button>
        </Stack>
    )
}
