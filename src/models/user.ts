import type Role from './role'

export default interface User {
    id: string
    username: string
    nickname: string
    avatar: string
    roles: Role[]
}