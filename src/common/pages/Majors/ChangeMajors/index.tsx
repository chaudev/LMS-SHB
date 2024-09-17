import { Card, Empty, Form, Modal, Select, Spin } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { giftApi } from '~/api/gift'
import { majorsApi } from '~/api/majors/majors'
import { majorsRegistrationApi } from '~/api/majors/registration'
import { paymentTypeApi } from '~/api/option/payment-type'
import InputNumberField from '~/common/components/FormControl/InputNumberField'
import SelectField from '~/common/components/FormControl/SelectField'
import TextBoxField from '~/common/components/FormControl/TextBoxField'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { removeCommas } from '~/common/utils/super-functions'
import ModalViewPaymenTypeDetail from '../Component/ModalViewPaymenTypeDetail'
import CardInfomation from '../Component/CardInfomation'
import { ISelectOptionList } from '~/common/components/FormControl/form-control'
import CardOldMajors from '../Component/CardOldMajors'
import { useRouter } from 'next/router'
import Avatar from '~/common/components/Avatar'
import { paymentMethodsApi } from '~/api/payment-method'
import { isNull, isNullOrEmptyOrUndefined, ShowErrorToast } from '~/common/utils/main-function'
import PaymentTypesDetails from '../Component/PaymentTypesDetails'
import moment from 'moment'
import { TContractItem } from '../Registration'
import AddRegistrationContractButton from '../Component/AddRegistrationContractButton'
import ContractItem from '../Component/ContractItem'

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

