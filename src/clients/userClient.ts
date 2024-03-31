import { RpcClient } from '@/utils/rpcClient'
import User from '@/entities/user'

class UserClient extends RpcClient<User> {
}

export default new UserClient(User.getModelName());