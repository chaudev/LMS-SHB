import { Form } from 'antd'
import { useEffect, useId } from 'react'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import EditorField from '~/common/components/FormControl/EditorField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import { formRequired } from '~/common/libs/others/form'

type TRegistrationContractForm = {
	ContractNumber: string
	ContractSigningDate: string
	ContractContent: string
}

type TProps = TMyModalProps & {
	type?: 'add' | 'edit'
	defaultContractData: Partial<TRegistrationContractForm>
	onSubmit: (values: TRegistrationContractForm) => void
	onCancel: () => void
	onCallbackAfterSuccess?: () => void
}

const RegistrationContractModal = ({ type = 'add', defaultContractData, onSubmit, open, onCancel, onCallbackAfterSuccess }: TProps) => {
	const editorId = useId()
	const [formContract] = Form.useForm<TRegistrationContractForm>()

	useEffect(() => {
		if (defaultContractData) {
			formContract.setFieldsValue({
				...defaultContractData
			})
		}
	}, [defaultContractData])

	const _onSubmit = (data: TRegistrationContractForm) => {
		onSubmit(data)
		onCancel()
		formContract.resetFields()
		// onCallbackAfterSuccess?.()
	}

	return (
		<MyModal
			title={type === 'add' ? 'Thêm hợp đồng' : 'Chỉnh sửa hợp đồng'}
			centered
			open={open}
			onCancel={onCancel}
			footer={null}
			width={1000}
		>
			<div className="container-fluid">
				<Form form={formContract} layout="vertical" onFinish={_onSubmit}>
					<div className="grid grid-cols-12 gap-x-4">
						<div className="w780:col-span-6 col-span-12">
							<InputTextField placeholder="Nhập mã hợp đồng" name="ContractNumber" label="Mã hợp đồng" isRequired rules={formRequired} />
						</div>
						<div className="w780:col-span-6 col-span-12">
							<DatePickerField
								placeholder="Ngày ký hợp đồng"
								name="ContractSigningDate"
								label="Ngày ký hợp đồng"
								mode="single"
								format="DD/MM/YYYY"
								isRequired
								rules={formRequired}
							/>
						</div>
						<div className="col-span-12">
							<EditorField
								id={editorId}
								label="Nội dung hợp đồng"
								name="ContractContent"
								height={'calc(100vh - 300px)'}
								onChangeEditor={(value) => formContract.setFieldValue('ContractContent', value)}
								isRequired
								rules={formRequired}
							/>
						</div>
						<div className="col-span-12 flex-all-center gap-2">
							<PrimaryButton icon={'add'} type="submit" background={'green'}>
								Xác nhận hợp đồng
							</PrimaryButton>
							<PrimaryButton icon={'cancel'} type="button" background={'transparent'} onClick={onCancel}>
								Hủy bỏ
							</PrimaryButton>
						</div>
					</div>
				</Form>
			</div>
		</MyModal>
	)
}

export default RegistrationContractModal
