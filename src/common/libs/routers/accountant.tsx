import { BsFillGridFill } from 'react-icons/bs'
import { FaMoneyBillAlt, FaUserTie } from 'react-icons/fa'
import { HiMiniNewspaper } from 'react-icons/hi2'
import { TiHome } from 'react-icons/ti'

export const AccountantMenu = [
	{
		Key: 'home',
		TabName: 'Trang chủ',
		Icon: <TiHome style={{ width: 24, height: 24 }} />
	},
	{
		Key: 'class',
		TabName: 'Lớp học',
		Icon: <BsFillGridFill size={22} />
	},
	// {
	// 	Key: 'student',
	// 	TabName: 'Học viên',
	// 	Icon: <FaUserGraduate size={20} />
	// },
	{
		Key: 'staff',
		TabName: 'Nhân viên',
		Icon: <FaUserTie size={20} />
	},
	{
		Key: 'finance',
		TabName: 'Tài chính',
		Icon: <FaMoneyBillAlt size={20} />
	},
	{
		Key: 'evaluation',
		TabName: 'Đánh giá',
		Icon: <HiMiniNewspaper size={22} />
	}
]

export const AccountantChildMenu = [
	{
		Parent: 'home',
		MenuTitle: 'Quản lý hệ thống',
		MenuKey: 'home',
		MenuItem: [
			{
				TypeItem: 'single',
				Key: '/news',
				Route: '/news',
				Icon: '',
				Text: 'Tin tức'
			},
			{
				TypeItem: 'single',
				Key: '/dashboard',
				Route: '/dashboard',
				Icon: '',
				Text: 'Thống kê'
			}
		]
	},
	{
		Parent: 'finance',
		MenuTitle: 'Tài chính',
		MenuKey: '/finance',
		MenuItem: [
			{
				TypeItem: 'single',
				Key: '/finance/payment',
				Route: '/finance/payment',
				Icon: '',
				Text: 'Quản lý thanh toán'
			},
			{
				TypeItem: 'single',
				Key: '/finance/income-expense-management',
				Route: '/finance/income-expense-management',
				Icon: '',
				Text: 'Quản lý thu chi'
			},
			{
				TypeItem: 'single',
				Key: '/finance/payment-approve',
				Route: '/finance/payment-approve',
				Icon: '',
				Text: 'Duyệt thanh toán'
			},
			{
				TypeItem: 'single',
				Key: '/finance/refund',
				Route: '/finance/refund',
				Text: 'Hoàn tiền'
			}
		]
	},
	{
		MenuName: 'Đánh giá',
		MenuTitle: 'Đánh giá',
		MenuKey: '/evaluation',
		Parent: 'evaluation',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/evaluation/me',
				Route: '/evaluation/me',
				Text: 'Danh sách phiếu đánh giá',
				Icon: ''
			}
		]
	},
	// {
	// 	MenuName: 'Quản lý thông tin học',
	// 	MenuTitle: 'Tuyển sinh',
	// 	MenuKey: '/info-course',
	// 	Parent: 'student',
	// 	MenuItem: [
	// 		{
	// 			ItemType: 'single',
	// 			Key: '/info-course/student',
	// 			Route: '/info-course/student',
	// 			Text: 'Danh sách học viên',
	// 			Icon: ''
	// 		},
	// 		{
	// 			ItemType: 'single',
	// 			Key: '/info-course/student-in-class',
	// 			Route: '/info-course/student-in-class',
	// 			Text: 'Học viên trong lớp',
	// 			Icon: ''
	// 		},
	// 		{
	// 			ItemType: 'single',
	// 			Key: '/info-course/changed',
	// 			Route: '/info-course/changed',
	// 			Text: 'Học viên chuyển lớp',
	// 			Icon: ''
	// 		}
	// 		// {
	// 		// 	ItemType: 'single',
	// 		// 	Key: '/info-course/reserved',
	// 		// 	Route: '/info-course/reserved',
	// 		// 	Text: 'Học viên bảo lưu',
	// 		// 	Icon: ''
	// 		// },
	// 		// {
	// 		// 	ItemType: 'single',
	// 		// 	Key: '/info-course/registration',
	// 		// 	Route: '/info-course/registration',
	// 		// 	Text: 'Hẹn đăng ký',
	// 		// 	Icon: ''
	// 		// }
	// 	]
	// },
	{
		MenuName: 'Quản lý tài khoản',
		MenuTitle: 'Quản lý tài khoản',
		MenuKey: '/users',
		Parent: 'staff',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/users/salary-config',
				Route: '/users/salary-config',
				Text: 'Cấu hình lương',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/users/salary',
				Route: '/users/salary',
				Text: 'Bảng lương',
				Icon: ''
			}
		]
	},
	{
		MenuName: 'Lớp học',
		MenuTitle: 'Lớp học',
		MenuKey: '/class',
		Parent: 'class',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/class/list-class',
				Route: '/class/list-class',
				Text: 'Danh sách lớp học',
				Icon: ''
			},
			{
				TypeItem: 'single',
				Key: '/class/schedule',
				Icon: '',
				Route: '/class/schedule',
				Text: 'Kiểm tra lịch'
			},
			{
				ItemType: 'single',
				Key: '/info-course/student',
				Route: '/info-course/student',
				Text: 'Danh sách học viên',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/student-in-class',
				Route: '/info-course/student-in-class',
				Text: 'Học viên trong lớp',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/changed',
				Route: '/info-course/changed',
				Text: 'Học viên chuyển lớp',
				Icon: ''
			}
			// {
			// 	TypeItem: 'single',
			// 	Key: '/class/register',
			// 	Icon: '',
			// 	Route: '/class/register',
			// 	Text: 'Đăng ký học'
			// }
		]
	}
]
