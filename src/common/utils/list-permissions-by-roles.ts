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
	ERole.foreignAffairsOfficer,
	ERole.deputyGeneralDirector,
	ERole.executiveDirector,
	ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
		],
		// Thống kê lương
		salary: [
			ERole.admin,
			ERole.manager,
			ERole.accountant,
			ERole.trainingAssistant,
			ERole.chiefAccountant,
			ERole.administrativeHRStaff,
			ERole.administrativeHRManager,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.residency,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
		],
		// Chuyển lớp
		changeClass: [
			ERole.admin,
			ERole.manager,
			ERole.academic,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.profile,
			ERole.residency,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.profile,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.profile,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.profile,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.profile,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			// Đăng ký học
			registerStudy: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.saleAdmin,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.profile,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			// Gắn học viên vào phụ huynh
			linkToStudent: [
				ERole.admin,
				ERole.manager,
				ERole.saler,
				ERole.academic,
				ERole.parent,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.residency,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
			ERole.residency,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			viewStatistic: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		},
		// Đăng ký chương trình học
		register: [
			ERole.admin,
			ERole.manager,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
		],
		// Thay đổi chương trình học
		change: [
			ERole.admin,
			ERole.manager,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
		]
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
			ERole.foreignAffairsOfficer,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			approve: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.trainingAssistant,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		},
		// Đăng ký lịch nghỉ
		teacherRegisterOff: {
			viewList: [ERole.teacher]
		}
	},
	// Tài chính
	finance: {
		menuRoles: [
			ERole.admin,
			ERole.manager,
			ERole.accountant,
			ERole.chiefAccountant,
			ERole.administrativeHRManager,
			ERole.deputyGeneralDirector,
			ERole.executiveDirector,
			ERole.CEO
		],
		paymentManagement: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			makePayment: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			// Hoàn tiền
			refund: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		},
		// Quản lý thu chi
		incomeAndExpenditureManagement: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		},
		// Duyệt thanh toán
		paymentApproval: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			approve: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		},
		// Hoàn tiền
		refund: {
			viewList: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			approve: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.accountant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			createRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			updateRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			deleteRoom: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			createDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			updateDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			deleteDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			// Điều chỉnh vị trí
			updateDetailIndex: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRStaff,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			addTeacher: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			viewDetail: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.trainingAssistant,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			// Thay đổi vị trí
			changePosition: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
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
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			create: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			update: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			],
			delete: [
				ERole.admin,
				ERole.manager,
				ERole.academic,
				ERole.chiefAccountant,
				ERole.administrativeHRManager,
				ERole.profile,
				ERole.residency,
				ERole.foreignAffairsOfficer,
				ERole.deputyGeneralDirector,
				ERole.executiveDirector,
				ERole.CEO
			]
		}
	}
}
