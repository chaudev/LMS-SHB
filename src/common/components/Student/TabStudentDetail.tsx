import { Divider, Form } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { areaApi, districtApi, wardApi } from '~/api/area'
import { branchApi } from '~/api/branch'
import { learningNeedApi } from '~/api/learning-needs'
import { purposeApi } from '~/api/purpose'
import { sourceApi } from '~/api/source'
import { userInformationApi } from '~/api/user/user'
import { ShowNoti } from '~/common/utils'
import DatePickerField from '../FormControl/DatePickerField'
import InputTextField from '../FormControl/InputTextField'
import SelectField from '../FormControl/SelectField'
import TextBoxField from '../FormControl/TextBoxField'
import IconButonUpdateUser from './UserProfileTemplate/IconButonUpdateUser'
import UserProfileTemplate from './UserProfileTemplate'
import { officeApi } from '~/api/office'
import { profileStatusApi } from '~/api/profile-status'
import { foreignLanguageApi } from '~/api/foreign-language'
import { partnerApi } from '~/api/partner'
import { visaStatusApi } from '~/api/visa-status'
import { processApi } from '~/api/process'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useRole } from '~/common/hooks/useRole'

export interface ITabStudentDetailProps {
	StudentDetail: IUserResponse
	setStudentDetail?: any
}

