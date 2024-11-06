import { Card, Divider, Empty } from 'antd'
import ClassScheduleHeader from './ClassScheduleHeader'
import moment, { Moment } from 'moment'
import { useState } from 'react'
import ClassScheduleTable from './ClassScheduleTable'
import { useMutation, useQuery } from '@tanstack/react-query'
import { scheduleApi } from '~/api/schedule'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'

export type TClassScheduleParams = {
	from: string
	to: string
	classIds?: string
	branchIds?: string
	teacherIds?: string
	roomIds?: string
	programIds?: string
	scheduleIndex?: number
	timeFrom?: Moment
	timeTo?: Moment
	datesOfWeek?: string
}

const defaultParams: TClassScheduleParams = {
	from: moment().startOf('week').format('YYYY/MM/DD'),
	to: moment().endOf('week').format('YYYY/MM/DD')
}

const ClassSchedulePage = () => {
	const [params, setParams] = useState<TClassScheduleParams>(defaultParams)

	const dependencies = [
		params?.from,
		params?.to,
		params?.classIds,
		params?.branchIds,
		params?.teacherIds,
		params?.roomIds,
		params?.programIds,
		params?.scheduleIndex,
		params?.timeFrom,
		params?.timeTo,
		params?.datesOfWeek
	]

	const {
		data: dataQuery,
		isLoading,
		refetch
	} = useQuery({
		queryKey: [scheduleApi.keyGetByRoom, dependencies],
		queryFn: async () => {
			const _params = {
				...params,
				timeFrom: params?.timeFrom ? moment(params?.timeFrom).format('HH:mm') : undefined,
				timeTo: params?.timeTo ? moment(params?.timeTo).format('HH:mm') : undefined
			}
			const res = await scheduleApi.getByRoom(_params)
			return res.data.data
		},
		enabled: !!params?.from && !!params?.to
	})

	const handleFilter = (otherParams: Partial<TClassScheduleParams>) => {
		setParams({
			...params,
			...otherParams
			// pageIndex: 1
		})
	}

	const mutationExportExcel = useMutation({
		mutationFn: () => {
			const _params = {
				...params,
				timeFrom: params?.timeFrom ? moment(params?.timeFrom).format('HH:mm') : undefined,
				timeTo: params?.timeTo ? moment(params?.timeTo).format('HH:mm') : undefined
			}
			return scheduleApi.exportExcel(_params)
		},
		onSuccess(res, variables, context) {
			ShowNoti('success', 'Xuất excel thành công')
			if (res?.data?.data) {
				window.open(res?.data?.data)
			}
		},
		onError(error) {
			ShowNoti('error', error?.message)
		}
	})

	return (
		<Card>
			{/* Header */}
			<ClassScheduleHeader params={params} onFilter={handleFilter} />
			<Divider />

			{/* Table */}
			<div className="mt-[24px]">
				<div className="flex justify-between">
					<div className="flex-1 text-center text-[20px] font-medium mb-[16px]">
						{moment(params.from).format('DD/MM/YYYY')} - {moment(params.to).format('DD/MM/YYYY')}
					</div>
					<PrimaryButton
						type="button"
						background="primary"
						icon="download"
						loading={mutationExportExcel.isPending}
						onClick={() => mutationExportExcel.mutate()}
						disable={!dataQuery?.ScheduleByRoom?.length}
					>
						Xuất excel
					</PrimaryButton>
				</div>
				{!dataQuery?.ScheduleByRoom?.length ? <Empty /> : <ClassScheduleTable data={dataQuery} isLoading={isLoading} refetch={refetch} />}
			</div>
		</Card>
	)
}

export default ClassSchedulePage