const ChangeMajorsPage = () => {
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
	const [oldMajors, setOldMajors] = useState<IMajorsRegistration>()
	const [tuitionInOld, setTuitionInOld] = useState<number | string>()

	const [loading, setLoading] = useState<'' | 'GET_ALL' | 'CREATE' | 'PAYMENT_DETAIL' | 'PAYMENT'>('')

	const [paymentTypeDetail, setPaymentTypeDetail] = useState<IPaymentTypeDetail[]>([])

	const [contracts, setContracts] = useState<TContractItem[]>([])

	const [majorDescription, setMajorDescription] = useState('')

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
			const [students, majors, gift, paymentMethod] = await Promise.all([
				majorsRegistrationApi.getAllMajorsRegistrationAvailble(),
				majorsApi.getAll({ pageSize: 9999, pageIndex: 1, status: 1 }),
				giftApi.getAll({ pageSize: 9999, pageIndex: 1 }),
				// paymentTypeApi.getAllPaymentType({ pageSize: 9999, pageIndex: 1 }),
				paymentMethodsApi.getAll({ pageSize: 9999, pageIndex: 1 })
			])

			if (students.status === 200) {
				let templ = []
				students.data.data.map((item, index) => {
					templ.push({
						title: item.StudentName + ' - ' + item.StudentCode,
						value: item.StudentId
					})
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
			// if (paymentType.status === 200) {
			// 	let templ = formatOption(paymentType.data.data)
			// 	templOption.payment = templ
			// 	templData.payment = paymentType.data.data
			// }
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
			setLoading('')
		}
	}

	const getPaymentByMajor = async (majorId) => {
		try {
			setLoading('PAYMENT')
			const res = await paymentTypeApi.getAllPaymentType({ pageSize: 9999, pageIndex: 1, majorId: majorId })
			if (res.status == 200) {
				setListOption({ ...listOption, payment: formatOption(res.data.data) })
			} else {
				setListOption({ ...listOption, payment: formatOption([]) })
			}
		} catch (error) {
			ShowErrorToast(error)
		} finally {
			setLoading('')
		}
	}

	const getPaymentTypeDetail = async () => {
		try {
			setLoading('PAYMENT_DETAIL')

			const response = await paymentTypeApi.getAllPaymentTypeDetail(PaymentTypeId)
			if (response.status === 200) {
				let detail = response.data.data[0]
				// if (detail.Type == PAYMENT_TYPES.majorRegistration) {
				// 	const countTotal = (TotalPrice * detail.Percent) / 100
				// 	form.setFieldValue('countTotal', countTotal ? countTotal : 0)
				// } else {
				// 	form.setFieldValue('countTotal', '')
				// }
				const countTotal = detail.Price
				form.setFieldValue('countTotal', countTotal ? countTotal : 0)
				form.setFieldValue('Type', Number(detail.Type))
				form.setFieldValue('Percent', detail.Percent)
				form.setFieldValue('Paid', null)

				// ** dynamic set form Prices
				const datas = response.data.data
				datas?.forEach((item) => {
					form.setFieldValue(`Price_${item.Id}`, item?.Price)
				})
			}
			setPaymentTypeDetail(response.data.data)
			setLoading('')
		} catch (error) {
			setLoading('')
		}
	}

	const getTuitionInOldMajors = async () => {
		try {
			setLoading('PAYMENT_DETAIL')
			const response = await majorsRegistrationApi.getTuitionInOldMajors(StudentId)
			if (response.status === 200) {
				setTuitionInOld(response.data.data)
			}
			if (response.status === 204) {
				setTuitionInOld(0)
			}
			setLoading('')
		} catch (error) {
			setLoading('')
		}
	}

	const getMajorsStudent = async () => {
		try {
			setLoading('GET_ALL')
			const params = {
				studentId: Number(StudentId),
				pageSize: 9999,
				pageIndex: 1
			}
			const response = await majorsRegistrationApi.getAllMajorsRegistration(params)

			if (response.status === 200) {
				let findOldMajors = response.data.data.find((item) => item.Status === 1)
				setOldMajors(findOldMajors)
			}
			if (response.status === 204) {
				setOldMajors(null)
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	useEffect(() => {
		initPage()
	}, [studentId])

	useEffect(() => {
		if (StudentId) {
			const student = listData.students.find((value) => {
				return value.StudentId == StudentId
			})

			if (student.HasMajors == false) {
				const templ = listData.students.find((value) => {
					return value.StudentId == StudentId
				})
				modal.confirm({
					title: 'Cảnh báo',
					content: (
						<>
							Học viên <span className="font-[500]  text-[orange]">{templ.StudentName}</span> chưa có chương trình học. Vui lòng sử dụng tính năng
							đăng ký chương trình học!
						</>
					),
					okText: 'Đăng ký chương trình học',
					cancelText: 'Hủy',
					onOk: () => {
						router.push({
							pathname: '/majors/registration/',
							query: {
								studentId: student.StudentId
							}
						})
					}
				})
				form.setFieldValue('StudentId', '')
			} else {
				getTuitionInOldMajors()
				getMajorsStudent()
			}
		}
	}, [StudentId])

	useEffect(() => {
		if (MajorsId) {
			getPaymentByMajor(MajorsId)
			const templ = listData.majors.find((value) => {
				return value.Id == MajorsId
			})
			setPaymentTypeDetail([])
			form.setFieldValue('PaymentTypeId', null)
			if (templ) {
				form.setFieldValue('MajorsId', templ?.Id)
				form.setFieldValue('TotalPrice', templ?.Price)
				form.setFieldValue('Description', templ?.Description)
				setMajorDescription(templ?.Description)
			}
		} else {
			form.setFieldValue('MajorsId', '')
			form.setFieldValue('TotalPrice', '')
			form.setFieldValue('Description', '')
			setMajorDescription('')
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

	// useEffect(() => {
	// 	if (TotalPrice && PaymentTypeId) {
	// 		if (Percent) {
	// 			let countPaid = (removeCommas(TotalPrice) * Percent) / 100
	// 			form.setFieldValue('countTotal', countPaid)
	// 		}
	// 	}
	// }, [TotalPrice])

	const onAddContract = (contract: TContractItem) => {
		setContracts([...contracts, contract])
		ShowNoti('success', 'Thêm hợp đồng thành công')
	}

	const onUpdateContract = (index: number, contract: TContractItem) => {
		const _contracts = [...contracts]
		_contracts[index] = contract
		setContracts([..._contracts])
		ShowNoti('success', 'Chỉnh sửa hợp đồng thành công')
	}

	const onDeleteContract = (index: number, contract: TContractItem) => {
		const _contracts = [...contracts]
		_contracts.splice(index, 1)
		setContracts([..._contracts])
	}

	const _onFinish = async (params) => {
		try {
			setLoading('CREATE')
			const payload = {
				MajorsId: params.MajorsId,
				StudentId: params.StudentId,
				TotalPrice: removeCommas(params.TotalPrice),
				Paid: params.Paid ? removeCommas(params.Paid) : 0,
				GiftId: params.GiftId,
				PaymentTypeId: params.PaymentTypeId,
				Note: params.Note,
				Contracts: !contracts?.length
					? undefined
					: contracts.map((item) => ({ ...item, ContractSigningDate: moment(item?.ContractSigningDate).toISOString() })),
				Details: Object.keys(params)
					.filter((key) => key.startsWith('Price_'))
					.map((key) => ({
						Price: params[key],
						PaymentTypeDetailId: Number(key.split('_')[1])
					}))
			}

			const response = await majorsRegistrationApi.changeMajors(payload)
			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				form.resetFields()
				setOldMajors(null)
				setTuitionInOld(0)
			}
			setContracts([])
		} catch (error) {
			ShowErrorToast(error)
		} finally {
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
						<div className="grid grid-cols-1 w800:grid-cols-2 gap-3 ">
							<div className="d-flex flex-col gap-3">
								<Card title="Thông tin học viên" className="col-span-1">
									{/* <SelectField
										className="col-span-2"
										name={'StudentId'}
										label="Chọn học viên"
										optionList={listOption.students}
										rules={[{ required: true, message: 'Vui lòng chọn học viên' }]}
									/> */}
									<Form.Item name={'StudentId'} label="Chọn học viên" rules={[{ required: true, message: 'Vui lòng chọn học viên' }]}>
										<Select>
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
									<div className="d-flex flex-col gap-3">
										{getInformation()} <CardOldMajors oldMajors={oldMajors} tuitionInOld={tuitionInOld} />
									</div>
								</Card>
								<Card title="Thay đổi chương trình học" className="col-span-1">
									<SelectField
										className="col-span-2"
										name={'MajorsId'}
										label="Chọn chương trình học"
										optionList={listOption.majors}
										rules={[
											{
												required: true,
												message: 'Vui lòng chọn chương trình học'
											},
											{
												validator: async (_, id) => {
													if (oldMajors) {
														if (id == oldMajors.MajorsId) {
															return Promise.reject(new Error('Chương trình học mới phải khác chương trình học hiện tại'))
														}
													} else {
														return Promise.reject(new Error('Vui lòng chọn học viên'))
													}
												}
											}
										]}
									/>
									<InputNumberField
										name="TotalPrice"
										label="Giá chương trình học"
										// disabled
										rules={[{ required: true, message: 'Vui lòng nhập giá chương trình học' }]}
									/>
									{/* <TextBoxField name="Description" label={'Mô tả chương trình học'} disabled /> */}
									{majorDescription !== '' && (
										<div className="">
											<p className="font-medium mb-2">Mô tả chương trình học</p>
											<p className="whitespace-pre-wrap">{majorDescription}</p>
										</div>
									)}
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
									isRequired
									optionList={listOption.payment}
									rules={[{ required: true, message: 'Vui lòng chọn hình thức thanh toán' }]}
								/>
								{!isNullOrEmptyOrUndefined(PaymentTypeId) && <PaymentTypesDetails datas={paymentTypeDetail} />}
								{!isNullOrEmptyOrUndefined(StudentId) && !isNullOrEmptyOrUndefined(MajorsId) && (
									<>
										<AddRegistrationContractButton
											majorId={MajorsId}
											studentId={StudentId}
											paymentTypeId={PaymentTypeId}
											onAddContract={onAddContract}
										/>

										{!!contracts?.length ? (
											<div className="flex flex-col gap-[8px] border p-[12px] rounded-md mt-[8px] mb-[16px]">
												{contracts.map((item, index) => {
													return (
														<ContractItem
															key={index}
															studentId={StudentId}
															paymentTypeId={PaymentTypeId}
															contractData={item}
															index={index}
															onUpdate={onUpdateContract}
															onDelete={onDeleteContract}
														/>
													)
												})}
											</div>
										) : (
											<Empty className="mt-[8px] mb-[16px]" />
										)}
									</>
								)}
								{/* <SelectField
									className="col-span-2"
									hidden={Type === 1 ? false : true}
									name={'Type'}
									label="Loại thanh toán"
									disabled
									optionList={optionPaymentType}
								/> */}

								{/* <InputTextField name="Percent" label="Phần trăm" disabled hidden={Type === 1 ? false : true} /> */}
								<InputNumberField
									name="countTotal"
									disabled={true}
									// hidden={Type === 1 ? false : true}
									hidden={isNull(paymentTypeDetail)}
									label="Số tiền phải đóng"
								/>
								<InputNumberField
									name="Paid"
									// hidden={Type != 1 ? true : false}
									hidden={isNull(paymentTypeDetail)}
									label="Thanh toán"
								/>
								<SelectField
									className="col-span-2"
									// hidden={Type === 1 ? false : true}
									hidden={isNull(paymentTypeDetail)}
									name={'PaymentMethodId'}
									label="Phương thức thanh toán"
									isRequired
									rules={[{ required: Type === 1 ? true : false, message: 'Vui lòng chọn phương thức thanh toán' }]}
									optionList={listOption.paymentMethod}
								/>
								<SelectField mode="multiple" max={2} className="col-span-2" name={'GiftId'} label="Quà tặng" optionList={listOption.gift} />
								<TextBoxField name="Note" label={'Ghi chú'} />

								<div className="d-flex justify-center mt-3">
									<PrimaryButton type="submit" icon="exchange" loading={loading === 'CREATE'} background="green">
										Chuyển ngành
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

export default ChangeMajorsPage
