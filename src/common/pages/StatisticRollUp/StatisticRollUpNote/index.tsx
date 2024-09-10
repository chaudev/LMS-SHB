import { ERollUpStatus } from '~/enums/roll-up'
import StatisticRollUpStatusTag from '../StatisticRollUpStatusTag'

const StatisticRollUpNote = () => {
	return (
		<div className="flex gap-[12px]">
			<label className="font-medium whitespace-nowrap">Ghi chú:</label>
			<div className="flex gap-[12px]">
				<div>
					Có mặt: <StatisticRollUpStatusTag status={ERollUpStatus.Present} />
				</div>
				<div>
					Vắng có phép: <StatisticRollUpStatusTag status={ERollUpStatus.AbsentWithPermission} />
				</div>
				<div>
					Vắng không phép: <StatisticRollUpStatusTag status={ERollUpStatus.AbsentWithoutPermission} />
				</div>
				<div>
					Đi trễ: <StatisticRollUpStatusTag status={ERollUpStatus.Late} />
				</div>
				<div>
					Về sớm: <StatisticRollUpStatusTag status={ERollUpStatus.LeaveEarly} />
				</div>
				<div>
					Nghỉ lễ: <StatisticRollUpStatusTag status={ERollUpStatus.Holiday} />
				</div>
			</div>
		</div>
	)
}

export default StatisticRollUpNote
