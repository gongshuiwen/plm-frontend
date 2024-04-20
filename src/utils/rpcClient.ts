import type { AxiosResponse, AxiosInstance } from 'axios'
import defaultAxiosInstance from './request'

export interface R<T> {
  code: number
  message: string
  data: T
}

export interface Page<T> {
  current: number // page num
  size: number // page size
  pages: number // total pages
  total: number // total records
  records: T[] // current records
}

export class RpcClient<T> {
  baseURL: string
  axiosInstance: AxiosInstance

  constructor(modelName: string, axiosInstance?: AxiosInstance) {
    this.baseURL = '/api/' + modelName
    this.axiosInstance = axiosInstance || defaultAxiosInstance
  }

  async selectById(id: string | undefined | null): Promise<T> {
    if (!id) throw new Error('id is required')
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(`${this.baseURL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Get request failed: ${(error as Error).message}`)
    }
  }

  async selectByIds(ids: string[] | undefined | null): Promise<T[]> {
    if (!ids) throw new Error('ids is required')
    if (ids.length === 0) return []
    try {
      const response: AxiosResponse<T[]> = await this.axiosInstance.get(`${this.baseURL}/batch`, {
        params: { ids: ids.join(',') }
      })
      return response.data
    } catch (error) {
      throw new Error(`Get request failed: ${(error as Error).message}`)
    }
  }

  async page(pageNum: number, pageSize: number): Promise<Page<T>> {
    try {
      const response: AxiosResponse<Page<T>> = await this.axiosInstance.post(`${this.baseURL}/page`, {
        pageSize,
        pageNum
      })
      return response.data
    } catch (error) {
      throw new Error(`Page request failed: ${(error as Error).message}`)
    }
  }

  async nameSearch(name: string | undefined | null): Promise<T[]> {
    try {
      const response: AxiosResponse<T[]> = await this.axiosInstance.get(`${this.baseURL}/nameSearch`, {
        params: { name }
      })
      return response.data
    } catch (error) {
      throw new Error(`Search request failed: ${(error as Error).message}`)
    }
  }

  async createOne(data: T | undefined | null): Promise<T> {
    if (!data) throw new Error('data is required')
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(`${this.baseURL}`, data)
      return response.data
    } catch (error) {
      throw new Error(`Create request failed: ${(error as Error).message}`)
    }
  }

  async createBatch(data: T[] | undefined | null): Promise<T[]> {
    if (!data) throw new Error('data is required')
    if (data.length === 0) return []
    try {
      const response: AxiosResponse<T[]> = await this.axiosInstance.post(`${this.baseURL}/batch`, data)
      return response.data
    } catch (error) {
      throw new Error(`Create request failed: ${(error as Error).message}`)
    }
  }

  async updateById(id: string | undefined | null, data: T | undefined | null): Promise<boolean> {
    if (!id) throw new Error('id is required')
    if (!data) throw new Error('data is required')
    try {
      const response: AxiosResponse<boolean> = await this.axiosInstance.put(
        `${this.baseURL}/${id}`,
        data
      )
      return response.data
    } catch (error) {
      throw new Error(`Update request failed: ${(error as Error).message}`)
    }
  }

  async updateByIds(
    ids: string[] | undefined | null,
    data: T | undefined | null
  ): Promise<boolean> {
    if (!ids) throw new Error('ids is required')
    if (!data) throw new Error('data is required')
    try {
      if (ids.length === 0) return false
      const response: AxiosResponse<boolean> = await this.axiosInstance.put(`${this.baseURL}/batch`, {
        params: { ids: ids.join(',') },
        data: data
      })
      return response.data
    } catch (error) {
      throw new Error(`Update request failed: ${(error as Error).message}`)
    }
  }

  async deleteById(id: string | undefined | null): Promise<boolean> {
    if (!id) throw new Error('id is required')
    try {
      const response: AxiosResponse<boolean> = await this.axiosInstance.delete(`${this.baseURL}/${id}`)
      return response.data
    } catch (error) {
      throw new Error(`Delete request failed: ${(error as Error).message}`)
    }
  }

  async deleteByIds(ids: string[] | undefined | null): Promise<boolean> {
    try {
      if (!ids) throw new Error('ids is required')
      const response: AxiosResponse<boolean> = await this.axiosInstance.delete(`${this.baseURL}/batch`, {
        params: { ids: ids.join(',') }
      })
      return response.data
    } catch (error) {
      throw new Error(`Delete request failed: ${(error as Error).message}`)
    }
  }
}

export interface ClassWithGetModelName<T> {
  new (): T
  getModelName: () => string
}

export function useRpcClient<T>(classType: ClassWithGetModelName<T>): RpcClient<T> {
  const modelName = classType.getModelName()
  // TODO: improve performance by cache
  return new RpcClient<T>(modelName)
}
