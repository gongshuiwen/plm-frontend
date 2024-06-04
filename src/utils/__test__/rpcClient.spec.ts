import { afterEach, describe, expect, test, vi } from 'vitest'
import axios from '../request'
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
    data: data
  }
}

const mockClient = useRpcClient(Mock.getModelName())

describe('Test RpcClient', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  test('test get by id', async () => {
    const id = '1'
    const result = new Mock(id)
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.getById(id)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', { params: { ids: id } })
  })

  test('test get by ids', async () => {
    const ids = ['1', '2']
    const result = [new Mock('1'), new Mock('2')]
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.getByIds(ids)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', { params: { ids: ids.join(',') } })
  })

  test('test page', async () => {
    const pageNum = 1
    const pageSize = 20
    const result = [new Mock('1')]
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.page(pageNum, pageSize)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/page', { parmas: { pageNum, pageSize } })
  })

  test('test count', async () => {
    const result = 1
    const spy = vi.spyOn(axios, 'get')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.count()).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/count')
  })

  test('test name search', async () => {
    const name = "name"
    const result = [new Mock('1', 'name')]
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.nameSearch(name)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock/nameSearch', { params: { name } })
  })

  test('test create one', async () => {
    const data = new Mock(undefined, 'name')
    const result = new Mock('1', 'name')
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.createOne(data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', [data])
  })

  test('test create batch', async () => {
    const datas = [new Mock(undefined, 'name1'), new Mock(undefined, 'name2')]
    const result = [new Mock('1', 'name1'), new Mock('2', 'name2')]
    const spy = vi.spyOn(axios, 'post')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.createBatch(datas)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', datas)
  })

  test('test update by id', async () => {
    const data = new Mock('1', 'name')
    const result = true
    const spy = vi.spyOn(axios, 'put')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.updateById(data)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', [data])
  })

  test('test update by ids', async () => {
    const datas = [new Mock('1', 'name'), new Mock('2', 'name')]
    const result = true
    const spy = vi.spyOn(axios, 'put')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.updateByIds(datas)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', datas)
  })

  test('test delete by id', async () => {
    const id = '1'
    const result = true
    const spy = vi.spyOn(axios, 'delete')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.deleteById(id)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', { params: { ids: id } })
  })

  test('test delete by ids', async () => {
    const ids = ['1', '2', '3']
    const result = true
    const spy = vi.spyOn(axios, 'delete')
    spy.mockResolvedValueOnce(makeSuccessResponse(result))
    expect(await mockClient.deleteByIds(ids)).toEqual(result)
    expect(spy).toHaveBeenCalledOnce()
    expect(spy).toHaveBeenCalledWith('/api/mock', { params: { ids: ids.join(',') } })
  })
})
