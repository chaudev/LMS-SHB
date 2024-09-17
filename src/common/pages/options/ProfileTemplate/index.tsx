import { Card, Divider, Empty, Form, Modal, Popconfirm, Skeleton, Tag, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { profileTemplateApi } from '~/api/profile-template'
import { ShowNostis } from '~/common/utils'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryButton from '~/common/components/Primary/Button'
import FormProfileTemplate from './component/FormProfileTemplate'
import { fakeDataUser } from './component/data'
import { ImMoveDown, ImMoveUp } from 'react-icons/im'
import MySelectMajor from '~/atomic/molecules/MySelectMajor'
import clsx from 'clsx'

const ProfileTemplatePage = () => {
	const [form] = Form.useForm()
	form.getFieldsValue()
	const [loading, setLoading] = useState<{ type: '' | 'GET_ALL' | 'UPDATE' | 'CREATE'; status: boolean }>({ type: '', status: false })
	const [profileTemplates, setProfileTemplates] = useState<IProfileTemplate[]>([])
	const [isModalOpen, setIsModalOpen] = useState<{ type: '' | 'UPDATE' | 'CREATE'; status: boolean }>({ type: '', status: false })

	const [profileTemplateParams, setProfileTemplateParams] = useState({ majorId: undefined })

	const getAllProfileTemplate = async () => {
		try {
			setLoading({ type: 'GET_ALL', status: true })
			const response = await profileTemplateApi.getAll(profileTemplateParams)
			if (response.status === 200) {
				setProfileTemplates(response.data.data)
			}
			if (response.status === 204) {
				setProfileTemplates([])
			}
			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	useEffect(() => {
		getAllProfileTemplate()
	}, [profileTemplateParams?.majorId])

	const handleDragEnd = (result) => {
		if (!result.destination) return
		const newItems = Array.from(profileTemplates)
		const [reorderedItem] = newItems.splice(result.source.index, 1)
		newItems.splice(result.destination.index, 0, reorderedItem)
		setProfileTemplates(newItems)
		let temp = []
		newItems.forEach((item, index) => temp.push({ Index: index + 1, Id: item.Id }))
		changeIndexProfileTemplate(temp)
	}

	const changeIndexProfileTemplate = async (temp) => {
		try {
			const payload = { Items: temp }
			const response = await profileTemplateApi.changeIndexProfileTemplate(payload)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	const deleteItemProfileTemplate = async (params) => {
		try {
			const response = await profileTemplateApi.deleteById(params.Id)

			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				const newProfileTemplate = profileTemplates.filter((item) => item.Id !== params.Id)
				setProfileTemplates(newProfileTemplate)
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	const createProfileTemplate = async (params) => {
		try {
			setLoading({ type: 'CREATE', status: true })
			const response = await profileTemplateApi.createProfileTemplate(params)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				let newData = [...profileTemplates, response.data.data]
				setProfileTemplates(newData)
				setIsModalOpen({ type: '', status: false })
				form.resetFields()
			}
			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}
	const updataeProfileTemplate = async (params) => {
		try {
			setLoading({ type: 'UPDATE', status: true })
			const response = await profileTemplateApi.updateProfileTemplate(params)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				let newProfileTemplates = []
				profileTemplates.map((item) => {
					if (item.Id === params.Id) {
						newProfileTemplates.push(response.data.data)
					} else {
						newProfileTemplates.push(item)
					}
				})
				setProfileTemplates(newProfileTemplates)
				setIsModalOpen({ type: '', status: false })
				form.resetFields()
			}
			setLoading({ type: '', status: false })
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading({ type: '', status: false })
		}
	}

	const openModalCreate = () => {
		form.resetFields()
		form.setFieldsValue({ MajorIds: profileTemplateParams?.majorId ? [profileTemplateParams?.majorId] : undefined })
		setIsModalOpen({ type: 'CREATE', status: true })
	}

	const openModalUpdate = (params) => {
		form.setFieldsValue({
			...params,
			Type: String(params.Type),
			MajorIds: params?.MajorIds ? params?.MajorIds?.split(',').map((item) => Number(item)) : undefined
		})
		setIsModalOpen({ type: 'UPDATE', status: true })
	}

	const handleCreateUpdate = async (params) => {
		if (isModalOpen.type === 'CREATE') {
			await createProfileTemplate({ ...params, MajorIds: params?.MajorIds ? params?.MajorIds?.toString() : undefined })
		} else {
			await updataeProfileTemplate({ ...params, MajorIds: params?.MajorIds ? params?.MajorIds?.toString() : undefined })
		}
	}

	const onCancelModal = () => {
		setIsModalOpen({ type: '', status: false })
		form.resetFields()
	}

	const handleMoveItem = async (index: number, item: any, type: string) => {
		const temp = [...profileTemplates]
		const move = profileTemplates[index]

		if (type == 'up') {
			temp[index] = profileTemplates[index - 1]
			temp[index - 1] = move

			let payload = []
			temp.forEach((item, index) => payload.push({ Index: index + 1, Id: item.Id }))
			changeIndexProfileTemplate(payload)
		} else {
			temp[index] = profileTemplates[index + 1]
			temp[index + 1] = move
			let payload = []
			temp.forEach((item, index) => payload.push({ Index: index + 1, Id: item.Id }))
			changeIndexProfileTemplate(payload)
		}

		await setProfileTemplates(temp)
	}
	return (
		<div className="d-flex justify-center">
			<Card className=" w-full max-w-[1200px] ">
				<div className="w1000:px-3">
					<Divider>
						<h2 className="py-4 font-[600] text-center">Thông tin cá nhân</h2>
					</Divider>
					<div className="grid grid-cols-1 gap-1">
						{fakeDataUser.map((item, index) => (
							<>
								<div className="grid grid-cols-4 gap-4 items-center">
									<div className="col-span-1   font-[500]">{item.key}</div>
									<div className="col-span-3">{item.value}</div>
								</div>
								<Divider />
							</>
						))}
					</div>
					<Divider className="font-[600]">
						<h2 className="py-4 font-[600] text-center">Thông tin Thêm</h2>
					</Divider>
					<div className="w-[400px] mt-[-12px] mb-[24px]">
						<MySelectMajor value={profileTemplateParams?.majorId} onChange={(val) => setProfileTemplateParams({ majorId: val })} />
					</div>
					{!!loading.status && loading.type === 'GET_ALL' ? (
						<Skeleton></Skeleton>
					) : (
						<div className="grid gap-3">
							<div className="">
								{!profileTemplates?.length ? (
									<Empty className="mb-[16px]" />
								) : (
								profileTemplates.map((item, index) => {
									return (
										<div className="">
											<div key={index} className="flex justify-between gap-4">
												<div className="">
													<div className="flex gap-[16px]">
														<div className="font-[500]">{item.Name}</div>
														<div className="d-flex items-center">
															<Tag className="rounded-lg px-2  cursor-pointer" color={item.Type == 1 ? 'blue' : 'green'}>
																<div className="d-flex items-center font-medium px-2">{item.Type === 1 ? 'Văn bản' : 'Lựa chọn'}</div>
															</Tag>
														</div>
													</div>
													<div className="flex gap-[12px] mt-[8px]">
														<span className="font-medium text-[12px] whitespace-nowrap">Chương trình học:</span>
														{!item?.Majors?.length ? (
															'-'
														) : (
															<div className="flex flex-wrap gap-[8px]">
																{item?.Majors?.map((item) => {
																	return (
																		<Tag
																			key={item.Id}
																			// color={item.Id === profileTemplateParams?.majorId ? 'volcano' : undefined}
																			className={clsx('rounded-lg m-0', { 'font-medium': item.Id === profileTemplateParams?.majorId })}
																		>
																			{item.Name}
																		</Tag>
																	)
																})}
															</div>
														)}
													</div>
												</div>
												<div className="d-flex justify-center">
													{index !== 0 && (
														<div
															className="flex items-center icon   cursor-pointer px-2 btn-icon"
															onClick={() => handleMoveItem(index, item, 'up')}
														>
															<Tooltip title={'Di chuyển lên trên'}>
																<ImMoveUp size={22} color="#0068ac" />
															</Tooltip>
														</div>
													)}
													{index + 1 < profileTemplates.length && (
														<div
															className="flex items-center icon  cursor-pointer px-2 btn-icon"
															onClick={() => handleMoveItem(index, item, 'down')}
														>
															<Tooltip title={'Di chuyển xuống dưới'}>
																<ImMoveDown size={22} color="#007134" />
															</Tooltip>
														</div>
													)}
													<IconButton
														type="button"
														icon="edit"
														color="green"
														onClick={() => {
															openModalUpdate(item)
														}}
														className=""
														tooltip="Cập nhật thông tin"
													/>
													<Popconfirm
														title="Bạn có chắc muốn xóa thông tin này?"
														okText="Có"
														cancelText="Hủy"
														onConfirm={() => deleteItemProfileTemplate(item)}
													>
														<IconButton
															type="button"
															icon="remove"
															color="red"
															onClick={() => {}}
															className=""
															tooltip="Xóa Thông tin này"
														/>
													</Popconfirm>
												</div>
											</div>
											<Divider></Divider>
										</div>
									)
								})
								)}
							</div>
							<PrimaryButton onClick={() => openModalCreate()} type="button" icon="add" background="primary">
								Thêm thông tin
							</PrimaryButton>
						</div>
					)}
				</div>
				<Modal
					onCancel={onCancelModal}
					title={isModalOpen.type === 'CREATE' ? 'Thêm thông tin' : 'Cập nhật thông tin'}
					open={isModalOpen.status}
					footer={null}
				>
					<FormProfileTemplate
						form={form}
						handleCreateUpdate={handleCreateUpdate}
						isModalOpen={isModalOpen}
						onCancelModal={onCancelModal}
					/>
				</Modal>
			</Card>
		</div>
	)
}

export default ProfileTemplatePage
