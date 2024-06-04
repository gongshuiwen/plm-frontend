import { BaseRpcClient } from '@/utils/rpcClient'
import User from '@/models/user'

class UserClient extends BaseRpcClient<User> {
}

export default new UserClient(User.getModelName())