import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { majorGroupApi } from '~/api/major-group'

const useQueryMajorGroup = (visible?: boolean) => {
	const data = useQuery({
		queryKey: ['get-all-major-group'],
		queryFn: () => majorGroupApi.getAll({ pageIndex: 1, pageSize: 99999 }).then((data) => data.data.data),
		enabled: visible
	})

	return { ...data }
}

export default useQueryMajorGroup
