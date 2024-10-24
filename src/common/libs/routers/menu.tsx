import { AiFillSetting } from 'react-icons/ai'
import { BsChatLeftTextFill, BsFillGridFill } from 'react-icons/bs'
import { FaLayerGroup, FaMoneyBillAlt, FaUserCheck, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { HiMiniNewspaper } from 'react-icons/hi2'
import { TiHome } from 'react-icons/ti'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
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

/**
 * Đây chưa phải là best practice cho menu, em chỉ gom 8 cái menu thành 1 cái menu để cho thuận tiện thêm role
 * Flow tech thì vẫn giữ như cũ
 */
type TMenuItem = {
	ItemType: 'single' | 'sub-menu'
	Key: string
	Route?: string // Required Nếu ItemType === 'single'
	Text?: string // Required Nếu ItemType === 'single'
	Icon?: string | JSX.Element
	Allow: ERole[]
	TitleSub?: string // Required Nếu ItemType === 'sub-menu'
	SubMenuList?: {
		ItemType: 'single'
		Key: string
		Route: string
		Text: string
		Icon: string | JSX.Element
		Allow: ERole[]
	}[]
}

export type TMenu = {
	Key: string
	TabName: string
	Icon: JSX.Element
	Allow: number[]
	MenuTitle: string
	MenuKey: string
	Parent: string
	MenuItem: TMenuItem[]
	MenuName?: string
}

export const menu: TMenu[] = [
	{
		Key: 'home',
		TabName: 'Trang chủ',
		Icon: <TiHome style={{ width: 24, height: 24 }} />,
		Allow: allRoles,

		Parent: 'home',
		MenuTitle: 'Quản lý hệ thống',
		MenuKey: 'home',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/news',
				Route: '/news',
				Icon: '',
				Text: 'Tin tức',
				Allow: allRoles
			},
			{
				ItemType: 'single',
				Key: '/dashboard',
				Route: '/dashboard',
				Icon: '',
				Text: 'Thống kê',
				Allow: allRoles
			},
			{
				ItemType: 'single',
				Key: '/statistic-teaching',
				Route: '/statistic-teaching',
				Icon: '',
				Text: 'Thống kê giảng dạy',
				Allow: listPermissionsByRoles.statistics.teaching
			},
			{
				ItemType: 'single',
				Key: '/statistic-profile',
				Route: '/statistic-profile',
				Icon: '',
				Text: 'Tình trạng hồ sơ',
				Allow: listPermissionsByRoles.applicationStatus.view
			},
			{
				ItemType: 'single',
				Key: '/statistic-salary',
				Route: '/statistic-salary',
				Icon: '',
				Text: 'Thống kê lương',
				Allow: listPermissionsByRoles.statistics.salary
			},
			{
				ItemType: 'single',
				Key: '/statistic-roll-up',
				Route: '/statistic-roll-up',
				Icon: '',
				Text: 'Thống kê điểm danh',
				Allow: listPermissionsByRoles.statistics.rollUp
			},
			{
				ItemType: 'single',
				Key: '/statistic-test',
				Route: '/statistic-test',
				Icon: '',
				Text: 'Thống kê kiểm tra',
				Allow: listPermissionsByRoles.statistics.test
			},
			{
				ItemType: 'single',
				Key: '/statistic-attendance',
				Route: '/statistic-attendance',
				Icon: '',
				Text: 'Thống kê chuyên cần',
				Allow: listPermissionsByRoles.statistics.attendance
			}
		]
	},
	{
		Key: 'student',
		TabName: 'Học viên',
		Icon: <FaUserGraduate size={20} />,
		Allow: allRoles,

		MenuTitle: 'Tuyển sinh',
		MenuKey: '/info-course',
		Parent: 'student',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/info-course/customer',
				Route: '/info-course/customer',
				Text: 'Tư vấn',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.advise.view
			},
			{
				ItemType: 'single',
				Key: '/info-course/service-appointment-test',
				Route: '/info-course/service-appointment-test',
				Text: 'Hẹn kiểm tra đầu vào',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.appointmentEntranceExam.view
			},
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/student',
			// 	Route: '/info-course/student',
			// 	Text: 'Danh sách học viên',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/student-in-class',
			// 	Route: '/info-course/student-in-class',
			// 	Text: 'Học viên trong lớp',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/changed',
			// 	Route: '/info-course/changed',
			// 	Text: 'Học viên chuyển lớp',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/reserved',
			// 	Route: '/info-course/reserved',
			// 	Text: 'Học viên bảo lưu',
			// 	Icon: ''
			// },
			{
				ItemType: 'single',
				Key: '/info-course/about-to-finish',
				Route: '/info-course/about-to-finish',
				Text: 'Học viên sắp học xong',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.studentAlmostDoneStudy.viewList
			},
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/registration',
			// 	Route: '/info-course/registration',
			// 	Text: 'Hẹn đăng ký',
			// 	Icon: ''
			// },
			{
				ItemType: 'single',
				Key: '/info-course/student/warning',
				Route: '/info-course/student/warning',
				Text: 'Cảnh báo học viên',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.studentWarning.viewList
			},
			,
			{
				ItemType: 'single',
				Key: '/info-course/student/warning',
				Route: '/info-course/student/warning',
				Text: 'Thông tin cảnh báo',
				Icon: '',
				Allow: [ERole.student, ERole.parent]
			},
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/feedbacks',
			// 	Route: '/info-course/feedbacks',
			// 	Text: 'Phản hồi học viên',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/rollup',
			// 	Route: '/info-course/rollup',
			// 	Text: 'Điểm danh học viên (QR)',
			// 	Icon: ''
			// },
			{
				ItemType: 'single',
				Key: '/info-course/parents',
				Route: '/info-course/parents',
				Text: 'Phụ huynh',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.parent.viewList
			},
			{
				ItemType: 'single',
				Key: '/info-course/contract',
				Route: '/info-course/contract',
				Text: 'Hợp đồng',
				Icon: '',
				Allow: listPermissionsByRoles.admissions.contract.viewList
			}
		]
	},
	{
		Key: 'class',
		TabName: 'Lớp học',
		Icon: <BsFillGridFill size={22} />,
		Allow: allRoles,

		MenuName: 'Lớp học',
		MenuTitle: 'Lớp học',
		MenuKey: '/class',
		Parent: 'class',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/class/create',
				Route: '/class/create',
				Text: 'Tạo lớp học',
				Icon: '',
				Allow: listPermissionsByRoles.class.create
			},
			{
				ItemType: 'single',
				Key: '/class/list-class',
				Route: '/class/list-class',
				Text: 'Danh sách lớp học',
				Icon: '',
				Allow: allRoles
			},
			{
				ItemType: 'single',
				Key: '/class/schedule',
				Icon: '',
				Route: '/class/schedule',
				Text: 'Kiểm tra lịch',
				Allow: listPermissionsByRoles.class.checkSchedule
			},
			{
				ItemType: 'single',
				Key: '/info-course/student',
				Route: '/info-course/student',
				Text: 'Danh sách học viên',
				Icon: '',
				Allow: listPermissionsByRoles.student.viewList
			},
			{
				ItemType: 'single',
				Key: '/info-course/student-in-class',
				Route: '/info-course/student-in-class',
				Text: 'Học viên trong lớp',
				Icon: '',
				Allow: listPermissionsByRoles.studentInClass.viewList
			},
			{
				ItemType: 'single',
				Key: '/info-course/changed',
				Route: '/info-course/changed',
				Text: 'Học viên chuyển lớp',
				Icon: '',
				Allow: listPermissionsByRoles.studentTransferredClass.viewList
			},
			{
				ItemType: 'single',
				Key: '/class/roll-up',
				Route: '/class/roll-up',
				Text: 'Điểm danh',
				Icon: '',
				Allow: listPermissionsByRoles.class.rollUp
			},
			{
				ItemType: 'single',
				Key: '/class/enter-score',
				Route: '/class/enter-score',
				Text: 'Nhập điểm',
				Icon: '',
				Allow: listPermissionsByRoles.class.enterScore
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/class/register',
			// 	Icon: '',
			// 	Route: '/class/register',
			// 	Text: 'Đăng ký học'
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/class/tutoring-config',
			// 	Icon: '',
			// 	Route: '/class/tutoring-config',
			// 	Text: 'Cấu hình thời gian đặt lịch'
			// }
			// {
			// 	ItemType: 'single',
			// 	Key: '/class/zoom-rooms',
			// 	Route: '/class/zoom-rooms',
			// 	Text: 'Danh sách phòng Zoom'
			// }
		]
	},
	{
		Key: 'feedback',
		TabName: 'Phản hồi',
		Icon: <BsChatLeftTextFill size={20} />,
		Allow: listPermissionsByRoles.feedback.menuRoles,

		MenuName: 'Quản lý phản hồi',
		MenuTitle: 'Quản lý phản hồi',
		MenuKey: '/feedback',
		Parent: 'feedback',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/options/general-notification',
				Route: '/options/general-notification',
				Text: 'Tạo thông báo',
				Icon: '',
				Allow: listPermissionsByRoles.feedback.notification.viewList
			},
			{
				ItemType: 'single',
				Key: '/feedback/list',
				Route: '/feedback/list',
				Text: 'Danh sách phản hồi',
				Icon: '',
				Allow: listPermissionsByRoles.feedback.viewList
			},
			{
				ItemType: 'single',
				Key: '/feedback/group',
				Route: '/feedback/group',
				Text: 'Quản lý nhóm phản hồi',
				Icon: '',
				Allow: listPermissionsByRoles.feedback.group.viewList
			},
			{
				ItemType: 'single',
				Key: '/feedback/permission',
				Route: '/feedback/permission',
				Text: 'Phân quyền phản hồi',
				Icon: '',
				Allow: listPermissionsByRoles.feedback.permission.viewList
			}
		]
	},
	{
		Key: 'evaluation',
		TabName: 'Đánh giá',
		Icon: <HiMiniNewspaper size={22} />,
		Allow: listPermissionsByRoles.evaluation.menuRoles,

		MenuName: 'Quản lý đánh giá',
		MenuTitle: 'Quản lý đánh giá',
		MenuKey: '/evaluation',
		Parent: 'evaluation',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/evaluation/list',
				Route: '/evaluation/list',
				Text: 'Phiếu đánh giá mẫu',
				Icon: '',
				Allow: listPermissionsByRoles.evaluation.sampleForm.viewList
			},
			{
				ItemType: 'single',
				Key: '/evaluation/evaluation-time',
				Route: '/evaluation/evaluation-time',
				Text: 'Danh sách đợt đánh giá',
				Icon: '',
				Allow: listPermissionsByRoles.evaluation.listEvaluationRounds.viewList
			},
			{
				ItemType: 'single',
				Key: '/evaluation/me',
				Route: '/evaluation/me',
				Text: 'Danh sách phiếu đánh giá',
				Icon: '',
				Allow: listPermissionsByRoles.evaluation.listEvaluationOfMe.viewList
			}
		]
	},
	{
		Key: 'majors',
		TabName: 'Chương trình học',
		Icon: <FaLayerGroup size={20} />,
		Allow: listPermissionsByRoles.curriculum.menuRoles,

		MenuName: 'Chương trình học',
		MenuTitle: 'Chương trình học',
		Parent: 'majors',
		MenuKey: '/majors',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/majors',
				Route: '/majors',
				Text: 'Danh sách chương trình học',
				Icon: '',
				Allow: listPermissionsByRoles.curriculum.list.view
			},
			{
				ItemType: 'single',
				Key: '/majors/registration',
				Route: '/majors/registration',
				Text: 'Đăng ký chương trình học',
				Icon: '',
				Allow: listPermissionsByRoles.curriculum.register
			},
			{
				ItemType: 'single',
				Key: '/majors/change-majors',
				Route: '/majors/change-majors',
				Text: 'Thay đổi chương trình học',
				Icon: '',
				Allow: listPermissionsByRoles.curriculum.change
			}
		]
	},
	{
		Key: 'staff',
		TabName: 'Nhân viên',
		Icon: <FaUserTie size={20} />,
		Allow: listPermissionsByRoles.account.menuRoles,

		MenuName: 'Quản lý tài khoản',
		MenuTitle: 'Quản lý tài khoản',
		MenuKey: '/users',
		Parent: 'staff',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/users/personnel',
				Route: '/users/personnel',
				Text: 'Danh sách nhân viên',
				Icon: '',
				Allow: listPermissionsByRoles.account.staff.viewList
			},
			{
				ItemType: 'single',
				Key: '/users/teacher/teacher-off',
				Route: '/users/teacher/teacher-off',
				Text: 'Duyệt lịch nghỉ',
				Icon: '',
				Allow: listPermissionsByRoles.account.teacherOff.viewList
			},
			{
				ItemType: 'single',
				Key: '/users/salary-config',
				Route: '/users/salary-config',
				Text: 'Cấu hình lương',
				Icon: '',
				Allow: listPermissionsByRoles.account.salaryConfig.viewList
			},
			{
				ItemType: 'single',
				Key: '/users/payroll',
				Route: '/users/payroll',
				Text: 'Bảng lương',
				Icon: '',
				Allow: [ERole.admin, ERole.manager, ERole.saler, ERole.accountant, ERole.academic]
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/users/teacher/open-calender',
			// 	Route: '/users/teacher/open-calender',
			// 	Text: 'Mở lịch trống',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/users/salary-tutoring-config',
			// 	Route: '/users/salary-tutoring-config',
			// 	Text: 'Cấu hình lương dạy kèm',
			// 	Icon: ''
			// }
		]
	},

	{
		Key: 'finance',
		TabName: 'Tài chính',
		Icon: <FaMoneyBillAlt size={20} />,
		Allow: listPermissionsByRoles.finance.menuRoles,

		Parent: 'finance',
		MenuTitle: 'Tài chính',
		MenuKey: '/finance',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/finance/payment',
				Route: '/finance/payment',
				Icon: '',
				Text: 'Quản lý thanh toán',
				Allow: listPermissionsByRoles.finance.paymentManagement.viewList
			},
			{
				ItemType: 'single',
				Key: '/finance/income-expense-management',
				Route: '/finance/income-expense-management',
				Icon: '',
				Text: 'Quản lý thu chi',
				Allow: listPermissionsByRoles.finance.incomeAndExpenditureManagement.viewList
			},
			{
				ItemType: 'single',
				Key: '/finance/payment-approve',
				Route: '/finance/payment-approve',
				Icon: '',
				Text: 'Duyệt thanh toán',
				Allow: listPermissionsByRoles.finance.paymentApproval.viewList
			},
			{
				ItemType: 'single',
				Key: '/finance/refund',
				Route: '/finance/refund',
				Text: 'Hoàn tiền',
				Allow: listPermissionsByRoles.finance.refund.viewList
			},
			{
				ItemType: 'single',
				Key: '/users/salary',
				Route: '/users/salary',
				Text: 'Bảng lương',
				Icon: '',
				Allow: listPermissionsByRoles.finance.payroll.viewList
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/finance/donation-history',
			// 	Route: '/finance/donation-history',
			// 	Text: 'Lịch sử tặng'
			// }
		]
	},
	{
		Key: 'assignment',
		TabName: 'Phân công',
		Icon: <FaUserCheck size={22} />,
		Allow: listPermissionsByRoles.account.teacherRegisterOff.viewList,

		MenuName: 'Tài khoản',
		MenuTitle: 'Tài khoản',
		Parent: 'assignment',
		MenuKey: '/users',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/users/teacher/teacher-off',
				Route: '/users/teacher/teacher-off',
				Text: 'Đăng ký lịch nghỉ',
				Icon: '',
				Allow: listPermissionsByRoles.account.teacherRegisterOff.viewList
			}
		]
	},
	{
		Key: 'config',
		TabName: 'Cấu hình',
		Icon: <AiFillSetting size={22} />,
		Allow: allRoles,

		MenuName: 'Cấu hình',
		MenuTitle: 'Cấu hình',
		MenuKey: '/options',
		Parent: 'config',
		MenuItem: [
			{
				ItemType: 'sub-menu',
				Key: 'sub-list-staff-child-303',
				Icon: '',
				TitleSub: 'Cấu hình học',
				Allow: allRoles,
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/center',
						Route: '/options/center',
						Text: 'Trung tâm',
						Icon: '',
						Allow: listPermissionsByRoles.config.branch.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/study-route-template',
						Route: '/options/study-route-template',
						Text: 'Mẫu lộ trình học',
						Icon: '',
						Allow: listPermissionsByRoles.config.sampleLearningRoadmap.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/specialize',
						Route: '/options/specialize',
						Text: 'Trình độ tiếng',
						Icon: '',
						Allow: listPermissionsByRoles.config.languageLevel.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/program',
						Route: '/options/program',
						Text: 'Khung đào tạo',
						Icon: '',
						Allow: listPermissionsByRoles.config.trainingFramework.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/study-time',
						Route: '/options/study-time',
						Text: 'Ca học',
						Icon: '',
						Allow: listPermissionsByRoles.config.timeShift.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/grade-templates',
						Route: '/options/grade-templates',
						Text: 'Bảng điểm mẫu',
						Icon: '',
						Allow: listPermissionsByRoles.config.sampleTranscript.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/major-group',
						Route: '/options/major-group',
						Text: 'Nhóm chương trình',
						Icon: '',
						Allow: listPermissionsByRoles.config.programGroup.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/other-major',
						Route: '/options/other-major',
						Text: 'Ngành học khác',
						Icon: '',
						Allow: listPermissionsByRoles.config.otherMajor.viewList
					}
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/zoom',
					// 	Route: '/options/zoom',
					// 	Text: 'Cấu hình Zoom',
					// 	Icon: ''
					// }
				]
			},
			{
				ItemType: 'sub-menu',
				Key: 'sub-list-staff-child-304',
				Icon: '',
				TitleSub: 'Khác',
				Allow: allRoles,
				SubMenuList: [
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/discount',
					// 	Route: '/options/discount',
					// 	Text: 'Mã khuyến mãi',
					// 	Icon: ''
					// },

					{
						ItemType: 'single',
						Key: '/options/learning-needs',
						Route: '/options/learning-needs',
						Text: 'Nhu cầu học',
						Icon: '',
						Allow: listPermissionsByRoles.config.learningNeeds.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/customer-supplier',
						Route: '/options/customer-supplier',
						Text: 'Nguồn khách hàng',
						Icon: '',
						Allow: listPermissionsByRoles.config.customerSource.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/day-off',
						Route: '/options/day-off',
						Text: 'Ngày nghỉ',
						Icon: '',
						Allow: listPermissionsByRoles.config.dayOff.viewList
					},

					{
						ItemType: 'single',
						Key: '/options/jobs',
						Route: '/options/jobs',
						Text: 'Công việc',
						Icon: '',
						Allow: listPermissionsByRoles.config.job.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/consultation-status',
						Route: '/options/consultation-status',
						Text: 'Trạng thái khách hàng',
						Icon: '',
						Allow: listPermissionsByRoles.config.customerStatus.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/purpose',
						Route: '/options/purpose',
						Text: 'Mục đích học',
						Icon: '',
						Allow: listPermissionsByRoles.config.learningPurpose.viewList
					},
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/general-notification',
					// 	Route: '/options/general-notification',
					// 	Text: 'Tạo thông báo',
					// 	Icon: ''
					// },
					{
						ItemType: 'single',
						Key: '/options/idiom',
						Route: '/options/idiom',
						Text: 'Thành ngữ lịch',
						Icon: '',
						Allow: listPermissionsByRoles.config.calendarIdioms.viewList
					},
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/config-template',
					// 	Route: '/options/config-template',
					// 	Text: 'Mẫu',
					// 	Icon: '',
					// 	Allow: listPermissionsByRoles.config.contractTemplate.viewList
					// },
					{
						ItemType: 'single',
						Key: '/options/faq',
						Route: '/options/faq',
						Text: 'Câu hỏi thường gặp',
						Icon: '',
						Allow: listPermissionsByRoles.config.frequentlyAskedQuestions.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/payment',
						Route: '/options/payment',
						Text: 'Phương thức thanh toán',
						Icon: '',
						Allow: listPermissionsByRoles.config.paymentMethod.viewList
					},
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/payment-type',
					// 	Route: '/options/payment-type',
					// 	Text: 'Hình thức thanh toán',
					// 	Icon: ''
					// },
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/tags',
					// 	Route: '/options/tags',
					// 	Text: 'Danh mục từ khoá',
					// 	Icon: ''
					// },
					{
						ItemType: 'single',
						Key: '/options/payment-pemission',
						Route: '/options/payment-pemission',
						Text: 'Cấp quyền thanh toán',
						Icon: '',
						Allow: listPermissionsByRoles.config.paymentAuthorization.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/gift',
						Route: '/options/gift',
						Text: 'Quà tặng',
						Icon: '',
						Allow: listPermissionsByRoles.config.gift.viewList
					}
					// {
					// 	ItemType: 'single',
					// 	Key: '/options/payment-type',
					// 	Route: '/options/payment-type',
					// 	Text: 'Hình thức đóng tiền',
					// 	Icon: ''
					// }
				]
			},
			// {
			// 	ItemType: 'sub-menu',
			// 	Key: 'sub-list-staff-child-305',
			// 	Icon: '',
			// 	TitleSub: 'Hồ sơ',
			// 	SubMenuList: [
			// 		{
			// 			ItemType: 'single',
			// 			Key: '/options/paymentPemission',
			// 			Route: '/options/profile-template',
			// 			Text: 'Mẫu hồ sơ',
			// 			Icon: ''
			// 		}
			// 	]
			// }
			{
				ItemType: 'sub-menu',
				Key: 'sub-list-staff-child-305',
				Icon: '',
				TitleSub: 'Hồ sơ',
				Allow: allRoles,
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/profile-template',
						Route: '/options/profile-template',
						Text: 'Mẫu hồ sơ',
						Icon: '',
						Allow: listPermissionsByRoles.config.applicationForm.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/office',
						Route: '/options/office',
						Text: 'Văn phòng đại diện',
						Icon: '',
						Allow: listPermissionsByRoles.config.representativeOffice.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/partner',
						Route: '/options/partner',
						Text: 'Đối tác',
						Icon: '',
						Allow: listPermissionsByRoles.config.partner.viewList
					}
				]
			},
			{
				ItemType: 'sub-menu',
				Key: 'sub-list-staff-child-306',
				Icon: '',
				TitleSub: 'Cấu hình tình trạng',
				Allow: allRoles,
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/foreign-language',
						Route: '/options/foreign-language',
						Text: 'Tình trạng tiếng',
						Icon: '',
						Allow: listPermissionsByRoles.config.languageStatus.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/visa-status',
						Route: '/options/visa-status',
						Text: 'Tình trạng Visa',
						Icon: '',
						Allow: listPermissionsByRoles.config.visaStatus.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/profile-status',
						Route: '/options/profile-status',
						Text: 'Tình trạng thu hồ sơ',
						Icon: '',
						Allow: listPermissionsByRoles.config.applicationStatus.viewList
					},
					{
						ItemType: 'single',
						Key: '/options/process',
						Route: '/options/process',
						Text: 'Tiến trình xử lý hồ sơ',
						Icon: '',
						Allow: listPermissionsByRoles.config.applicationProcessingProgress.viewList
					}
				]
			}
		]
	}
]
