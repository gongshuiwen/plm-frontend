import axios from 'axios';
import type { AxiosResponse } from 'axios'
import router from '@/router'
import { ElMessage } from 'element-plus'

interface Result {
    code: number
    message: string
    data: any
}

const axiosInstance = axios.create({
    timeout: 3000,
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse<Result>) => {
        if ( response.data.code === 10000 ) {
            response.data = response.data.data
            return response
        }

        ElMessage.error(response.data.message)
        if ( response.data.code === 80001 && router.currentRoute.value.path !== '/login' ) {
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