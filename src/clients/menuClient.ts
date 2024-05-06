import { RpcClient } from '@/utils/rpcClient'
import Menu from '@/models/menu'

class MenuClient extends RpcClient<Menu> {
  async tree(): Promise<Menu[]> {
    return (await this.axiosInstance.get(`${this.baseURL}/tree`)).data
  }
}

export default new MenuClient(Menu.getModelName())
