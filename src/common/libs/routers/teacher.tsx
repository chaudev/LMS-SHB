import { UserCheck } from 'react-feather'
import { BiBookBookmark } from 'react-icons/bi'
import { BsChatLeftTextFill, BsFillGridFill } from 'react-icons/bs'
import { FaMoneyBillAlt, FaUserCheck, FaUserGraduate } from 'react-icons/fa'
import { HiMiniNewspaper } from 'react-icons/hi2'
import { IoLibrarySharp, IoVideocam } from 'react-icons/io5'
import { MdAirplay } from 'react-icons/md'
import { RiFileList2Fill } from 'react-icons/ri'
import { TbHome, TbScreenShare } from 'react-icons/tb'
import { TiHome } from 'react-icons/ti'

export const TeacherMenu = [
	{
		Key: 'home',
		TabName: 'Trang chủ',
		Icon: <TiHome style={{ width: 24, height: 24 }} />
	},
	{
		Key: 'student',
		TabName: 'Học viên',
		Icon: <FaUserGraduate size={20} />
	},
	{
		Key: 'class',
		TabName: 'Lớp học',
		Icon: <BsFillGridFill size={22} />
	},
	{
		Key: 'feedback',
		TabName: 'Phản hồi',
		Icon: <BsChatLeftTextFill size={20} />
	},
	{
		Key: 'evaluation',
		TabName: 'Đánh giá',
		Icon: <HiMiniNewspaper size={22} />
	},
	{
		Key: 'finance',
		TabName: 'Tài chính',
		Icon: <FaMoneyBillAlt size={20} />
	},
	// {
	// 	Key: 'video',
	// 	TabName: 'Khoá học video',
	// 	Icon: <IoVideocam size={22} />
	// },
	// {
	// 	Key: 'library-online',
	// 	TabName: 'Thư viện online',
	// 	Icon: <IoLibrarySharp size={22} />
	// },
	// {
	// 	Key: 'library',
	// 	TabName: 'Đề thi',
	// 	Icon: <RiFileList2Fill size={22} />
	// },
	{
		Key: 'assignment',
		TabName: 'Phân công',
		Icon: <FaUserCheck size={22} />
	}
]

export const TeacherChildMenu = [
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
				Key: '/home/dashboard',
				Route: '/home/dashboard',
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
				ItemType: 'single',
				Key: '/class/schedule',
				Route: '/class/schedule',
				Text: 'Lịch dạy',
				Icon: ''
			},
			{
				ItemType: 'single',
				Key: '/info-course/student',
				Route: '/info-course/student',
				Text: 'Danh sách học viên',
				Icon: ''
			},
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
		MenuName: 'Quản lý phản hồi',
		MenuTitle: 'Quản lý phản hồi',
		MenuKey: '/feedback',
		Parent: 'feedback',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/feedback/list',
				Route: '/feedback/list',
				Text: 'Danh sách phản hồi',
				Icon: ''
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/feedback/group',
			// 	Route: '/feedback/group',
			// 	Text: 'Quản lý nhóm phản hồi',
			// 	Icon: ''
			// },
			// {
			// 	ItemType: 'single',
			// 	Key: '/feedback/permission',
			// 	Route: '/feedback/permission',
			// 	Text: 'Phân quyền phản hồi',
			// 	Icon: ''
			// }
		]
	},
	{
		Parent: 'finance',
		MenuTitle: 'Tài chính',
		MenuKey: '/finance',
		MenuItem: [
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
		MenuName: 'Khóa học',
		MenuTitle: 'Khóa học video',
		Parent: 'video',
		MenuKey: '/course',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/course/videos',
				Route: '/course/videos',
				Text: 'Danh sách khoá học',
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
				Key: '/info-course/service-appointment-test',
				Route: '/info-course/service-appointment-test',
				Text: 'Hẹn kiểm tra đầu vào',
				Icon: ''
			},
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/student',
			// 	Route: '/info-course/student',
			// 	Text: 'Danh sách học viên',
			// 	Icon: ''
			// },
			{
				ItemType: 'single',
				Key: '/info-course/student/warning',
				Route: '/info-course/student/warning',
				Text: 'Cảnh báo học viên',
				Icon: ''
			}
		]
	},
	{
		MenuName: 'Thư viện online',
		MenuTitle: 'Thư viện online',
		Parent: 'library-online',
		MenuKey: '/library-online',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/library-online/library',
				Route: '/library-online/library',
				Text: 'Tài liệu',
				Icon: ''
			}
		]
	},
	{
		MenuName: 'Đề thi',
		MenuTitle: 'Đề thi',
		MenuKey: '/exercise',
		Parent: 'library',
		MenuItem: [
			{
				ItemType: 'single',
				Key: '/exercise/all',
				Route: '/exercise/all',
				Text: 'Quản lý đề thi',
				Icon: ''
			}
		]
	},
	{
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
				Icon: ''
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/users/teacher/open-calender',
			// 	Route: '/users/teacher/open-calender',
			// 	Text: 'Mở lịch trống',
			// 	Icon: ''
			// }
		]
	}
]
