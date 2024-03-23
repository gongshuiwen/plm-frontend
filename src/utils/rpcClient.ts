import axios from 'axios'
import type { AxiosResponse } from 'axios'

class BatchDTO<T> {
  ids: string[]
  data?: T

  constructor(ids: string[], data?: T) {
    this.ids = ids
    this.data = data
  }
}

export interface R<T> {
  code: number
  message: string
  data: T
}

export interface Page<T> {
  current: number
  total: number
  records: T[]
}

export class Rpclient<T> {
  private baseURL: string

  constructor(modelName: string) {
    this.baseURL = '/api/' + modelName
  }

  async selectById(id: string | undefined | null ): Promise<T> {
    try {
      if (!id) throw new Error('id is required')
      const response: AxiosResponse<R<T>> = await axios.get(`${this.baseURL}/${id}`)
      return response.data.data
    } catch (error) {
      throw new Error(`Get request failed: ${(error as Error).message}`)
    }
  }

  async selectByIds(ids: string[] | undefined | null): Promise<T[]> {
    try {
      if (!ids) throw new Error('ids is required')
      if (ids.length === 0) return []
      const response: AxiosResponse<R<T[]>> = await axios.get(`${this.baseURL}/batch`, { params: { ids: ids.join(',') }})
      return response.data.data
    } catch (error) {
      throw new Error(`Get request failed: ${(error as Error).message}`)
    }
  }

  async page(pageNum: number, pageSize: number): Promise<Page<T>> {
    try {
      const response: AxiosResponse<R<Page<T>>> = await axios.post(`${this.baseURL}/page`, {
        pageSize,
        pageNum
      })
      return response.data.data
    } catch (error) {
      throw new Error(`Page request failed: ${(error as Error).message}`)
    }
  }

  async createOne(data: T | undefined | null): Promise<T> {
    try {
      if (!data) throw new Error('data is required')
      const response: AxiosResponse<R<T>> = await axios.post(`${this.baseURL}`, data)
      return response.data.data
    } catch (error) {
      throw new Error(`Create request failed: ${(error as Error).message}`)
    }
  }

  async createBatch(data: T[] | undefined | null): Promise<T[]> {
    try {
      if (!data) throw new Error('data is required')
      if (data.length === 0) return []
      const response: AxiosResponse<R<T[]>> = await axios.post(`${this.baseURL}/batch`, data)
      return response.data.data
    } catch (error) {
      throw new Error(`Create request failed: ${(error as Error).message}`)
    }
  }

  async updateById(id: string | undefined | null, data: T | undefined | null): Promise<boolean> {
    try {
      if (!id) throw new Error('id is required')
      if (!data) throw new Error('data is required')
      const response: AxiosResponse<R<boolean>> = await axios.put(`${this.baseURL}/${id}`, data)
      return response.data.data
    } catch (error) {
      throw new Error(`Update request failed: ${(error as Error).message}`)
    }
  }

  async updateByIds(ids: string[] | undefined | null, data: T | undefined | null): Promise<boolean> {
    try {
      if (!ids) throw new Error('ids is required')
      if (!data) throw new Error('data is required')
      if (ids.length === 0) return false
      const response: AxiosResponse<R<boolean>> = await axios.put(`${this.baseURL}/batch`,
        new BatchDTO<T>(ids, data)
      )
      return response.data.data
    } catch (error) {
      throw new Error(`Update request failed: ${(error as Error).message}`)
    }
  }

  async deleteById(id: string | undefined | null): Promise<boolean> {
    try {
      if (!id) throw new Error('id is required')
      const response: AxiosResponse<R<boolean>> = await axios.delete(`${this.baseURL}/${id}`)
      return response.data.data
    } catch (error) {
      throw new Error(`Delete request failed: ${(error as Error).message}`)
    }
  }

  async deleteByIds(ids: string[] | undefined | null): Promise<boolean> {
    try {
      if (!ids) throw new Error('ids is required')
      const response: AxiosResponse<R<boolean>> = await axios.delete(`${this.baseURL}/batch`, { 
        data: new BatchDTO<null>(ids) 
      })
      return response.data.data
    } catch (error) {
      throw new Error(`Delete request failed: ${(error as Error).message}`)
    }
  }
}

export interface ClassWithGetModelName<T> {
  new (): T
  getModelName: () => string
}

export function useRpcClient<T>(classType: ClassWithGetModelName<T>): Rpclient<T> {
  const modelName = classType.getModelName()
  // TODO: improve performance by cache
  return new Rpclient<T>(modelName)
}
