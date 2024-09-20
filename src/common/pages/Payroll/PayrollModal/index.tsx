import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import PayrollForm, { TPayrollForm } from '../PayrollForm'
import { Form } from 'antd'
import PrimaryButton from '~/common/components/Primary/Button'
import { useMutation } from '@tanstack/react-query'
import { staffSalaryRealApi } from '~/api/staff-salary-real'
import { ShowNoti } from '~/common/utils'
import { useEffect } from 'react'

type TProps = TMyModalProps & {
	mode: 'create' | 'update'
	defaultData?: TStaffSalaryReal
	onCancel: () => void
	refetch?: () => void
}

const PayrollModal = (props: TProps) => {
	const { open, onCancel, defaultData, mode, refetch, ...restProps } = props

	const title = mode === 'create' ? 'Thêm bảng lương' : 'Chỉnh sửa bảng lương'

	const [form] = Form.useForm<TPayrollForm>()

	// ===== SIDE EFFECTS =====
	useEffect(() => {
		if (mode === 'update' && defaultData) {
			form.setFieldsValue(defaultData)
		}
	}, [mode, defaultData])

	// ===== METHODS =====
	const mutationCreate = useMutation({
		mutationFn: async (data: TPostStaffSalaryReal) => await staffSalaryRealApi.add(data),
		onSuccess: () => {
			ShowNoti('success', 'Thành công!')
			form.resetFields()
			refetch?.()
			onCancel()
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const mutationUpdate = useMutation({
		mutationFn: async (data: TPutStaffSalaryReal) => await staffSalaryRealApi.update(data),
		onSuccess: () => {
			ShowNoti('success', 'Thành công!')
			form.resetFields()
			refetch?.()
			onCancel()
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onSubmit = (data: TPayrollForm) => {
		if (mode === 'create') {
			mutationCreate.mutate(data)
		} else {
			mutationUpdate.mutate({ ...data, Id: defaultData?.Id })
		}
	}

	return (
		<MyModal title={title} centered open={open} onCancel={onCancel} width={800} footer={false} {...restProps}>
			<div className="max-h-[calc(100vh-200px)] overflow-auto scrollbar-custom mr-[-12px]">
				<div className="pr-[12px]">
					<PayrollForm form={form} onFinish={onSubmit} disabledUserId={mode === 'update'} />
				</div>
			</div>

			<div className="flex items-center justify-end gap-4 mt-4 ">
				<PrimaryButton background="transparent" type="button" icon="cancel" onClick={onCancel}>
					Hủy
				</PrimaryButton>
				<PrimaryButton
					icon={'save'}
					type="button"
					disable={mutationCreate.isPending || mutationUpdate.isPending}
					loading={mutationCreate.isPending || mutationUpdate.isPending}
					background="primary"
					onClick={form.submit}
				>
					Lưu
				</PrimaryButton>
			</div>
		</MyModal>
	)
}

export default PayrollModal
