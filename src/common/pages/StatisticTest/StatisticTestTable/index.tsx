import { useMemo } from 'react'
import MyTable, { TMyTableProps } from '~/atomic/atoms/MyTable'

type TProps = TMyTableProps<any> & {
	reportData: TClassTranscriptReport
}

const StatisticTestTable = ({ reportData, ...restProps }: TProps) => {
	const columns = useMemo(() => {
		const initColumns = [
			{
				title: 'STT',
				dataIndex: '',
				width: 54,
				render: (value, item, index) => <div className="text-center">{index + 1}</div>
			},
			{
				title: 'Mã học viên',
				dataIndex: 'StudentCode',
				render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
			},
			{
				title: 'Học viên',
				dataIndex: 'StudentName',
				render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
			},
			{
				title: 'Phụ huynh',
				dataIndex: 'ParentName',
				render: (value, record) => (
					<div className="min-w-[80px] flex flex-col gap-[4px]">
						<div className="whitespace-nowrap">{value || '-'}</div>
						<div className="text-[12px]">{record?.ParentPhone}</div>
					</div>
				)
			},
			{
				title: 'Sales',
				dataIndex: 'SaleName',
				render: (value, record) => (
					<div className="min-w-[60px] flex flex-col gap-[4px]">
						<div className="whitespace-nowrap">{value || '-'}</div>
						<div>
							<div className="text-[12px]">{record?.SaleEmail}</div>
							<div className="text-[12px]">{record?.SaleMobile}</div>
						</div>
					</div>
				)
			}
		]

		const scoreColumns =
			reportData?.ClassTranscriptHeader?.map((headerItem) => {
				return {
					title: <div className="min-w-[100px] whitespace-pre-wrap">{headerItem.Name}</div>,
					children: headerItem.ClassTranscriptDetailHeader.map((item) => {
						return {
							title: <div className="whitespace-pre-wrap">{item.Name}</div>,
							dataIndex: `${headerItem.Id}_${item.Id}`,
							render: (value) => (
								<div className="min-w-[50px] max-w-[180px] max-h-[180px] overflow-auto scrollbar-custom">{value?.Value || '-'}</div>
							)
						}
					})
				}
			}) || []

		return [...initColumns, ...scoreColumns]
	}, [reportData])

	const dataTable = useMemo(() => {
		if (reportData) {
			return reportData?.Data?.map((studentItem) => {
				const rawData = { ...studentItem }
				studentItem.ClassTranscripts?.forEach((classTranscriptItem) => {
					const { Details, ...restClassTranscriptItem } = classTranscriptItem
					Details?.forEach((item) => {
						rawData[`${classTranscriptItem.Id}_${item.Id}`] = { ...item, transcriptData: restClassTranscriptItem }
					})
				})
				return rawData
			})
		}
		return []
	}, [reportData])

	return <MyTable dataSource={dataTable} columns={columns} pagination={false} bordered rowKey={'StudentId'} {...restProps} />
}

export default StatisticTestTable
