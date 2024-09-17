import { EClassStatus } from '~/enums/class'
import { EParentRelationship } from '~/enums/common'
import { ELearningStatus, ERollUpStatus } from '~/enums/roll-up'

export const CLASS_TYPES = {
	offline: '1',
	online: '2',
	tuitor: '3'
}

export const SAMPLE_GRADE_COLUMN_TYPES = [
	{ title: 'Điểm', value: 'Grades' },
	{ title: 'Nhận xét', value: 'Comments' }
]

export const SAMPLE_GRADE_COLUMN_TYPES_OBJECTS = {
	grades: 'Grades',
	comments: 'Comments'
}

export const STATISTIC_USER_STATUS_TYPES_OBJECTS = {
	foreginLangugage: 'ForeignLangugage',
	visaStatus: 'VisaStatus',
	profileStatus: 'ProfileStatus',
	process: 'Process'
}

/**
 * 1. majorRegistration: Đăng ký chương trình học
 * 2. profileCollectionStatus: Tình trạng thu hồ sơ
 * 3. languageStatus: Tình trạng tiếng
 * 4. visaStatus: Tình trạng visa
 * 5. profileProcessStatus: Tình trạng xử lý hồ sơ
 */
export const PAYMENT_TYPES = {
	majorRegistration: 1,
	profileCollectionStatus: 2,
	languageStatus: 3,
	visaStatus: 4,
	profileProcessStatus: 5
}

export const FEEDBACK_STATUS = {
	sent: 'Sent',
	processing: 'Processing',
	done: 'Done'
}

export const EVALUATION_TYPES = {
	multipleChoice: 'MultipleChoice',
	essay: 'Essay',
	evaluate: 'Evaluate'
}

export const USER_ROLES = {
	admin: 1,
	teacher: 2,
	student: 3,
	manager: 4,
	saler: 5,
	accountant: 6,
	academic: 7,
	parent: 8,
	teachingAssistant: 9
}

export const USER_EVALUATION_FORM_STATUS = {
	waiting: 'Waiting',
	done: 'Done'
}

export const dayOfWeek = [
	{
		title: 'Thứ 2',
		value: 1
	},
	{
		title: 'Thứ 3',
		value: 2
	},
	{
		title: 'Thứ 4',
		value: 3
	},
	{
		title: 'Thứ 5',
		value: 4
	},
	{
		title: 'Thứ 6',
		value: 5
	},
	{
		title: 'Thứ 7',
		value: 6
	},
	{
		title: 'Chủ nhật',
		value: 0
	}
]

export const rollUpStatusOptions = [
	{ value: ERollUpStatus.Present, label: 'Có mặt' },
	{ value: ERollUpStatus.AbsentWithPermission, label: 'Vắng có phép' },
	{ value: ERollUpStatus.AbsentWithoutPermission, label: 'Vắng không phép' },
	{ value: ERollUpStatus.Late, label: 'Đi muộn' },
	{ value: ERollUpStatus.LeaveEarly, label: 'Về sớm' },
	{ value: ERollUpStatus.Holiday, label: 'Nghĩ lễ' }
]

export const learningStatusOptions = [
	{ value: ELearningStatus.Excellent, label: 'Giỏi' },
	{ value: ELearningStatus.Good, label: 'Khá' },
	{ value: ELearningStatus.Average, label: 'Trung bình' },
	{ value: ELearningStatus.Poor, label: 'Kém' },
	{ value: ELearningStatus.SpecialMonitoring, label: 'Theo dõi đặc biệt' },
	{ value: ELearningStatus.Trying, label: 'Có cố gắng' },
	{ value: ELearningStatus.NotTrying, label: 'Không cố gắng' },
	{ value: ELearningStatus.NoComment, label: 'Không nhận xét' }
]

export const classStatusOptions = [
	{ value: EClassStatus.Upcoming, label: 'Sắp diễn ra' },
	{ value: EClassStatus.InProgress, label: 'Đang diễn ra' },
	{ value: EClassStatus.Finished, label: 'Kết thúc' }
]

export const parentRelationshipOptions = [
	{ value: EParentRelationship.Father, label: 'Cha' },
	{ value: EParentRelationship.Mother, label: 'Mẹ' },
	{ value: EParentRelationship.Relatives, label: 'Người thân' }
]
