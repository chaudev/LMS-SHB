import { Tabs } from 'antd'
import React from 'react'
import { AiOutlineCalendar, AiOutlineQrcode } from 'react-icons/ai'
import { BsCalendar2Week, BsUiChecksGrid } from 'react-icons/bs'
import { CgTranscript } from 'react-icons/cg'
import { FiUserCheck } from 'react-icons/fi'
import { GiBlackBook } from 'react-icons/gi'
import { IoNotificationsOutline } from 'react-icons/io5'
import { MdAppRegistration } from 'react-icons/md'
import { RiContactsBook2Line, RiQuillPenLine } from 'react-icons/ri'
import { VscFeedback, VscFolderLibrary } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import CalendarClassEdit from './CalendarClassEdit'
import CalenderClassStudent from './CalendarClassStudent'
import CalenderClassTeacher from './CalendarClassTeacher'
import DocumentsPageInClass from './DocumentsPage'
import { LessonFeedbackPage } from './LessonFeedbackPage'
import { ListStudentInClass } from './ListStudentInClass'
import { NotificationInClassPage } from './NotificationInClassPage'
import { RollUpPage } from './RollUpPage'
import { RollUpStudent } from './RollUpStudent'
import { RollUpTeacherPage } from './RollUpTeacherPage'
import { ScheduleList } from './ScheduleList'
import { TranscriptPage } from './TranscriptPage'
import Router from 'next/router'
import Head from 'next/head'
import appConfigs from '~/appConfig'
import { TbReportAnalytics } from 'react-icons/tb'
import { StudentReport } from './Details/Report'

const itemsAdmin = [
	'Lịch học',
	'Học viên',
	'Các buổi học',
	'Tài liệu',
	'Điểm danh',
	'Bảng điểm',
	'Báo cáo',
	'Điểm danh giáo viên',
	'Phản hồi buổi học',
	'Thông báo'
]

const itemsStudent = ['Lịch học', 'Các buổi học', 'Tài liệu', 'Bảng điểm', 'Điểm danh bằng QR']

const itemsTeacher = [
	'Lịch học',
	'Học viên',
	'Các buổi học',
	'Tài liệu',
	'Điểm danh',
	'Bảng điểm',
	'Điểm danh giáo viên',
	'Phản hồi buổi học',
	'Thông báo'
]
const itemsParent = ['Lịch học', 'Các buổi học', 'Điểm danh', 'Bảng điểm']

