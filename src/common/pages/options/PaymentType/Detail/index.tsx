import { Card, Col, Divider, Form, Progress, Row, Spin } from 'antd'
import { xorWith } from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { number } from 'yup'
import { foreignLanguageApi } from '~/api/foreign-language'
import { paymentTypeApi } from '~/api/option/payment-type'
import { processApi } from '~/api/process'
import { profileStatusApi } from '~/api/profile-status'
import { visaStatusApi } from '~/api/visa-status'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'

interface IOptionType {
	foreignLanguage: IOption[]
	visaStatus: IOption[]
	profileStatus: IOption[]
	processingStatus: IOption[]
}

interface IOption {
	value: string | number
	title: string
}

const PaymentDetailPage = () => {
	const [form] = Form.useForm()
	const router = useRouter()
	const Items = Form.useWatch('Items', form)
	const { slug } = router.query
	const [optionType, setOptionType] = useState<IOptionType>()
	const [progress, setProgress] = useState<number>(0)
	const [loading, setLoading] = useState<string>('')

	useEffect(() => {
		if (Items) {
			let initValue = 0
			Items.forEach((element) => {
				initValue = initValue + Number(element.Percent)
			})
			setProgress(initValue)
		}
	}, [Items])

	const getAllOptionType = async () => {
		try {
			setLoading('INIT_PAGE')
			const [foreignLanguage, visaStatus, profileStatus, processingStatus, paymenntType, paymenntTypeDetail] = await Promise.all([
				foreignLanguageApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				visaStatusApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				profileStatusApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				processApi.getAll({ pageIndex: 1, pageSize: 9999 }),
				paymentTypeApi.getPaymentTypeById(Number(slug)),
				paymentTypeApi.getAllPaymentTypeDetail(Number(slug))
			])

			let tempOption = { foreignLanguage: [], visaStatus: [], profileStatus: [], processingStatus: [] }

			if (foreignLanguage.status === 200) {
				let temp = []
				foreignLanguage.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.foreignLanguage = temp
			}
			if (visaStatus.status === 200) {
				let temp = []
				visaStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.visaStatus = temp
			}
			if (profileStatus.status === 200) {
				let temp = []
				profileStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.profileStatus = temp
			}
			if (processingStatus.status === 200) {
				let temp = []
				processingStatus.data.data.forEach((data) => temp.push({ title: data.Name, value: data.Id }))
				tempOption.processingStatus = temp
			}
			if (paymenntType.status === 200) {
				form.setFieldValue('Name', paymenntType.data.data.Name)
			}
			if (paymenntTypeDetail.status === 200) {
				form.setFieldValue('Items', paymenntTypeDetail.data.data)
			}
			setOptionType(tempOption)
			setLoading('')
		} catch (error) {}
	}

	useEffect(() => {
		if (!!slug) {
			getAllOptionType()
		}
	}, [slug])

	const _onFinish = async (params) => {
		try {
			if (progress != 100) {
				ShowNostis.error('Tổng tiến trình phải bằng 100%!')
				return
			}
			setLoading('UPDATE')
			const payload = {
				PaymentTypeName: params.Name,
				PaymentTypeId: slug,
				Items: Items
			}
			const response = await paymentTypeApi.updatePaymentTypeDetail(payload)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	const _handleUpdateTypeIndex = (value, index) => {
		let refItems = [...Items]
		refItems[index].ValueId = ''
		refItems[index].Type = value
		form.setFieldValue('Items', refItems)
	}

	return (
		<div className='d-flex justify-center'>
	<Card className='w-full max-w-[1200px]'>
			<Spin spinning={loading === 'INIT_PAGE'}>
				<Form form={form} onFinish={_onFinish} layout="vertical">
					<Divider>Hình thức thanh toán</Divider>
					<InputTextField
						name="Name"
						label="Tên hình thức thanh toán"
						rules={[{ required: true, message: 'Vui lòng nhập tên hình thức  thanh toán' }]}
					/>
					<Divider>Các đợt thanh toán</Divider>

					<Form.List name="Items">
						{(fields) =>
							fields.map((field, index) => {
								return (
									<Row key={index} gutter={{ md: 16 }}>
										<Col xs={24} md={8}>
											<SelectField
												{...field}
												className="col-span-2"
												name={[field.name, 'Type']}
												label="Loại"
												optionList={[
													{
														value: 1,
														title: 'Đăng ký ngành học',
														disabled: field.name !== 0 ? true : false
													},
													{
														value: 2,
														title: 'Thay đổi tình trạng hồ sơ'
													},
													{
														value: 3,
														title: 'Thay đổi tình trạng tiếng'
													},
													{
														value: 4,
														title: 'Thay đổi tình trạng visa'
													},
													{
														value: 5,
														title: 'Thay đổi tình trạng xử lý hồ sơ'
													}
												]}
												onChangeSelect={(value) => {
													_handleUpdateTypeIndex(value, index)
												}}
												rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
											/>
										</Col>
										<Col xs={24} md={8}>
											<SelectField
												{...field}
												className="col-span-2"
												name={[field.name, 'ValueId']}
												label="Tình trạng"
												disabled={Items[index].Type === 1 ? true : false}
												optionList={
													!Items[index].Type || !optionType
														? []
														: Items[index].Type == 1
														? []
														: Items[index].Type == 2
														? optionType.profileStatus
														: Items[index].Type == 3
														? optionType.foreignLanguage
														: Items[index].Type == 4
														? optionType.visaStatus
														: optionType.processingStatus
												}
												rules={[{ required: Items[index].Type === 1 ? false : true, message: 'Vui lòng chọn tình trạng' }]}
											/>
										</Col>
										<Col xs={24} md={8}>
											<InputTextField
												className="col-span-2"
												{...field}
												name={[field.name, 'Percent']}
												label="Phần trăm"
												rules={[
													{ required: true, message: 'Vui lòng phần trăm' },
													{
														validator: (_, value) =>
															value > 1 ? Promise.resolve() : Promise.reject(new Error('Phần trăm phải lớn hơn 1%'))
													},
													{
														validator: (_, value) =>
															value <= 100 ? Promise.resolve() : Promise.reject(new Error('Phần trăm phải nhỏ hơn hoặc bằng 100%'))
													}
												]}
											/>
										</Col>
										<Col xs={24}>{fields.length - 1 === index ? '' : <Divider />}</Col>
									</Row>
								)
							})
						}
					</Form.List>

					<div className="w-[90%]">
						<Progress percent={progress} status={progress == 100 ? 'active' : 'exception'} format={(percent) => `${progress}% / 100% `} />
					</div>
					<div className="py-2 d-flex justify-center">
						<PrimaryButton loading={loading === 'UPDATE'} type="submit" icon="save" background="primary">
							Cập nhật
						</PrimaryButton>
					</div>
				</Form>
			</Spin>
		</Card>

		</div>
	
	)
}

export default PaymentDetailPage
