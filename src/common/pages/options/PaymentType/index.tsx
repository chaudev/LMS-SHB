import { nanoid } from '@reduxjs/toolkit'
import { Form, Input, Modal, Popconfirm } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { paymentTypeApi } from '~/api/option/payment-type'
import { studyRouteTemplateApi } from '~/api/option/study-route-template'
import MyInfo from '~/atomic/atoms/MyInfo'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import InputNumberField from '~/common/components/FormControl/InputNumberField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

const PaymentTypePage = () => {
	const [form] = Form.useForm()
	const router = useRouter()
	const { slug } = router.query
	const initParamters = {
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		search: null
	}

	const [apiParameters, setApiParameters] = useState(initParamters)
	const [totalRow, setTotalRow] = useState(1)
	const [loading, setLoading] = useState<string>('')
	const [paymentType, setPaymentType] = useState<IPaymentType[]>([])
	const [paymentTypeItem, setPaymentTypeItem] = useState<IPaymentType>()
	const [isShow, setIsShow] = useState<'' | 'CREATE' | 'UPDATE'>('')

	const getAllPaymentType = async () => {
		try {
			setLoading('GET_ALL')
			const res = await paymentTypeApi.getAllPaymentType({ ...apiParameters, majorId: slug })

			if (res.status === 200) {
				setPaymentType(res.data.data)
				setTotalRow(res.data.totalRow)
			}
			if (res.status === 204) {
				setPaymentType([])
				setTotalRow(1)
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	useEffect(() => {
		if (slug) {
			getAllPaymentType()
		}
	}, [apiParameters, slug])

	useEffect(() => {
		if (isShow === 'UPDATE' && paymentTypeItem) {
			form.setFieldsValue(paymentTypeItem)
		} else {
			form.resetFields()
		}
	}, [paymentTypeItem])

	const columns = [
		{
			title: 'Tên',
			dataIndex: 'Name',
			className: 'font-weight-primary'
		},
		{
			title: 'Số lần',
			dataIndex: 'Times'
		},
		{
			width: 200,
			title: 'Chức năng',
			dataIndex: '',
			fixed: 'right',
			render: (data, item) => {
				return (
					<div className="d-fex gap-3">
						<Popconfirm
							title={
								<p>
									Xóa hình thức thanh toán <span className="font-[500] text-[red]">{item.Name}</span>
								</p>
							}
							okText="Xóa"
							cancelText="Hủy"
							onConfirm={() => deletePaymentTypeItem(item)}
						>
							<IconButton
								loading={loading === `DELETE_${item.Id}`}
								tooltip="Xóa hình thức thanh toán"
								type="button"
								icon="remove"
								color="red"
							></IconButton>
						</Popconfirm>

						<IconButton
							onClick={() => {
								setPaymentTypeItem(item)
								setIsShow('UPDATE')
							}}
							tooltip="Cập nhật hình thức thanh toán"
							type="button"
							icon="edit"
							color="yellow"
						></IconButton>
						<Link
							href={{
								pathname: '/majors/payment-type/detail',
								query: { slug: item.Id, key: nanoid(), name: item.Name }
							}}
						>
							<a>
								<IconButton
									// onClick={() => {
									// 	router.push({ pathname: '/options/payment-type/detail', query: { slug: item.Id, key: nanoid(), name: item.Name } })
									// }}
									tooltip="Xem chi tiết hình thức thanh toán"
									type="button"
									icon="eye"
									color="yellow"
								></IconButton>
							</a>
						</Link>
					</div>
				)
			}
		}
	]

	const deletePaymentTypeItem = async (item) => {
		try {
			setLoading(`DELETE_${item.Id}`)
			const response = await paymentTypeApi.deletePaymentType(item.Id)
			if (response.status == 200) {
				ShowNostis.success(response.data.message)
				getAllPaymentType()
			}
			setLoading(``)
		} catch (error) {
			setLoading(``)
			ShowErrorToast(error)
		}
	}

	const _onFinish = async (params) => {
		try {
			if (isShow === 'CREATE') {
				setLoading('CREATING')
				const response = await paymentTypeApi.createPaymentType({ ...params, MajorId: slug })
				if (response.status === 200) {
					ShowNostis.success(response.data.message)
					await getAllPaymentType()
					form.resetFields()
					setIsShow('')
				}
			}
			if (isShow === 'UPDATE') {
				setLoading('UPDATING')
				const payload = {
					Id: paymentTypeItem.Id,
					Name: params.Name
				}
				const response = await paymentTypeApi.updatePaymentType(payload)
				if (response.status === 200) {
					ShowNostis.success(response.data.message)
					await getAllPaymentType()
					setIsShow('')
				}
			}
		} catch (error) {
			ShowErrorToast(error)
		} finally {
			setLoading('')
		}
	}

	return (
		<>
			<PrimaryTable
				onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
				data={paymentType}
				total={totalRow}
				loading={loading === 'GET_ALL'}
				columns={columns}
				pageSize={apiParameters.pageSize}
				TitleCard={
					<Input.Search
						className="primary-search max-w-[250px] ml-[8px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
							}
						}}
						loading={loading === 'GET_ALL'}
						onSearch={(event) => setApiParameters({ ...apiParameters, pageIndex: 1, search: event })}
						placeholder="Tìm kiếm"
					/>
				}
				Extra={
					<PrimaryButton onClick={() => setIsShow('CREATE')} icon="add" background="green" type="button">
						Thêm mới
					</PrimaryButton>
				}
			></PrimaryTable>
			<Modal
				open={isShow ? true : false}
				destroyOnClose
				centered
				onCancel={() => setIsShow('')}
				title={isShow == 'UPDATE' ? 'Cập nhật hình thức thanh toán' : 'Tạo mới hình thức thanh toán'}
				footer={false}
			>
				<Form form={form} layout="vertical" onFinish={_onFinish}>
					<InputTextField name="Name" label="Tên hình thức thanh toán" isRequired rules={formRequired} />
					{isShow !== 'UPDATE' ? <InputNumberField name="Times" label="Số lần thanh toán" isRequired rules={formRequired} /> : ''}
					{isShow !== 'UPDATE' ? (
						<InputNumberField
							name="PriceInstallment"
							label={
								<div>
									Số tiền thanh toán dự kiến cho từng đợt{' '}
									<MyInfo
										noDetails
										content={
											<p>
												Hệ thống sẽ chia số tiền cần thanh toán cho từng đợt tương ứng với{' '}
												<span className="font-medium !text-primary">Số lần thanh toán</span> đã nhập phía trên.{' '}
												<span className="font-medium">(có thể chỉnh sửa trong chi tiết hình thức thanh toán)</span>
											</p>
										}
									/>
								</div>
							}
							isRequired
							rules={formRequired}
						/>
					) : (
						''
					)}
					<div className="d-flex justify-center ">
						<PrimaryButton
							disable={loading === 'CREATING' || loading === 'UPDATING'}
							type="submit"
							icon={isShow === 'UPDATE' ? 'save' : 'add'}
							background="primary"
						>
							{isShow == 'UPDATE' ? 'Cập nhật' : 'Thêm mới'}
						</PrimaryButton>
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default PaymentTypePage
