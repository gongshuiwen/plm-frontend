import { RpcClient } from '@/utils/rpcClient'
import Department from '@/entities/department'

class DepartmentClient extends RpcClient<Department> {
}

export default new DepartmentClient(Department.getModelName());