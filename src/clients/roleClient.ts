import { Rpclient } from '@/utils/rpcClient'
import Role from '@/models/role'

class RoleClient extends Rpclient<Role> {
}

export default new RoleClient(Role.getModelName());