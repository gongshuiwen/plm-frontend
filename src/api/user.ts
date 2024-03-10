import axiosInstance from '@/utils/request'
import type User from '@/models/user'

export async function getUserInfo(id: string): Promise<User> {
  const { data } = await axiosInstance.get(`/api/user/${id}`)
  return data
}
