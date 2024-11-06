import { Modal, Form, Select, Input } from "antd"
import form from "antd/lib/form"
import { formRequired, formNoneRequired } from "~/common/libs/others/form"
import loading from "~/pages/loading"
import students from "~/pages/majors/students"
import InputNumberField from "../../FormControl/InputNumberField"
import ModalFooter from "../../ModalFooter"
import { useState, useEffect, FC } from "react"
import { branchApi } from "~/api/branch"
import { paymentMethodsApi } from "~/api/payment-method"
import RestApi from "~/api/RestApi"
import { userInformationApi } from "~/api/user/user"
import { ShowNoti, ShowNostis } from "~/common/utils"
import { removeCommas } from "~/common/utils/super-functions"

interface IPaymentForm {
	isEdit?: boolean
	onRefresh?: Function
	item?: any
	visible?: boolean
	onClose?: () => void
}

const url = 'Bill'

export const PaymentModal: FC<IPaymentForm> = ({ isEdit, onRefresh, item, visible, onClose }) => {
	const [form] = Form.useForm()

	const [loading, setLoading] = useState(false)
	const [branch, setBranch] = useState<IBranch[]>(null)

	useEffect(() => {
		if (visible) {
			getBranchs()
		}
	}, [visible])

	const [branchLoading, setBranchLoading] = useState(false)
	const getBranchs = async () => {
		if (!branch) {
			setBranchLoading(true)
			try {
				const response = await branchApi.getAll({
					pageIndex: 1,
					pageSize: 99999
				})
				response.status == 200 && setBranch(response.data.data)
			} catch (err) {
				ShowNostis.error(err?.message)
			} finally {
				form.setFieldValue('BranchId', item?.BranchId)
				setBranchLoading(false)
			}
		}
	}

	useEffect(() => {
		form.setFieldValue('StudentId', item?.StudentId)
		form.setFieldValue('Price', item?.Price)
		form.setFieldValue('Type', item?.Type)
	}, [item])


	function onFinish(params) {
		setLoading(true)

		const DATA_SUBMIT = {
			...params,
			Price: removeCommas(params?.Price),
			RefId: item.Id,
			details: []
		}

		!isEdit && post(DATA_SUBMIT)
	}

	async function post(params) {
		try {
			const response = await RestApi.post(url, params)
			if (response.status == 200) {
				ShowNostis.success('Thành công')
				!!onRefresh && onRefresh()
				window.open(`/finance/payment/`, '_blank')
				onClose()
				form.resetFields()
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}

	function submitForm() {
		form.submit()
	}
  return (
    <Modal
				width={500}
				title="Tạo phiên thanh toán"
				open={visible}
				centered
				onCancel={onClose}
				footer={<ModalFooter loading={loading} onCancel={onClose} onOK={submitForm} />}
			>
				<Form
					form={form}
					className="grid grid-cols-2 gap-x-4"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="on"
				>
					<Form.Item className="col-span-2" name="StudentId" label="Học viên">
						<Select
							disabled
							className="style-input"
							showSearch
							optionFilterProp="children"
							allowClear={true}
							value={item?.StudentId}
						>
							<Select.Option value={item?.StudentId}>
								{item?.StudentName} - {item?.StudentCode}
							</Select.Option>
						</Select>
					</Form.Item>
					<Form.Item className="col-span-2" name="Type" label="Loại thanh toán">
						<Select
							disabled
							className="style-input"
							showSearch
							optionFilterProp="children"
							allowClear={true}
							options={[{
								value: 4,
								label: 'Tạo thủ công'
							},
							{
								value: 5,
								label: 'Thanh toán học phí'
							},
							{
								value: 6,
								label: 'Đăng ký KTX'
							}]}
						/>
					</Form.Item>
					<Form.Item className="col-span-2" name="BranchId" label="Trung tâm thanh toán" rules={formRequired}>
						<Select
							loading={branchLoading}
							disabled={loading}
							className="style-input"
							showSearch
							optionFilterProp="children"
							allowClear={true}
							placeholder="Chọn trung tâm"
						>
							{branch?.map((item, index) => (
								<Select.Option key={index} value={item.Id}>
									{item.Name}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
					<InputNumberField
						disabled={loading}
						onChange={(event) => form.setFieldValue('Price', event.target.value)}
						label="Số tiền"
						name="Price"
						placeholder="Nhập số tiền"
						className="col-span-2"
					/>
					<Form.Item className="col-span-2" label="Ghi chú" name="Note" rules={formNoneRequired}>
						<Input.TextArea rows={5} placeholder="" disabled={loading} />
					</Form.Item>
				</Form>
			</Modal>
  )
}