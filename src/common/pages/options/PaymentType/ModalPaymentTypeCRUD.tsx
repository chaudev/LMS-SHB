import { Form, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { paymentTypeApi } from '~/api/payment-type'
import InputNumberField from '~/common/components/FormControl/InputNumberField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import UploadImageField from '~/common/components/FormControl/UploadImageField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNoti } from '~/common/utils'
import { TablePaymentTypeDetail } from './TablePaymentTypeDetail'

type I = {
	mode: 'add' | 'edit' | 'delete' | 'edit-detail'
	dataRow?: any
	onRefresh?: Function
	setOpen?: Function
}
export const ModalPaymentTypeCRUD: React.FC<I> = ({ mode, dataRow, onRefresh, setOpen }) => {
	const [visible, setVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()
	const [dataDetail, setDataDetail] = useState([])
	const [loading, setLoading] = useState(false)

	const onClose = () => {
		setVisible(false)
	}
	const onOpen = () => {
		setVisible(true)
		setOpen && setOpen(null)
	}

	const getDetail = async (Id) => {
		try {
			setLoading(true)
			const res = await paymentTypeApi.getDetail(Id)
			if (res.status === 200) {
				setDataDetail(res.data?.data)
			}
		} catch (error) {
			setLoading(true)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (dataRow) {
			form.setFieldsValue(dataRow)
		}
		if (mode === 'edit-detail' && dataRow?.Id) {
			getDetail(dataRow?.Id)
		}
	}, [dataRow])

	const handleCreate = async (data) => {
		try {
			setIsLoading(true)
			const res = await paymentTypeApi.add(data)
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
			const res = await paymentTypeApi.update(data)
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
			const res = await paymentTypeApi.delete(data?.Id)
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

	const handleUpdateDetail = async (data) => {
		try {
			setIsLoading(true)
			const res = await paymentTypeApi.updateDetail(data)
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

		if (mode === 'edit-detail') {
			const dataSubmit = {
				PaymentTypeId: dataRow?.Id
			}
			handleUpdateDetail(dataSubmit)
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

			{mode == 'edit-detail' && (
				<>
					<div
						className="flex items-center cursor-pointer"
						onClick={() => {
							onOpen()
						}}
					>
						<IconButton type="button" icon={'info'} color="blue" className="" tooltip="Thông tin số lần" />
					</div>
				</>
			)}

			<Modal
				title={mode === 'add' ? 'Thêm mới' : mode === 'edit' ? 'Cập nhật' : mode === 'edit-detail' ? 'Số lần đóng tiền' : 'Xác nhận xóa'}
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
							icon={mode !== 'delete' ? 'save' : 'remove'}
							type="button"
							children={mode !== 'delete' ? 'Lưu' : 'Xóa'}
						/>
					</>
				}
				width={mode === 'edit-detail' ? 1000 : mode != 'delete' ? 500 : 400}
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
									{mode !== 'edit-detail' ? (
										<>
											<div className="col-span-2">
												<UploadImageField form={form} name="Thumbnail" label="Hình ảnh" />
											</div>
											<div className="col-span-2">
												<InputTextField
													isRequired
													rules={[{ required: true, message: 'Bạn không được để trống!' }]}
													label="Hình thức"
													name="Name"
													placeholder="Nhập hình thức"
												/>
											</div>
											<div className="col-span-2">
												<InputNumberField
													isRequired
													rules={[{ required: true, message: 'Bạn không được để trống!' }]}
													label="Số lần"
													name="Times"
													placeholder="Nhập số lần"
												/>
											</div>
										</>
									) : (
										<div className="col-span-2">
											<TablePaymentTypeDetail loading={loading} setDataDetail={setDataDetail} dataDetail={dataDetail} />
										</div>
									)}
								</>
							)}
						</div>
					</Form>
				</div>
			</Modal>
		</>
	)
}