export default function TabStudentDetail(props: ITabStudentDetailProps) {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const { StudentDetail, setStudentDetail } = props
	const router = useRouter()
	const { isStudent, isParents } = useRole()
	const [optionList, setOptionList] = useState({
		branch: [],
		purpose: [],
		area: [],
		source: [],
		learningNeed: [],
		sale: [],
		office: [],
		profileStatus: [],
		foreignLanguage: [],
		partner: [],
		visaStatus: [],
		process: []
	})
	const [district, setDistrict] = useState([])
	const [ward, setWard] = useState([])
	const [init, setInit] = useState(true)

	const [isLoading, setIsLoading] = useState<string>('')

	const [form] = Form.useForm()
	const FullName = Form.useWatch('FullName', form)
	const UserName = Form.useWatch('UserName', form)
	const Email = Form.useWatch('Email', form)
	const Gender = Form.useWatch('Gender', form)
	const StatusId = Form.useWatch('StatusId', form)
	const Extension = Form.useWatch('Extension', form)
	const BranchIds = Form.useWatch('BranchIds', form)
	const AreaId = Form.useWatch('AreaId', form)
	const DistrictId = Form.useWatch('DistrictId', form)
	const WardId = Form.useWatch('WardId', form)
	const DOB = Form.useWatch('DOB', form)
	const Address = Form.useWatch('Address', form)
	const LearningNeedId = Form.useWatch('LearningNeedId', form)
	const SourceId = Form.useWatch('SourceId', form)
	const SaleId = Form.useWatch('SaleId', form)
	const PurposeId = Form.useWatch('PurposeId', form)
	const OfficeId = Form.useWatch('OfficeId', form)
	const ProfileStatusId = Form.useWatch('ProfileStatusId', form)
	const ForeignLanguageId = Form.useWatch('ForeignLanguageId', form)
	const PartnerId = Form.useWatch('PartnerId', form)
	const ProcessId = Form.useWatch('ProcessId', form)
	const VisaStatusId = Form.useWatch('VisaStatusId', form)

	const ref = useRef(null)

	const getDistrict = async (areaID) => {
		try {
			const res = await districtApi.getAllByArea(areaID)
			if (res.status === 200) {
				let temp = []
				res.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				setDistrict(temp)
			}
			if (res.status === 204) {
				setDistrict([])
			}
		} catch (err) {}
	}

	const getWard = async (districtID) => {
		try {
			const res = await wardApi.getAllByDistrict(districtID)
			if (res.status === 200) {
				let temp = []
				res.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				setWard(temp)
			}
			if (res.status === 204) {
				setWard([])
			}
		} catch (err) {}
	}

	const getInfoOptions = async () => {
		try {
			const [
				branchResponse,
				areaResponse,
				sourceResponse,
				learningResponse,
				saleResponse,
				purposeResponse,
				office,
				profileStatus,
				foreignLanguage,
				partner,
				visaStatus,
				process
			] = await Promise.all([
				branchApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				areaApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				sourceApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				learningNeedApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				userInformationApi.getAllUserByRole(5),
				purposeApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				officeApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				profileStatusApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				foreignLanguageApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				partnerApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				visaStatusApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				processApi.getAll({ pageIndex: 1, pageSize: 99999 })
			])

			let tempOption = {
				branch: [],
				purpose: [],
				area: [],
				source: [],
				learningNeed: [],
				sale: [],
				office: [],
				profileStatus: [],
				foreignLanguage: [],
				partner: [],
				visaStatus: [],
				process: []
			}

			if (branchResponse.status == 200) {
				let temp = []
				branchResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.branch = temp
			}
			if (purposeResponse.status == 200) {
				let temp = []
				purposeResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.purpose = temp
			}
			if (sourceResponse.status == 200) {
				let temp = []
				sourceResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.source = temp
			}
			if (learningResponse.status == 200) {
				let temp = []
				learningResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.learningNeed = temp
			}
			if (saleResponse.status == 200) {
				let temp = []
				saleResponse.data.data.forEach((data) => temp.push({ title: data.FullName, value: data.UserInformationId }))
				tempOption.sale = temp
			}
			if (areaResponse.status == 200) {
				let temp = []
				areaResponse.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.area = temp
			}
			if (office.status == 200) {
				let temp = []
				office.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.office = temp
			}
			if (profileStatus.status == 200) {
				let temp = []
				profileStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.profileStatus = temp
			}
			if (foreignLanguage.status == 200) {
				let temp = []
				foreignLanguage.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.foreignLanguage = temp
			}
			if (partner.status == 200) {
				let temp = []
				partner.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.partner = temp
			}
			if (visaStatus.status == 200) {
				let temp = []
				visaStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.visaStatus = temp
			}
			if (process.status == 200) {
				let temp = []
				process.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.process = temp
			}
			setOptionList(tempOption)
		} catch (err) {}
	}

	useEffect(() => {
		getInfoOptions()
	}, [])

	useEffect(() => {
		if (StudentDetail) {
			if (!init) {
				form.setFieldsValue(ref.current.getFieldsValue())
			} else {
				form.setFieldsValue({
					...StudentDetail,
					BranchIds: Number(StudentDetail.BranchIds),
					DOB: StudentDetail?.DOB ? moment(StudentDetail?.DOB) : null
				})
				if (StudentDetail.AreaId) {
					getDistrict(StudentDetail.AreaId)
				}
				if (StudentDetail.DistrictId) {
					getWard(StudentDetail.DistrictId)
				}
				setInit(false)
			}
		}
	}, [StudentDetail])

	const _onSubmit = async (data) => {
		try {
			let res = await userInformationApi.update({
				...data,
				UserInformationId: StudentDetail.UserInformationId,
				DOB: data.DOB ? new Date(data.DOB) : null
			})
			if (res.status == 200) {
				ShowNoti('success', res.data.message)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
		}
	}

	const updateUserInfo = async (key, value) => {
		try {
			setIsLoading(key)
			const payload = { ...StudentDetail, [key]: value }
			let res = await userInformationApi.update(payload)
			if (res.status == 200) {
				setStudentDetail(payload)
				ShowNoti('success', res.data.message)
			}
			setIsLoading('')
		} catch (error) {
			ShowNoti('error', error.message)
			setIsLoading('')
		}
	}

	const isDisable = () => {
		// ko cho giáo  viên + học viên cập nhật thông tin
		return isStudent || isParents ? true : false
	}
	return (
		<div>
			<Divider>
				<h2 className="py-4 font-[600] text-center">Thông tin cá nhân</h2>
			</Divider>
			<Form
				ref={ref}
				layout={window.innerWidth < 640 ? 'vertical' : 'horizontal'}
				form={form}
				labelAlign="left"
				labelWrap={true}
				onFinish={_onSubmit}
				labelCol={{ span: 5 }}
			>
				<div className="d-flex justify-between items-center">
					<InputTextField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="FullName"
						placeholder="Nhập họ và tên"
						label={labelUser.FullName}
					/>
					<IconButonUpdateUser
						isShow={FullName !== StudentDetail.FullName}
						onClick={() => updateUserInfo('FullName', FullName)}
						loading={isLoading === 'FullName'}
					/>
				</div>
				<Divider />
				<div className="d-flex justify-between items-center">
					<InputTextField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="UserName"
						placeholder="Nhập tên đăng nhập"
						label={labelUser.UserName}
					/>
					<IconButonUpdateUser
						isShow={UserName !== StudentDetail.UserName}
						onClick={() => updateUserInfo('UserName', UserName)}
						loading={isLoading === 'UserName'}
					/>
				</div>
				<Divider />
				<div className="d-flex justify-between items-center">
					<InputTextField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="Email"
						placeholder="Nhập email"
						label={labelUser.Email}
					/>
					<IconButonUpdateUser
						isShow={Email !== StudentDetail.Email}
						onClick={() => updateUserInfo('Email', Email)}
						loading={isLoading === 'Email'}
					/>
				</div>
				<Divider />
				<div className="d-flex justify-between items-center">
					<SelectField
						name="Gender"
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						label={labelUser.Gender}
						allowClear={false}
						placeholder="Chọn giới tính"
						optionList={[
							{ value: 0, title: 'Khác' },
							{ value: 1, title: 'Nam' },
							{ value: 2, title: 'Nữ' }
						]}
					/>
					<IconButonUpdateUser
						isShow={Gender != StudentDetail.Gender}
						onClick={() => updateUserInfo('Gender', Gender)}
						loading={isLoading === 'Gender'}
					/>
				</div>
				<Divider />
				<div className="d-flex justify-between items-center">
					<DatePickerField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						classNamePicker="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						label={labelUser.DOB}
						name="DOB"
						mode="single"
						format="DD/MM/YYYY"
						allowClear={false}
						placeholder="Nhập ngày sinh"
					/>
					<IconButonUpdateUser
						isShow={moment(DOB).format('yyy/mm/dd') !== moment(StudentDetail.DOB).format('yyy/mm/dd')}
						onClick={() => updateUserInfo('DOB', new Date(DOB))}
						loading={isLoading === 'DOB'}
					/>
				</div>
				<Divider />
				<div className="d-flex justify-between items-center">
					<SelectField
						name="StatusId"
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						label={labelUser.Status}
						optionList={[
							{
								value: 0,
								title: 'Hoạt động'
							},
							{
								value: 1,
								title: 'Khóa'
							}
						]}
						allowClear={false}
						placeholder="Chọn trạng thái hoạt động"
					/>
					<IconButonUpdateUser
						isShow={StatusId !== StudentDetail.StatusId}
						onClick={() => updateUserInfo('StatusId', StatusId)}
						loading={isLoading === 'StatusId'}
					/>
				</div>
				<Divider />
				<div className="d-flex w-full justify-between items-start">
					<TextBoxField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="Extension"
						placeholder="Nhập giới thiệu thêm về bản thân"
						autoSize={true}
						label={labelUser.Extension}
					/>

					<IconButonUpdateUser
						isShow={Extension !== StudentDetail.Extension}
						onClick={() => updateUserInfo('Extension', Extension)}
						loading={isLoading === 'Extension'}
					/>
				</div>
				<Divider></Divider>
				<div className="d-flex w-full justify-between items-start">
					<SelectField
						className="border-none min-w-xs w-full items-center m-0 hover:border-none focus:border-none"
						name="BranchIds"
						label={labelUser.Branch}
						placeholder="Chọn trung tâm"
						optionList={optionList.branch}
					/>
					<IconButonUpdateUser
						isShow={BranchIds != StudentDetail.BranchIds}
						onClick={() => updateUserInfo('BranchIds', BranchIds)}
						loading={isLoading === 'BranchIds'}
					/>
				</div>
				<Divider />
				<div className="d-flex w-full justify-between items-start">
					<InputTextField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="Address"
						placeholder="Nhập địa chỉ"
						label={labelUser.Address}
					/>
					<IconButonUpdateUser
						isShow={Address !== StudentDetail.Address}
						onClick={() => updateUserInfo('Address', Address)}
						loading={isLoading === 'Address'}
					/>
				</div>
				<Divider />
				<div className="d-flex w-full justify-between items-start">
					<SelectField
						name="AreaId"
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						label={labelUser.Area}
						placeholder="Chọn tỉnh / thành phố"
						optionList={optionList.area}
						onChangeSelect={(data) => {
							getDistrict(data)
						}}
					/>
					<IconButonUpdateUser
						isShow={AreaId !== StudentDetail.AreaId}
						onClick={() => updateUserInfo('AreaId', AreaId)}
						loading={isLoading === 'AreaId'}
					/>
				</div>
				<Divider />
				<div className="d-flex w-full justify-between items-start">
					<SelectField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						disabled={district.length > 0 ? false : true}
						name="DistrictId"
						label={labelUser.District}
						placeholder="Chọn quận / huyện"
						optionList={district}
						onChangeSelect={(data) => {
							getWard(data)
						}}
					/>
					<IconButonUpdateUser
						isShow={DistrictId !== StudentDetail.DistrictId}
						onClick={() => updateUserInfo('DistrictId', DistrictId)}
						loading={isLoading === 'DistrictId'}
					/>
				</div>

				<Divider />
				<div className="d-flex w-full justify-between items-start">
					<SelectField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						disabled={ward.length > 0 ? false : true}
						placeholder="Chọn phường/xã"
						label={labelUser.Ward}
						name="WardId"
						optionList={ward}
					/>

					<IconButonUpdateUser
						isShow={WardId !== StudentDetail.WardId}
						onClick={() => updateUserInfo('WardId', WardId)}
						loading={isLoading === 'WardId'}
					/>
				</div>
				{router.query.StudentID && (
					<>
						<Divider>
							<h2 className="py-4 font-[600] text-center">Thông tin học</h2>
						</Divider>
						<div className="d-flex justify-between items-center">
							<SelectField
								className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
								name="LearningNeedId"
								label="Nhu cầu học"
								placeholder="Chọn nhu cầu học"
								optionList={optionList.learningNeed}
								disabled={isDisable()}
							/>
							<IconButonUpdateUser
								isShow={LearningNeedId !== StudentDetail.LearningNeedId}
								onClick={() => updateUserInfo('LearningNeedId', LearningNeedId)}
								loading={isLoading === 'LearningNeedId'}
							/>
						</div>
						<Divider></Divider>
						<div className="d-flex justify-between items-center">
							<SelectField
								className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
								name="SourceId"
								label="Nguồn khách hàng"
								placeholder="Chọn nguồn khách hàng"
								disabled={isDisable()}
								optionList={optionList.source}
							/>
							<IconButonUpdateUser
								isShow={SourceId !== StudentDetail.SourceId}
								onClick={() => updateUserInfo('SourceId', SourceId)}
								loading={isLoading === 'SourceId'}
							/>
						</div>
						<Divider></Divider>
						<div className="d-flex justify-between items-center">
							<SelectField
								className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
								name="SaleId"
								label="Tư vấn viên"
								placeholder="Chọn tư vấn viên"
								disabled={isDisable()}
								optionList={optionList.sale}
							/>
							<IconButonUpdateUser
								isShow={SaleId !== StudentDetail.SaleId}
								onClick={() => updateUserInfo('SaleId', SaleId)}
								loading={isLoading === 'SaleId'}
							/>
						</div>
						<Divider></Divider>
						<div className="d-flex justify-between items-center">
							<SelectField
								className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
								name="PurposeId"
								label="Mục đích học"
								placeholder="Chọn mục đích học"
								disabled={isDisable()}
								optionList={optionList.purpose}
							/>
							<IconButonUpdateUser
								isShow={PurposeId !== StudentDetail.PurposeId}
								onClick={() => updateUserInfo('PurposeId', PurposeId)}
								loading={isLoading === 'PurposeId'}
							/>
						</div>
					</>
				)}
				{isStudent   && (
					<>
						<Divider>
							<h2 className="py-4 font-[600] text-center">Thông tin hồ sơ</h2>
						</Divider>
						<>
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="OfficeId"
									label="Văn phòng đại diện"
									placeholder="Chọn văn phòng đại diện"
									optionList={optionList.office}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={OfficeId !== StudentDetail.OfficeId}
									onClick={() => updateUserInfo('OfficeId', OfficeId)}
									loading={isLoading === 'OfficeId'}
								/>
							</div>
							<Divider />
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="ProfileStatusId"
									label="Tình trạng hồ sơ"
									placeholder="Chọn tình trạng hồ sơ"
									optionList={optionList.profileStatus}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={ProfileStatusId !== StudentDetail.ProfileStatusId}
									onClick={() => updateUserInfo('ProfileStatusId', ProfileStatusId)}
									loading={isLoading === 'ProfileStatusId'}
								/>
							</div>
							<Divider />
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="ForeignLanguageId"
									label="Trình độ ngoại ngữ"
									placeholder="Chọn trình độ ngoại ngữ"
									optionList={optionList.foreignLanguage}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={ForeignLanguageId !== StudentDetail.ForeignLanguageId}
									onClick={() => updateUserInfo('ForeignLanguageId', ForeignLanguageId)}
									loading={isLoading === 'ForeignLanguageId'}
								/>
							</div>
							<Divider />
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="PartnerId"
									label="Đối tác"
									placeholder="Chọn đối tác"
									optionList={optionList.partner}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={PartnerId !== StudentDetail.PartnerId}
									onClick={() => updateUserInfo('PartnerId', PartnerId)}
									loading={isLoading === 'PartnerId'}
								/>
							</div>
							<Divider />
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="ProcessId"
									label="Tình trạng xử lý hồ sơ"
									placeholder="Chọn tình trạng xử lý hồ sơ"
									optionList={optionList.process}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={ProcessId !== StudentDetail.ProcessId}
									onClick={() => updateUserInfo('ProcessId', ProcessId)}
									loading={isLoading === 'ProcessId'}
								/>
							</div>
							<Divider />
							<div className="d-flex justify-between items-center">
								<SelectField
									className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
									name="VisaStatusId"
									label="Tình trạng visa"
									placeholder="Chọn tình trạng visa"
									optionList={optionList.visaStatus}
									disabled={userInformation.RoleId == 3}
								/>
								<IconButonUpdateUser
									isShow={VisaStatusId !== StudentDetail.VisaStatusId}
									onClick={() => updateUserInfo('VisaStatusId', VisaStatusId)}
									loading={isLoading === 'VisaStatusId'}
								/>
							</div>
						</>
					</>
				)}

				{router.query.StudentID && <UserProfileTemplate />}
			</Form>
		</div>
	)
}

const labelUser = {
	FullName: 'Họ tên',
	UserName: 'Tên đăng nhập',
	DOB: 'Ngày sinh',
	Gender: 'Giới tính',
	Mobile: 'Số điện thoại',
	Email: 'Email',
	Address: 'Địa chỉ',
	Status: 'Trạng thái hoạt động',
	Area: 'Tỉnh/thành phố',
	District: 'Quận/huyện',
	Ward: 'Phường/xã',
	Extension: 'Giới thiệu thêm',
	Branch: 'Trung tâm',
	LearningNeed: 'Nhu cầu học',
	Source: 'Nguồn khách hàng',
	Sale: 'Tư vấn viên',
	Purpose: 'Mục đích học'
}
