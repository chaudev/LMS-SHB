import { Card, Col, Divider, Empty, Form, Input, Modal, Progress, Row, Skeleton, Tag, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { AiOutlineCheck, AiOutlineFieldTime } from 'react-icons/ai'
import { BiPlusCircle } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { paymentTimesApi } from '~/api/payment-times'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import { RootState } from '~/store'

interface ICardLearningHistory {
	majorsId: number
	studentId: number
	panels: number[]
	optionType: IOptionType
}
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
const CardPaymentTimes: React.FC<ICardLearningHistory> = ({ optionType, majorsId, studentId, panels }) => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [form] = Form.useForm()
	const Items = Form.useWatch('Items', form)
	const [open, setOpen] = useState(false)
	console.log('panels', panels)

	const [paymentTimes, setPaymentTimes] = useState<IPaymentTimes[]>([])
	const [loading, setLoading] = useState<string>('')
	const [progress, setProgress] = useState<number>(0)
	const [isCheckUpdate, setIsCheckUpdate] = useState<boolean>(false)

	const getPaymentTime = async () => {
		try {
			setLoading(`GET_ALL_${majorsId}`)
			const params = {
				majorsRegistrationId: Number(majorsId),
				studentId: studentId,
				pageSize: 9999,
				pageIndex: 1
			}
			const ressponse = await paymentTimesApi.getAllPaymentTimes(params)
			if (ressponse.status === 200) {
				form.setFieldValue('Items', ressponse.data.data)
				setPaymentTimes(ressponse.data.data)

				const isCheck = ressponse.data.data.filter((item) => item.Status < 2)

				console.log('isCheck', isCheck)
				if (isCheck.length === 0) {
					setIsCheckUpdate(true)
				} else {
					setIsCheckUpdate(false)
				}
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	useEffect(() => {
		if (!!majorsId && panels && panels.includes(majorsId) && paymentTimes.length === 0) {
			getPaymentTime()
		}
	}, [majorsId, panels])

	useEffect(() => {
		if (Items) {
			let initValue = 0
			Items.forEach((element) => {
				initValue = initValue + Number(element.Percent)
			})
			setProgress(initValue)
		}
	}, [Items])

	const showModal = () => {
		form.setFieldValue('Items', paymentTimes)

		setOpen(true)
	}

	const hideModal = () => {
		setOpen(false)
	}
	const _handleUpdateTypeIndex = (value, index) => {
		let refItems = [...Items]
		refItems[index].ValueId = ''
		refItems[index].Type = value
		form.setFieldValue('Items', refItems)
	}
	const _onFinish = async (params) => {
		try {
			if (progress != 100) {
				ShowNostis.error('Tổng tiến trình phải bằng 100%!')
				return
			}

			const paramsItems = []

			params.Items.forEach((element) => {
				if (element.Status === 1) {
					paramsItems.push({
						Type: element.Type,
						ValueId: element.ValueId,
						Percent: element.Percent,
						Id: element.Id
					})
				}
			})

			const payload = {
				MajorsRegistrationId: paymentTimes[0].MajorsRegistrationId,
				Items: paramsItems
			}

			const response = await paymentTimesApi.updatePaymentTimes(payload)

			if (response.status === 200) {
				ShowNostis.success(response.data.message)
				await getPaymentTime()
				hideModal()
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}
	console.log(
		'userInformation && userInformation.RoleId & isCheckUpdate === true ',
		userInformation && userInformation.RoleId != '3' && !isCheckUpdate
	)

	return (
		<Card
			id={String(majorsId)}
			title="Đợt thanh toán"
			extra={
				<>
					{userInformation && userInformation.RoleId != '3' &&userInformation.RoleId != '2'  && !isCheckUpdate  ? (
						<PrimaryButton onClick={showModal} icon="edit" background="blue" type="button">
							Cập nhật
						</PrimaryButton>
					) : (
						''
					)}
				</>
			}
			loading={loading === `GET_ALL_${majorsId}`}
		>
			{paymentTimes && paymentTimes.length > 0 ? (
				<Timeline className="p-3">
					{paymentTimes.map((item) => { 
						let color = item.Status === 3 ? 'green' : item.Status == 1 ? 'orange' : '#B32025'
						return (
							<Timeline.Item
								color={color}
								key={item.Id}
								dot={
									item.Status === 3 ? (
										<AiOutlineCheck size={24} />
									) : item.Status === 1 ? (
										<AiOutlineFieldTime size={24} />
									) : (
										<BiPlusCircle size={24} />
									)
								}
							>
								<div className="d-flex flex-col gap-3">
									<span className={`text-base text-[${color}]`}>{item.TypeName}</span>
									{item.ValueName ? (
										<div>
											<span className="font-[500] text-[gray] inline-block w-2/6">Tình trạng:</span>
											<span className="font-[500]">{item.ValueName}</span>
										</div>
									) : (
										''
									)}
									<div>
										<span className={`font-[500] text-[gray] inline-block w-2/6`}>Số tiền:</span>
										<span className={`text-[${color}]`}>{parseToMoney(item.Price)}₫</span>
									</div>
									<div className="d-flex">
										<span className="font-[500] text-[gray] inline-block w-2/6">Trạng thái:</span>
										<span>
											<Tag color={color} className="font-[500] d-flex justify-center">
												{item.StatusName}
											</Tag>
										</span>
									</div>
									<div>
										<span className="font-[500] text-[gray] inline-block w-2/6">Phần trăm:</span>
										<span>{item.Percent}%</span>
									</div>
								</div>
							</Timeline.Item>
						)
					})}
				</Timeline>
			) : (
				<Empty />
			)}
			{/* Đừng xóa cái form này đi nha! nó cache dữ liệu cho form bên dưới */}
			<Form form={form} onFinish={_onFinish} layout="vertical">
				<Form.List name="Items">
					{(fields) =>
						fields.map((field, index) => {
							return <Input hidden />
						})
					}
				</Form.List>
			</Form>

			<Modal centered title="Cập nhật đợt thanh toán" open={open} onOk={hideModal} onCancel={hideModal} width="1000px" footer={false}>
				<Form form={form} onFinish={_onFinish} layout="vertical">
					<Form.List name="Items">
						{(fields) => {
							return (
								<Timeline>
									{fields.map((field, index) => {
										let color = Items[index].Status === 3 ? 'green' : Items[index].Status == 1 ? 'orange' : 'blue'
										return (
											<Timeline.Item
												color={color}
												key={Items[index].Id}
												dot={
													Items[index].Status === 3 ? (
														<AiOutlineCheck size={24} />
													) : Items[index].Status === 1 ? (
														<AiOutlineFieldTime size={24} />
													) : (
														<BiPlusCircle size={24} />
													)
												}
											>
												<Row key={index} gutter={{ md: 16 }}>
													<Col xs={24} md={8}>
														<SelectField
															{...field}
															className="col-span-2"
															name={[field.name, 'Type']}
															label="Loại"
															disabled={paymentTimes[index].Status !== 1 || paymentTimes[index].Type == 1}
															optionList={[
																{
																	value: 1,
																	title: 'Đăng ký chương trình học',
																	disabled: true
																},
																{
																	value: 2,
																	title: 'Thay đổi Tình trạng thu hồ sơ'
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
																	title: 'Thay đổi Tiến trình xử lý hồ sơ'
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
															disabled={paymentTimes[index].Type === 1 || paymentTimes[index].Status !== 1}
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
															disabled={paymentTimes[index].Status !== 1 || paymentTimes[index].Type === 1}
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
											</Timeline.Item>
										)
									})}
								</Timeline>
							)
						}}
					</Form.List>
					<div className="w-[90%]">
						<Progress percent={progress} status={progress == 100 ? 'active' : 'exception'} format={(percent) => `${progress}% / 100% `} />
					</div>
					<div className="d-flex  justify-center ">
						<PrimaryButton loading={loading === 'UPDATE_PAYMENT_TIME'} icon="save" type="submit" background="primary">
							Cập nhật
						</PrimaryButton>
					</div>
				</Form>
			</Modal>
		</Card>
	)
}

export default CardPaymentTimes
