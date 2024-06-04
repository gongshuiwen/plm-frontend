import { BaseRpcClient } from '@/utils/rpcClient'
import Role from '@/models/role'

class RoleClient extends BaseRpcClient<Role> {
}

export default new RoleClient(Role.getModelName())