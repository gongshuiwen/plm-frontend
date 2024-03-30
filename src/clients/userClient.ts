import User from '@/models/user'
import { Rpclient } from '@/utils/rpcClient'

class UserClient extends Rpclient<User> {
}

export default new UserClient(User.getModelName());