import { ColumnsType } from 'antd/lib/table'
import moment from 'moment'
import MyTable, { TMyTableProps } from '~/atomic/atoms/MyTable'
import { EGender } from '~/enums/common'

type TProps = TMyTableProps<TClassStudentAttendanceRate> & {
	reportData: TClassStudentAttendanceRate[]
}

const StatisticAttendanceTable = ({ reportData, ...restProps }: TProps) => {
	const columns: ColumnsType<TClassStudentAttendanceRate> = [
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
			title: 'Ngày sinh',
			dataIndex: 'StudentDOB',
			render: (value) => <div className="min-w-[80px] whitespace-nowrap">{value ? moment(value).format('DD/MM/YYYY') : '-'}</div>
		},
		{
			title: 'Giới tính',
			dataIndex: 'StudentGender',
			render: (value) => (
				<div className="min-w-[60px] whitespace-nowrap">{value === EGender.Male ? 'Nam' : value === EGender.Female ? 'Nữ' : 'Khác'}</div>
			)
		},
		{
			title: 'Số buổi thực học',
			className: 'w-[140px]',
			dataIndex: 'attendanceSchedule',
			render: (value) => <div className="min-w-[100px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Số buổi hiện tại',
			className: 'w-[140px]',
			dataIndex: 'presentSchedule',
			render: (value) => <div className="min-w-[100px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Tổng số buổi học',
			className: 'w-[140px]',
			dataIndex: 'totalSchedule',
			render: (value) => <div className="min-w-[100px] whitespace-nowrap">{value}</div>
		},
		{
			title: 'Tỷ lệ chuyên cần',
			className: 'w-[140px]',
			dataIndex: 'rateSchedule',
			render: (value) => <div className="min-w-[100px] whitespace-nowrap">{value}%</div>
		}
	]

	return <MyTable dataSource={reportData} columns={columns} pagination={false} bordered rowKey={'StudentId'} {...restProps} />
}

export default StatisticAttendanceTable
