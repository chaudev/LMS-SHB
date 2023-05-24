import { Form, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { majorsApi } from '~/api/majors/majors'
import InputTextField from '~/common/components/FormControl/InputTextField'
import TextBoxField from '~/common/components/FormControl/TextBoxField'
import UploadImageField from '~/common/components/FormControl/UploadImageField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNoti } from '~/common/utils'
import InputNumberField from '~/common/components/FormControl/InputNumberField'
import SelectField from '~/common/components/FormControl/SelectField'

type I = {
	mode: 'add' | 'edit' | 'delete'
	dataRow?: any
	onRefresh?: Function
	setOpen?: Function
}

export const ModalMajorsCRUD: React.FC<I> = ({ mode, dataRow, onRefresh, setOpen }) => {
	const [visible, setVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()

	const onClose = () => {
		setVisible(false)
	}
	const onOpen = () => {
		setVisible(true)
		setOpen && setOpen(null)
	}

	useEffect(() => {
		if (dataRow) {
			form.setFieldsValue(dataRow)
		}
	}, [dataRow])

	const handleCreate = async (data) => {
		try {
			setIsLoading(true)
			const res = await majorsApi.add(data)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				onRefresh && onRefresh()
				form.resetFields()
				onClose()
			}
		} catch (error) {
			setIsLoading(true)
			ShowNoti('success', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleUpdate = async (data) => {
		try {
			setIsLoading(true)
			const res = await majorsApi.update(data)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				onRefresh && onRefresh()
				form.resetFields()
				onClose()
			}
		} catch (error) {
			setIsLoading(true)
			ShowNoti('success', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const handleRemove = async (data) => {
		try {
			setIsLoading(true)
			const res = await majorsApi.delete(data?.Id)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
				onRefresh && onRefresh()
				onClose()
			}
		} catch (error) {
			setIsLoading(true)
			ShowNoti('success', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	const _onSubmit = (data) => {
		if (mode !== 'add') {
			data.Id = dataRow?.Id
		}

		if (mode === 'add') {
			handleCreate(data)
		}
		if (mode === 'edit') {
			handleUpdate(data)
		}
		if (mode === 'delete') {
			handleRemove(data)
		}
	}
	return (
		<>
			{mode == 'add' && (
				<PrimaryButton
					background="green"
					type="button"
					children={<span>Tạo mới</span>}
					icon="add"
					onClick={() => {
						onOpen()
					}}
				/>
			)}
			{mode == 'edit' && (
				<>
					<div
						className="flex items-center cursor-pointer"
						onClick={() => {
							onOpen()
						}}
					>
						<IconButton type="button" icon={'edit'} color="yellow" className="Sửa" tooltip="Sửa" />
					</div>
				</>
			)}
			{mode == 'delete' && (
				<>
					<div
						// className="flex items-center cursor-pointer"
						onClick={() => {
							onOpen()
						}}
					>
						<IconButton type="button" icon={'remove'} color="red" className="" tooltip="Xóa" />
					</div>
				</>
			)}

			<Modal
				title={mode === 'add' ? 'Thêm mới' : mode === 'edit' ? 'Cập nhật' : 'Xác nhận xóa'}
				open={visible}
				onCancel={onClose}
				footer={
					<>
						<PrimaryButton onClick={() => onClose()} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							loading={isLoading}
							onClick={() => form.submit()}
							className="ml-2"
							background="blue"
							icon={mode == 'delete' ? 'remove' : mode == 'add' ? 'add' : 'save'}
							type="button"
							children={mode == 'delete' ? 'Xóa' : mode == 'add' ? 'Thêm mới' : 'Cập nhật'}
						/>
					</>
				}
				width={mode != 'delete' ? 500 : 400}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={_onSubmit}>
						<div className="grid grid-cols-2 gap-x-4 antd-custom-wrap">
							{mode == 'delete' && (
								<div className="col-span-2 mb-4 text-center text-[16px]">
									<p>Bạn có chắc muốn xóa?</p>
								</div>
							)}
							{mode != 'delete' && (
								<>
									<div className="col-span-2">
										<UploadImageField form={form} name="Thumbnail" label="Hình ảnh" />
									</div>
									<div className="col-span-2">
										<InputTextField
											isRequired
											rules={[{ required: true, message: 'Bạn không được để trống!' }]}
											label="Ngành học"
											name="Name"
											placeholder="Nhập ngành học"
										/>
									</div>
									<div className="col-span-2">
										<InputNumberField
											isRequired
											rules={[{ required: true, message: 'Bạn không được để trống!' }]}
											label="Giá"
											name="Price"
											placeholder="Nhập giá"
										/>
									</div>
									{mode === 'edit' ? (
										<div className="col-span-2">
											<SelectField
												isRequired
												rules={[{ required: true, message: 'Bạn không được để trống!' }]}
												label="Trạng thái"
												name="Status"
												placeholder="Cập nhật trạng thái"
												optionList={[
													{
														value: 1,
														title: 'Mở khóa học'
													},
													{
														value: 2,
														title: 'Đóng khóa học'
													}
												]}
											/>
										</div>
									) : (
										''
									)}
									<TextBoxField className="col-span-2" name="Description" label="Mô tả" />
								</>
							)}
						</div>
					</Form>
				</div>
			</Modal>
		</>
	)
}
