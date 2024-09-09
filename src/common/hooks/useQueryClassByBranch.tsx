import { useQuery } from '@tanstack/react-query'
import { classApi } from '~/api/class'
import { debounceV2 } from '../utils/common'
import { useEffect, useState } from 'react'

const debounce = debounceV2(800)

const useQueryClassByBranch = (branchIds: string, status?: string, isUseDebound?: boolean) => {
	const [params, setParams] = useState({
		branchIds: '',
		status: undefined
	})

	useEffect(() => {
		if (isUseDebound) {
			debounce(() => setParams({ branchIds, status }))
		} else {
			setParams({ branchIds, status })
		}
	}, [branchIds, status, isUseDebound])

	const data = useQuery({
		queryKey: [classApi.keyGetDropdownByBranch, [params.branchIds, params?.status]],
		queryFn: () => classApi.getDropdownByBranch({ branchIds: params.branchIds, status: params?.status }).then((data) => data.data.data),
		enabled: !!params.branchIds
	})

	return { ...data }
}

export default useQueryClassByBranch
