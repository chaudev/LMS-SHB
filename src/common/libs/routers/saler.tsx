import { AiFillSetting } from 'react-icons/ai'
import { BsFillGridFill } from 'react-icons/bs'
import { FaMoneyBillAlt, FaUserGraduate, FaUserTie } from 'react-icons/fa'
import { HiMiniNewspaper } from 'react-icons/hi2'
import { IoLibrarySharp, IoVideocam } from 'react-icons/io5'
import { TiHome } from 'react-icons/ti'

export const SalerMenu = [
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
	{
		Key: 'student',
		TabName: 'Học viên',
		Icon: <FaUserGraduate size={20} />
	},
	{
		Key: 'staff',
		TabName: 'Nhân viên',
		Icon: <FaUserTie size={20} />
	},
	{
		Key: 'evaluation',
		TabName: 'Đánh giá',
		Icon: <HiMiniNewspaper size={22} />
	}
]

export const SalerChildMenu = [
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
	{
		MenuName: 'Quản lý thông tin học',
		MenuTitle: 'Tuyền sinh',
		MenuKey: '/info-course',
		Parent: 'student',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/info-course/customer',
				Route: '/info-course/customer',
				Text: 'Tư vấn',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/service-appointment-test',
				Route: '/info-course/service-appointment-test',
				Text: 'Hẹn kiểm tra đầu vào',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/about-to-finish',
				Route: '/info-course/about-to-finish',
				Text: 'Học viên sắp học xong',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/student/warning',
				Route: '/info-course/student/warning',
				Text: 'Cảnh báo học viên',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/parents',
				Route: '/info-course/parents',
				Text: 'Phụ huynh',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/contract',
				Route: '/info-course/contract',
				Text: 'Hợp đồng',
				Icon: ''
			}
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
			// }
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/reserved',
			// 	Route: '/info-course/reserved',
			// 	Text: 'Học viên bảo lưu',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/registration',
			// 	Route: '/info-course/registration',
			// 	Text: 'Hẹn đăng ký',
			// 	Icon: ''
			// }
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/feedbacks',
			// 	Route: '/info-course/feedbacks',
			// 	Text: 'Phản hồi học viên',
			// 	Icon: ''
			// }
		]
	},
	{
		MenuName: 'Quản lý tài khoản',
		MenuTitle: 'Quản lý tài khoản',
		MenuKey: '/users',
		Parent: 'staff',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/users/salary',
				Route: '/users/salary',
				Text: 'Bảng lương',
				Icon: ''
			}
		]
	}
]
