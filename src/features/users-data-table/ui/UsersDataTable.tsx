import type { UserGetType } from "@/entities/user/model/user.type"
import { Popover } from "@/shared/components/Popover";
import { Button, Stack, Table, Text } from "@chakra-ui/react"
import { MdClear, MdDelete, MdDone, MdEdit, MdOutlineHorizontalRule } from "react-icons/md";
import { useNavigate } from "react-router";

type UsersDataTableProps = {
    users: UserGetType[]
    refetch: () => never
}

export function UsersDataTable({ users, refetch }: UsersDataTableProps) {
    const navigate = useNavigate();

    return (
        <Table.Root size="sm" showColumnBorder striped border={"2px solid lightgray"} overflow={"auto"}>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader>Удалить</Table.ColumnHeader>
                    <Table.ColumnHeader>Редактировать</Table.ColumnHeader>
                    <Table.ColumnHeader>ID</Table.ColumnHeader>
                    <Table.ColumnHeader>Имя</Table.ColumnHeader>
                    <Table.ColumnHeader>Фамилия</Table.ColumnHeader>
                    <Table.ColumnHeader>Полное имя</Table.ColumnHeader>
                    <Table.ColumnHeader>Дата рождения</Table.ColumnHeader>
                    <Table.ColumnHeader>Телефон</Table.ColumnHeader>
                    <Table.ColumnHeader>Работа</Table.ColumnHeader>
                    <Table.ColumnHeader>Согласие</Table.ColumnHeader>
                    <Table.ColumnHeader>Почта</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {users.map((item) => (
                    <Table.Row key={item.id}>
                        <Table.Cell>
                            <Popover
                                child1={
                                    <Button variant={"outline"}><MdDelete /></Button>
                                }

                                child2={
                                    <Stack>
                                        <Text>Уверены, что хотите удалить пользователя?</Text>
                                        <Button variant={"outline"} onClick={() => {
                                            refetch();
                                            console.log(`Delete task ${item.id}`);
                                        }}><MdDelete /></Button>
                                    </Stack>
                                }
                            />
                            
                        </Table.Cell>
                        <Table.Cell><Button variant={"outline"} onClick={() => navigate(`user/edit/${item.id}`)}><MdEdit /></Button></Table.Cell>
                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.name || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.surName || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.fullName || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.birthDate || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.telephone || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.employment || <MdOutlineHorizontalRule />}</Table.Cell>
                        <Table.Cell>{item.userAgreement ? <MdDone /> : <MdClear />}</Table.Cell>
                        <Table.Cell>{item.email}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    )
}
