import type Department from './department'
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
  departmentId?: Department
  roles?: Role[]
}