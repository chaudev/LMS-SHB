import React, { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { areaApi } from '~/api/area'
import { registerApi, userInformationApi } from '~/api/user/user'
import { Input, Popconfirm, Popover } from 'antd'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { setArea } from '~/store/areaReducer'
import PrimaryTable from '~/common/components/Primary/Table'
import PrimaryButton from '~/common/components/Primary/Button'
import { BsThreeDots } from 'react-icons/bs'
import ImportStudent from '~/common/components/User/ImportStudent'
import CreateUser from '~/common/components/User/user-form'
import appConfigs from '~/appConfig'
import { parseSelectArray } from '~/common/utils/common'
import { branchApi } from '~/api/branch'
import { setBranch } from '~/store/branchReducer'
import DeleteTableRow from '~/common/components/Elements/DeleteTableRow'
import { sourceApi } from '~/api/source'
import { learningNeedApi } from '~/api/learning-needs'
import { purposeApi } from '~/api/purpose'
import { setSource } from '~/store/sourceReducer'
import { setLearningNeed } from '~/store/learningNeedReducer'
import { setPurpose } from '~/store/purposeReducer'
import { useRouter } from 'next/router'
import { userInfoColumn } from '~/common/libs/columns/user-info'
import { ButtonEye } from '~/common/components/TableButton'
import { PrimaryTooltip } from '~/common/components'
import IconButton from '~/common/components/Primary/IconButton'
import Link from 'next/link'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import { processApi } from '~/api/process'
import { visaStatusApi } from '~/api/visa-status'
import { foreignLanguageApi } from '~/api/foreign-language'
import { profileStatusApi } from '~/api/profile-status'
import OverviewStatusStudent from './OverviewStatusStudent'
import { permissionApi } from '~/api/permission'
import PrimaryTag from '~/common/components/Primary/Tag'
import moment from 'moment'
import { useRole } from '~/common/hooks/useRole'

const Student: FC<IPersonnel> = (props) => {
	const { reFresh, allowRegister, role } = props
	const state = useSelector((state: RootState) => state)
	const userInformation = useSelector((state: RootState) => state.user.information)
	const { isParents } = useRole()
	const initParamters = {
		sort: 0,
		sortType: false,
		PageSize: PAGE_SIZE,
		Genders: null,
		PageIndex: 1,
		RoleIds: role,
		Search: null,
		parentIds: userInformation?.RoleId == '8' ? userInformation.UserInformationId.toString() : '',
		branchIds: null,
		genders: null,
		profileStatusIds: null,
		foreignLanguageIds: null,
		visaStatusIds: null,
		processIds: null
	}
	const [process, setProcess] = useState([])
	const [visaStatus, setVisaStatus] = useState([])
	const [profileStatus, setProfileStatus] = useState([])
	const [foreignLanguage, setForeignLanguage] = useState([])
	const [visible, setVisible] = useState(false)
	const [apiParameters, setApiParameters] = useState(initParamters)
	const [roleStaff, setRoleStaff] = useState([])
	const [users, setUser] = useState([])
	const [totalRow, setTotalRow] = useState(1)
	const [loading, setLoading] = useState(false)
	const [loadingAllow, setLoadingAllow] = useState(false)
	const dispatch = useDispatch()

	function isManager() {
		return userInformation?.RoleId == 4
	}

	const sale = useMemo(() => {
		if (state.saler.Saler.length > 0) {
			return parseSelectArray(state.saler.Saler, 'FullName', 'UserInformationId')
		}
	}, [state.saler])

	const source = useMemo(() => {
		if (state.source.Source.length > 0) {
			return parseSelectArray(state.source.Source, 'Name', 'Id')
		}
	}, [state.source])

	const learningNeed = useMemo(() => {
		if (state.learningNeed.LearningNeed.length > 0) {
			return parseSelectArray(state.learningNeed.LearningNeed, 'Name', 'Id')
		}
	}, [state.learningNeed])

	const purpose = useMemo(() => {
		if (state.purpose.Purpose.length > 0) {
			return parseSelectArray(state.purpose.Purpose, 'Name', 'Id')
		}
	}, [state.purpose])

	const branch = useMemo(() => {
		if (state.branch.Branch.length > 0) {
			return parseSelectArray(state.branch.Branch, 'Name', 'Id')
		}
	}, [state.branch])

	const getAllSource = async () => {
		try {
			const res = await sourceApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setSource(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setSource([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllLearningNeed = async () => {
		try {
			const res = await learningNeedApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setLearningNeed(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setLearningNeed([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllPurpose = async () => {
		try {
			const res = await purposeApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setPurpose(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setPurpose([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}
	const getRoleStaff = async () => {
		try {
			const res = await permissionApi.getRoleStaff()
			if (res.status === 200) {
				const convertData = parseSelectArray(res.data.data, 'Name', 'Id')
				setRoleStaff(convertData)
			}
			if (res.status === 204) {
				setRoleStaff([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllBranch = async () => {
		try {
			const res = await branchApi.getAll({ pageSize: 99999 })
			if (res.status === 200) {
				dispatch(setBranch(res.data.data))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getAllArea = async () => {
		try {
			const response = await areaApi.getAll({ pageSize: 99999 })
			if (response.status === 200) {
				dispatch(setArea(response.data.data))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	const getUsers = async (param) => {
		setLoading(true)
		try {
			const response = await userInformationApi.getAll(param)
			if (response.status == 200) {
				setUser(response.data.data)
				setTotalRow(response.data.totalRow)
			}
			if (response.status == 204) {
				setUser([])
				setTotalRow(0)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (role == 3) {
			if (state.source.Source.length === 0) {
				getAllSource()
			}
			if (state.learningNeed.LearningNeed.length === 0) {
				getAllLearningNeed()
			}
			if (state.purpose.Purpose.length === 0) {
				getAllPurpose()
			}
		}
		if (state.area.Area.length == 0) {
			getAllArea()
		}
		if (state.branch.Branch.length == 0) {
			getAllBranch()
		}
		initDateFilter()
	}, [])
	useEffect(() => {
		getRoleStaff()
	}, [])
	useEffect(() => {
		getUsers(apiParameters)
	}, [apiParameters])

	async function deleteUser(param) {
		setLoading(true)
		try {
			const response = await userInformationApi.delete(param)
			if (response.status === 200) {
				getUsers(apiParameters)
				return response
			}
			setLoading(false)
		} catch (error) {
			ShowNoti('error', error.message)
			setLoading(false)
		}
	}

	async function reverserUser(studentId) {
		setLoading(true)
		try {
			const response = await userInformationApi.reverse(studentId)
			if (response.status === 200) {
				getUsers(apiParameters)
				ShowNostis.success(response.data.message)
			}
			setLoading(false)
		} catch (error) {
			ShowNoti('error', error.message)
			setLoading(false)
		}
	}

	const getProcess = async () => {
		try {
			const res = await processApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setProcess(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getVisaStatus = async () => {
		try {
			const res = await visaStatusApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setVisaStatus(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getForeignLanguage = async () => {
		try {
			const res = await foreignLanguageApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setForeignLanguage(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getProfileStatus = async () => {
		try {
			const res = await profileStatusApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setProfileStatus(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const initDateFilter = () => {
		getProcess()
		getVisaStatus()
		getForeignLanguage()
		getProfileStatus()
	}

	const columns = [
		userInfoColumn,
		{
			title: 'Email',
			dataIndex: 'Email',
			render: (text) => <>{text}</>
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'Mobile',
			render: (text) => <>{text}</>
		},
		{
			title: 'Chức vụ',
			dataIndex: 'RoleId',
			render: (value, item) => (
				<>
					{value == 1 && <span className="tag green">{item?.RoleName}</span>}
					{value == 2 && <span className="tag blue ">{item?.RoleName}</span>}
					{value == 4 && <span className="tag yellow ">{item?.RoleName}</span>}
					{value == 5 && <span className="tag blue-weight ">{item?.RoleName}</span>}
					{value == 6 && <span className="tag gray ">{item?.RoleName}</span>}
					{value == 7 && <span className="tag gray ">{item?.RoleName}</span>}
					{value == 8 && <span className="tag gray ">{item?.RoleName}</span>}
				</>
			)
		},
		{
			title: 'Trạng thái',
			dataIndex: 'StatusId',
			render: (data) => (
				<>
					{data == 1 && <span className="tag red">Đã khóa</span>}
					{data == 0 && <span className="tag blue">Đang hoạt động</span>}
				</>
			)
		},
		{
			width: 100,
			title: 'Chức năng',
			dataIndex: '',
			fixed: 'right',
			render: (data, item) => {
				return (
					<div className="flex items-center">
						{isAdmin() && (
							<>
								<CreateUser
									process={process}
									visaStatus={visaStatus}
									profileStatus={profileStatus}
									foreignLanguage={foreignLanguage}
									isEdit
									roleStaff={roleStaff}
									defaultData={item}
									className="!hidden w700:!inline-flex"
									onRefresh={() => getUsers(apiParameters)}
									isStudent={false}
								/>
								<DeleteTableRow text={`${item.RoleName} ${item.FullName}`} handleDelete={() => deleteUser(item.UserInformationId)} />
							</>
						)}

						{isManager() && item?.RoleId !== 1 && item?.RoleId !== 4 && (
							<>
								<CreateUser
									process={process}
									visaStatus={visaStatus}
									profileStatus={profileStatus}
									foreignLanguage={foreignLanguage}
									isEdit
									roleStaff={roleStaff}
									defaultData={item}
									className="!hidden w700:!inline-flex"
									onRefresh={() => getUsers(apiParameters)}
									isStudent={false}
								/>
								<DeleteTableRow text={`${item.RoleName} ${item.FullName}`} handleDelete={() => deleteUser(item.UserInformationId)} />
							</>
						)}
					</div>
				)
			}
		}
	]

	const columnsStudent = [
		{ ...userInfoColumn, fixed: 'left' },
		{
			title: 'Email',
			dataIndex: 'Email',
			render: (text) => <>{text}</>
		},
		{
			title: 'Số điện thoại',
			dataIndex: 'Mobile',
			width: 150,
			render: (text) => <>{text}</>
		},
		{
			title: 'Giới tính',
			width: 90,
			dataIndex: 'Gender',
			render: (value, record) => (
				<>
					{value == 0 && <PrimaryTag color="disabled">Khác</PrimaryTag>}
					{value == 1 && <PrimaryTag color="blue">Nam</PrimaryTag>}
					{value == 2 && <PrimaryTag color="yellow">Nữ</PrimaryTag>}
				</>
			)
		},
		{
			title: 'Trạng thái',
			dataIndex: 'StatusId',
			render: (data) => (
				<>
					{data == 1 && <PrimaryTag color="red">Đã khóa</PrimaryTag>}
					{data == 0 && <PrimaryTag color="primary">Đang hoạt động</PrimaryTag>}
				</>
			)
		},
		{
			title: 'Trạng thái học',
			width: 130,
			dataIndex: 'LearningStatusName',
			render: (value, data) => {
				return (
					<>
						{data.LearningStatus == 1 && <PrimaryTag color="green">{value}</PrimaryTag>}
						{data.LearningStatus == 2 && <PrimaryTag color="primary">{value}</PrimaryTag>}
						{data.LearningStatus == 3 && <PrimaryTag color="blue">{value}</PrimaryTag>}
						{data.LearningStatus == 4 && <PrimaryTag color="red">{value}</PrimaryTag>}
					</>
				)
			}
		},
		{
			title: 'Nơi sinh',
			width: 150,
			dataIndex: 'BirthPlace'
		},
		{
			title: 'Quê quán',
			width: 150,
			dataIndex: 'NativeLand'
		},
		{
			title: 'Tình trạng hồ sơ',
			width: 150,
			dataIndex: 'ProfileStatusName'
		},
		{
			title: 'Trình độ ngoại ngữ',
			width: 150,
			dataIndex: 'ForeignLanguageName'
		},
		{
			title: 'Tình trạng visa',
			width: 130,
			dataIndex: 'VisaStatusName'
		},
		{
			title: 'Tình trạng xử lý hồ sơ',
			width: 160,
			dataIndex: 'ProcessName'
		},
		{
			title: 'Ngày tạo',
			width: 160,
			dataIndex: 'CreatedOn',
			render: (value, item) => {
				return <>{moment(value).format('HH:MM DD/MM/YYYY ')}</>
			}
		},
		{
			width: 100,
			title: 'Chức năng',
			dataIndex: '',
			fixed: 'right',
			render: (data, item) => {
				return (
					<div className="flex justify-start items-center">
						<PrimaryTooltip content="Thông tin học viên" place="left" id={`view-st-${item?.UserInformationId}`}>
							<Link
								href={{
									pathname: '/info-course/student/detail',
									query: { StudentID: item?.UserInformationId }
								}}
							>
								<a>
									<ButtonEye className="mr-2" />
								</a>
							</Link>
						</PrimaryTooltip>

						{role !== 3 && (isAdmin() || isManage()) && (
							<CreateUser
								process={process}
								visaStatus={visaStatus}
								profileStatus={profileStatus}
								foreignLanguage={foreignLanguage}
								isEdit
								roleStaff={roleStaff}
								defaultData={item}
								className="!hidden w700:!inline-flex"
								onRefresh={() => getUsers(apiParameters)}
								isStudent={false}
							/>
						)}

						{role == 3 && (isAdmin() || isManage()) && (
							<CreateUser
								process={process}
								visaStatus={visaStatus}
								profileStatus={profileStatus}
								foreignLanguage={foreignLanguage}
								isEdit
								roleStaff={roleStaff}
								source={source}
								learningNeed={learningNeed}
								purpose={purpose}
								sale={sale}
								defaultData={item}
								className="!hidden w700:!inline-flex"
								onRefresh={() => getUsers(apiParameters)}
								isStudent={true}
							/>
						)}
						{(isAdmin() || isManage()) && (
							<DeleteTableRow text={`${item.RoleName} ${item.FullName}`} handleDelete={() => deleteUser(item.UserInformationId)} />
						)}
						{((role == 3 && isAdmin()) || isManage()) && item.LearningStatus !== 1 && (
							<Popconfirm
								title={
									item.LearningStatus === 4
										? 'Xác nhận hủy bảo lưu?'
										: 'Học viên sẽ bị xóa ra khỏi tất cả lớp để bảo lưu thông tin học tập, xác nhận?'
								}
								onConfirm={() => {
									reverserUser(item.UserInformationId)
								}}
								// onCancel={cancel}
								okText={item.LearningStatus === 4 ? 'Hủy bảo lưu' : 'Bảo lưu'}
								cancelText="Hủy"
								okButtonProps={{ loading: loading }}
							>
								<IconButton tooltip={item.LearningStatus === 4 ? 'Hủy bảo lưu' : 'Bảo lưu'} icon="reserved" type="button" color="purple" />
							</Popconfirm>
						)}
					</div>
				)
			}
		}
	]

	const changeAllow = async (param) => {
		setLoadingAllow(true)
		try {
			const response = await registerApi.changeRegister(param)
			if (response.status === 200) {
				if (!!reFresh) {
					reFresh()
				}
			}
		} catch (error) {
			console.error(error)
		} finally {
			setLoadingAllow(false)
		}
	}

	function isAdmin() {
		return userInformation?.RoleId == 1
	}

	function isManage() {
		return userInformation?.RoleId == 4
	}

	function isAcademic() {
		return userInformation?.RoleId == 7
	}

	const handleFilter = (params) => {
		const paramsForrmat = {
			...apiParameters,
			pageIndex: 1,
			branchIds: params.branchIds ? params.branchIds.join(',') : null,
			foreignLanguageIds: params.foreignLanguageIds ? params.foreignLanguageIds.join(',') : null,
			genders: params.genders,
			processIds: params.processIds ? params.processIds.join(',') : null,
			profileStatusIds: params.profileStatusIds ? params.profileStatusIds.join(',') : null,
			visaStatusIds: params.visaStatusIds ? params.visaStatusIds.join(',') : null,
			learningStatus: params.learningStatus ? params.learningStatus.join(',') : null,
			statusId: params.statusId
		}
		setApiParameters(paramsForrmat)
	}

	const dataFilterStudent = [
		{
			name: 'branchIds',
			title: 'Trung tâm',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: branch
		},
		{
			name: 'genders',
			title: 'Giới tính',
			type: 'select',
			col: 'col-span-2',
			optionList: [
				{ value: 0, title: 'Khác' },
				{ value: 1, title: 'Nam' },
				{ value: 2, title: 'Nữ' }
			]
		},
		{
			name: 'statusId',
			title: 'Trạng thái',
			type: 'select',
			col: 'col-span-2',
			// mode: 'multiple',
			optionList: [
				{
					value: 0,
					title: 'Đang hoạt động'
				},
				{
					value: 1,
					title: 'Đã khóa'
				}
			]
		},
		{
			name: 'learningStatus',
			title: 'Trạng thái học',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: [
				{
					value: 1,
					title: 'Mới'
				},
				{
					value: 2,
					title: 'Đang học'
				},
				{
					value: 3,
					title: 'Học xong'
				},
				{
					value: 4,
					title: 'Bảo lưu'
				}
			]
		},
		{
			name: 'profileStatusIds',
			title: 'Tình trạng hồ sơ',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: profileStatus
		},
		{
			name: 'foreignLanguageIds',
			title: 'Trình độ ngoại ngữ',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: foreignLanguage
		},
		{
			name: 'visaStatusIds',
			title: 'Tình trạng visa',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: visaStatus
		},
		{
			name: 'processIds',
			title: 'Tình trạng xử lý hồ sơ',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: process
		}
	]

	const dataFilterPersional = [
		{
			name: 'branchIds',
			title: 'Trung tâm',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: branch
		},
		{
			name: 'genders',
			title: 'Giới tính',
			type: 'select',
			col: 'col-span-2',
			optionList: [
				{ value: 0, title: 'Khác' },
				{ value: 1, title: 'Nam' },
				{ value: 2, title: 'Nữ' }
			]
		}
	]

	return (
		<div className="info-course-student">
			<PrimaryTable
				columns={role == 3 ? columnsStudent : columns}
				data={users}
				total={totalRow}
				loading={loading}
				current={apiParameters.PageIndex}
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, PageIndex: event })}
				TitleCard={
					<>
						{role === 3 && !isParents && <OverviewStatusStudent />}
						<FilterBaseVer2
							dataFilter={role === 3 ? dataFilterStudent : dataFilterPersional}
							handleFilter={handleFilter}
							handleReset={(value) => {
								setApiParameters(initParamters)
							}}
						/>
						<Input.Search
							className="primary-search max-w-[250px] ml-[8px] "
							onChange={(event) => {
								if (event.target.value == '') {
									setApiParameters({ ...apiParameters, PageIndex: 1, Search: '' })
								}
							}}
							onSearch={(event) => setApiParameters({ ...apiParameters, PageIndex: 1, Search: event })}
							placeholder="Tìm kiếm"
						/>
					</>
				}
				Extra={
					<>
						{role == 3 && (isAdmin() || isManager() || isAcademic() || isManage()) && (
							<PrimaryButton
								loading={loadingAllow}
								className="mr-2 btn-block-registration"
								type="button"
								icon={allowRegister ? 'cancel' : 'check'}
								background={allowRegister ? 'red' : 'green'}
								onClick={() => changeAllow(allowRegister ? 'UnAllow' : 'Allow')}
							>
								{allowRegister ? 'Cấm đăng ký' : 'Cho phép đăng ký'}
							</PrimaryButton>
						)}

						{role == 3 && (isAdmin() || isManager() || isAcademic() || isManage()) && (
							<PrimaryButton
								className="mr-2 btn-download"
								type="button"
								icon="download"
								background="blue"
								onClick={() => window.open(`${appConfigs.linkDownloadExcel}?key=${new Date().getTime()}`)}
							>
								File mẫu
							</PrimaryButton>
						)}

						{role == 3 && (isAdmin() || isManage()) && (
							<ImportStudent className="mr-1 btn-import" onFetchData={() => getUsers(apiParameters)} />
						)}

						<Popover
							placement="bottomLeft"
							visible={visible}
							onVisibleChange={(event) => setVisible(event)}
							content={
								<div className="w-[220px]">
									{role == 3 && allowRegister !== undefined && (
										<PrimaryButton
											loading={loadingAllow}
											className="mb-3 !w-full"
											type="button"
											icon={allowRegister ? 'cancel' : 'check'}
											background={allowRegister ? 'red' : 'green'}
											onClick={() => changeAllow(allowRegister ? 'UnAllow' : 'Allow')}
										>
											{allowRegister ? 'Cấm đăng ký' : 'Cho phép đăng ký'}
										</PrimaryButton>
									)}

									<CreateUser
										process={process}
										visaStatus={visaStatus}
										profileStatus={profileStatus}
										foreignLanguage={foreignLanguage}
										onOpen={() => setVisible(false)}
										className={`!w-full ${role == 3 && 'mb-3'}`}
										onRefresh={() => getUsers(apiParameters)}
										isStudent={role == 3 ? true : false}
									/>

									{role == 3 && (
										<PrimaryButton
											className="!w-full mb-3"
											type="button"
											icon="download"
											background="blue"
											onClick={() => window.open(`${appConfigs.linkDownloadExcel}?key=${new Date().getTime()}`)}
										>
											File mẫu
										</PrimaryButton>
									)}

									{role == 3 && (
										<ImportStudent
											className="!w-full"
											onFetchData={() => {
												setVisible(false)
												getUsers(apiParameters)
											}}
										/>
									)}
								</div>
							}
							trigger="click"
						>
							{role == 3 && (isAdmin() || isManager() || isAcademic() || isManage()) && (
								<PrimaryButton
									onClick={() => setVisible(!visible)}
									className={`${role == 3 ? 'btn-popover-student' : 'btn-popover-personel'} btn-popover`}
									type="button"
									background="primary"
								>
									<BsThreeDots />
								</PrimaryButton>
							)}
						</Popover>

						{role == 3 && (isAdmin() || isManager() || isAcademic() || isManage()) && (
							<CreateUser
								process={process}
								visaStatus={visaStatus}
								profileStatus={profileStatus}
								foreignLanguage={foreignLanguage}
								roleStaff={roleStaff}
								source={source}
								learningNeed={learningNeed}
								purpose={purpose}
								sale={sale}
								className="btn-create"
								onRefresh={() => getUsers(apiParameters)}
								isStudent={true}
							/>
						)}

						{role !== 3 && (isAdmin() || isManager() || isAcademic() || isManage()) && (
							<CreateUser
								process={process}
								visaStatus={visaStatus}
								profileStatus={profileStatus}
								foreignLanguage={foreignLanguage}
								roleStaff={roleStaff}
								className="btn-create"
								onRefresh={() => getUsers(apiParameters)}
								isStudent={false}
							/>
						)}
					</>
				}
			/>
		</div>
	)
}

export default Student
