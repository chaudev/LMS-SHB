import { Tag, Tooltip } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import MyTable, { TMyTableProps } from '~/atomic/atoms/MyTable'

type TProps = TMyTableProps<TRollUpAssessmentAttendance> & {
	reportData: TRollUpAssessmentAttendance[]
}

const StatisticRollUpByTimeShiftTable = ({ reportData, ...restProps }: TProps) => {
	const columns: ColumnsType<TRollUpAssessmentAttendance> = [
		{
			title: 'Tên lớp',
			dataIndex: 'ClassName',
			render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Trung tâm',
			dataIndex: 'BranchName',
			render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Buổi học',
			dataIndex: 'ScheduleName',
			render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Giáo viên',
			dataIndex: 'TeacherName',
			render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Điểm danh',
			dataIndex: 'Attendace',
			render: (value, record) => (
				<div className="min-w-[100px] whitespace-nowrap">
					<Tooltip title="Có mặt / Đi trễ / Vắng có phép / Vắng không phép / Về sớm / Nghỉ lễ">
						<Tag
							color="blue"
							className="rounded font-medium py-[2px] px-[12px]"
						>{`${record?.Attendace} / ${record?.Late} / ${record?.AbsentAllow} / ${record?.AbsentNotAllow} / ${record?.LeaveEarly} / ${record?.Holiday}`}</Tag>
					</Tooltip>
				</div>
			)
		}
	]

	return <MyTable dataSource={reportData} columns={columns} pagination={false} bordered rowKey={'StudentId'} {...restProps} />
}

export default StatisticRollUpByTimeShiftTable
