import { Card, Form, Modal, Select, Spin } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { giftApi } from '~/api/gift'
import { majorsApi } from '~/api/majors/majors'
import { majorsRegistrationApi } from '~/api/majors/registration'
import { paymentTypeApi } from '~/api/option/payment-type'
import InputNumberField from '~/common/components/FormControl/InputNumberField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import TextBoxField from '~/common/components/FormControl/TextBoxField'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis, log } from '~/common/utils'
import { removeCommas } from '~/common/utils/super-functions'
import ModalViewPaymenTypeDetail from '../Component/ModalViewPaymenTypeDetail'
import CardInfomation from '../Component/CardInfomation'
import { ISelectOptionList } from '~/common/components/FormControl/form-control'
import { optionPaymentType } from '~/common/constant/PaymentType'
import { useRouter } from 'next/router'
import Avatar from '~/common/components/Avatar'
import { paymentMethodsApi } from '~/api/payment-method'

interface IListOption {
	students: ISelectOptionList[]
	majors: ISelectOptionList[]
	gift: ISelectOptionList[]
	payment: ISelectOptionList[]
	paymentMethod: ISelectOptionList[]
}
interface IListData {
	students: IMajorsRegistrationAvailble[]
	majors: IMajors[]
	gift: IGift[]
	payment: IPaymentType[]
}

