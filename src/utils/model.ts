const modelRegistry: { [key: string]: ModelClass } = {}

function registerModelClass(modelClass: ModelClass) {
  modelRegistry[modelClass.getModelName()] = modelClass
}

const modules: Record<string, { default: ModelClass }> = import.meta.glob(
  [
    '../models/**/*.ts'
  ],
  { eager: true }
)
Object.keys(modules).forEach((key) => {
  const modelClass = modules[key].default
  registerModelClass(modelClass)
})

export function getModelClass(modelName: string): ModelClass {
  const modelClass = modelRegistry[modelName]
  if (!modelClass) {
    throw new Error('Model Class not found: ' + modelName)
  }
  return modelClass
}

export function getFieldInfos(modelName: string): FieldInfos {
  console.log(modelName, getModelClass(modelName).getFieldInfos())
  return getModelClass(modelName).getFieldInfos()
}
