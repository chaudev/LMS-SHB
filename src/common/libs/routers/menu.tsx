import { AiFillSetting } from 'react-icons/ai'
import { BsChatLeftTextFill, BsFillGridFill } from 'react-icons/bs'
import { FaLayerGroup, FaMoneyBillAlt, FaUserCheck, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { HiMiniNewspaper } from 'react-icons/hi2'
import { TiHome } from 'react-icons/ti'
import { USER_ROLES } from '~/common/utils/constants'

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
	Allow: number[]
	TitleSub?: string // Required Nếu ItemType === 'sub-menu'
	SubMenuList?: {
		ItemType: 'single'
		Key: string
		Route: string
		Text: string
		Icon: string | JSX.Element
		Allow: number[]
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
		Allow: [
			USER_ROLES.admin,
			USER_ROLES.manager,
			USER_ROLES.teacher,
			USER_ROLES.student,
			USER_ROLES.saler,
			USER_ROLES.accountant,
			USER_ROLES.academic,
			USER_ROLES.parent
		],

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
				Allow: [
					USER_ROLES.admin,
					USER_ROLES.manager,
					USER_ROLES.teacher,
					USER_ROLES.student,
					USER_ROLES.saler,
					USER_ROLES.accountant,
					USER_ROLES.academic,
					USER_ROLES.parent
				]
			},
			{
				ItemType: 'single',
				Key: '/dashboard',
				Route: '/dashboard',
				Icon: '',
				Text: 'Thống kê',
				Allow: [
					USER_ROLES.admin,
					USER_ROLES.manager,
					USER_ROLES.teacher,
					USER_ROLES.student,
					USER_ROLES.saler,
					USER_ROLES.accountant,
					USER_ROLES.academic,
					USER_ROLES.parent
				]
			},
			{
				ItemType: 'single',
				Key: '/statistic-teaching',
				Route: '/statistic-teaching',
				Icon: '',
				Text: 'Thống kê giảng dạy',
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/statistic-profile',
				Route: '/statistic-profile',
				Icon: '',
				Text: 'Tình trạng hồ sơ',
				Allow: [USER_ROLES.admin]
			},
			{
				ItemType: 'single',
				Key: '/statistic-salary',
				Route: '/statistic-salary',
				Icon: '',
				Text: 'Thống kê lương',
				Allow: [USER_ROLES.admin]
			},
			{
				ItemType: 'single',
				Key: '/statistic-roll-up',
				Route: '/statistic-roll-up',
				Icon: '',
				Text: 'Thống kê điểm danh',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/statistic-test',
				Route: '/statistic-test',
				Icon: '',
				Text: 'Thống kê kiểm tra',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/statistic-attendance',
				Route: '/statistic-attendance',
				Icon: '',
				Text: 'Thống kê chuyên cần',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
			}
		]
	},
	{
		Key: 'student',
		TabName: 'Học viên',
		Icon: <FaUserGraduate size={20} />,
		Allow: [
			USER_ROLES.admin,
			USER_ROLES.manager,
			USER_ROLES.teacher,
			USER_ROLES.student,
			USER_ROLES.saler,
			USER_ROLES.academic,
			USER_ROLES.parent
		],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.saler, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/info-course/service-appointment-test',
				Route: '/info-course/service-appointment-test',
				Text: 'Hẹn kiểm tra đầu vào',
				Icon: '',
				Allow: [
					USER_ROLES.admin,
					USER_ROLES.manager,
					USER_ROLES.teacher,
					USER_ROLES.student,
					USER_ROLES.saler,
					USER_ROLES.academic,
					USER_ROLES.parent
				]
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
				Allow: [USER_ROLES.admin, USER_ROLES.saler]
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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.saler, USER_ROLES.academic]
			},
			,
			{
				ItemType: 'single',
				Key: '/info-course/student/warning',
				Route: '/info-course/student/warning',
				Text: 'Thông tin cảnh báo',
				Icon: '',
				Allow: [USER_ROLES.student, USER_ROLES.parent]
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
				Allow: [USER_ROLES.admin, USER_ROLES.saler]
			},
			{
				ItemType: 'single',
				Key: '/info-course/contract',
				Route: '/info-course/contract',
				Text: 'Hợp đồng',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.saler]
			}
		]
	},
	{
		Key: 'class',
		TabName: 'Lớp học',
		Icon: <BsFillGridFill size={22} />,
		Allow: [
			USER_ROLES.admin,
			USER_ROLES.manager,
			USER_ROLES.teacher,
			USER_ROLES.student,
			USER_ROLES.saler,
			USER_ROLES.accountant,
			USER_ROLES.academic,
			USER_ROLES.parent
		],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/class/list-class',
				Route: '/class/list-class',
				Text: 'Danh sách lớp học',
				Icon: '',
				Allow: [
					USER_ROLES.admin,
					USER_ROLES.manager,
					USER_ROLES.teacher,
					USER_ROLES.student,
					USER_ROLES.saler,
					USER_ROLES.accountant,
					USER_ROLES.academic,
					USER_ROLES.parent
				]
			},
			{
				ItemType: 'single',
				Key: '/class/schedule',
				Icon: '',
				Route: '/class/schedule',
				Text: 'Kiểm tra lịch',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/class/schedule',
				Icon: '',
				Route: '/class/schedule',
				Text: 'Lịch học',
				Allow: [USER_ROLES.student]
			},
			{
				ItemType: 'single',
				Key: '/info-course/student',
				Route: '/info-course/student',
				Text: 'Danh sách học viên',
				Icon: '',
				Allow: [
					USER_ROLES.admin,
					USER_ROLES.manager,
					USER_ROLES.teacher,
					USER_ROLES.saler,
					USER_ROLES.accountant,
					USER_ROLES.academic,
					USER_ROLES.parent
				]
			},
			{
				ItemType: 'single',
				Key: '/info-course/student-in-class',
				Route: '/info-course/student-in-class',
				Text: 'Học viên trong lớp',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/info-course/changed',
				Route: '/info-course/changed',
				Text: 'Học viên chuyển lớp',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/class/roll-up',
				Route: '/class/roll-up',
				Text: 'Điểm danh',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/class/enter-score',
				Route: '/class/enter-score',
				Text: 'Nhập điểm',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
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
		Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.student, USER_ROLES.parent],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/feedback/list',
				Route: '/feedback/list',
				Text: 'Danh sách phản hồi',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.student, USER_ROLES.parent]
			},
			{
				ItemType: 'single',
				Key: '/feedback/group',
				Route: '/feedback/group',
				Text: 'Quản lý nhóm phản hồi',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/feedback/permission',
				Route: '/feedback/permission',
				Text: 'Phân quyền phản hồi',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			}
		]
	},
	{
		Key: 'evaluation',
		TabName: 'Đánh giá',
		Icon: <HiMiniNewspaper size={22} />,
		Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/evaluation/evaluation-time',
				Route: '/evaluation/evaluation-time',
				Text: 'Danh sách đợt đánh giá',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/evaluation/me',
				Route: '/evaluation/me',
				Text: 'Danh sách phiếu đánh giá',
				Icon: '',
				Allow: [USER_ROLES.teacher, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic]
			}
		]
	},
	{
		Key: 'majors',
		TabName: 'Chương trình học',
		Icon: <FaLayerGroup size={20} />,
		Allow: [USER_ROLES.admin],

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
				Allow: [USER_ROLES.admin]
			},
			{
				ItemType: 'single',
				Key: '/majors/registration',
				Route: '/majors/registration',
				Text: 'Đăng ký chương trình học',
				Icon: '',
				Allow: [USER_ROLES.admin]
			},
			{
				ItemType: 'single',
				Key: '/majors/change-majors',
				Route: '/majors/change-majors',
				Text: 'Thay đổi chương trình học',
				Icon: '',
				Allow: [USER_ROLES.admin]
			}
		]
	},
	{
		Key: 'staff',
		TabName: 'Nhân viên',
		Icon: <FaUserTie size={20} />,
		Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager]
			},
			{
				ItemType: 'single',
				Key: '/users/teacher/teacher-off',
				Route: '/users/teacher/teacher-off',
				Text: 'Duyệt lịch nghỉ',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/users/salary-config',
				Route: '/users/salary-config',
				Text: 'Cấu hình lương',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.accountant]
			},
			{
				ItemType: 'single',
				Key: '/users/salary',
				Route: '/users/salary',
				Text: 'Bảng lương',
				Icon: '',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.saler, USER_ROLES.accountant, USER_ROLES.academic]
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
		Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.teacher, USER_ROLES.accountant, USER_ROLES.academic],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/finance/income-expense-management',
				Route: '/finance/income-expense-management',
				Icon: '',
				Text: 'Quản lý thu chi',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.accountant]
			},
			{
				ItemType: 'single',
				Key: '/finance/payment-approve',
				Route: '/finance/payment-approve',
				Icon: '',
				Text: 'Duyệt thanh toán',
				Allow: [USER_ROLES.admin, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/finance/refund',
				Route: '/finance/refund',
				Text: 'Hoàn tiền',
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.accountant, USER_ROLES.academic]
			},
			{
				ItemType: 'single',
				Key: '/users/salary',
				Route: '/users/salary',
				Text: 'Bảng lương',
				Icon: '',
				Allow: [USER_ROLES.teacher]
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
		Allow: [USER_ROLES.teacher],

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
				Allow: [USER_ROLES.teacher]
			}
		]
	},
	{
		Key: 'config',
		TabName: 'Cấu hình',
		Icon: <AiFillSetting size={22} />,
		Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic],

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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic],
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/center',
						Route: '/options/center',
						Text: 'Trung tâm',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager]
					},
					{
						ItemType: 'single',
						Key: '/options/study-route-template',
						Route: '/options/study-route-template',
						Text: 'Mẫu lộ trình học',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/specialize',
						Route: '/options/specialize',
						Text: 'Trình độ tiếng',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/program',
						Route: '/options/program',
						Text: 'Khung đào tạo',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/study-time',
						Route: '/options/study-time',
						Text: 'Ca học',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/grade-templates',
						Route: '/options/grade-templates',
						Text: 'Bảng điểm mẫu',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/major-group',
						Route: '/options/major-group',
						Text: 'Nhóm chương trình',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/other-major',
						Route: '/options/other-major',
						Text: 'Ngành học khác',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
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
				Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic],
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
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/customer-supplier',
						Route: '/options/customer-supplier',
						Text: 'Nguồn khách hàng',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/day-off',
						Route: '/options/day-off',
						Text: 'Ngày nghỉ',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},

					{
						ItemType: 'single',
						Key: '/options/jobs',
						Route: '/options/jobs',
						Text: 'Công việc',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/consultation-status',
						Route: '/options/consultation-status',
						Text: 'Trạng thái khách hàng',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/purpose',
						Route: '/options/purpose',
						Text: 'Mục đích học',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
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
						Allow: [USER_ROLES.admin, USER_ROLES.manager, USER_ROLES.academic]
					},
					{
						ItemType: 'single',
						Key: '/options/config-template',
						Route: '/options/config-template',
						Text: 'Mẫu',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager]
					},
					{
						ItemType: 'single',
						Key: '/options/faq',
						Route: '/options/faq',
						Text: 'Câu hỏi thường gặp',
						Icon: '',
						Allow: [USER_ROLES.admin, USER_ROLES.manager]
					},
					{
						ItemType: 'single',
						Key: '/options/payment',
						Route: '/options/payment',
						Text: 'Phương thức thanh toán',
						Icon: '',
						Allow: [USER_ROLES.admin]
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
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/gift',
						Route: '/options/gift',
						Text: 'Quà tặng',
						Icon: '',
						Allow: [USER_ROLES.admin]
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
				Allow: [USER_ROLES.admin],
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/profile-template',
						Route: '/options/profile-template',
						Text: 'Mẫu hồ sơ',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/office',
						Route: '/options/office',
						Text: 'Văn phòng đại diện',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/partner',
						Route: '/options/partner',
						Text: 'Đối tác',
						Icon: '',
						Allow: [USER_ROLES.admin]
					}
				]
			},
			{
				ItemType: 'sub-menu',
				Key: 'sub-list-staff-child-306',
				Icon: '',
				TitleSub: 'Cấu hình tình trạng',
				Allow: [USER_ROLES.admin],
				SubMenuList: [
					{
						ItemType: 'single',
						Key: '/options/foreign-language',
						Route: '/options/foreign-language',
						Text: 'Tình trạng tiếng',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/visa-status',
						Route: '/options/visa-status',
						Text: 'Tình trạng Visa',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/profile-status',
						Route: '/options/profile-status',
						Text: 'Tình trạng thu hồ sơ',
						Icon: '',
						Allow: [USER_ROLES.admin]
					},
					{
						ItemType: 'single',
						Key: '/options/process',
						Route: '/options/process',
						Text: 'Tiến trình xử lý hồ sơ',
						Icon: '',
						Allow: [USER_ROLES.admin]
					}
				]
			}
		]
	}
]
