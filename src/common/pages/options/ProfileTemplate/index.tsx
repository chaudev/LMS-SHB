import { Card, Divider, Form, Modal, Popconfirm, Skeleton, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { profileTemplateApi } from '~/api/profile-template'
import { ShowNostis } from '~/common/utils'
import { RootState } from '~/store'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryButton from '~/common/components/Primary/Button'
import FormProfileTemplate from './component/FormProfileTemplate'
import { fakeDataUser } from './component/data'

const ProfileTemplatePage = () => {
	const [form] = Form.useForm()
	form.getFieldsValue()
	const [loading, setLoading] = useState<{ type: '' | 'GET_ALL' | 'UPDATE' | 'CREATE'; status: boolean }>({ type: '', status: false })
	const [profileTemplates, setProfileTemplates] = useState<IProfileTemplate[]>([])
	const [isModalOpen, setIsModalOpen] = useState<{ type: '' | 'UPDATE' | 'CREATE'; status: boolean }>({ type: '', status: false })

	const getAllProfileTemplate = async () => {
		try {
			setLoading({ type: 'GET_ALL', status: true })
			const response = await profileTemplateApi.getAll()
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
	}, [])

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
		setIsModalOpen({ type: 'CREATE', status: true })
	}

	const openModalUpdate = (params) => {
		form.setFieldsValue({ ...params, Type: String(params.Type) })
		setIsModalOpen({ type: 'UPDATE', status: true })
	}

	const handleCreateUpdate = async (params) => {
		if (isModalOpen.type === 'CREATE') {
			await createProfileTemplate(params)
		} else {
			await updataeProfileTemplate(params)
		}
	}

	const onCancelModal = () => {
		setIsModalOpen({ type: '', status: false })
		form.resetFields()
	}
	return (
		<div className="d-flex justify-center">
			<Card className=" w-full max-w-[1200px] ">
				<div className='w1000:px-3'>
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
					{!!loading.status && loading.type === 'GET_ALL' ? (
						<Skeleton></Skeleton>
					) : (
						<div className="grid gap-3">
							<DragDropContext onDragEnd={handleDragEnd}>
								<Droppable droppableId={`profile-template`}>
									{(provided) => {
										return (
											<div className="" {...provided.droppableProps} ref={provided.innerRef}>
												{profileTemplates.map((item, index) => {
													return (
														<Draggable key={`index-${index}`} draggableId={`ItemCurriculum${item.Id}`} index={index}>
															{(providedDrag, snip) => {
																return (
																	<div
																		className=""
																		{...providedDrag.draggableProps}
																		{...providedDrag.dragHandleProps}
																		ref={providedDrag.innerRef}
																	>
																		<div key={index} className="grid grid-cols-4 gap-2">
																			<div className="col-span-4  font-[500]">{item.Name}</div>
																			<div className="col-span-2">
																				<Tag className="rounded-full px-2  cursor-pointer" color={item.Type == 1 ? 'blue' : 'green'}>
																					<div className="d-flex items-center px-2">{item.Type === 1 ? 'Văn bản' : 'Lựa chọn'}</div>
																				</Tag>
																			</div>
																			<div className="col-span-2 d-flex justify-end">
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
															}}
														</Draggable>
													)
												})}
											</div>
										)
									}}
								</Droppable>
							</DragDropContext>
							<PrimaryButton onClick={() => openModalCreate()} type="button" icon="add" background="blue">
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
