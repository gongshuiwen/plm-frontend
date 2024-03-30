import { Rpclient } from '@/utils/rpcClient'
import Menu from '@/entities/menu'

class MenuClient extends Rpclient<Menu> {
  async tree(): Promise<Menu[]> {
    return (await this.axiosInstance.get(`${this.baseURL}/tree`)).data
  }
}

export default new MenuClient(Menu.getModelName())
