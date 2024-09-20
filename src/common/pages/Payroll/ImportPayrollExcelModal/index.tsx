import { useMutation } from '@tanstack/react-query'
import { Upload } from 'antd'
import { useState } from 'react'
import { staffSalaryRealApi } from '~/api/staff-salary-real'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'
import PayrollTable from '../PayrollTable'
import styles from './index.module.scss'

type TProps = TMyModalProps & {
	onCancel: () => void
	refetch?: () => void
}

const ImportPayrollExcelModal = (props: TProps) => {
	const { open, onCancel, refetch, ...restProps } = props

	const [payrollData, setPayrollData] = useState<TStaffSalaryReal[]>([])

	const mutationUpload = useMutation({
		mutationFn: async (data: any) => await staffSalaryRealApi.import(data),
		onSuccess: (res) => {
			setPayrollData(res?.data?.data || [])
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const mutationSaveImport = useMutation({
		mutationFn: async () => await staffSalaryRealApi.saveImport({ items: payrollData }),
		onSuccess: (res) => {
			ShowNoti('success', 'Thành công!')
			refetch?.()
            setPayrollData([])
			onCancel()
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onClose = () => {
		setPayrollData([])
		onCancel()
	}

	return (
		<MyModal
			title={'Import bảng lương với file excel'}
			centered
			open={open}
			onCancel={onClose}
			width={1200}
			footer={false}
			destroyOnClose
			{...restProps}
		>
			<Upload
				maxCount={1}
				onChange={(info) => {
					if (info.file.status === 'done') {
						mutationUpload.mutate(info?.file?.originFileObj)
					}
					if (info.file.status === 'removed') {
						setPayrollData([])
					}
				}}
				accept=".xlsx, .xls, .csv"
				className={styles.upload}
			>
				<PrimaryButton loading={mutationUpload.isPending} background="green" type="button" icon="upload">
					Tải file excel lên
				</PrimaryButton>
			</Upload>

			{payrollData?.length > 0 && (
				<div>
					<hr className="mb-[12px] border-[#a7a7a7]" />
					<div className="text-[16px] font-medium mb-[12px]">Bản xem trước</div>
					<PayrollTable
						total={0}
						data={payrollData}
						loading={mutationUpload.isPending}
						refreshData={() => {}}
						onChangePage={() => {}}
						showActionColumn={false}
						pagination={false}
					/>
				</div>
			)}

			<div className="flex items-center justify-end gap-4 mt-4 ">
				<PrimaryButton background="transparent" type="button" icon="cancel" onClick={onClose}>
					Hủy
				</PrimaryButton>
				<PrimaryButton
					icon={'save'}
					type="button"
					disable={!payrollData?.length}
					loading={mutationSaveImport.isPending}
					background="primary"
					onClick={() => {
						mutationSaveImport.mutate()
					}}
				>
					Lưu
				</PrimaryButton>
			</div>
		</MyModal>
	)
}

export default ImportPayrollExcelModal
