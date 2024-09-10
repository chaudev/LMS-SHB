import moment from 'moment'
import { useMemo } from 'react'
import MyTable, { TMyTableProps } from '~/atomic/atoms/MyTable'
import StatisticRollUpStatusTag from '../StatisticRollUpStatusTag'

type TProps = TMyTableProps<any> & {
	reportData: TRollUpReport
}

const StatisticRollUpTable = ({ reportData, ...restProps }: TProps) => {
	const columns = useMemo(() => {
		const initColumns = [
			{
				title: 'STT',
				dataIndex: '',
				width: 50,
				render: (value, item, index) => <div className="text-center">{index + 1}</div>
			},
			{
				title: 'Mã học viên',
				dataIndex: 'StudentCode',
				render: (value) => <div className="min-w-[120px]">{value}</div>
			},
			{
				title: 'Học viên',
				dataIndex: 'StudentName',
				render: (value) => <div className="min-w-[120px]">{value}</div>
			},
			{
				title: <div className="min-w-[60px] whitespace-pre-wrap">Số buổi đi học</div>,
				width: 80,
				dataIndex: 'Present',
				render: (value) => <p className="">{value}</p>
			},
			{
				title: <div className="min-w-[60px] whitespace-pre-wrap">Vắng có phép</div>,
				width: 80,
				dataIndex: 'AbsenceAllow',
				render: (value) => <p className="">{value}</p>
			},
			{
				title: <div className="min-w-[80px] whitespace-pre-wrap">Vắng không phép</div>,
				width: 110,
				dataIndex: 'AbsenceNotAllow',
				render: (value) => <p className="">{value}</p>
			}
		]

		return [
			...initColumns,
			...(reportData?.Header || []).map((item) => {
				return {
					title: moment(item.Date).format('DD/MM/YYYY'),
					dataIndex: item.Index,
					render: (value: TRollUpReportDataDate) => {
						return (
							<div className="flex flex-col gap-[6px]">
								{value?.StudyTimes?.map((item) => {
									return (
										<div className="flex gap-2 items-center" key={item.StudyTime}>
											<div>{item.StudyTime}:</div>
											<StatisticRollUpStatusTag status={item.Status} />
										</div>
									)
								})}
							</div>
						)
					}
				}
			})
		]
	}, [reportData])

	const dataTable = useMemo(() => {
		return (reportData?.Data || []).map((studentItem) => {
			const rawData = {
				...studentItem
			}
			studentItem.Dates.forEach((item) => {
				rawData[item.Index] = item
			})
			return rawData
		})
	}, [reportData])

	return <MyTable dataSource={dataTable} columns={columns} pagination={false} bordered rowKey={'StudentCode'} {...restProps} />
}

export default StatisticRollUpTable
