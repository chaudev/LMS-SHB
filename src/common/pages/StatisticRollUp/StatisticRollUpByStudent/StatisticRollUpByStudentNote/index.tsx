import { ERollUpStatus } from '~/enums/roll-up'
import StatisticRollUpByStudentStatusTag from '../StatisticRollUpByStudentStatusTag'

const StatisticRollUpByStudentNote = () => {
	return (
		<div className="flex gap-[12px]">
			<label className="font-medium whitespace-nowrap">Ghi chú:</label>
			<div className="flex gap-[12px]">
				<div>
					Có mặt: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.Present} />
				</div>
				<div>
					Vắng có phép: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.AbsentWithPermission} />
				</div>
				<div>
					Vắng không phép: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.AbsentWithoutPermission} />
				</div>
				<div>
					Đi trễ: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.Late} />
				</div>
				<div>
					Về sớm: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.LeaveEarly} />
				</div>
				<div>
					Nghỉ lễ: <StatisticRollUpByStudentStatusTag status={ERollUpStatus.Holiday} />
				</div>
			</div>
		</div>
	)
}

export default StatisticRollUpByStudentNote
