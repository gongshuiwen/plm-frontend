export default class Department {
  static getModelName() {
    return "department"
  }

  static getFieldInfos(): FieldInfos {
    return {
      "parentId": {
        "name": "parentId",
        "lable": "上级部门",
        "type": "many2one",
        "relation": "department",
        "required": true
      },
      "children": {
        "name": "children",
        "lable": "下级部门",
        "type": "one2many",
        "relation": "department"
      },
      "orderNum": {
        "name": "orderNum",
        "lable": "序号",
        "type": "integer",
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
  parentId?: string
  children?: Department[]
  orderNum?: number
  name?: string
}