import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import React, { useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { _format } from '~/common/utils'

const TotalSalaryByTeacher = () => {
	const [pageFilter, setPageFilter] = useState({ pageIndex: 1, pageSize: PAGE_SIZE, branchId: 0, year: moment().year() })

	const { data, isLoading } = useQuery({
		queryKey: ['get/total-salary-by-teacher', pageFilter],
		queryFn: () => {
			return staticsticalApi.getTotalSalaryByTeacher({ ...pageFilter }).then((data) => data.data)
		},
		staleTime: 5 * 6 * 1000
	})

	const transformData = (data: any[]) => {
		return data?.map((item, index) => {
			const flattenedData = {
				key: index,
				FullName: item.FullName,
				UserCode: item.UserCode,
				UserId: item.UserId
			}
			item.Details.forEach((month) => {
				flattenedData[month.Month] = month?.Value
			})
			return flattenedData
		})
	}

	const generateColumns = (data: any[]) => {
		const columns = [
			{
				title: 'Tên giáo viên',
				dataIndex: 'FullName',
				fixed: 'left',
				render: (value, item) => (
					<div>
						<p className="font-medium !text-primary">{value}</p>
						<p className="">{item?.UserCode}</p>
					</div>
				)
			}
		]
		// dựa theo cái data đầu tiên để map format columns object
		const monthColumns =
			data?.length > 0 &&
			data[0]?.Details.map((month) => ({
				title: `Tháng ${month.Month}`,
				dataIndex: month.Month,
				className: 'min-w-[100px]',
				key: month.Month,
				fixed: '',
				align: 'right',
				render: (value, item, index) => {
					return <div>{_format.numberToPrice(value)}</div>
				}
			}))

		return columns.concat(monthColumns)
	}

	return (
		<MyStatisticCard
			title="Thống kê lương của giáo viên"
			extra={
				<div className="flex items-center gap-2">
					<div className="w500:col-span-2 col-span-3">
						<MySelectBranch onChange={(e) => setPageFilter({ ...pageFilter, branchId: e })} />
					</div>
					<div className="w500:col-span-2 col-span-3">
						<MyDatePicker
							className="w-full h-[36px] primary-input"
							onChange={(date: any, dateString: string) => {
								setPageFilter({ ...pageFilter, year: Number(dateString) })
							}}
							value={moment().year(pageFilter?.year)}
							picker="year"
							placeholder="Chọn năm"
							allowClear={false}
						/>
					</div>
				</div>
			}
		>
			<PrimaryTable
				columns={data ? generateColumns(data?.data) : []}
				data={data ? transformData(data?.data) : []}
				loading={isLoading}
				total={data?.totalRow || 0}
				onChangePage={(pageIndex) => setPageFilter({ ...pageFilter, pageIndex: pageIndex })}
			/>
		</MyStatisticCard>
	)
}

export default TotalSalaryByTeacher