const MenuClass = () => {
	const user = useSelector((state: RootState) => state.user.information)
	const currentClassDetails = useSelector((state: RootState) => state.classState?.currentClassDetails)

	const getAdminContent = (index) => {
		switch (index) {
			case 0:
				return <CalendarClassEdit />
			case 1:
				return <ListStudentInClass />
			case 2:
				return <ScheduleList />
			case 3:
				return <DocumentsPageInClass />
			case 4:
				return <RollUpPage />
			case 5:
				return <TranscriptPage />
			case 6:
				return <StudentReport />
			case 7:
				return <RollUpTeacherPage />
			case 8:
				return <LessonFeedbackPage />
			case 9:
				return <NotificationInClassPage />
			default:
				return <CalendarClassEdit />
		}
	}

	const getAdminLabel = (item, index) => {
		switch (index) {
			case 0:
				return (
					<div className="label-tab">
						<AiOutlineCalendar className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 1:
				return (
					<div className="label-tab">
						<RiContactsBook2Line className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 2:
				return (
					<div className="label-tab">
						<BsCalendar2Week className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 3:
				return (
					<div className="label-tab">
						<VscFolderLibrary className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 4:
				return (
					<div className="label-tab">
						<RiQuillPenLine className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 5:
				return (
					<div className="label-tab">
						<CgTranscript className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 6:
				return (
					<div className="label-tab">
						<TbReportAnalytics className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 7:
				return (
					<div className="label-tab">
						<FiUserCheck className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 8:
				return (
					<div className="label-tab">
						<VscFeedback className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 9:
				return (
					<div className="label-tab">
						<IoNotificationsOutline className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			default:
				return 'Lịch học'
		}
	}

	const getStudentContent = (index) => {
		switch (index) {
			case 0:
				return <CalendarClassEdit />
			case 1:
				return <ScheduleList />
			case 2:
				return <DocumentsPageInClass />
			case 3:
				return <TranscriptPage />
			case 4:
				return <RollUpStudent />
			default:
				return <CalendarClassEdit />
		}
	}

	const getStudentLabel = (item, index) => {
		switch (index) {
			case 0:
				return (
					<div className="label-tab">
						<AiOutlineCalendar className="mr-3" /> <span>{item}</span>
					</div>
				)
			case 1:
				return (
					<div className="label-tab">
						<BsCalendar2Week className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 2:
				return (
					<div className="label-tab">
						<VscFolderLibrary className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 3:
				return (
					<div className="label-tab">
						<CgTranscript className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 4:
				return (
					<div className="label-tab">
						<AiOutlineQrcode className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 5:
				return (
					<div className="label-tab">
						<VscFeedback className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 3:
				return <div className="label-tab">{item}</div>
			default:
				return 'Lịch học'
		}
	}

	const getTeacherContent = (index) => {
		switch (index) {
			case 0:
				return <CalendarClassEdit />
			case 1:
				return <ListStudentInClass />
			case 2:
				return <ScheduleList />
			case 3:
				return <DocumentsPageInClass />
			case 4:
				return <RollUpPage />
			case 5:
				return <TranscriptPage />
			case 6:
				return <RollUpTeacherPage />
			case 7:
				return <LessonFeedbackPage />
			case 8:
				return <NotificationInClassPage />
			default:
				return <CalendarClassEdit />
		}
	}

	const getTeacherLabel = (item, index) => {
		switch (index) {
			case 0:
				return (
					<div className="label-tab">
						<AiOutlineCalendar className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 1:
				return (
					<div className="label-tab">
						<RiContactsBook2Line className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 2:
				return (
					<div className="label-tab">
						<BsCalendar2Week className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 3:
				return (
					<div className="label-tab">
						<VscFolderLibrary className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 4:
				return (
					<div className="label-tab">
						<RiQuillPenLine className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 5:
				return (
					<div className="label-tab">
						<CgTranscript className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 6:
				return (
					<div className="label-tab">
						<FiUserCheck className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 7:
				return (
					<div className="label-tab">
						<VscFeedback className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 8:
				return (
					<div className="label-tab">
						<IoNotificationsOutline className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			default:
				return 'Lịch học'
		}
	}

	const getParentContent = (index) => {
		switch (index) {
			case 0:
				return <CalendarClassEdit />

			case 1:
				return <ScheduleList />

			case 2:
				return <RollUpPage />

			case 3:
				return <TranscriptPage />

			default:
				return <CalendarClassEdit />
		}
	}

	const getParentLabel = (item, index) => {
		switch (index) {
			case 0:
				return (
					<div className="label-tab">
						<AiOutlineCalendar className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 1:
				return (
					<div className="label-tab">
						<BsCalendar2Week className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 2:
				return (
					<div className="label-tab">
						<RiQuillPenLine className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)
			case 3:
				return (
					<div className="label-tab">
						<CgTranscript className="mr-3" size={20} /> <span>{item}</span>
					</div>
				)

			default:
				return 'Lịch học'
		}
	}

	const is = {
		admin: user?.RoleId == 1,
		student: user?.RoleId == 3,
		teacher: user?.RoleId == 2,
		manager: user?.RoleId == 4,
		saler: user?.RoleId == 5,
		accountant: user?.RoleId == 6,
		academic: user?.RoleId == 7,
		parent: user?.RoleId == 8
	}

	function getTabItems() {
		const temp = { items: [], label: null, children: null }

		if (is.admin || is.manager || is.saler || is.accountant || is.academic) {
			temp.items = itemsAdmin
			temp.label = getAdminLabel
			temp.children = getAdminContent
		}

		if (is.teacher) {
			temp.items = itemsTeacher
			temp.label = getTeacherLabel
			temp.children = getTeacherContent
		}

		if (is.student) {
			temp.items = itemsStudent
			temp.label = getStudentLabel
			temp.children = getStudentContent
		}

		if (is.parent) {
			temp.items = itemsParent
			temp.label = getParentLabel
			temp.children = getParentContent
		}

		return temp
	}

	return (
		<>
			<Head>
				<title>{`${appConfigs.appName} - ${currentClassDetails?.Name}`}</title>
			</Head>
			<Tabs
				defaultActiveKey="0"
				tabPosition="left"
				activeKey={(Router.query?.menu || 0) + ''}
				onChange={(event: any) => Router.replace({ query: { ...Router?.query, menu: event } })}
				items={getTabItems().items.map((item, index) => {
					return {
						label: getTabItems().label(item, index),
						key: index.toString(),
						children: getTabItems().children(index)
					}
				})}
			/>
		</>
	)
}

export default MenuClass
