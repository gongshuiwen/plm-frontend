import { Rpclient } from '@/utils/rpcClient'
import User from '@/entities/user'

class UserClient extends Rpclient<User> {
}

export default new UserClient(User.getModelName());