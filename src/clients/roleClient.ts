import { RpcClient } from '@/utils/rpcClient'
import Role from '@/entities/role'

class RoleClient extends RpcClient<Role> {
}

export default new RoleClient(Role.getModelName());