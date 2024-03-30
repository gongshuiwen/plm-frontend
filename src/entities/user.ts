import type Role from './role'

export default class User {
    static getModelName() {
        return "user"
    }

    id?: string
    username?: string
    password?: string
    nickname?: string
    avatar?: string
    roles?: Role[]

    constructor(id?: string, username?: string, nickname?: string, avatar?: string, roles?: Role[]) {
        this.id = id
        this.username = username
        this.nickname = nickname
        this.avatar = avatar
        this.roles = roles
    }
}