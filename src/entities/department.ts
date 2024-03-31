export default class Department {
    static getModelName() {
        return "department"
    }

    id?: string
    parentId?: string
    children?: Department[]
    orderNum?: number
    name?: string
}