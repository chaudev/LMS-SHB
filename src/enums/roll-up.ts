export enum ERollUpStatus {
	/** Có mặt */
	Present = 1,
	/** Vắng có phép */
	AbsentWithPermission = 2,
	/** Vắng không phép */
	AbsentWithoutPermission = 3,
	/** Đi trễ */
	Late = 4,
	/** Về sớm */
	LeaveEarly = 5,
	/** Nghỉ lễ */
	Holiday = 6
}

export enum ELearningStatus {
	/** Giỏi */
	Excellent = 1,
	/** Khá */
	Good,
	/** Trung bình */
	Average,
	/** Kém */
	Poor,
	/** Theo dõi đặc biệt */
	SpecialMonitoring,
	/** Có cố gắng */
	Trying,
	/** Không cố gắng */
	NotTrying,
	/** Không nhận xét */
	NoComment
}
