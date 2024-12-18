import { Modal, Form, Divider, Select } from 'antd'
import React, { FC, useEffect, useMemo, useState } from 'react'
import { userInformationApi } from '~/api/user/user'
import { parseJwt, ShowNoti } from '~/common/utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '~/store'
import { setArea } from '~/store/areaReducer'
import { areaApi, districtApi, wardApi } from '~/api/area'
import * as yup from 'yup'
import IconButton from '../Primary/IconButton'
import moment from 'moment'
import PrimaryButton from '../Primary/Button'
import { accountApi } from '~/api/account'
import { setUser } from '~/store/userReducer'
import { setAuthData, setAuthLoading } from '~/store/authReducer'
import SelectField from '../FormControl/SelectField'
import { parseSelectArray } from '~/common/utils/common'
import UploadImageField from '../FormControl/UploadImageField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import InputPassField from '../FormControl/InputPassField'
import DatePickerField from '../FormControl/DatePickerField'
import { branchApi } from '~/api/branch'
import { setBranch } from '~/store/branchReducer'
import TextBoxField from '../FormControl/TextBoxField'
import RestApi from '~/api/RestApi'
import { formNoneRequired, formRequired } from '~/common/libs/others/form'
import Router from 'next/router'
import { officeApi } from '~/api/office'

import { partnerApi } from '~/api/partner'
import MyRadioGroup from '~/atomic/molecules/MyRadioGroup'
import MyRadio from '~/atomic/atoms/MyRadio'
import MySelectFetchParent from '~/atomic/molecules/MySelectFetchParent'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import { useQuery } from '@tanstack/react-query'
import MySelectOtherMajor from '~/atomic/molecules/MySelectOtherMajor'
import MySelectParentRelationship from '~/atomic/molecules/MySelectParentRelationship'
import { useWatch } from 'antd/lib/form/Form'
import { CREATE_STUDENT_PASSWORD_DEFAULT } from '~/common/utils/constants'

enum EIsHasParentAccount {
	NoInfo = 1,
	Existed = 2,
	CreateNew = 3
}

