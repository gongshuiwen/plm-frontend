import type { AxiosInstance } from 'axios'
import defaultAxiosInstance from './request'

export interface PageResult<T> {
  current: number // page num
  size: number // page size
  pages: number // total pages
  total: number // total records
  records: T[] // current records
}

export interface RpcClient<T extends BaseModel> {

  baseURL: string
  axiosInstance: AxiosInstance

  /**
   * get record by id
   * @param id id
   */
  getById(id: string): Promise<T>

  /**
   * get records by ids
   * @param ids ids
   */
  getByIds(ids: string[]): Promise<T[]>

  /**
   * get page
   * @param pageNum page num
   * @param pageSize page size
   * @param sorts sort rules
   */
  page(pageNum: number, pageSize: number, sorts?: string): Promise<PageResult<T>>

  /**
   * get count
   */
  count(): Promise<Number>

  /**
   * search by name
   * @param name name
   */
  nameSearch(name: string): Promise<T[]>

  /**
   * create one
   * @param data data
   */
  createOne(data: T): Promise<T>

  /**
   * create batch
   * @param datas datas
   */
  createBatch(datas: T[]): Promise<T[]>

  /**
   * update by id
   * @param data data
   */
  updateById(data: T): Promise<Boolean>

  /**
   * update by ids
   * @param datas datas
   */
  updateByIds(datas: T[]): Promise<Boolean>

  /**
   * delete by id
   * @param id id
   */
  deleteById(id: string): Promise<Boolean>

  /**
   * delete by ids
   * @param ids ids
   */
  deleteByIds(ids: string[]): Promise<Boolean>
}

export class BaseRpcClient<T extends BaseModel> implements RpcClient<T> {
  baseURL: string
  axiosInstance: AxiosInstance

  /**
   * Constructs a new instance of the class with the given model name and optional Axios instance.
   *
   * @param {string} modelName - The name of the model.
   * @param {AxiosInstance} [axiosInstance] - Optional Axios instance to use for HTTP requests. 
   *                                          If not provided, the default Axios instance will be used.
   */
  constructor(modelName: string, axiosInstance?: AxiosInstance) {
    this.baseURL = '/api/' + modelName
    this.axiosInstance = axiosInstance || defaultAxiosInstance
  }

  async getById(id: string): Promise<T> {
    // check params
    if (!id) throw new Error('getById request failed: id is required')

    // do request
    try {
      const response = await this.axiosInstance.get<T[]>(`${this.baseURL}`, {
        params: { ids: id }
      })
      return response.data[0]
    } catch (error) {
      throw new Error(`getById request failed: ${(error as Error).message}`)
    }
  }

  async getByIds(ids: string[]): Promise<T[]> {
    // check params
    if (!ids || ids.length === 0) throw new Error('getByIds request failed: ids is required')
    ids.forEach(id => {
      if (!id) throw new Error('getByIds request failed: id is required')
    })

    // do request
    try {
      const response = await this.axiosInstance.get<T[]>(`${this.baseURL}`, {
        params: { ids: ids.join(',') }
      })
      return response.data
    } catch (error) {
      throw new Error(`getByIds request failed: ${(error as Error).message}`)
    }
  }

  async page(pageNum: number, pageSize: number, sorts?: string): Promise<PageResult<T>> {
    // check params
    if (!pageNum || !pageSize) throw new Error('page request failed: pageNum and pageSize are required')
    if (pageNum < 1 || pageSize < 1) throw new Error('page request failed: pageNum and pageSize must be greater than 0')

    // do request
    try {
      const response = await this.axiosInstance.get<PageResult<T>>(`${this.baseURL}/page`, {
        params: { pageNum, pageSize, sorts }
      })
      return response.data
    } catch (error) {
      throw new Error(`page request failed: ${(error as Error).message}`)
    }
  }

