import type { UserCreateType, UserPatchType } from "@/entities/user/model/user.type";
import { Header } from "@/features/header";
import { Box, Button, Checkbox, Input, Spinner, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { onInvalid, onSubmit } from "../model/formHandlers"
import { useNavigate } from "react-router";
import { PasswordInput } from "@/shared/components/PasswordInput";

type UserManageProps = {
    user: Partial<UserCreateType> & { id: string | null }
}

export function UserManage({ user }: UserManageProps) {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<UserPatchType | UserCreateType>();

    return (
        <Stack w={"fit"} p={"10px"} gap={"10px"} overflow={"auto"}>
            <Header to="list" />
            <Stack p={"10px"} as={"form"} onSubmit={handleSubmit(onSubmit(navigate, user.id), onInvalid)}>
                <Box>
                    <Text userSelect={"none"}>Имя</Text>
                    <Input {...register("name", {
                                required: {
                                    message: "Введите имя",
                                    value: true
                                }
                            })} defaultValue={user.name || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Фамилия</Text>
                    <Input {...register("surName", {
                                required: {
                                    message: "Введите фамилию",
                                    value: true
                                }
                            })} defaultValue={user.surName || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Полное имя</Text>
                    <Input {...register("fullName", {
                                required: {
                                    message: "Введите полное имя",
                                    value: true
                                }
                            })} defaultValue={user.fullName || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Дата рождения</Text>
                    <Input {...register("birthDate", { valueAsDate: true })} defaultValue={user.birthDate || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Телефон</Text>
                    <Input {...register("telephone")}
                        defaultValue={user.telephone || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Работа</Text>
                    <Input {...register("employment")} defaultValue={user.employment || ""}/>
                </Box>
                <Box>
                    <Text userSelect={"none"}>Соглашение</Text>
                    <Checkbox.Root defaultChecked disabled variant={"outline"}>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control/>
                    </Checkbox.Root>
                </Box>

                {
                    user.id === null &&
                    <>
                        <Box>
                            <Text userSelect={"none"}>Почта</Text>
                            <Input type="email" {...register("email", {
                                required: {
                                    message: "Введите email",
                                    value: true
                                }
                            })}/>
                        </Box>
                        <Box>
                            <Text userSelect={"none"}>Пароль</Text>
                            <PasswordInput {...register("password", {
                                required: {
                                    message: "Введите пароль",
                                    value: true
                                },
                                minLength: {
                                    message: "Минимальная длинна пароля 5 символов",
                                    value: 5
                                }
                            })}/>
                        </Box>
                    </>
                }
                <Button
                    width="100%" type="submit" 
                    variant={isSubmitting ? "outline" : "solid"}
                > {isSubmitting ? <Spinner /> : ( user.id === null ? "Создать пользователя" : "Редактировать пользователя" )} </Button>
            </Stack>
        </Stack>
    )
}
