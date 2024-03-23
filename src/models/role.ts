export default class Role {
    static getModelName() {
        return "role"
    }

    id?: string
    code?: string
    name?: string

    constructor(id?: string, code?: string, name?: string) {
        this.id = id
        this.code = code
        this.name = name
    }
}