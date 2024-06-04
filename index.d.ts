interface BaseModel {
  id?: string
  createTime?: string
  updateTime?: string
  createUser?: string
  updateUser?: string
  [key: string]: any
}

interface ModelClass {
  new(): T
  getModelName: () => string
  getFieldInfos: () => FieldInfos
}

type FieldType =
  'boolean' | 'integer' | 'float' |
  'string' | 'text' | 'password' |
  'date' | 'time' | 'datetime' |
  'many2one' | 'one2many' | 'many2many' |
  'image' | 'file'

type FieldInfo = {
  name: string
  type: FieldType
  lable: string
  relation?: string
  required?: boolean
  readonly?: boolean
}

type FieldInfos = { [key: string]: FieldInfo; }
