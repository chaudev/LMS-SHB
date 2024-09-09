import { useQuery } from '@tanstack/react-query'
import { debounceV2 } from '../utils/common'
import { useEffect, useState } from 'react'
import { scheduleApi } from '~/api/schedule'

const debounce = debounceV2(800)

const useQueryScheduleOfClass = (classId: number, isUseDebound?: boolean) => {
	const [params, setParams] = useState({
		classId: undefined
	})

	useEffect(() => {
		if (isUseDebound) {
			debounce(() => setParams({ classId }))
		} else {
			setParams({ classId })
		}
	}, [classId, isUseDebound])

	const data = useQuery({
		queryKey: [scheduleApi.getGetAll, [params.classId]],
		queryFn: () => scheduleApi.getAll({ classId: params.classId }).then((res) => res.data.data),
		enabled: !!params.classId
	})

	return { ...data }
}

export default useQueryScheduleOfClass
