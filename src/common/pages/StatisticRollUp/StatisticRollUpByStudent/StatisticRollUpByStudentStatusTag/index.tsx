import { Tag } from 'antd'
import { FaCheck } from 'react-icons/fa'
import { ERollUpStatus } from '~/enums/roll-up'

type TStatusTagProps = {
	status: ERollUpStatus
}
const StatisticRollUpByStudentStatusTag = ({ status }: TStatusTagProps) => {
	switch (status) {
		case ERollUpStatus.Present:
			return (
				<Tag className="rounded font-medium" color="green">
					<FaCheck className="mb-[2px]" />
				</Tag>
			)
		case ERollUpStatus.AbsentWithPermission:
			return (
				<Tag className="rounded font-medium" color="orange">
					CP
				</Tag>
			)
		case ERollUpStatus.AbsentWithoutPermission:
			return (
				<Tag className="rounded font-medium" color="red">
					KP
				</Tag>
			)
		case ERollUpStatus.Late:
			return (
				<Tag className="rounded font-medium" color="geekblue">
					ĐT
				</Tag>
			)
		case ERollUpStatus.LeaveEarly:
			return (
				<Tag className="rounded font-medium" color="pink">
					VS
				</Tag>
			)
		case ERollUpStatus.Holiday:
			return (
				<Tag className="rounded font-medium" color="blue">
					NL
				</Tag>
			)
		default:
			return <Tag className="rounded font-medium">--</Tag>
	}
}

export default StatisticRollUpByStudentStatusTag
