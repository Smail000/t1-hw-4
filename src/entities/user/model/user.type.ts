import type { LoginBody } from "@/entities/login"

export type UserPatchType = {
    name: string,
    surName: string,
    fullName: string,
    birthDate: string,
    telephone: string,
    employment: string,
    userAgreement: boolean
}

export type UserCreateType = UserPatchType & LoginBody

export type UserGetType = { id: string } & LoginBody & Partial<UserPatchType>
