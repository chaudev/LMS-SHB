import { useQuery } from '@tanstack/react-query'
import RollUpTable from './RollUpTable'
import { useMemo, useState } from 'react'
import { studentInClassApi } from '~/api/student-in-class'
import { Card } from 'antd'
import RollUpHeader from './RollUpHeader'
import { rollUpApi } from '~/api/rollup'

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

	// ===== FETCH DATA =====
	const { data: studentsInClass, isLoading: isLoadingStudentsInClass } = useQuery({
		queryKey: [studentInClassApi.keyGetAll, [params?.classId]],
		queryFn: () => {
			return studentInClassApi.getAll({ pageIndex: 1, pageSize: 100, classId: params?.classId }).then((res) => res.data?.data)
		},
		enabled: !!params?.classId
	})

	const { data: studentRollUp, isLoading: isLoadingStudentRollUp } = useQuery({
		queryKey: [rollUpApi.keyGetAll, [params?.classId, params?.scheduleIds]],
		queryFn: () => {
			return rollUpApi
				.getAll({ pageIndex: 1, pageSize: 100, classId: params?.classId, scheduleId: params?.scheduleIds })
				.then((res) => res.data?.data)
		},
		enabled: !!params?.classId && !!params?.scheduleIds && !params?.scheduleIds?.includes(',')
	})

	// ----- handle data to transmit to the table -----
	const dataTable = useMemo(() => {
		if (!studentRollUp) {
			return (studentsInClass || [])?.map((item) => ({ ...item, Status: undefined, LearningStatus: undefined, Note: undefined }))
		}
		return (studentsInClass || [])?.map((studentItem) => {
			const rollUpData = studentRollUp?.find((item) => item.StudentId === studentItem.StudentId)
			return {
				...studentItem,
				Status: rollUpData?.Status,
				LearningStatus: rollUpData?.LearningStatus,
				Note: rollUpData?.Note
			}
		})
	}, [studentsInClass, studentRollUp])

	// ===== METHODS =====
	const onChangeParams = (newParams: TRollUpParam) => {
		setParams({ ...params, ...newParams })
	}

	return (
		<Card>
			<RollUpHeader params={params} onChangeParams={onChangeParams} isLoading={isLoadingStudentRollUp} />

			<hr className="!my-[10px]" />

			<RollUpTable scheduleIds={params?.scheduleIds} studentData={dataTable} loading={isLoadingStudentsInClass || isLoadingStudentRollUp} />
		</Card>
	)
}

export default RollUpPage
