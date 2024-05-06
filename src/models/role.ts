export default class Role {
  static getModelName() {
    return "role"
  }

  id?: string
  code?: string
  name?: string
}