import { BiBookBookmark } from 'react-icons/bi'
import { BsChatLeftTextFill, BsFillGridFill } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { IoLibrarySharp, IoVideocam } from 'react-icons/io5'
import { MdAirplay } from 'react-icons/md'
import { TbHome, TbScreenShare } from 'react-icons/tb'
import { TiHome } from 'react-icons/ti'

export const ParentStudentMenu = [
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
	}
	// {
	// 	Key: 'video',
	// 	TabName: 'Khoá học video',
	// 	Icon: <IoVideocam size={22} />
	// },
	// {
	// 	Key: 'library-online',
	// 	TabName: 'Thư viện online',
	// 	Icon: <IoLibrarySharp size={22} />
	// }
]

export const ParentStudentChildMenu = [
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
				ItemType: 'single',
				Key: '/info-course/student',
				Route: '/info-course/student',
				Text: 'Danh sách học viên',
				Icon: ''
			},
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
		MenuName: 'Quản lý thông tin học',
		MenuTitle: 'Tuyển sinh',
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
				Text: 'Thông tin cảnh báo',
				Icon: ''
			}
			// {
			// 	ItemType: 'single',
			// 	Key: '/info-course/feedbacks',
			// 	Route: '/info-course/feedbacks',
			// 	Text: 'Thông tin phản hồi',
			// 	Icon: ''
			// }
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
	}
]
