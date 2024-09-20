import { Tabs } from 'antd'
import Head from 'next/head'
import Router from 'next/router'
import { AiOutlineCalendar } from 'react-icons/ai'
import { BsCalendar2Week } from 'react-icons/bs'
import { CgTranscript } from 'react-icons/cg'
import { FiUserCheck } from 'react-icons/fi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { RiContactsBook2Line, RiQuillPenLine } from 'react-icons/ri'
import { TbReportAnalytics } from 'react-icons/tb'
import { VscFeedback, VscFolderLibrary } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import appConfigs from '~/appConfig'
import { RootState } from '~/store'
import CalendarClassEdit from './CalendarClassEdit'
import { StudentReport } from './Details/Report'
import DocumentsPageInClass from './DocumentsPage'
import { LessonFeedbackPage } from './LessonFeedbackPage'
import { ListStudentInClass } from './ListStudentInClass'
import { NotificationInClassPage } from './NotificationInClassPage'
import { RollUpPage } from './RollUpPage'
import { RollUpTeacherPage } from './RollUpTeacherPage'
import { ScheduleList } from './ScheduleList'
import TranscriptPageV2 from './TranscriptV2'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useMemo } from 'react'

enum EClassDetailMenuType {
	LichHoc = '1',
	HocVien = '2',
	CacBuoiHoc = '3',
	TaiLieu = '4',
	DiemDanh = '5',
	BangDiem = '6',
	BaoCao = '7',
	DiemDanhGiaoVien = '8',
	PhanHoiBuoiHoc = '9',
	ThongBao = '10'
}

const classDetailMenu = [
	{
		key: EClassDetailMenuType.LichHoc,
		name: 'Lịch học',
		label: (
			<div className="label-tab">
				<AiOutlineCalendar className="mr-3" size={20} /> <span>Lịch học</span>
			</div>
		),
		content: <CalendarClassEdit />,
		allow: listPermissionsByRoles.detailClass.menu.schedule
	},
	{
		key: EClassDetailMenuType.HocVien,
		name: 'Học viên',
		label: (
			<div className="label-tab">
				<RiContactsBook2Line className="mr-3" size={20} /> <span>Học viên</span>
			</div>
		),
		content: <ListStudentInClass />,
		allow: listPermissionsByRoles.detailClass.menu.student
	},
	{
		key: EClassDetailMenuType.CacBuoiHoc,
		name: 'Các buổi học',
		label: (
			<div className="label-tab">
				<BsCalendar2Week className="mr-3" size={20} /> <span>Các buổi học</span>
			</div>
		),
		content: <ScheduleList />,
		allow: listPermissionsByRoles.detailClass.menu.lessions
	},
	{
		key: EClassDetailMenuType.TaiLieu,
		name: 'Tài liệu',
		label: (
			<div className="label-tab">
				<VscFolderLibrary className="mr-3" size={20} /> <span>Tài liệu</span>
			</div>
		),
		content: <DocumentsPageInClass />,
		allow: listPermissionsByRoles.detailClass.menu.documents
	},
	{
		key: EClassDetailMenuType.DiemDanh,
		name: 'Điểm danh',
		label: (
			<div className="label-tab">
				<RiQuillPenLine className="mr-3" size={20} /> <span>Điểm danh</span>
			</div>
		),
		content: <RollUpPage />,
		allow: listPermissionsByRoles.detailClass.menu.rollup
	},
	{
		key: EClassDetailMenuType.BangDiem,
		name: 'Bảng điểm',
		label: (
			<div className="label-tab">
				<CgTranscript className="mr-3" size={20} /> <span>Bảng điểm</span>
			</div>
		),
		content: <TranscriptPageV2 />,
		allow: listPermissionsByRoles.detailClass.menu.transcript
	},
	{
		key: EClassDetailMenuType.BaoCao,
		name: 'Báo cáo',
		label: (
			<div className="label-tab">
				<TbReportAnalytics className="mr-3" size={20} /> <span>Báo cáo</span>
			</div>
		),
		content: <StudentReport />,
		allow: listPermissionsByRoles.detailClass.menu.report
	},
	{
		key: EClassDetailMenuType.DiemDanhGiaoVien,
		name: 'Điểm danh giáo viên',
		label: (
			<div className="label-tab">
				<FiUserCheck className="mr-3" size={20} /> <span>Điểm danh giáo viên</span>
			</div>
		),
		content: <RollUpTeacherPage />,
		allow: listPermissionsByRoles.detailClass.menu.rollupTeacher
	},
	{
		key: EClassDetailMenuType.PhanHoiBuoiHoc,
		name: 'Phản hồi buổi học',
		label: (
			<div className="label-tab">
				<VscFeedback className="mr-3" size={20} /> <span>Phản hồi buổi học</span>
			</div>
		),
		content: <LessonFeedbackPage />,
		allow: listPermissionsByRoles.detailClass.menu.lessionFeedback
	},
	{
		key: EClassDetailMenuType.ThongBao,
		name: 'Thông báo',
		label: (
			<div className="label-tab">
				<IoNotificationsOutline className="mr-3" size={20} /> <span>Thông báo</span>
			</div>
		),
		content: <NotificationInClassPage />,
		allow: listPermissionsByRoles.detailClass.menu.notification
	}
]

const MenuClass = () => {
	const user = useSelector((state: RootState) => state.user.information)
	const currentClassDetails = useSelector((state: RootState) => state.classState?.currentClassDetails)

	const tabItems = useMemo(() => {
		const _tabItems = []
		classDetailMenu.forEach((item) => {
			if (item.allow.includes(Number(user?.RoleId))) {
				_tabItems.push({
					label: item.label,
					key: item.key,
					children: item.content
				})
			}
		})
		return _tabItems
	}, [user?.RoleId])

	return (
		<>
			<Head>
				<title>{`${appConfigs.appName} - ${currentClassDetails?.Name}`}</title>
			</Head>
			<Tabs
				defaultActiveKey={EClassDetailMenuType.LichHoc}
				tabPosition="left"
				activeKey={(Router.query?.menu || EClassDetailMenuType.LichHoc) + ''}
				onChange={(event: any) => Router.replace({ query: { ...Router?.query, menu: event } })}
				items={tabItems}
			/>
		</>
	)
}

export default MenuClass
