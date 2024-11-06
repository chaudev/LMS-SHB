import { useQuery } from '@tanstack/react-query'
import { Form } from 'antd'
import { useEffect, useId } from 'react'
import { templateMajorApi } from '~/api/template-major'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import EditorField from '~/common/components/FormControl/EditorField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import { formRequired } from '~/common/libs/others/form'

type TRegistrationContractForm = {
	TemplateMajorId: number
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
	studentId: number
	templateMajorIds?: string
	paymentTypeId?: number
}

const RegistrationContractModal = ({
	type = 'add',
	defaultContractData,
	onSubmit,
	open,
	onCancel,
	onCallbackAfterSuccess,
	studentId,
	templateMajorIds,
	paymentTypeId
}: TProps) => {
	const editorId = useId()
	const [formContract] = Form.useForm<TRegistrationContractForm>()

	const { data: dataQuery } = useQuery({
		queryKey: [templateMajorApi.keyGetFillData, [studentId, templateMajorIds, paymentTypeId]],
		queryFn: () => {
			return templateMajorApi
				.getFillData({
					studentId: studentId,
					templateMajorIds: templateMajorIds,
					paymentTypeId: paymentTypeId
				})
				.then((data) => data.data)
		},
		enabled: open && type === 'add' && !!studentId && !!templateMajorIds
	})

	useEffect(() => {
		if (open) {
			formContract.setFieldsValue({
				ContractNumber: defaultContractData?.ContractNumber,
				ContractSigningDate: defaultContractData?.ContractSigningDate,
				ContractContent:
					type === 'edit' ? defaultContractData?.ContractContent : dataQuery?.data?.[0]?.Content || defaultContractData?.ContractContent
			})
		}
	}, [open, defaultContractData, dataQuery])

	const _onSubmit = (data: TRegistrationContractForm) => {
		onSubmit({ ...data, TemplateMajorId: defaultContractData?.TemplateMajorId })
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
