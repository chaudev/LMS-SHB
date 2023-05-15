import { Divider, Form, Modal, Select, Skeleton, Tag } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { areaApi, districtApi, wardApi } from '~/api/area'
import { branchApi } from '~/api/branch'
import { learningNeedApi } from '~/api/learning-needs'
import { purposeApi } from '~/api/purpose'
import { sourceApi } from '~/api/source'
import { userInformationApi } from '~/api/user'
import { ShowNostis, ShowNoti } from '~/common/utils'
import DatePickerField from '../FormControl/DatePickerField'
import InputTextField from '../FormControl/InputTextField'
import SelectField from '../FormControl/SelectField'
import TextBoxField from '../FormControl/TextBoxField'
import TextArea from 'antd/lib/input/TextArea'
import IconButton from '../Primary/IconButton'
import { FiChevronDown } from 'react-icons/fi'
import PrimaryButton from '../Primary/Button'

export interface ITabStudentDetailProps {
	StudentDetail: IUserResponse
	setStudentDetail: any
}

export default function TabStudentDetail(props: ITabStudentDetailProps) {
	const { StudentDetail, setStudentDetail } = props
	console.log(StudentDetail)
	const router = useRouter()

	const [optionList, setOptionList] = useState({ branch: [], purpose: [], area: [], source: [], learningNeed: [], sale: [] })
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
			const [branchResponse, areaResponse, sourceResponse, learningResponse, saleResponse, purposeResponse] = await Promise.all([
				branchApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				areaApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				sourceApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				learningNeedApi.getAll({ pageIndex: 1, pageSize: 99999 }),
				userInformationApi.getByRole(5),
				purposeApi.getAll({ pageIndex: 1, pageSize: 99999 })
			])

			let tempOption = { branch: [], purpose: [], area: [], source: [], learningNeed: [], sale: [] }

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
				ShowNoti('success', res.data.message)
				setStudentDetail(payload)
			}
			setIsLoading('')
		} catch (error) {
			ShowNoti('error', error.message)
			setIsLoading('')
		}
	}

	const customLable = (label) => {
		return <div className="">{label}</div>
	}

	console.log('BranchIds', BranchIds)

	if (!StudentDetail) {
		return <></>
	}
	return (
		<div>
			<Divider>
				<h2 className="py-4 font-[600] text-center">Thông tin cá nhân</h2>
			</Divider>
			<Form
				ref={ref}
				layout={window.innerWidth < 600 ? 'vertical' : 'horizontal'}
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
						label={customLable(labelUser.FullName)}
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
						label={customLable(labelUser.UserName)}
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
						label={customLable(labelUser.Email)}
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
						label={customLable(labelUser.Gender)}
						allowClear={false}
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
						label={customLable(labelUser.DOB)}
						name="DOB"
						mode="single"
						format="DD/MM/YYYY"
						allowClear={false}
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
						label={customLable(labelUser.Status)}
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

				<Divider></Divider>
				<div className="d-flex w-full justify-between items-start">
					<TextBoxField
						className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
						name="Extension"
						autoSize={true}
						label={customLable(labelUser.Extension)}
					/>

					<IconButonUpdateUser
						isShow={Extension !== StudentDetail.Extension}
						onClick={() => updateUserInfo('Extension', Extension)}
						loading={isLoading === 'Extension'}
					/>
				</div>

				<Divider>Địa chỉ</Divider>
				<div className="d-flex w-full justify-between items-start">
					<SelectField
						className="border-none min-w-xs w-full items-center m-0 hover:border-none focus:border-none"
						name="BranchIds"
						label={customLable(labelUser.Branch)}
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
						label={customLable(labelUser.Address)}
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
						label={customLable(labelUser.Area)}
						placeholder="Chọn tỉnh/thành phố"
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
						label={customLable(labelUser.District)}
						placeholder="Chọn quận/huyện"
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
						label={customLable(labelUser.Ward)}
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
						<Divider>Thông tin học</Divider>
						<div className="d-flex justify-between items-center">
							<SelectField
								className="border-none min-w-xs w-full  items-center m-0 hover:border-none focus:border-none"
								name="LearningNeedId"
								label="Nhu cầu học"
								optionList={optionList.learningNeed}
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
				<UserProfileTemplate />
			</Form>
		</div>
	)
}

