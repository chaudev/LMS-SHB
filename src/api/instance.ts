import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import appConfigs from '~/appConfig'
import { log } from '~/common/utils'
import { logOut } from '~/common/utils/token-handle'

const SHOW_LOG = true
const NODE_STATUS: any = process.env.NODE_ENV

const isShowLog = (e: any) => {
	if (e == '/api/Idioms/getRandoms' || e == '/api/Rules') {
		return false
	} else {
		return NODE_STATUS == 'production' && !!SHOW_LOG ? true : true
	}
}

function getUrl(config: any) {
	return !!config.baseURL ? config.url.replace(config.baseURL, '').split('?')[0] : config.url
}

export const authHeader_X = async () => {
	let data = await JSON.parse(localStorage.getItem('lifeCenterData'))
	return !!data && !!data.token ? { token: data.token } : {}
}
export const authHeader_Bearer = async () => {
	let data = await JSON.parse(localStorage.getItem('lifeCenterData'))
	return !!data && !!data.token ? { Authorization: 'Bearer ' + data.token } : {}
}

export const instance = axios.create({
	baseURL: appConfigs.hostURL,
	headers: {
		Accept: 'application/json'
	}
})

instance.interceptors.request.use(
	async (config: AxiosRequestConfig) => {
		const url = getUrl(config)

		if (!url.toString().includes('/auth/')) {
			const authHeader: any = await authHeader_X()
			config.headers = {
				...config.headers,
				...authHeader
			}
		}
		isShowLog(url) && console.log(`%c ${config?.method.toUpperCase()} - ${url}:`, 'color: #0086b3; font-weight: bold', config)
		return config
	},
	(error: any) => {
		isShowLog('') && console.log(`%c ${error?.response?.status}  :`, 'color: red; font-weight: bold', error?.response?.data)
		return Promise.reject(error)
	}
)

const checkResponse = (error: any) => {
	switch (error?.response?.status) {
		case 401:
			setTimeout(() => {
				logOut()
			}, 1000)
			break
		case 403:
			console.log(`%cLỖI 403:` + `%c DON'T HAVE PERMISSON`, 'color: red; font-weight: bold', 'color: yellow;')
			setTimeout(() => {
				window.history.back()
			}, 1000)
			break
		case 400:
			console.log(error?.response?.message)
			break
		case 500:
			console.log(`%cLỖI 500:` + `%c BACK-END`, 'color: red; font-weight: bold', 'color: red;')
			break
		default:
			console.log(`%c ${error?.response}  :`, 'color: red; font-weight: bold', error?.response)
	}
}

instance.interceptors.response.use(
	(response: AxiosResponse) => {
		let url: any = getUrl(response?.config)
		isShowLog(url) && console.log(` %c ${response?.status} - ${getUrl(response?.config)}:`, 'color: #008000; font-weight: bold', response)

		return response
	},
	function (error: any) {
		if (!!error?.response) {
			checkResponse(error)
			isShowLog('') && console.log(`%c ${error?.response?.status}  :`, 'color: red; font-weight: bold', error?.response?.data)
			return !!error?.response?.data ? Promise.reject(error.response.data) : Promise.reject(error)
		} else if (error.request) {
			isShowLog('') && console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', error?.response?.data)
			return !!error?.response?.data ? Promise.reject(error.response.data) : Promise.reject(error)
		} else {
			isShowLog('') && console.log(`%c ${JSON.stringify(error)}  :`, 'color: red; font-weight: bold', 'Hình như là setting sai')
			return !!error?.response?.data ? Promise.reject(error.response.data) : Promise.reject(error)
		}
	}
)
