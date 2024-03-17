import { afterEach, describe, expect, test, vi } from 'vitest'
import axios from 'axios'
import { useRpcClient } from '../rpcClient'

class Mock {
  static getModelName() {
    return 'mock'
  }

  id?: string
  name?: string

  constructor(id?: string, name?: string) {
    this.id = id
    this.name = name
  }
}

function makeSuccessResponse<T>(data: T): any {
  return {
    status: 200,
    data: {
      code: 10000,
      message: 'OK',
      data: data
    }
  }
}

const mockClient = useRpcClient(Mock)

describe('Test RpcClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('test get by id', async () => {
    const result = new Mock('1')
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.getById('1')).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/1')
  })

  test('test page', async () => {
    const pageNum = 1
    const pageSize = 20
    const result = [new Mock('1')]
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.page(pageNum, pageSize)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/page', { pageNum, pageSize })
  })

  test('test create one', async () => {
    const data = new Mock(undefined, 'name')
    const result = new Mock('1', 'name')
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.createOne(data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', data)
  })

  test('test create batch', async () => {
    const data = [new Mock(undefined, 'name'), new Mock(undefined, 'name2')]
    const result = [new Mock('1', 'name'), new Mock('2', 'name2')]
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.createBatch(data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/batch', data)
  })

  test('test update by id', async () => {
    const data = new Mock(undefined, 'name')
    const result = true
    const spy = vi.spyOn(axios, 'put')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.updateById('1', data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/1', data)
  })

  test('test update by ids', async () => {
    const ids = ['1', '2', '3']
    const data = new Mock(undefined, 'name')
    const result = true
    const spy = vi.spyOn(axios, 'put')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.updateByIds(ids, data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/batch', { ids, data })
  })

  test('test delete by id', async () => {
    const id = '1'
    const result = true
    const spy = vi.spyOn(axios, 'delete')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.deleteById(id)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/1')
  })

  test('test delete by ids', async () => {
    const ids = ['1', '2', '3']
    const result = true
    const spy = vi.spyOn(axios, 'delete')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.deleteByIds(ids)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/batch', { data: { ids } })
  })
})
