import { Modal, Pagination, Popover, Tag, Tooltip } from 'antd'
import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsCalendar3, BsCalendarDate } from 'react-icons/bs'
import { FiBook } from 'react-icons/fi'
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineUsers } from 'react-icons/hi'
import { MdOutlineAttachMoney, MdOutlineBookmarkAdded, MdOutlineBookmarkBorder, MdOutlineGrade } from 'react-icons/md'
import { RiComputerLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { classApi } from '~/api/class'
import { userInformationApi } from '~/api/user/user'
import { ShowNoti } from '~/common/utils'
import { parseSelectArray, parseToMoney } from '~/common/utils/common'
import { RootState } from '~/store'
import AvatarComponent from '../AvatarComponent'
import DeleteTableRow from '../Elements/DeleteTableRow'
import PrimaryButton from '../Primary/Button'
import UpdateClassForm from './UpdateClassForm'
import EmptyData from '../EmptyData'
import { AiOutlineBranches } from 'react-icons/ai'
import { useRole } from '~/common/hooks/useRole'

type IClassListContent = {
	totalRow?: number
	isLoading?: boolean
	dataSource: IClass[]
	setTodoApi?: Function
	listTodoApi?: any
	todoApi?: any
	getAllClass?: Function
}
export const ListClass: React.FC<IClassListContent> = ({
	isLoading,
	dataSource,
	setTodoApi,
	listTodoApi,
	totalRow,
	todoApi,
	getAllClass
}) => {
	const [academic, setAcademic] = useState([])
	const state = useSelector((state: RootState) => state)
	const { information: userInformation } = state.user
	const [isLoadingDelete, setIsLoadingDelete] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState({ id: null, open: null })
	const [showPop, setShowPop] = useState('')

	const { isStudent, isParents, isSaler, isAccountant, isTeacher } = useRole()

	const isRole = {
		sale: userInformation.RoleId == 5,
		student: userInformation.RoleId == 3,
		parent: userInformation.RoleId == 8
	}

	const checkStatus = (statusID, statusName) => {
		const rs = ['gold', 'blue', 'default']
		return (
			<div className="custom-tag-ant">
				<Tag color={`${rs[statusID - 1]}`}>{statusName}</Tag>
				{/* <span className={`tag ${rs[statusID - 1]}`} style={{ marginBottom: 8, textAlign: 'center' }}>
					{statusName}
				</span> */}
			</div>
		)
	}
	const returnPathName = (item) => {
		if (!userInformation) return ''
		let role = userInformation?.RoleId
		let path = null
		if (role == 1 || role == 5) {
			path = {
				pathname: '/class/list-class/detail',
				query: { class: item?.Id, CurriculumId: item?.CurriculumId, BranchId: item?.BranchId, Type: item.Type }
			}
		} else {
			path = {
				pathname: '/class/list-class/detail',
				query: { class: item?.Id, CurriculumId: item?.CurriculumId, BranchId: item?.BranchId }
			}
		}

		return path
	}

	const handleTutoring = (item) => {
		if (!userInformation) return ''
		let role = userInformation?.RoleId
		let path = null

		if (role == 1 || role == 5) {
			path = {
				pathname: '/class/list-class/tutoring',
				// , type: TypeCourse, CourseName
				// query: { slug: ID, name: CourseName, CurriculumId: CurriculumId, BranchId: BranchId, ProgramId: ProgramId, Type: Type }
				query: { class: item?.Id, CurriculumId: item?.CurriculumId, BranchId: item?.BranchId }
			}
		} else {
			path = {
				pathname: '/class/list-class/tutoring',
				query: { class: item?.Id, CurriculumId: item?.CurriculumId, BranchId: item?.BranchId }
			}
		}

		return path
	}
	const getAllAcademic = async () => {
		try {
			const res = await userInformationApi.getAll({ roleIds: '7' })
			if (res.status === 200) {
				const convertData = parseSelectArray(res.data.data, 'FullName', 'UserInformationId')
				setAcademic(convertData)
			}
			if (res.status === 204) {
				setAcademic([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}
	const handleDelete = async (Id) => {
		setIsLoadingDelete(true)
		try {
			const res = await classApi.deleteClass(Id)
			if (res.status === 200) {
				// setTodoApi(listTodoApi)
				setIsModalOpen({ id: Id, open: false })
				getAllClass()
				ShowNoti('success', res.data.message)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoadingDelete(false)
		}
	}
	const handleCheckExistStudentInClass = async (Id) => {
		try {
			const res = await classApi.checkExistStudentInClass(Id)
			if (res.status === 200) {
				if (res.data.data === true) {
					setIsModalOpen({ id: Id, open: true })
				} else {
					handleDelete(Id)
				}
				return res
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	useEffect(() => {
		if (userInformation?.RoleId == 1) {
			getAllAcademic()
		}
	}, [])

	return (
		<>
			{dataSource.length == 0 && <EmptyData loading={isLoading} />}
			<div className="content-class-list">
				{dataSource.length > 0 &&
					dataSource?.map((item: IClass) => (
						<div className="item-class-list bg-[#fff]">
							<div className="inner-item-class-list">
								<div className="image">
									<AvatarComponent url={item.Thumbnail} type="class" />
								</div>

								<div className="inner-body-class-list">
									<div className="inner-body-class-list-left">
										<div>
											{item?.Type !== 3 ? (
												<Link href={returnPathName(item)}>
													<Tooltip title={item?.Name}>
														<p className="title">{item.Name}</p>
													</Tooltip>
												</Link>
											) : (
												<Link href={handleTutoring(item)}>
													<Tooltip title={item?.Name}>
														<p className="title">{item.Name}</p>
													</Tooltip>
												</Link>
											)}
										</div>
										<Tooltip title="Chuyên môn">
											{item.GradeName && (
												<div className="i">
													<div className="icn">
														<MdOutlineGrade />
													</div>
													<p>{item.GradeName}</p>
												</div>
											)}
										</Tooltip>
										<Tooltip title="Hình thức">
											{item.TypeName && (
												<div className="i">
													<div className="icn">
														<FiBook />
													</div>
													<p>{item.TypeName}</p>
												</div>
											)}
										</Tooltip>
										<div className="status">{checkStatus(item.Status, item.StatusName)}</div>
									</div>
									<div className="inner-body-class-list-center">
										<Tooltip title="Chương trình">
											{item.ProgramName && (
												<div className="i">
													<div className="icn">
														<RiComputerLine />
													</div>
													<p>{item.ProgramName}</p>
												</div>
											)}
										</Tooltip>
										<Tooltip title="Giáo trình">
											{item.CurriculumName && (
												<div className="i">
													<div className="icn">
														<HiOutlineBookOpen />
													</div>
													<p>{item.CurriculumName}</p>
												</div>
											)}
										</Tooltip>

										<Tooltip title="Học vụ">
											{item.AcademicName && (
												<div className="i">
													<div className="icn">
														<HiOutlineAcademicCap />
													</div>
													<p>{item.AcademicName}</p>
												</div>
											)}
										</Tooltip>
										<Tooltip title="Chi nhánh">
											{item.BranchName && (
												<div className="i">
													<div className="icn">
														<AiOutlineBranches />
													</div>
													<p>{item.BranchName}</p>
												</div>
											)}
										</Tooltip>
									</div>
									<div className="inner-body-class-list-after-center">
										<p>
											Số buổi học: <span> {item.LessonCompleted || 0}</span>/<span>{item.TotalLesson}</span>
										</p>
										<p>GV: {item?.TeacherName || ''}</p>
										<Popover content="Số học viên">
											<div className="i">
												<div className="icon">
													<HiOutlineUsers size={12} />
												</div>
												<p>
													{`${item.TotalStudent || 0}`}
													{item.MaxQuantity && userInformation?.RoleId == 1 && `/${item.MaxQuantity}`}
												</p>
											</div>
										</Popover>
										<Popover content="Thời gian bắt đầu - kết thúc">
											<div className="i">
												<div className="icon">
													<BsCalendar3 size={12} />
												</div>
												<p>{`${item.StartDay ? moment(item.StartDay).format('DD/MM/YYYY') : 'Trống'} - ${
													item.EndDay ? moment(item.EndDay).format('DD/MM/YYYY') : 'Trống'
												}`}</p>
											</div>
										</Popover>
									</div>
									<div className="inner-body-class-list-right">
										{isSaler || isStudent || isParents || isAccountant || isTeacher ? (
											''
										) : (
											<div className="action-container">
												<div className="item-hover">
													<UpdateClassForm
														getAllClass={getAllClass}
														setShowPop={setShowPop}
														dataRow={item}
														setTodoApi={setTodoApi}
														listTodoApi={listTodoApi}
														academic={academic}
													/>
													<DeleteTableRow
														setShowPop={setShowPop}
														text={`${item.Name}`}
														handleDelete={() => handleCheckExistStudentInClass(item.Id)}
													/>
													{/* <Popover
													open={showPop == String(item?.Id)}
													onOpenChange={(event) => setShowPop(event ? String(item?.Id) : '')}
													placement="left"
													trigger="click"
													content={
														<div>
															<UpdateClassForm
																getAllClass={getAllClass}
																setShowPop={setShowPop}
																dataRow={item}
																setTodoApi={setTodoApi}
																listTodoApi={listTodoApi}
																academic={academic}
															/>
															<DeleteTableRow
																setShowPop={setShowPop}
																text={`${item.Name}`}
																handleDelete={() => handleCheckExistStudentInClass(item.Id)}
															/>
															<Modal
																title="Xác nhận xóa"
																open={item.Id === isModalOpen.id ? isModalOpen.open : false}
																onCancel={() => setIsModalOpen({ ...isModalOpen, open: false })}
																footer={
																	<PrimaryButton
																		onClick={() => handleDelete(item.Id)}
																		background="blue"
																		type="button"
																		icon="remove"
																		disable={isLoadingDelete}
																		loading={isLoadingDelete}
																	>
																		Xóa
																	</PrimaryButton>
																}
															>
																<p>
																	Lớp học đang có <span className="font-medium text-[#002456]">{item.TotalStudent}</span> học viên. Bạn có
																	chắc muốn xóa?
																</p>
															</Modal>
														</div>
													}
													title={null}
												>
													<button>
														<BiDotsHorizontalRounded size={22} color="#5C77A7" />
													</button>
												</Popover> */}
												</div>
												<div className="item-action">
													<BiDotsHorizontalRounded size={22} color="#5C77A7" />
												</div>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	)
}
