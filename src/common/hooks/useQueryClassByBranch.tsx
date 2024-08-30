import { useQuery } from '@tanstack/react-query'
import { classApi } from '~/api/class'
import { debounceV2 } from '../utils/common'
import { useEffect, useState } from 'react'

const debounce = debounceV2(800)

const useQueryClassByBranch = (branchIds: string, isUseDebound?: boolean) => {
	const [params, setParams] = useState({
		branchIds: ''
	})

	useEffect(() => {
		if (isUseDebound) {
			debounce(() => setParams({ branchIds }))
		} else {
			setParams({ branchIds })
		}
	}, [branchIds, isUseDebound])

	const data = useQuery({
		queryKey: [classApi.keyGetDropdownByBranch, [params.branchIds]],
		queryFn: () => classApi.getDropdownByBranch(params.branchIds).then((data) => data.data.data),
		enabled: !!params.branchIds
	})

	return { ...data }
}

export default useQueryClassByBranch
