import { Tooltip } from 'antd'
import clsx from 'clsx'

import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import ModalUpdateAndCreate from '~/common/pages/dormitory/violate-rules/components/ModalUpdateAndCreate'

const warningLevelConfig = {
	Nhe: {
		label: 'Nhẹ',
		color: 'text-tw-black/40'
	},
	Vua: {
		label: 'Vừa',
		color: 'text-tw-yellow'
	},
	NghiemTrong: {
		label: 'Nghiêm trọng',
		color: 'text-tw-red'
	}
}

export default function violateRulesColumns(
	handleDelete: (id: number) => Promise<void>,
	handleUpdate: (body: TUpdateDormitoryWarning, handleToggleModal: () => void) => Promise<void>
) {
	const violateRulesColumns = [
		{
			dataIndex: 'UserCode',
			title: 'Mã học viên',
			fixed: 'left'
		},
		{
			dataIndex: 'FullName',
			title: 'Học viên'
		},
		{
			dataIndex: 'Email',
			title: 'Email'
		},
		{
			dataIndex: 'WarningLevel',
			title: 'Mức độ vi phạm',
			render: (value: string) => {
				const { label, color } = warningLevelConfig[value] || {}
				return (
					<div className="min-w-[100px]">
						<p className={clsx('font-semibold text-sm', color)}>{label}</p>
					</div>
				)
			}
		},
		{
			dataIndex: 'Note',
			title: 'Ghi chú',
			render: (value: string) => {
				return (
					<div className="min-w-[50px] max-w-[200px]">
						<Tooltip title={value}>
							<p className="w-full line-clamp-2">{value}</p>
						</Tooltip>
					</div>
				)
			}
		},
		{
			dataIndex: 'DormitoryAreaName',
			title: 'Khu'
		},
		{
			dataIndex: 'DormitoryName',
			title: 'Ký túc xá'
		},
		{
			dataIndex: 'DormitoryRoomName',
			title: 'Phòng'
		},
		{
			dataIndex: 'action',
			title: '',
			render: (_, record: TDormitoryWarningRules) => {
				return (
					<div>
						<ModalUpdateAndCreate handleUpdate={handleUpdate} data={record} />
						<DeleteTableRow text={`Học viên vi phạm: ${record?.FullName}`} handleDelete={() => handleDelete(record.Id)} />
					</div>
				)
			}
		}
	]
	return violateRulesColumns
}
