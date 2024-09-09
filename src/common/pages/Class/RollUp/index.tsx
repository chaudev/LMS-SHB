import { useQuery } from '@tanstack/react-query'
import RollUpTable from './RollUpTable'
import { useState } from 'react'
import { studentInClassApi } from '~/api/student-in-class'
import { Card } from 'antd'
import RollUpHeader from './RollUpHeader'

export type TRollUpParam = {
	branchId?: number
	classId?: number
	classStatus?: string
	scheduleIds?: string
}

const RollUpPage = () => {
	const [params, setParams] = useState<TRollUpParam>({
		branchId: null,
		classId: null,
		classStatus: `ALL`,
		scheduleIds: ''
	})
	const { data: studentsInClass, isLoading: isLoadingStudentsInClass } = useQuery({
		queryKey: [studentInClassApi.keyGetAll, [params?.classId]],
		queryFn: () => {
			return studentInClassApi.getAll({ pageIndex: 1, pageSize: 100, classId: params?.classId }).then((res) => res.data?.data)
		},
		enabled: !!params?.classId
	})

	const onChangeParams = (newParams: TRollUpParam) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<Card>
			<RollUpHeader params={params} onChangeParams={onChangeParams} />

			<hr className="!my-[10px]" />

			<RollUpTable scheduleIds={params?.scheduleIds} studentData={studentsInClass || []} loading={isLoadingStudentsInClass} />
		</Card>
	)
}

export default RollUpPage
