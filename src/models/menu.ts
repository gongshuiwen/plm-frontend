export default class Menu {
  static getModelName() {
    return "menu"
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
      },
      "title": {
        "name": "title",
        "lable": "biaoti ",
        "type": "string",
        "required": true
      },
      "icon": {
        "name": "icon",
        "lable": "图标",
        "type": "string"
      },
      "path": {
        "name": "path",
        "lable": "路径",
        "type": "string"
      },
      "redirect": {
        "name": "redirect",
        "lable": "重定向",
        "type": "string"
      },
      "component": {
        "name": "component",
        "lable": "组件",
        "type": "string"
      }
    }
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