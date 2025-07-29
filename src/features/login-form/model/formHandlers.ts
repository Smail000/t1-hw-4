import { toaster } from "@/shared/components/Toast";
import type { LoginBody } from "@/entities/login";
import type { FieldErrors } from "react-hook-form";
import type { NavigateFunction } from "react-router";
import { request } from "@/shared/lib/request";

/**
 * Специальная обертка для функции onSubmit
 * для передачи функции навигации внутрь
 * функции onSubmit
 * @param navigateFn функция навигации
 * @returns функцию onSubmit
 */
export function onSubmit(navigateFn: NavigateFunction) {
    return async function (body: LoginBody) {
        const { statusCode } = await request<never, LoginBody>("/api/v1/auth/login", "POST", body);
        if (statusCode === 201) {
            toaster.create({
                title: "Успешная авторизация",
                type: "success",
                closable: true,
            })
            navigateFn("/");
            return;
        }

        toaster.create({
            title: "Ошибка авторизации",
            description: "Неверная почта и/или пароль. Повторите попытку",
            type: "error",
            closable: true,
        })
    }
}

export function onInvalid(error: FieldErrors<LoginBody>) {
    toaster.create({
        title: "Ошибка",
        description: error?.email?.message || error?.password?.message || error?.root?.message,
        type: "error",
        closable: true,
    })
}