import { Divider, Form, Modal, Progress, Skeleton, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectField from '../../FormControl/SelectField'
import PrimaryButton from '../../Primary/Button'
import TextArea from 'antd/lib/input/TextArea'
import IconButonUpdateUser from './IconButonUpdateUser'
import { useRouter } from 'next/router'
import { userInformationApi } from '~/api/user/user'
import { ShowNostis } from '~/common/utils'
import { FiChevronDown } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { useRole } from '~/common/hooks/useRole'

const UserProfileTemplate = () => {
	const router = useRouter()
	const [form] = Form.useForm()
	const { StudentID } = router.query
	const userInfomation = useSelector((state: RootState) => state.user.information)
	const [loading, setLoading] = useState<{ type: string; status: boolean }>({ type: '', status: false })
	const [profileTemplate, setProfileTemplate] = useState([])
	const [profileItem, setProfileItem] = useState<IUserProfileTemplateItem | null>(null)
	const [textUpdate, setTextUpdate] = useState<IUserProfileTemplateItem[]>([])
	const [rateCompleted, setRateCompleted] = useState<number>(0)

	const { isParents, isStudent, isTeacher } = useRole()

	const getAllProfileTemplate = async () => {
		try {
			setLoading({ type: 'GET_ALL', status: true })
			const response = await userInformationApi.getAllProfileTemplate(String(StudentID))
			if (response.status === 200) {
				setTextUpdate(response.data.data)
				setProfileTemplate(response.data.data)
				setRateCompleted(response.data.rateCompleted)
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

	const UpdateProfileTemplate = async (payload) => {
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
	}

	const updateProfileTemplateText = async (item, value) => {
		try {
			setLoading({ type: `UPDATE_ITEM_${item.Index}`, status: true })
			const payload: IUpdateUserProfileTemplate = {
				UserId: Number(StudentID),
				ProfileTemplateId: item.ProfileTemplateId,
				Value: value
			}
			await UpdateProfileTemplate(payload)
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

			await UpdateProfileTemplate(payload)
			const response = await userInformationApi.getAllProfileTemplate(String(StudentID))
			if (response.status === 200) {
				setTextUpdate(response.data.data)
				setProfileTemplate(response.data.data)
				setRateCompleted(response.data.rateCompleted)
			}
			if (response.status === 204) {
				setProfileTemplate([])
			}
			setLoading({ type: '', status: false })
			onCancelModal()
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	const onCancelModal = () => {
		form.setFieldsValue(null)
		setProfileItem(null)
	}

	const isDisable = () => {
		// ko cho giáo  viên + học viên + phụ huynh cập nhật thông tin
		return isTeacher || isStudent || isParents ? true : false
	}

	return (
		<>
			<Divider>
				<h2 className="py-3 font-[600] text-center">Thông tin thêm</h2>
			</Divider>
			{loading.type === 'GET_ALL' && loading.status === true ? (
				<Skeleton></Skeleton>
			) : (
				<div className=" ">
					<div className="w-full mb-4">
						<Progress percent={rateCompleted} />
					</div>

					{profileTemplate.map((item, index) => {
						return (
							<React.Fragment key={item.Id}>
								<div className="grid grid-cols-4 tablet:grid-cols-8  gap-2 justify-between">
									<div className="col-span-4 font-[500]">{item.ProfileTemplateName}</div>
									<div className="col-span-4  d-flex justify-start tablet:justify-end items-start">
										{item.Type !== 1 ? (
											<Tag
												className={`rounded-full	px-2 ${'cursor-pointer'}`}
												onClick={() => {
													if (isDisable()) {
														return
													}
													form.setFieldsValue(item)
													setProfileItem(item)
												}}
												color={item.Value == 'true' ? 'green' : item.Value == 'false' ? 'orange' : 'magenta'}
											>
												<div className="d-flex items-center px-2">
													{item.Value == 'true' ? 'Đã có' : item.Value == 'false' ? 'Chưa có' : 'Không cần'} <FiChevronDown size={22} />
												</div>
											</Tag>
										) : (
											<div className="d-flex w-full justify-between items-start">
												<TextArea
													value={textUpdate[index].Value}
													disabled={isDisable()}
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
													onClick={() => updateProfileTemplateText(item, textUpdate[index].Value)}
													loading={loading.type === `UPDATE_ITEM_${item.Index}` && loading.status === true}
												/>
											</div>
										)}
									</div>
								</div>
								{index === profileTemplate.length ? '' : <Divider></Divider>}
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
				onCancel={onCancelModal}
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
							},
							{
								value: '',
								title: 'Không cần'
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

export default UserProfileTemplate
