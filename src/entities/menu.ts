export default class Menu {
    static getModelName() {
        return "menu"
    }

    id?: string
    orderNum?: number
    name?: string
    title?: string
    icon?: string
    path?: string
    redirect?: string
    component?: string
    children?: Menu[]
}