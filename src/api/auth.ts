import axiosInstance from '@/utils/request'
import type User from '@/entities/user'

export async function login(username: string, password: string): Promise<User> {
  const { data } = await axiosInstance.post('/api/login', {
    username,
    password
  })
  return data
}

export async function logout() {
  await axiosInstance.post('/api/logout')
}
