import { BaseRpcClient } from '@/utils/rpcClient'
import Menu from '@/models/menu'

class MenuClient extends BaseRpcClient<Menu> {
  async getMenusTree(): Promise<Menu[]> {
    return (await this.axiosInstance.post(`${this.baseURL}/getMenusTree`)).data
  }
}

export default new MenuClient(Menu.getModelName())
