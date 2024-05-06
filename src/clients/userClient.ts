import { RpcClient } from '@/utils/rpcClient'
import User from '@/models/user'

class UserClient extends RpcClient<User> {
}

export default new UserClient(User.getModelName());