const CreateUser: FC<ICreateNew> = (props) => {
	// tư vấn viên  được lọc theo Trung tâm.

	const { className, onOpen, roleStaff, source, purpose, process, visaStatus, profileStatus, foreignLanguage, sale, learningNeed } = props
	const { onRefresh, isEdit, defaultData, isStudent, isChangeInfo } = props

	const [form] = Form.useForm()
	const BranchIds = Form.useWatch('BranchIds', form)
	const IsHasParentAccount = Form.useWatch('IsHasParentAccount', form)
	const ParentId = Form.useWatch('ParentId', form)
	const [districts, setDistricts] = useState([])
	const [wards, setWards] = useState([])
	const [loading, setLoading] = useState(false)
	const [isTeacherSelect, setIsTeacherSelect] = useState(false)
	const [office, setOffice] = useState([])

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [partner, setPartner] = useState([])

	const [listSale, setListSale] = useState([])

	const user = useSelector((state: RootState) => state.user.information)
	const area = useSelector((state: RootState) => state.area.Area)
	const branch = useSelector((state: RootState) => state.branch.Branch)

	const mobileChange = useWatch('Mobile', form)

	const convertAreaSelect = useMemo(() => {
		return parseSelectArray(area, 'Name', 'Id')
	}, [area])

	const convertBranchSelect = useMemo(() => {
		return parseSelectArray(branch, 'Name', 'Id')
	}, [branch])

	const dispatch = useDispatch()

	let schema = yup.object().shape({
		FullName: yup.string().required('Bạn không được để trống'),
		UserName: yup.string().required('Bạn hãy nhập sdt để có tên tài khoản'),
		RoleId: yup.string().required('Bạn không được để trống'),
		Email: yup.string().email('Email nhập sai cú pháp').required('Bạn không được để trống'),
		Mobile: yup.string().required('Bạn không được để trống'),
		Gender: yup.string().required('Bạn không được để trống'),
		BranchIds: yup.mixed().required('Bạn không được để trống'),
		Password: yup.string().required('Bạn hãy nhập sdt để có mật khẩu')
	})

	const yupSync = {
		async validator({ field }, value) {
			schema.validateSyncAt(field, { [field]: value })
		}
	}

	const {
		data: parentData,
		isLoading: isLoadingParentData,
		refetch: refetchParentData
	} = useQuery({
		queryKey: [userInformationApi.keyById, ParentId],
		queryFn: async () => {
			const res = await userInformationApi.getByID(ParentId)
			const _parentData = res.data.data
			form.setFieldsValue({
				ParentUserName: _parentData?.UserName,
				ParentFullName: _parentData?.FullName,
				ParentMobile: _parentData?.Mobile,
				ParentEmail: _parentData?.Email,
				ParentDOB: moment(_parentData?.DOB)
			})
			return res.data.data
		},
		enabled: !!ParentId
	})

	const clearParentFormData = () => {
		form.setFieldsValue({
			ParentUserName: undefined,
			ParentPassword: undefined,
			ParentFullName: undefined,
			ParentMobile: undefined,
			ParentEmail: undefined,
			ParentType: undefined,
			ParentDOB: undefined
		})
	}

	const [programs, setPrograms] = useState([])
	const getPrograms = async () => {
		try {
			const res = await RestApi.get<any>('program', { pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				setPrograms(res.data.data)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const [jobs, setJobs] = useState([])
	const getJobs = async () => {
		try {
			const res = await RestApi.get<any>('job', { pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				setJobs(res.data.data)
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

	const getOffice = async () => {
		try {
			const res = await officeApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setOffice(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getPartner = async () => {
		try {
			const res = await partnerApi.getAll({ pageIndex: 1, pageSize: 99999 })
			if (res.status === 200) {
				let temp = []
				res.data.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setPartner(temp)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	useEffect(() => {
		if (isModalVisible && area.length == 0) {
			getAllArea()
		}
		if (isModalVisible && !!onOpen) {
			onOpen()
		}
		if (isModalVisible && branch.length == 0) {
			getAllBranch()
		}
		if (!isEdit && !isChangeInfo) {
			form.setFieldsValue({ Password: '' })
		}
		if (!!isModalVisible && jobs.length == 0) {
			getJobs()
		}
		if (!!isModalVisible && programs.length == 0) {
			getPrograms()
		}
		if (!!isModalVisible && office.length == 0) {
			getOffice()
		}
		if (!!isModalVisible && partner.length == 0) {
			getPartner()
		}
		if (isModalVisible && isEdit && defaultData?.parentInfo?.UserInformationId) {
			form.setFieldValue('IsHasParentAccount', EIsHasParentAccount.Existed)
		} else {
			form.setFieldValue('IsHasParentAccount', EIsHasParentAccount.NoInfo)
		}
	}, [isModalVisible])

	const getDistrictByArea = async (areaId) => {
		try {
			const response = await districtApi.getAllByArea(areaId)
			if (response.status === 200) {
				const convertDistrict = parseSelectArray(response.data.data, 'Name', 'Id')
				setDistricts(convertDistrict)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	const getWardByDistrict = async (districtId) => {
		try {
			const response = await wardApi.getAllByDistrict(districtId)
			if (response.status === 200) {
				const convertWard = parseSelectArray(response.data.data, 'Name', 'Id')
				setWards(convertWard)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	const theInformation = useSelector((state: RootState) => state.user.information)

	function isSaler() {
		return theInformation?.RoleId == 5
	}

	const postEditUser = async (param) => {
		try {
			const response = isStudent ? await userInformationApi.updateStudent(param) : await userInformationApi.update(param)
			if (response.status === 200) {
				ShowNoti('success', response.data.message)

				if (param?.UserInformationId == theInformation?.UserInformationId) {
					const res = await accountApi.newToken()
					if (res.status === 200) {
						const token = res?.data?.Token || ''
						const user = parseJwt(token) || ''
						const userData = { token: token, user: user }

						await localStorage.setItem('lifeCenterData', JSON.stringify(userData))
						await localStorage.setItem('token', token)

						dispatch(setUser(user))
						dispatch(setAuthData(user))
						dispatch(setAuthLoading(false))
					}
				}
				if (!!onRefresh) {
					onRefresh()
					setIsModalVisible(false)
				}
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setLoading(false)
		}
	}

	const postNewUser = async (param) => {
		try {
			const response = isStudent ? await userInformationApi.addStudent(param) : await userInformationApi.add(param)
			if (response.status === 200) {
				if (!!onRefresh) {
					onRefresh()
					form.resetFields()
					setIsModalVisible(false)
					ShowNoti('success', response.data.message)
				}
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setLoading(false)
		}
	}

	const getAllSaleByBranch = async () => {
		try {
			let parseBranchId = ''
			if (Array.isArray(BranchIds)) {
				BranchIds.forEach((element) => {
					parseBranchId = parseBranchId + ',' + element
				})
			} else {
				parseBranchId = BranchIds
			}
			const res = await userInformationApi.getAll({ pageSize: 9999, roleIds: '5', branchIds: parseBranchId })
			if (res.status === 200) {
				let tenpl = parseSelectArray(res.data.data, 'FullName', 'UserInformationId')

				setListSale(tenpl)
			}
			if (res.status === 204) {
				setListSale([])
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	useEffect(() => {
		if (BranchIds) {
			getAllSaleByBranch()
		}
	}, [BranchIds])

	useEffect(() => {
		if (!isEdit && mobileChange) {
			form.setFieldsValue({
				UserName: mobileChange,
				Password: CREATE_STUDENT_PASSWORD_DEFAULT
			})
		}
	}, [isEdit, mobileChange])

	function convertToString(arr) {
		if (!arr) return ''
		return arr.join(',')
	}

	function convertToArray(str) {
		if (!str) return []
		return str.split(',').map(Number)
	}

	const onFinish = async (values) => {
		const DATA_SUBMIT = {
			...values,
			DOB: !!values.DOB ? new Date(values.DOB) : undefined,
			ContractSigningDate: !!values.ContractSigningDate ? new Date(values.ContractSigningDate) : undefined,
			EnrollmentDay: !!values.EnrollmentDay ? new Date(values.EnrollmentDay) : undefined,
			RoleId: isStudent ? 3 : values.RoleId,
			// BranchIds: values.BranchIds.join(',')
			// 	? isStudent
			// 		? !!values.BranchIds?.length
			// 			? values.BranchIds.join(',')
			// 			: values.BranchIds
			// 		: values.BranchIds.join(',')
			// 	: '',
			BranchIds: values?.BranchIds
				? typeof values.BranchIds === 'number'
					? String(values.BranchIds)
					: isStudent
					? !!values.BranchIds?.length
						? values.BranchIds.join(',')
						: values.BranchIds
					: values.BranchIds.join(',')
				: '',
			ProgramIds: !values?.ProgramIds ? null : convertToString(values?.ProgramIds),
			SaleId: isSaler() ? Number(theInformation.UserInformationId) : values?.SaleId ? values?.SaleId : undefined,
			ParentDOB: !!values.ParentDOB ? new Date(values.ParentDOB) : undefined
		}
		console.log('===DATA_SUBMIT: ', !isEdit ? DATA_SUBMIT : { ...DATA_SUBMIT, UserInformationId: defaultData.UserInformationId })

		setLoading(true)
		if (DATA_SUBMIT.Mobile.match(/^[0-9]+$/) !== null) {
			await (defaultData?.UserInformationId
				? postEditUser({ ...DATA_SUBMIT, UserInformationId: defaultData.UserInformationId })
				: postNewUser(DATA_SUBMIT))
		} else {
			ShowNoti('error', 'Số điện thoại không hợp lệ')
			setLoading(false)
		}
	}
	function openEdit() {
		form.setFieldsValue({ ...defaultData })
		form.setFieldsValue({ Password: '' })
		form.setFieldsValue({ Gender: parseInt(defaultData.Gender) })
		form.setFieldsValue({ AreaId: !!defaultData.AreaId ? parseInt(defaultData.AreaId) : null })
		form.setFieldsValue({ WardId: !!defaultData.WardId ? parseInt(defaultData.WardId) : null })
		form.setFieldsValue({ DistrictId: !!defaultData.DistrictId ? parseInt(defaultData.DistrictId) : null })
		if (isStudent && isEdit) {
			form.setFieldsValue({ SourceId: !!defaultData.SourceId ? defaultData.SourceId : null })
			form.setFieldsValue({ LearningNeedId: !!defaultData.LearningNeedId ? defaultData.LearningNeedId : null })
			form.setFieldsValue({ SaleId: !!defaultData.SaleId ? defaultData.SaleId : null })
			form.setFieldsValue({ PurposeId: !!defaultData.PurposeId ? defaultData.PurposeId : null })
			!!defaultData?.ContractSigningDate && form.setFieldsValue({ ContractSigningDate: moment(defaultData.ContractSigningDate) })
			!!defaultData?.EnrollmentDay && form.setFieldsValue({ EnrollmentDay: moment(defaultData.EnrollmentDay) })
			if (defaultData?.parentInfo?.UserInformationId) {
				form.setFieldsValue({
					ParentId: defaultData?.parentInfo?.UserInformationId,
					ParentType: defaultData?.parentInfo?.ParentType,
				})
			}
		}
		!!defaultData?.DOB && form.setFieldsValue({ DOB: moment(defaultData.DOB) })
		if (defaultData.BranchIds) {
			const convertDataBranchIds = defaultData.BranchIds.split(',')
				.map((item) => parseInt(item))
				.filter((value) => !!value)
			form.setFieldsValue({ BranchIds: convertDataBranchIds })
		}
		getDistrictByArea(defaultData.AreaId)
		getWardByDistrict(defaultData.DistrictId)
		setIsModalVisible(true)
	}

	const handleSelect = async (name, value) => {
		if (name === 'AreaId') {
			form.setFieldValue('DistrictId', null)
			form.setFieldValue('WardId', null)
			getDistrictByArea(value)
		}
		if (name === 'DistrictId') {
			getWardByDistrict(value)
			form.setFieldValue('WardId', null)
		}
	}

	return (
		<>
			{!!!isEdit && !isChangeInfo && (
				<PrimaryButton className={className} onClick={() => setIsModalVisible(true)} type="button" background="green" icon="add">
					Tạo mới
				</PrimaryButton>
			)}

			{/* Edit Buttom */}
			{!!isEdit && <IconButton onClick={openEdit} type="button" background="transparent" color="yellow" icon="edit" tooltip="Cập nhật" />}

			{!!isChangeInfo && (
				<div className="inner-function" onClick={openEdit}>
					<div className="icon">
						<img src="/icons/profile-circle.svg" />
					</div>
					<div className="function-name">Thông tin</div>
				</div>
			)}

			<Modal
				centered
				title={isEdit ? 'Cập nhật thông tin' : isChangeInfo ? 'Thay đổi thông tin' : 'Thêm người dùng mới'}
				width={800}
				bodyStyle={{
					maxHeight: '80vh',
					overflow: 'auto'
				}}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={
					<>
						<PrimaryButton onClick={() => setIsModalVisible(false)} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						{!isChangeInfo && (
							<PrimaryButton
								loading={loading}
								onClick={() => form.submit()}
								className="ml-2"
								background="primary"
								icon="save"
								type="button"
							>
								Lưu
							</PrimaryButton>
						)}
						{!!isChangeInfo && (defaultData.RoleId == 1 || defaultData.RoleId == 2) && (
							<PrimaryButton
								loading={loading}
								onClick={() => form.submit()}
								className="ml-2"
								background="primary"
								icon="save"
								type="button"
							>
								Lưu
							</PrimaryButton>
						)}
						{!!isChangeInfo && defaultData.RoleId == 3 && (
							<PrimaryButton
								loading={loading}
								onClick={() => form.submit()}
								className="ml-2"
								background="primary"
								icon="save"
								type="button"
							>
								Gửi yêu cầu thay đổi
							</PrimaryButton>
						)}
					</>
				}
			>
				<Form form={form} layout="vertical" initialValues={{ remember: true }} onFinish={onFinish} scrollToFirstError>
					<div className="grid grid-cols-4 gap-x-4">
						<div className="col-span-4">
							<UploadImageField form={form} label="Hình đại diện" name="Avatar" />
						</div>
						<InputTextField
							className={isChangeInfo ? 'col-span-4' : 'col-span-2'}
							label="Họ tên"
							name="FullName"
							isRequired
							rules={[yupSync]}
							placeholder="Họ tên"
						/>

						<InputTextField
							className={'col-span-2'}
							label="Tên đăng nhập"
							placeholder="Tên đăng nhập"
							name="UserName"
							isRequired
							disabled={true}
							rules={[yupSync]}
						/>
						{user?.RoleId == 1 && isEdit ? (
							// <InputPassField className="col-span-2" label="Mật khẩu" name="Password" />
							<></>
						) : (
							<InputTextField
								className="col-span-2"
								label="Mật khẩu"
								name="Password"
								isRequired
								disabled={!isEdit}
								rules={[yupSync]}
								placeholder="Mật khẩu"
							/>
						)}
						<InputTextField className={'col-span-2'} label="Mã học viên" name="UserCode" placeholder="Mã học viên" />

						{!isEdit && !isStudent && !isChangeInfo && (
							<SelectField
								className="col-span-2"
								label="Chức vụ"
								name="RoleId"
								isRequired
								placeholder="Chức vụ"
								rules={[yupSync]}
								optionList={roleStaff}
								onChangeSelect={(val) => {
									if (val === 2) {
										setIsTeacherSelect(true)
									} else {
										setIsTeacherSelect(false)
									}
								}}
							/>
						)}

						<SelectField
							className="col-span-2"
							label="Giới tính"
							name="Gender"
							placeholder="Giới tính"
							isRequired
							rules={[yupSync]}
							optionList={[
								{ value: 0, title: 'Khác' },
								{ value: 1, title: 'Nam' },
								{ value: 2, title: 'Nữ' }
							]}
						/>

						{Router.asPath.includes('info-course/customer') && (
							<Form.Item name="JobId" className="col-span-2" label="Công việc">
								<Select className="primary-input" placeholder="Chọn công việc">
									{jobs.map((item) => {
										return (
											<Select.Option key={item.Id} value={item.Id}>
												<div className="flex items-center justify-between w-full">{item.Name}</div>
											</Select.Option>
										)
									})}
								</Select>
							</Form.Item>
						)}

						{!isEdit && Router.asPath.includes('users/personnel') && isTeacherSelect && (
							<Form.Item name="ProgramIds" className="col-span-2" label="Khung đào tạo" rules={formNoneRequired}>
								<Select className="primary-input" mode="tags" placeholder="Chọn Khung đào tạo">
									{programs.map((item) => {
										return (
											<Select.Option key={item.Id} value={item.Id}>
												<div className="flex items-center justify-between w-full">{item.Name}</div>
											</Select.Option>
										)
									})}
								</Select>
							</Form.Item>
						)}

						<InputTextField
							className="col-span-2"
							label="Địa chỉ Email"
							placeholder="Địa chỉ Email"
							name="Email"
							isRequired
							rules={[yupSync]}
						/>
						<InputTextField
							className="col-span-2"
							label="Số điện thoại"
							placeholder="Số điện thoại"
							name="Mobile"
							isRequired
							rules={[yupSync]}
						/>
						<DatePickerField
							className="col-span-2"
							label="Ngày sinh"
							placeholder="Ngày sinh"
							name="DOB"
							mode="single"
							format="DD/MM/YYYY"
						/>
						{isStudent && (
							<>
								<InputTextField className="col-span-2" label="Số điện thoại khác" placeholder="Số điện thoại khác" name="Mobile2" />
								<InputTextField className="col-span-2" label="CMND/CCCD" placeholder="CMND/CCCD" name="CitizenIdentity" />
								<DatePickerField
									className="col-span-2"
									label="Ngày cấp CMND/CCCD"
									placeholder="Ngày cấp CMND/CCCD"
									name="ReleaseDate"
									mode="single"
									format="DD/MM/YYYY"
								/>
								<InputTextField className="col-span-2" label="Nơi cấp" placeholder="Nơi cấp" name="PlaceIssue" />
								<InputTextField className="col-span-2" label="Nơi sinh" placeholder="Nơi sinh" name="BirthPlace" />
								<InputTextField className="col-span-2" label="Quê quán" placeholder="Quê quán" name="NativeLand" />
							</>
						)}

						{!isChangeInfo && isEdit && user?.RoleId == 1 && (
							<SelectField
								className="col-span-2"
								label="Trạng thái"
								name="StatusId"
								optionList={[
									{ value: 0, title: 'Hoạt động' },
									{ value: 1, title: 'Khóa' }
								]}
							/>
						)}

						{isStudent && (
							<>
								<InputTextField className="col-span-2" label="Trường THPT" name="HighSchool" />
								<MyFormItem className="col-span-2" label="Ngành học khác" name="OtherMajorId">
									<MySelectOtherMajor />
								</MyFormItem>
							</>
						)}
						<TextBoxField name="Extension" label="Giới thiệu thêm" className="col-span-4" />
						{isStudent ? (
							<>
								<Divider className="col-span-4" orientation="center">
									Thông tin hợp đồng
								</Divider>
								<DatePickerField
									className="col-span-2"
									label="Ngày ký hợp đồng"
									name="ContractSigningDate"
									mode="single"
									format="DD/MM/YYYY"
								/>
								<InputTextField className="col-span-2" label="Số hợp đồng" name="ContractNumber" />
								<DatePickerField className="col-span-2" label="Ngày nhập học" name="EnrollmentDay" mode="single" format="DD/MM/YYYY" />
							</>
						) : (
							<></>
						)}
						{isStudent ? (
							<SelectField
								className="col-span-4 antd-custom-wrap"
								name="BranchIds"
								label="Trung tâm"
								isRequired
								rules={[yupSync]}
								optionList={convertBranchSelect}
								onChangeSelect={() => {
									form.setFieldValue('SaleId', '')
								}}
							/>
						) : (
							<SelectField
								className="col-span-4 antd-custom-wrap"
								mode="multiple"
								name="BranchIds"
								label="Trung tâm"
								isRequired
								rules={[yupSync]}
								optionList={convertBranchSelect}
							/>
						)}
						{isStudent && (
							<>
								<Divider className="col-span-4" orientation="center">
									Phụ huynh
								</Divider>
								<Form.Item className="col-span-4" name="IsHasParentAccount" valuePropName="checked">
									<MyRadioGroup
										onChange={(e) => {
											form.setFieldValue('IsHasParentAccount', e.target.value)
											if (e.target?.value === EIsHasParentAccount.CreateNew) {
												clearParentFormData()
											}
										}}
										value={IsHasParentAccount}
										defaultValue={EIsHasParentAccount.NoInfo}
										spaceProps={{ direction: 'horizontal', className: '!gap-[20px]' }}
									>
										<MyRadio value={EIsHasParentAccount.NoInfo}>Không có thông tin</MyRadio>
										<MyRadio value={EIsHasParentAccount.Existed}>Đã có tài khoản</MyRadio>
										<MyRadio value={EIsHasParentAccount.CreateNew}>Tạo mới</MyRadio>
									</MyRadioGroup>
								</Form.Item>
								{IsHasParentAccount === EIsHasParentAccount.Existed && (
									<>
										<div className="col-span-2">
											<MyFormItem name="ParentId" label="Chọn phụ huynh" rules={formRequired} required>
												<MySelectFetchParent className="!h-[36px]" disabled={isLoadingParentData} />
											</MyFormItem>
										</div>
										{!!ParentId && (
											<>
												<InputTextField className="col-span-2" label="Tên đăng nhập" name="ParentUserName" disabled />
												<InputTextField className="col-span-2" label="Họ và tên" name="ParentFullName" disabled={isLoadingParentData} />
												<InputTextField className="col-span-2" label="Số điện thoại" name="ParentMobile" disabled={isLoadingParentData} />
												<DatePickerField
													className="col-span-2"
													label="Ngày sinh"
													placeholder=""
													name="ParentDOB"
													mode="single"
													format="DD/MM/YYYY"
													disabled={isLoadingParentData}
												/>
												<MyFormItem className="col-span-2" label="Mối quan hệ" name="ParentType" rules={formRequired} required>
													<MySelectParentRelationship />
												</MyFormItem>
												<InputTextField className="col-span-2" label="Email" name="ParentEmail" disabled={isLoadingParentData} />
											</>
										)}
									</>
								)}
								{IsHasParentAccount === EIsHasParentAccount.CreateNew && (
									<>
										<InputTextField className="col-span-2" label="Tên đăng nhập" name="ParentUserName" rules={formRequired} isRequired />
										<InputPassField className="col-span-2" label="Mật khẩu" name="ParentPassword" rules={formRequired} isRequired />
										<InputTextField className="col-span-2" label="Họ và tên" name="ParentFullName" rules={formRequired} isRequired />
										<InputTextField className="col-span-2" label="Số điện thoại" name="ParentMobile" rules={formRequired} isRequired />
										<DatePickerField
											className="col-span-2"
											label="Ngày sinh"
											placeholder=""
											name="ParentDOB"
											mode="single"
											format="DD/MM/YYYY"
											rules={formRequired}
											isRequired
										/>
										<MyFormItem className="col-span-2" label="Mối quan hệ" name="ParentType" rules={formRequired} required>
											<MySelectParentRelationship className='h-[36px]' />
										</MyFormItem>
										<InputTextField className="col-span-2" label="Email" name="ParentEmail" />
									</>
								)}
							</>
						)}

						<Divider className="col-span-4" orientation="center">
							Địa chỉ
						</Divider>
						<InputTextField className="col-span-2" label="Địa chỉ" name="Address" />
						<SelectField
							className="col-span-2"
							label="Tỉnh / Thành phố"
							name="AreaId"
							optionList={convertAreaSelect}
							onChangeSelect={(value) => handleSelect('AreaId', value)}
						/>
						<SelectField
							className="col-span-2"
							label="Quận / Huyện"
							name="DistrictId"
							optionList={districts}
							onChangeSelect={(value) => handleSelect('DistrictId', value)}
						/>
						<SelectField className="col-span-2" label="Phường / Xã" name="WardId" optionList={wards} />
						{isStudent && (
							<>
								<Divider className="col-span-4" orientation="center">
									Thông tin học
								</Divider>
								<SelectField className="col-span-2" label="Nguồn khách hàng" name="SourceId" optionList={source} />
								<SelectField className="col-span-2" label="Nhu cầu học" name="LearningNeedId" optionList={learningNeed} />

								{!isSaler() ? <SelectField className="col-span-2" label="Tư vấn viên" name="SaleId" optionList={listSale} /> : ''}

								<SelectField className="col-span-2" label="Mục đích học" name="PurposeId" optionList={purpose} />

								<Divider className="col-span-4" orientation="center">
									Thông tin hồ sơ
								</Divider>

								<SelectField
									className="col-span-2"
									label="Văn phòng đại diện"
									name="OfficeId"
									optionList={office}
									disabled={user.RoleId == 3 || user.RoleId == 8 || user.RoleId == 2}
								/>
								<SelectField
									className="col-span-2"
									label="Tình trạng thu hồ sơ"
									name="ProfileStatusId"
									optionList={profileStatus}
									disabled={user.RoleId == 3 || user.RoleId == 8 || user.RoleId == 2}
								/>
								<SelectField
									className="col-span-2"
									label="Trình độ ngoại ngữ"
									name="ForeignLanguageId"
									optionList={foreignLanguage}
									disabled={user.RoleId == 3 || user.RoleId == 8 || user.RoleId == 2}
								/>
								{defaultData && <SelectField className="col-span-2" label="Đối tác" name="PartnerId" optionList={partner} />}
								<SelectField
									className="col-span-2"
									label="Tiến trình xử lý hồ sơ"
									name="ProcessId"
									optionList={process}
									disabled={user.RoleId == 3 || user.RoleId == 8 || user.RoleId == 2}
								/>
								<SelectField
									className="col-span-2"
									label="Tình trạng visa"
									name="VisaStatusId"
									optionList={visaStatus}
									disabled={user.RoleId == 3 || user.RoleId == 8 || user.RoleId == 2}
								/>
								<InputTextField className="col-span-2" label="Ký túc xá" name="Dormitory" />
							</>
						)}
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default CreateUser
