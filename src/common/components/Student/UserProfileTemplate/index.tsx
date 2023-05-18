import { Divider, Form, Modal, Skeleton, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import SelectField from '../../FormControl/SelectField'
import PrimaryButton from '../../Primary/Button'
import TextArea from 'antd/lib/input/TextArea'
import IconButonUpdateUser from './IconButonUpdateUser'
import { useRouter } from 'next/router'
import { userInformationApi } from '~/api/user'
import { ShowNostis } from '~/common/utils'
import { FiChevronDown } from 'react-icons/fi'

const UserProfileTemplate = () => {
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

	return (
		<>
			<Divider>
				<h2 className="py-4 font-[600] text-center">Thông tin Thêm</h2>
			</Divider>
			{loading.type === 'GET_ALL' && loading.status === true ? (
				<Skeleton></Skeleton>
			) : (
				<div className="grid  pt-4">
					{profileTemplate.map((item, index) => {
						return (
							<React.Fragment key={item.Id}>
								<div className="grid grid-cols-4 tablet:grid-cols-8  gap-2 justify-between">
									<div className="col-span-4 font-[500]">{item.ProfileTemplateName}</div>
									<div className="col-span-4  d-flex justify-start tablet:justify-end items-start">
										{item.Type !== 1 ? (
											<Tag
												className="rounded-full	px-2 cursor-pointer"
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

export default UserProfileTemplate
