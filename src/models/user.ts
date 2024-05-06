import type Department from './department'
import type Role from './role'

export default class User {
  static getModelName() {
    return "user"
  }

  static getFieldInfos(): FieldInfos {
    return {
      "username": {
        "name": "username",
        "lable": "用户名",
        "type": "string",
        "required": true
      },
      "nickname": {
        "name": "username",
        "lable": "昵称",
        "type": "string",
        "required": true
      },
      "password": {
        "name": "password",
        "lable": "昵称",
        "type": "password",
        "required": true
      },
      "avatar": {
        "name": "avatar",
        "lable": "头像",
        "type": "image",
        "required": false
      },
      "departmentId": {
        "name": "departmentId",
        "lable": "部门",
        "type": "many2one",
        "relation": "department",
        "required": false
      },
      "roles": {
        "name": "roles",
        "lable": "角色",
        "type": "many2many",
        "relation": "role",
        "required": false
      }
    }
  }

  id?: string
  username?: string
  password?: string
  nickname?: string
  avatar?: string
  departmentId?: Department
  roles?: Role[]
}