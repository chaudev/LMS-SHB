import { Form, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { profileStatusApi } from '~/api/profile-status'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNoti } from '~/common/utils'

type I = {
	mode: 'add' | 'edit' | 'delete'
	dataRow?: any
	onRefresh?: Function
	setOpen?: Function
}
export const ModalProfileStatusCRUD: React.FC<I> = ({ mode, dataRow, onRefresh, setOpen }) => {
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
			const res = await profileStatusApi.add(data)
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
			const res = await profileStatusApi.update(data)
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
			const res = await profileStatusApi.delete(data?.Id)
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
						className="flex items-center cursor-pointer"
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
				onCancel={onClose}	centered
				footer={
					<>
						<PrimaryButton onClick={() => onClose()} className='btn-outline' background="transparent" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							loading={isLoading}
							onClick={() => form.submit()}
							className="ml-2"
							background={mode === 'add' ? 'green' : mode === 'edit' ? 'primary' : 'red'}
							icon={mode === 'add' ? 'add' : mode === 'edit' ? 'save' : 'remove'}
							type="button"
							children={mode === 'add' ? 'Thêm mới' : mode === 'edit' ? 'Cập nhật' : 'Xóa'}
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
										<InputTextField
											isRequired
											rules={[{ required: true, message: 'Bạn không được để trống!' }]}
											label="Trình trạng"
											name="Name"
											placeholder="Nhập tình trạng"
										/>
									</div>
								</>
							)}
						</div>
					</Form>
				</div>
			</Modal>
		</>
	)
}
