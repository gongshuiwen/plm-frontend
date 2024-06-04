import { BaseRpcClient } from '@/utils/rpcClient'
import Department from '@/models/department'

class DepartmentClient extends BaseRpcClient<Department> {
}

export default new DepartmentClient(Department.getModelName())