const IconButonUpdateUser = ({ onClick, loading , isShow = false }) => {
	return (
		<>
			{isShow && (
				<IconButton
					onClick={onClick}
					tooltip="Cập nhật"
					loading={loading}
					type="button"
					color="green"
					icon="save"
					background="transparent"
				/>
			)}
		</>
	)
}
const UserProfileTemplate = ({}) => {
	const router = useRouter()
	const [form] = Form.useForm()
	const { StudentID } = router.query
	const [loading, setLoading] = useState<{ type: string; status: boolean }>({ type: '', status: false })
	const [profileTemplate, setProfileTemplate] = useState([])
	const [profileItem, setProfileItem] = useState<IUserProfileTemplateItem | null>(null)
	const [textUpdate, setTextUpdate] = useState<IUserProfileTemplateItem[]>([])

	const getAllProfileTemplate = async () => {
		try {
			setLoading({ type: 'GET_ALL', status: true })
			const response = await userInformationApi.getAllProfileTemplate(String(StudentID))
			if (response.status === 200) {
				setTextUpdate(response.data.data)
				setProfileTemplate(response.data.data)
			}
			if (response.status === 204) {
				setProfileTemplate([])
			}
			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	useEffect(() => {
		if (StudentID) {
			getAllProfileTemplate()
		}
	}, [StudentID])

	const updateProfileTemplateItem = async (item, value) => {
		try {
			setLoading({ type: `UPDATE_ITEM_${item.Index}`, status: true })
			const payload: IUpdateUserProfileTemplate = {
				UserId: Number(StudentID),
				ProfileTemplateId: item.ProfileTemplateId,
				Value: value
			}

			const response = await userInformationApi.updateProfileTemplateItem(payload)
			if (response.status === 200) {
				let temp = []
				profileTemplate.map((item) => {
					if (item.ProfileTemplateId === response.data.data.ProfileTemplateId) {
						temp.push({
							...response.data.data,
							Type: item.Type,
							Index: item.Index
						})
					} else {
						temp.push(item)
					}
				})
				setProfileTemplate(temp)
				ShowNostis.success(response.data.message)
			}

			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	const _onFinish = async (params) => {
		try {
			setLoading({ type: `UPDATE_PROFILE`, status: true })

			const payload: IUpdateUserProfileTemplate = {
				UserId: Number(StudentID),
				ProfileTemplateId: profileItem.ProfileTemplateId,
				...params
			}

			const response = await userInformationApi.updateProfileTemplateItem(payload)
			if (response.status === 200) {
				let temp = []
				profileTemplate.map((item) => {
					if (item.ProfileTemplateId === response.data.data.ProfileTemplateId) {
						temp.push(response.data.data)
					} else {
						temp.push(item)
					}
				})
				setProfileTemplate(temp)
				form.setFieldsValue(null)
				setProfileItem(null)
				ShowNostis.success(response.data.message)
			}

			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	return (
		<>
			<Divider>Chứng chỉ / Chứng nhận </Divider>
			{loading.type === 'GET_ALL' && loading.status === true ? (
				<Skeleton></Skeleton>
			) : (
				<div className="grid  pt-4">
					{profileTemplate.map((item, index) => {
						return (
							<React.Fragment key={item.Id}>
								<div className="grid grid-cols-8 smartphone:grid-cols-4  gap-2 justify-between">
									<div className="col-span-4 font-[500]">{item.ProfileTemplateName}</div>
									<div className="col-span-4 d-flex justify-end items-start">
										{item.Type !== 1 ? (
											<Tag
												className="rounded-full	 px-2 cursor-pointer	"
												onClick={() => {
													form.setFieldsValue(item)
													setProfileItem(item)
												}}
												color={item.Value == 'true' ? 'green' : 'orange'}
											>
												<div className="d-flex items-center px-2">
													{item.Value == 'true' ? 'Đã có' : 'Chưa có'} <FiChevronDown size={22} />
												</div>
											</Tag>
										) : (
											<div className="d-flex w-full justify-between items-start">
												<TextArea
													value={textUpdate[index].Value}
													onChange={(e) => {
														let newValue = []
														textUpdate.forEach((i) => {
															if (i.Index === item.Index) {
																newValue.push({
																	...item,
																	Value: e.target.value
																})
															} else {
																newValue.push(i)
															}
														})

														setTextUpdate(newValue)
													}}
													rows={4}
													placeholder="Nhập thông tin"
												/>
												<IconButonUpdateUser
													isShow={textUpdate[index].Value !== profileTemplate[index].Value}
													onClick={() => updateProfileTemplateItem(item, textUpdate[index].Value)}
													loading={loading.type === `UPDATE_ITEM_${item.Index}` && loading.status === true}
												/>
											</div>
										)}
									</div>
								</div>
								<Divider></Divider>
							</React.Fragment>
						)
					})}
				</div>
			)}
			<Modal
				title={profileItem?.ProfileTemplateName}
				open={!!profileItem}
				centered
				closable={false}
				destroyOnClose
				onCancel={() => {
					form.setFieldsValue(null)
					setProfileItem(null)
				}}
				cancelText=""
				footer={false}
			>
				<Form form={form} onFinish={_onFinish} layout="vertical">
					<SelectField
						name="Value"
						label={'Trạng thái'}
						optionList={[
							{
								value: 'true',
								title: 'Đã có'
							},
							{
								value: 'false',
								title: 'Chưa có'
							}
						]}
						placeholder="Chọn trạng thái"
					/>
					<div className="d-flex justify-center gap-3">
						<PrimaryButton
							type="button"
							onClick={() => {
								form.setFieldsValue(null)
								setProfileItem(null)
							}}
							loading={loading.type === 'UPDATE_PROFILE' && loading.status === true}
							icon="cancel"
							background="orange"
						>
							Hủy
						</PrimaryButton>
						<PrimaryButton
							loading={loading.type === 'UPDATE_PROFILE' && loading.status === true}
							type="submit"
							icon="save"
							background="primary"
						>
							Cập nhật
						</PrimaryButton>
					</div>
				</Form>
			</Modal>
		</>
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
