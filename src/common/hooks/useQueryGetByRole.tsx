import React from 'react'
import { ShowErrorToast } from '../utils/main-function'
import { PAGE_SIZE } from '../libs/others/constant-constructer'
import { useQuery } from '@tanstack/react-query'
import { is } from '../utils/common'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

type TProps = {
	enabled?: boolean
	query: any
	queryKey: any[]
	adminApi: (params: any) => Promise<any>
	othersApi: (params: any) => Promise<any>
}

const useQueryGetByRole = (props: TProps) => {
	const { enabled, queryKey, query, adminApi, othersApi } = props
	const userInfo = useSelector((state: RootState) => state.user.information)

	const fetchFeedback = (query, apiCall) => {
		return apiCall({
			...query,
			pageSize: query.pageSize || PAGE_SIZE,
			pageIndex: query.pageIndex || 1
		})
			.then((data) => data.data)
			.catch((error) => {
				ShowErrorToast(error)
				throw error
			})
	}

	const data = useQuery({
		queryKey: queryKey,
		queryFn: () => {
			const apiCall = is(userInfo).admin ? adminApi : othersApi
			return fetchFeedback(query, apiCall)
		},
		enabled: enabled
	})

	return { ...data }
}

export default useQueryGetByRole
