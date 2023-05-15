import { Card, Checkbox, Divider, Form, Select, Skeleton, Tag } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { areaApi, districtApi, wardApi } from '~/api/area'
import { branchApi } from '~/api/branch'
import { learningNeedApi } from '~/api/learning-needs'
import { purposeApi } from '~/api/purpose'
import { sourceApi } from '~/api/source'
import { userInformationApi } from '~/api/user'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import DatePickerField from '../FormControl/DatePickerField'
import InputTextField from '../FormControl/InputTextField'
import SelectField from '../FormControl/SelectField'
import TextBoxField from '../FormControl/TextBoxField'
import PrimaryButton from '../Primary/Button'
import TextArea from 'antd/lib/input/TextArea'

export interface ITabStudentDetailProps {
	StudentDetail: IUserResponse
}

export default function TabStudentDetail(props: ITabStudentDetailProps) {
	const { StudentDetail } = props
	const [optionList, setOptionList] = useState({ branch: [], purpose: [], area: [], source: [], learningNeed: [], sale: [] })
	const [district, setDistrict] = useState([])
	const [ward, setWard] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()
	const router = useRouter()

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
		}
	}, [StudentDetail])

	const _onSubmit = async (data) => {
		setIsLoading(true)
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
			setIsLoading(false)
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const customLable = (label) => {
		return <div className="text-gray font-[500]">{label}</div>
	}

	return (
		<div>
			<>
				<Divider>
					<h2 className="py-4 font-[600] text-center">Thông tin cá nhân</h2>
				</Divider>
				<Form form={form} labelAlign="left" onFinish={_onSubmit} labelCol={{ span: 4 }}>
					<InputTextField className="border-none" name="FullName" label={customLable(labelUser.FullName)} />
					<Divider />
					<InputTextField className="border-none" name="UserName" label={customLable(labelUser.UserName)} />
					<Divider />

					<InputTextField className="border-none" name="Email" label={customLable(labelUser.Email)} />
					<Divider />
					<SelectField
						name="Gender"
						className="border-none"
						label={customLable(labelUser.Gender)}
						optionList={[
							{ value: 0, title: 'Khác' },
							{ value: 1, title: 'Nam' },
							{ value: 2, title: 'Nữ' }
						]}
					/>
					<Divider />
					<DatePickerField
						classNamePicker="border-none"
						label={customLable(labelUser.DOB)}
						name="DOB"
						mode="single"
						format="DD/MM/YYYY"
						allowClear={true}
					/>
					<Divider />
					<SelectField
						name="StatusId"
						className="border-none"
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
						placeholder="Chọn trạng thái hoạt động"
					/>

					<TextBoxField name="Extension" label={customLable(labelUser.Extension)} />

					<Divider>Địa chỉ</Divider>

					<SelectField
						className="border-none"
						name="BranchIds"
						label={customLable(labelUser.Branch)}
						optionList={optionList.branch}
						onChangeSelect={(data) => {}}
					/>

					<InputTextField className="border-none" name="Address" label={customLable(labelUser.Address)} />

					<SelectField
						name="AreaId"
						className="border-none"
						label={customLable(labelUser.Area)}
						placeholder="Chọn tỉnh/thành phố"
						optionList={optionList.area}
						onChangeSelect={(data) => {
							getDistrict(data)
						}}
					/>

					<SelectField
						className="border-none"
						disabled={district.length > 0 ? false : true}
						name="DistrictId"
						label={customLable(labelUser.District)}
						placeholder="Chọn quận/huyện"
						optionList={district}
						onChangeSelect={(data) => {
							getWard(data)
						}}
					/>

					<SelectField
						className="border-none"
						disabled={ward.length > 0 ? false : true}
						placeholder="Chọn phường/xã"
						label={customLable(labelUser.Ward)}
						name="WardId"
						optionList={ward}
					/>

					{router.query.StudentID && (
						<>
							<Divider>Thông tin học</Divider>
							<SelectField className="border-none" name="LearningNeedId" label="Nhu cầu học" optionList={optionList.learningNeed} />
							<SelectField className="border-none" name="SourceId" label="Nguồn khách hàng" optionList={optionList.source} />
							<SelectField className="border-none" name="SaleId" label="Tư vấn viên" optionList={optionList.sale} />
							<SelectField className="border-none" name="PurposeId" label="Mục đích học" optionList={optionList.purpose} />
						</>
					)}
					<UserProfileTemplate StudentDetail={StudentDetail} />

					<div className="row mt-3">
						<div className="col-12 flex justify-end">
							<PrimaryButton
								background="blue"
								type="submit"
								loading={isLoading}
								children={<span>Lưu</span>}
								icon="save"
								onClick={() => {}}
							/>
						</div>
					</div>
				</Form>
			</>
		</div>
	)
}

const UserProfileTemplate = ({ StudentDetail }) => {
	const router = useRouter()

	const { StudentID } = router.query
	const [loading, setLoading] = useState<{ type: string; status: boolean }>({ type: '', status: false })
	const [profileTemplate, setProfileTemplate] = useState([])
	console.log(StudentDetail)

	const getAllProfileTemplate = async () => {
		try {
			setLoading({ type: 'GET_ALL', status: true })
			const response = await userInformationApi.getAllProfileTemplate(String(StudentID))
			if (response.status === 200) {
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
			setLoading({ type: `UPDATE_${item.Id}`, status: true })
			const payload: IUpdateUserProfileTemplate = {
				UserId: Number(StudentID),
				ProfileTemplateId: item.ProfileTemplateId,
				value: value
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
			}
			console.log('response', response)

			console.log(item)
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
				<div className="grid gap-4 pt-4">
					{profileTemplate.map((item) => {
						return (
							<React.Fragment key={item.Id}>
								<div key={item.Id} className="grid grid-cols-8 gap-2 justify-between">
									<div className="col-span-4 font-[500]">{item.Name}</div>
									<div className="col-span-4 d-flex justify-end">
										{item.Type !== 1 ? (
											<Select
												className={`primary-input border-none`}
												// showSearch
												// allowClear 
												showArrow
												value={item.Value}
												// loading={isLoading}
												// style={style}
												// placeholder={placeholder}
												// optionFilterProp="children"
												// disabled={disabled}
												onChange={(value) => {
													updateProfileTemplateItem(item, value)
												}} 
												loading={loading.type ===`Update_${item.Id}` && loading.status=== true}
												 style={{ width: '100%' }}
												tagRender={(props) => {
													console.log('tagRender',props);
													
													return (
														<Tag
															color="#87d068"
															// onMouseDown={onPreventMouseDown}
															// closable={closable}
															// onClose={onClose}
															// style={{ marginRight: 3 }}
														>
															{props.label}
														</Tag>
													)
												}}
											>
												{[
													{
														value: 'true',
														title: 'Đã có'
													},
													{
														value: 'false',
														title: 'Chưa có'
													}
												].map((o, idx) => (
													<Select.Option key={idx} value={o.value}>
														{o.title}
													</Select.Option>
												))}
											</Select>
										) : (
											<TextArea rows={4} placeholder="can resize" />
										)}
									</div>
								</div>
								<Divider> </Divider>
							</React.Fragment>
						)
					})}
				</div>
			)}
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
