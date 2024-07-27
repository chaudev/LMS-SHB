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
 * 1. majorRegistration: Đăng ký ngành học
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
