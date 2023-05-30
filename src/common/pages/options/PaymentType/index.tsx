import { nanoid } from '@reduxjs/toolkit'
import { Form, Input, Modal, Popconfirm } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { paymentTypeApi } from '~/api/option/payment-type'
import { studyRouteTemplateApi } from '~/api/option/study-route-template'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'

const PaymentTypePage = () => {
	const [form] = Form.useForm()
	const router = useRouter()
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
			const res = await paymentTypeApi.getAllPaymentType(apiParameters)

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
		getAllPaymentType()
	}, [apiParameters])

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
								pathname: '/options/payment-type/detail',
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
			ShowNostis.error(error.message)
		}
	}

	const _onFinish = async (params) => {
		try {
			if (isShow === 'CREATE') {
				const response = await paymentTypeApi.createPaymentType(params)
				if (response.status === 200) {
					ShowNostis.success(response.data.message)
					await getAllPaymentType()
					setIsShow('')
				}
			}
			if (isShow === 'UPDATE') {
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
			ShowNostis.error(error.message)
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
					<InputTextField name="Name" label="Tên hình thức thanh toán" />
					{isShow !== 'UPDATE' ? <InputTextField name="Times" label="Số lần thanh toán" /> : ''}
					<div className="d-flex justify-center ">
						<PrimaryButton type="submit" icon={isShow === 'UPDATE' ? 'save' : 'add'} background="primary">
							{isShow == 'UPDATE' ? 'Cập nhật' : 'Thêm mới'}
						</PrimaryButton>
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default PaymentTypePage