  async count(): Promise<Number> {
    // do request
    try {
      const response = await this.axiosInstance.get<Number>(`${this.baseURL}/count`)
      return response.data
    } catch (error) {
      throw new Error(`count request failed: ${(error as Error).message}`)
    }
  }

  async nameSearch(name: string): Promise<T[]> {
    // check params
    if (!name) throw new Error('nameSearch request failed: name is required')

    // do request
    try {
      const response = await this.axiosInstance.get<T[]>(`${this.baseURL}/nameSearch`, {
        params: { name }
      })
      return response.data
    } catch (error) {
      throw new Error(`nameSearch request failed: ${(error as Error).message}`)
    }
  }

  async createOne(data: T): Promise<T> {
    // check params
    if (!data) throw new Error('createOne request failed: data is required')

    // do request
    try {
      const response = await this.axiosInstance.post<T[]>(`${this.baseURL}`, [data])
      return response.data[0]
    } catch (error) {
      throw new Error(`createOne request failed: ${(error as Error).message}`)
    }
  }

  async createBatch(datas: T[] | undefined | null): Promise<T[]> {
    // check params
    if (!datas || datas.length === 0) throw new Error('createBatch request failed: datas is required')
    datas.forEach(data => {
      if (!data) throw new Error('createBatch request failed: data is required')
    })

    // do request
    try {
      const response = await this.axiosInstance.post<T[]>(`${this.baseURL}`, datas)
      return response.data
    } catch (error) {
      throw new Error(`createBatch request failed: ${(error as Error).message}`)
    }
  }

  async updateById(data: T): Promise<Boolean> {
    // check params
    if (!data) throw new Error('updateById request failed: data is required')

    // do request
    try {
      const response = await this.axiosInstance.put<Boolean>(`${this.baseURL}`, [data])
      return response.data
    } catch (error) {
      throw new Error(`UpdateById request failed: ${(error as Error).message}`)
    }
  }

  async updateByIds(datas: T[]): Promise<Boolean> {
    // check params
    if (!datas || datas.length === 0) throw new Error('updateByIds request failed: datas is required')
    datas.forEach(data => {
      if (!data) throw new Error('updateByIds request failed: data is required')
    })

    // do request
    try {
      const response = await this.axiosInstance.put<Boolean>(`${this.baseURL}`, datas)
      return response.data
    } catch (error) {
      throw new Error(`updateByIds request failed: ${(error as Error).message}`)
    }
  }

  async deleteById(id: string): Promise<Boolean> {
    // check params
    if (!id) throw new Error('deleteById request failed: id is required')

    // do request
    try {
      const response = await this.axiosInstance.delete<Boolean>(`${this.baseURL}`, {
        params: { ids: id }
      })
      return response.data
    } catch (error) {
      throw new Error(`deleteById request failed: ${(error as Error).message}`)
    }
  }

  async deleteByIds(ids: string[]): Promise<Boolean> {
    // check params
    if (!ids || ids.length === 0) throw new Error('deleteByIds request failed: ids is required')
    ids.forEach(id => {
      if (!id) throw new Error('deleteByIds request failed: id is required')
    })

    // do request
    try {
      const response = await this.axiosInstance.delete<Boolean>(`${this.baseURL}`, {
        params: { ids: ids.join(',') }
      })
      return response.data
    } catch (error) {
      throw new Error(`deleteByIds request failed: ${(error as Error).message}`)
    }
  }
}

/**
 * RpcClient registry
 */
const registry: { [key: string]: RpcClient<any> } = {}

/**
 * Returns an instance of RpcClient for the specified model name. If an instance
 * does not exist in the registry, it creates a new one and adds it to the registry.
 *
 * @param {string} modelName - The name of the model to retrieve or create an RpcClient for.
 * @return {RpcClient<T>} - An instance of RpcClient for the specified model name.
 */
export function useRpcClient<T extends BaseModel>(modelName: string): RpcClient<T> {
  return registry[modelName] || (registry[modelName] = new BaseRpcClient<T>(modelName));
}
