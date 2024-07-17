import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logOut, playWithToken } from '~/common/utils/token-handle'
import { userApi } from '~/services/auth'
import { RootState } from '~/store'
import { setAuthLoading, setRefreshToken } from '~/store/authReducer'

type IAuthLayout = {
	children: React.ReactNode
}

function AuthProvider({ children }: IAuthLayout) {
	const dispatch = useDispatch()
	const { loading, data, refreshToken } = useSelector((state: RootState) => state.auth)

	const router = useRouter()

	useEffect(() => {
		checkLogin()
	}, [])

	const allowNoneLogin = () => {
		if (
			router.pathname !== '/support-portal' &&
			router.pathname.search('login') < 1 &&
			router.pathname.search('hacked') < 1 &&
			router.pathname.search('fogot-password') < 1 &&
			router.pathname.search('reset-password') < 1 &&
			router.pathname.search('register') < 1
		) {
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		if (!data) {
			if (allowNoneLogin()) {
				logOut()
			}
			dispatch(setAuthLoading(false))
		}
	}, [data])

	const _refreshToken = async (param) => {
		console.time('Gọi api RefreshToken hết')
		try {
			const response = await userApi.refreshToken(param)
			if (response.status == 200) {
				playWithToken(response?.data, dispatch)
			}
		} catch (error) {
			logOut()
			dispatch(setAuthLoading(false))
		}
		console.timeEnd('Gọi api RefreshToken hết')
	}

	function isPastDate(timestamp) {
		const date = new Date(timestamp)
		return date < new Date()
	}

	async function checkLogin() {
		try {
			const response = await JSON.parse(localStorage.getItem('lifeCenterData'))
			console.log('response: ', response)

			if (!!response?.theRefresh) {
				const theRefresh = response.theRefresh
				dispatch(setRefreshToken(theRefresh))
				if (theRefresh?.refreshTokenExpires) {
					if (isPastDate(new Date(theRefresh?.refreshTokenExpires).getTime())) {
						if (allowNoneLogin()) {
							logOut()
						}
					} else {
						console.log('_refreshToken')

						_refreshToken({ RefreshToken: theRefresh?.refreshToken, token: response?.token })
					}
				}
			} else {
				if (allowNoneLogin()) {
					logOut()
					dispatch(setAuthLoading(false))
				}
			}
		} catch (error) {
			if (allowNoneLogin()) {
				logOut()
			} else {
				dispatch(setAuthLoading(false))
			}
		}
	}

	return <>{children}</>
}

export default AuthProvider
