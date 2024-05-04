type FieldType =
  'boolean' | 'integer' | 'float' |
  'string' | 'text' | 'password' |
  'date' | 'time' | 'datetime' |
  'many2one' | 'one2many' | 'many2many' |
  'image' | 'file'

type FieldTypes = { [key: string]: FieldType; }
