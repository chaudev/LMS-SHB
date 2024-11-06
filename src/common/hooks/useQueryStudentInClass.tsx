import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { userInformationApi } from '~/api/user/user'
import { debounceV2 } from '../utils/common'

const debounce = debounceV2(800)

const useQueryStudentInClass = (classIds: string, isUseDebound?: boolean) => {
	const [params, setParams] = useState({
		classIds: ''
	})

	useEffect(() => {
		if (isUseDebound) {
			debounce(() => setParams({ classIds }))
		} else {
			setParams({ classIds })
		}
	}, [classIds, isUseDebound])

	const data = useQuery({
		queryKey: [userInformationApi.keyGetStudentInClass, [params.classIds]],
		queryFn: () => userInformationApi.getStudentInClass(params.classIds).then((data) => data.data.data),
		enabled: !!params.classIds
	})

	return { ...data }
}

export default useQueryStudentInClass
