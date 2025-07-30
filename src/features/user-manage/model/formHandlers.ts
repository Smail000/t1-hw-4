import { toaster } from "@/shared/components/Toast";
import type { FieldErrors } from "react-hook-form";
import type { NavigateFunction } from "react-router";
import { request } from "@/shared/lib/request";
import type { UserCreateType, UserPatchType } from "@/entities/user/model/user.type";

/**
 * Специальная обертка для функции onSubmit
 * для передачи функции навигации внутрь
 * функции onSubmit
 * @param navigateFn функция навигации
 * @returns функцию onSubmit
 */
export function onSubmit(navigateFn: NavigateFunction, id: string | null) {
    return async function (body: UserPatchType | UserCreateType) {
        body.userAgreement = true;
        const { statusCode } = await request<never, UserPatchType | UserCreateType>(
            id === null ? "/api/v1/users" : `/api/v1/users/${id}`,
            id === null ? "POST" : "PATCH", body
        );

        if (statusCode === 201 || statusCode === 200) {
            toaster.create({
                title: "Успешная операция",
                type: "success",
                closable: true,
            })
            navigateFn("/");
            return;
        }

        if (statusCode === 409) {
            toaster.create({
                title: "Ошибка",
                description: "Такая почта уже существует",
                type: "error",
                closable: true,
            })
            return;
        }

        toaster.create({
            title: "Ошибка",
            description: "Неверный запрос",
            type: "error",
            closable: true,
        })
    }
}

export function onInvalid(error: FieldErrors<UserPatchType | UserCreateType>) {
    toaster.create({
        title: "Ошибка",
        description: error.name?.message || error.surName?.message ||
            error.fullName?.message || error.birthDate?.message || error.telephone ||
            error.employment?.message || "Заполните оставшиеся поля",
        type: "error",
        closable: true,
    })
}