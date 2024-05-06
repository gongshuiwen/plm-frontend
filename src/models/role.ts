export default class Role {
  static getModelName() {
    return "role"
  }

  static getFieldInfos(): FieldInfos {
    return {
      "code": {
        "name": "code",
        "lable": "标识",
        "type": "string",
        "required": true
      },
      "name": {
        "name": "name",
        "lable": "名称",
        "type": "string",
        "required": true
      }
    }
  }

  id?: string
  code?: string
  name?: string
}