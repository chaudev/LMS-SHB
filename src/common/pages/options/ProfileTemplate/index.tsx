import { Button, Card, Divider, Form, Input, Modal, Popconfirm, Select, Skeleton, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { DivideCircle } from 'react-feather'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { profileTemplateApi } from '~/api/profile-template'
import PrimaryTable from '~/common/components/Primary/Table'
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
	const userInfomation = useSelector((state: RootState) => state.user.information)
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

	return (
		<Card>
			<div className="px-3">
				<>
					<Divider>
						<h2 className="py-4 font-[600] text-center">Thông tin cá nhân</h2>
					</Divider>
					<div className="grid grid-cols-1 gap-1">
						{fakeDataUser.map((item, index) => (
							<>
								<div className="grid grid-cols-4 gap-4 items-center">
									<div className="col-span-1  text-gray font-[500]">{item.key}</div>
									<div className="col-span-3">{item.value}</div>
								</div>
								<Divider />
							</>
						))}
					</div>
					<Divider>
						<h2 className="py-4 font-[600] text-center">Thông tin thêm</h2>
					</Divider>
					{!!loading.status && loading.type === 'GET_ALL' ? (
						<Skeleton></Skeleton>
					) : (
						<div className="grid gap-3">
							<div className="grid grid-cols-8  gap-3">
								<div className="col-span-4 font-[600]">Tên thông tin</div>
								<div className="col-span-2 font-[600]">Kiểu</div>
								<div className="col-span-2 font-[600]"> chức năng</div>
							</div>
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
																		<div key={index} className="grid grid-cols-8 gap-2">
																			<div className="col-span-4 text-gray font-[500]">{item.Name}</div>
																			<div className="col-span-2">{item.Type === 1 ? 'Văn bản' : 'Lựa chọn'}</div>
																			<div className="col-span-2">
																				<Popconfirm
																					title="Bạn có chắc muốn xóa file này?"
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
								Thêm Thông tin
							</PrimaryButton>
						</div>
					)}
				</>
			</div>
			<Modal
				onCancel={() => {
					setIsModalOpen({ type: '', status: false })
					form.resetFields()
				}}
				title={isModalOpen.type === 'CREATE' ? 'Thêm Thông tin' : 'Cập nhật thông tin'}
				open={isModalOpen.status}
				footer={null}
			>
				<FormProfileTemplate form={form} handleCreateUpdate={handleCreateUpdate} isModalOpen={isModalOpen} />
			</Modal>
		</Card>
	)
}

export default ProfileTemplatePage
