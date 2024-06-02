import axios from 'axios'
import type { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useUserStore } from '@/stores/user'

interface Error {
    namespace: string
    code: number
    message: string
}

interface Result {
    data: any
    error: Error
    meta: any
}

const axiosInstance = axios.create({
    timeout: 3000,
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
        if (!response.data.error) {
            // unwrap data
            response.data = response.data.data
            return response
        }

        const error = response.data.error
        ElMessage.error(error.message)

        // Authentication failed, clear user info and redirect to login page
        if (error.namespace == 'core' && error.code === 80001
            && router.currentRoute.value.path !== '/login') {
            useUserStore().clearUserInfo()
            router.push('/login')
        }
        return Promise.reject(response)
    },
    error => {
        if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
            ElMessage.error("请求超时，请稍后再试")
        } else {
            ElMessage.error(error.toString())
        }
        return Promise.reject(error)
    }
)

export default axiosInstance