const MajorsRegistrationPage = () => {
	const router = useRouter()
	const { studentId } = router.query
	const [form] = Form.useForm()
	const StudentId = Form.useWatch('StudentId', form)
	const MajorsId = Form.useWatch('MajorsId', form)
	const PaymentTypeId = Form.useWatch('PaymentTypeId', form)
	const TotalPrice = Form.useWatch('TotalPrice', form)
	const Percent = Form.useWatch('Percent', form)
	const Type = Form.useWatch('Type', form)
	const initValue = {
		students: [],
		majors: [],
		gift: [],
		payment: [],
		paymentMethod: []
	}

	const [modal, contextHolder] = Modal.useModal()

	const [listOption, setListOption] = useState<IListOption>(initValue)
	const [listData, setListData] = useState<IListData>(initValue)

	const [loading, setLoading] = useState<'' | 'GET_ALL' | 'CREATE' | 'PAYMENT_DETAIL'>('')

	const [paymentTypeDetail, setPaymentTypeDetail] = useState<IPaymentTypeDetail[]>([])

	const formatOption = (data) => {
		let templ = []

		data.forEach((element) => {
			templ.push({
				title: element.Name,
				value: element.Id
			})
		})
		return templ
	}

	const initPage = async () => {
		try {
			setLoading('GET_ALL')
			let templOption = { students: [], majors: [], gift: [], payment: [], paymentMethod: [] }
			let templData = { students: [], majors: [], gift: [], payment: [] }

			const [students, majors, gift, paymentType, paymentMethod] = await Promise.all([
				majorsRegistrationApi.getAllMajorsRegistrationAvailble(),
				majorsApi.getAll({ pageSize: 9999, pageIndex: 1, status: 1 }),
				giftApi.getAll({ pageSize: 9999, pageIndex: 1 }),
				paymentTypeApi.getAllPaymentType({ pageSize: 9999, pageIndex: 1 }),
				paymentMethodsApi.getAll({ pageSize: 9999, pageIndex: 1 })
			])

			// const students = await majorsRegistrationApi.getAllMajorsRegistrationAvailble()
			// const majors = await majorsApi.getAll({ pageSize: 9999, pageIndex: 1, status: 1 })
			// const gift = await giftApi.getAll({ pageSize: 9999, pageIndex: 1 })
			// const paymentType = await paymentTypeApi.getAllPaymentType({ pageSize: 9999, pageIndex: 1 })
			// const paymentMethod = await paymentMethodsApi.getAll({ pageSize: 9999, pageIndex: 1 })

			console.log('initPage majors ====>', majors)

			if (students.status === 200) {
				let templ = []
				students.data.data.map((item: any, index) => {
					const nameAndId = item.StudentName + ' - ' + item.StudentCode
					templ.push(item)
				})
				templOption.students = templ
				templData.students = students.data.data
			}

			if (majors.status === 200) {
				let templ = formatOption(majors.data.data)

				templOption.majors = templ
				templData.majors = majors.data.data
			}

			if (gift.status === 200) {
				let templ = formatOption(gift.data.data)
				templOption.gift = templ
				templData.gift = gift.data.data
			}

			if (paymentType.status === 200) {
				let templ = formatOption(paymentType.data.data)
				templOption.payment = templ
				templData.payment = paymentType.data.data
			}

			if (paymentMethod.status === 200) {
				let templ = formatOption(paymentMethod.data.data)
				templOption.paymentMethod = templ
				templData.payment = paymentMethod.data.data
			}

			setListOption(templOption)
			setListData(templData)

			if (studentId) {
				form.setFieldValue('StudentId', Number(studentId))
			}

			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	const getAllMajorsRegistrationAvailble = async () => {
		try {
			const response = await majorsRegistrationApi.getAllMajorsRegistrationAvailble()
			let templOption = { ...listOption }
			let templData = { ...listData }
			if (response.status === 200) {
				let templ = []
				response.data.data.map((item, index) => {
					templ.push({
						title: item.StudentName + ' - ' + item.StudentCode,
						value: item.StudentId
					})
				})
				templData.students = response.data.data
				templOption.students = templ
				console.log('templData', templData)

				setListData(templData)
				setListOption(templOption)
			}
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	const getPaymentTypeDetail = async () => {
		try {
			setLoading('PAYMENT_DETAIL')

			const response = await paymentTypeApi.getAllPaymentTypeDetail(PaymentTypeId)
			if (response.status === 200) {
				let detail = response.data.data[0]
				if (detail.Type == 1) {
					const countTotal = (TotalPrice * detail.Percent) / 100
					form.setFieldValue('countTotal', countTotal ? countTotal : 0)
				} else {
					form.setFieldValue('countTotal', '')
				}
				form.setFieldValue('Type', Number(detail.Type))
				form.setFieldValue('Percent', detail.Percent)
				form.setFieldValue('Paid', null)
			}
			setPaymentTypeDetail(response.data.data)
			setLoading('')
		} catch (error) {
			setLoading('')
		}
	}

	useEffect(() => {
		getAllMajorsRegistrationAvailble()
		initPage()
	}, [studentId])

	useEffect(() => {
		if (StudentId) {
			const student = listData.students.find((value) => {
				return value.StudentId == StudentId
			})
			if (student.HasMajors == true) {
				const templ = listData.students.find((value) => {
					return value.StudentId == StudentId
				})
				modal.confirm({
					title: 'Cảnh báo',
					content: (
						<>
							Học viên <span className="font-[500]  text-tw-orange">{templ.StudentName}</span> đã có ngành học. Vui lòng sử dụng tính năng
							chuyển ngành học!
						</>
					),
					okText: 'Chuyển ngành',
					cancelText: 'Hủy',
					onOk: () => {
						router.push({
							pathname: '/majors/change-majors/',
							query: {
								studentId: student.StudentId
							}
						})
					}
				})
				form.setFieldValue('StudentId', '')
			}
		}
	}, [StudentId])

	useEffect(() => {
		if (MajorsId) {
			const templ = listData.majors.find((value) => {
				return value.Id == MajorsId
			})
			form.setFieldValue('MajorsId', templ.Id)
			form.setFieldValue('TotalPrice', templ.Price)
			form.setFieldValue('Description', templ.Description)
		} else {
			form.setFieldValue('MajorsId', '')
			form.setFieldValue('TotalPrice', '')
			form.setFieldValue('Description', '')
		}
	}, [MajorsId])

	useEffect(() => {
		if (PaymentTypeId) {
			getPaymentTypeDetail()
		} else {
			setPaymentTypeDetail([])
			form.setFieldValue('Percent', '')
			form.setFieldValue('countTotal', '')
			form.setFieldValue('Type', '')
			form.setFieldValue('Paid', '')
		}
	}, [PaymentTypeId])

	useEffect(() => {
		if (TotalPrice && PaymentTypeId) {
			if (Percent) {
				let countPaid = (removeCommas(TotalPrice) * Percent) / 100
				form.setFieldValue('countTotal', countPaid)
			}
		}
	}, [TotalPrice])

	const _onFinish = async (params) => {
		try {
			setLoading('CREATE')

			const payload = {
				MajorsId: params.MajorsId,
				StudentId: params.StudentId,
				TotalPrice: removeCommas(params.TotalPrice),
				Paid: removeCommas(params.Paid),
				GiftId: params.GiftId,
				PaymentTypeId: params.PaymentTypeId,
				Note: params.Note,
				PaymentMethodId: params.PaymentMethodId
			}

			const response = await majorsRegistrationApi.majorsRegistration(payload)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				await getAllMajorsRegistrationAvailble()
			}
			form.resetFields()
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	const getInformation = () =>
		useMemo(() => {
			const templ = listData.students.find((value) => {
				return value.StudentId == StudentId
			})
			return <CardInfomation templ={templ} />
		}, [StudentId])

	return (
		<div className="d-flex justify-center">
			<div className="w-full max-w-[1200px]">
				<Spin spinning={loading === 'GET_ALL'}>
					{contextHolder}
					<Form form={form} layout="vertical" onFinish={_onFinish}>
						<div className="grid grid-cols-1 w800:grid-cols-2 gap-3">
							<div className="d-flex flex-col gap-3">
								<Card title="Thông tin học viên" className="col-span-1">
									{listData.students.length > 0 && (
										<Form.Item name={'StudentId'} label="Chọn học viên" rules={[{ required: true, message: 'Vui lòng chọn học viên' }]}>
											<Select showSearch showArrow optionFilterProp={'label'}>
												{listData.students.map((item: IMajorsRegistrationAvailble, index) => {
													return (
														<Select.Option value={item?.StudentId} label={item?.StudentName} key={item?.StudentId}>
															<div className="selected-option">{item?.StudentName}</div>
															<div className="select-option-propdown">
																<Avatar uri={item?.Avatar} className="w-[32px] h-[32px] rounded-full" />
																<div className="ml-[8px]">
																	<div className="font-[500]">
																		{item?.StudentName} - {item?.StudentCode}
																	</div>
																	{item?.MajorsName && <div>Ngành: {item?.MajorsName}</div>}
																</div>
															</div>
														</Select.Option>
													)
												})}
											</Select>
										</Form.Item>
									)}

									<div className="d-flex flex-col gap-3">{getInformation()}</div>
								</Card>

								<Card title="Ngành học" className="col-span-1">
									<SelectField
										className="col-span-2"
										name={'MajorsId'}
										label="Chọn ngành học"
										optionList={listOption.majors}
										rules={[{ required: true, message: 'Vui lòng ngành học' }]}
									/>

									<InputNumberField
										name="TotalPrice"
										label="Giá ngành học"
										rules={[{ required: true, message: 'Vui lòng nhập giá ngành học' }]}
									/>
									<TextBoxField name="Description" label={'Mô tả ngành học'} disabled />
								</Card>
							</div>

							<Card title="Thanh toán" className="col-span-1 ">
								<SelectField
									className="col-span-2"
									name={'PaymentTypeId'}
									isLoading={loading === 'PAYMENT_DETAIL'}
									label={
										<div className="d-flex items-center">
											Hình thức thanh toán
											<ModalViewPaymenTypeDetail
												paymentType={listOption.payment}
												PaymentTypeId={PaymentTypeId}
												paymentTypeDetail={paymentTypeDetail}
											/>
										</div>
									}
									optionList={listOption.payment}
									rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán' }]}
								/>
								<SelectField
									className="col-span-2"
									hidden={Type === 1 ? false : true}
									name={'Type'}
									label="Loại thanh toán"
									disabled
									optionList={optionPaymentType}
								/>

								<InputTextField
									name="Percent"
									label="Phần trăm"
									disabled
									hidden={Type === 1 ? false : true}
									rules={[{ required: true, message: 'Vui lòng nhập số tiền phải đóng' }]}
								/>
								<InputNumberField
									name="countTotal"
									disabled={true}
									hidden={Type === 1 ? false : true}
									label="Số tiền phải đóng"
									rules={[{ required: Type != 1 ? false : true, message: 'Vui lòng nhập số tiền phải đóng' }]}
								/>
								<InputNumberField
									name="Paid"
									label="Thanh toán"
									hidden={Type === 1 ? false : true}
									// rules={[{ required: Type != 1 ? false : true, message: 'Vui lòng nhập số tiền phải đóng' }]}
								/>
								<SelectField
									className="col-span-2"
									hidden={Type === 1 ? false : true}
									name={'PaymentMethodId'}
									label="Phương thức thanh toán"
									rules={[{ required: Type === 1 ? true : false, message: 'Vui lòng chọn phương thức thanh toán' }]}
									optionList={listOption.paymentMethod}
								/>
								<SelectField mode="multiple" className="col-span-2" name={'GiftId'} label="Quà tặng" optionList={listOption.gift} max={2} />
								<TextBoxField name="Note" label={'Ghi chú'} />

								<div className="d-flex justify-center mt-3">
									<PrimaryButton type="submit" icon="add" loading={loading === 'CREATE'} background="green">
										Đăng ký
									</PrimaryButton>
								</div>
							</Card>
						</div>
					</Form>
				</Spin>
			</div>
		</div>
	)
}

export default MajorsRegistrationPage
