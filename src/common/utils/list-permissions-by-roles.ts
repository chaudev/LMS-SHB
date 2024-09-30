import { ERole } from '~/enums/common'

const allRoles = [
	ERole.admin,
	ERole.teacher,
	ERole.student,
	ERole.manager,
	ERole.saler,
	ERole.accountant,
	ERole.academic,
	ERole.parent,
	ERole.trainingAssistant,
	ERole.saleAdmin,
	ERole.marketing,
	ERole.chiefAccountant,
	ERole.administrativeHRStaff,
	ERole.administrativeHRManager,
	ERole.profile,
	ERole.residency,
	ERole.foreignAffairsOfficer
]

export const listPermissionsByRoles = {
	/** Tin tức */
	news: {
		view: allRoles,
		create: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		update: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		delete: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		viewComment: allRoles,
		createComment: allRoles,
		updateComment: allRoles,
		deleteComment: [
			ERole.admin,
			ERole.student,
			ERole.manager,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		replyComment: allRoles,
		likeNews: allRoles,
		createGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		viewNewsInGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		updateGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		deleteGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		addMemberToGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		removeMemberFromGroup: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		]
	},
	statistics: {
		// Xem data tổng
		viewFullData: [
			ERole.admin,
			ERole.teacher,
			ERole.student,
			ERole.manager,
			ERole.accountant,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.saleAdmin,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Xem data thống kê cá nhân
		viewPersonalData: allRoles,
		// Thống kê giảng dạy
		teaching: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Thống kê lương
		salary: [
			ERole.admin,
			ERole.manager,
			ERole.accountant,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager
		],
		// Thống kê điểm danh
		rollUp: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Thống kê kiểm tra
		test: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Thống kê chuyên cần
		attendance: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		]
	},
	// Tình trạng hồ sơ
	applicationStatus: {
		view: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.saleAdmin,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		]
	},
	class: {
		view: allRoles,
		create: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		update: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		delete: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		checkSchedule: [
			ERole.admin,
			ERole.teacher,
			ERole.manager,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency
		],
		rollUp: [ERole.admin, ERole.manager, ERole.academic],
		enterScore: [ERole.admin, ERole.manager, ERole.academic]
	},
	detailClass: {
		menu: {
			// Lịch học
			schedule: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Học viên
			student: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Các buổi học
			lessions: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Tài liệu
			documents: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Điểm danh
			rollup: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Bảng điểm
			transcript: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Báo cáo
			report: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Điểm danh
			rollupTeacher: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Phản hồi buổi học
			lessionFeedback: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Thông báo
			notification: [
				ERole.admin,
				ERole.teacher,
				ERole.student,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		}
	},
	student: {
		create: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		update: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		delete: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Danh sách học viên
		viewList: [
			ERole.admin,
			ERole.teacher,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Xem chi tiết học viên
		viewDetail: [
			ERole.admin,
			ERole.teacher,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Bảo lưu học viên
		reserveStudents: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Import
		import: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Export
		export: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.saleAdmin,
			ERole.marketing,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		]
	},
	// Học viên trong lớp
	studentInClass: {
		viewList: [
			ERole.admin,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Chuyển lớp
		changeClass: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency
		]
	},
	// Học viên chuyển lớp
	studentTransferredClass: {
		viewList: [
			ERole.admin,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		]
	},
	// Tuyển sinh
	admissions: {
		// Tư vấn
		advise: {
			view: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			// Cập nhật trạng thái
			updateStatus: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile
			],
			// Cập nhật lịch hẹn
			updateAppointment: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile
			],
			// Hủy lịch hẹn
			cancelAppointment: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile
			],
			// Nhập điểm thủ công
			manualScoreEntry: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile
			],
			// Đăng ký học
			registerStudy: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager
			]
		},
		// Hẹn kiểm tra đầu vào
		appointmentEntranceExam: {
			view: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.foreignAffairsOfficer
			]
		},
		// Học viên sắp học xong
		studentAlmostDoneStudy: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			]
		},
		// Cảnh báo học viên
		studentWarning: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile
			]
		},
		// Phụ huynh
		parent: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			create: [ERole.admin, ERole.manager, ERole.saler, ERole.academic, ERole.parent, ERole.chiefAccountant, ERole.administrativeHRManager],
			update: [ERole.admin, ERole.manager, ERole.saler, ERole.academic, ERole.parent, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.saler, ERole.academic, ERole.parent, ERole.chiefAccountant, ERole.administrativeHRManager],
			// Gắn học viên vào phụ huynh
			linkToStudent: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.chiefAccountant,
				ERole.administrativeHRManager
			]
		},
		// Hợp đồng
		contract: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		}
	},
	// Phản hồi
	feedback: {
		menuRoles: [
			ERole.admin,
			ERole.teacher,
			ERole.student,
			ERole.manager,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		viewList: [
			ERole.admin,
			ERole.teacher,
			ERole.student,
			ERole.manager,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency
		],
		create: [
			ERole.admin,
			ERole.teacher,
			ERole.student,
			ERole.manager,
			ERole.academic,
			ERole.parent,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency
		],
		// Quản lý nhóm phản hồi
		group: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		},
		// Phân quyền phản hồi
		permission: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Thông báo
		notification: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		}
	},
	// Đánh giá
	evaluation: {
		menuRoles: [
			ERole.admin,
			ERole.teacher,
			ERole.manager,
			ERole.saler,
			ERole.accountant,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Phiếu đánh giá mẫu
		sampleForm: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Danh sách đợt đánh giá
		listEvaluationRounds: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			viewStatistic: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Danh sách phiếu đánh giá
		listEvaluationOfMe: {
			viewList: [
				ERole.teacher,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		}
	},
	// Chương trình học
	curriculum: {
		menuRoles: [
			ERole.admin,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		list: {
			view: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			update: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Đăng ký chương trình học
		register: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
		// Thay đổi chương trình học
		change: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager]
	},
	// Quản lý tài khoản
	account: {
		menuRoles: [
			ERole.admin,
			ERole.manager,
			ERole.saler,
			ERole.academic,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.foreignAffairsOfficer
		],
		// Nhân viên
		staff: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			]
		},
		// Duyệt lịch nghỉ
		teacherOff: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			approve: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			]
		},
		// Cấu hình lương
		salaryConfig: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			]
		},
		// Bảng lương
		payroll: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager
			]
		},
		// Đăng ký lịch nghỉ
		teacherRegisterOff: {
			viewList: [ERole.teacher]
		}
	},
	// Tài chính
	finance: {
		menuRoles: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
		paymentManagement: {
			viewList: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			create: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			makePayment: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			// Hoàn tiền
			refund: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Quản lý thu chi
		incomeAndExpenditureManagement: {
			viewList: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			create: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			update: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Duyệt thanh toán
		paymentApproval: {
			viewList: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			approve: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Hoàn tiền
		refund: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager
			],
			create: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager],
			approve: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.accountant, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Bảng lương
		payroll: {
			viewList: [ERole.teacher]
		}
	},
	// Cấu hình
	config: {
		// Trung tâm
		branch: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			viewListRoom: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			createRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			updateRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			deleteRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Mẫu lộ trình học
		sampleLearningRoadmap: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			viewListDetail: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			createDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			updateDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			deleteDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Điều chỉnh vị trí
			updateDetailIndex: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Trình độ tiếng
		languageLevel: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Khung đào tạo
		trainingFramework: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			addTeacher: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			viewDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Thêm giáo trình
			createCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Sửa giáo trình
			updateCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Xóa giáo trình
			deleteCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Sửa giáo trình
			viewDetailCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Thêm chủ đề cho giáo trình
			createTopicForCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Xóa chủ đề của giáo trình
			deleteTopicForCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Upload file cho chủ đề của giáo trình
			uploadFileForTopicOfCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// download file của chủ đề trong giáo trình
			downloadFileOfTopicOfCurriculum: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Ca học
		timeShift: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Bảng điểm mẫu
		sampleTranscript: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Nhóm chương trình
		programGroup: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Ngành học khác
		otherMajor: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Nhu cầu học
		learningNeeds: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Nguồn khách hàng
		customerSource: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Ngày nghỉ
		dayOff: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Công việc
		job: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Trạng thái khách hàng
		customerStatus: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Mục đích học
		learningPurpose: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Thành ngữ lịch
		calendarIdioms: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Mẫu hợp đồng
		contractTemplate: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Câu hỏi thường gặp
		frequentlyAskedQuestions: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Phương thức thanh toán
		paymentMethod: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Cấp quyền thanh toán
		paymentAuthorization: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Quà tặng
		gift: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Mẫu hồ sơ
		applicationForm: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.academic,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			],
			// Thay đổi vị trí
			changePosition: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency
			]
		},
		// Văn phòng đại diện
		representativeOffice: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			update: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager],
			delete: [ERole.admin, ERole.manager, ERole.chiefAccountant, ERole.administrativeHRManager]
		},
		// Đối tác
		partner: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		},
		// Tình trạng tiếng
		languageStatus: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		},
		// Tình trạng visa
		visaStatus: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		},
		// Tình trạng thu hồ sơ
		applicationStatus: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		},
		// Tiến trình xử lý hồ sơ
		applicationProcessingProgress: {
			viewList: [
				ERole.admin,
				ERole.teacher,
				ERole.manager,
				ERole.saler,
				ERole.accountant,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.saleAdmin,
				ERole.marketing,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer
			]
		}
	}
}
