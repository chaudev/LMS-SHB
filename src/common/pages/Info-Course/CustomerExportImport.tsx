import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { customerAdviseApi } from '~/api/customer'
import MyModal from '~/atomic/atoms/MyModal'
import MySelect from '~/atomic/atoms/MySelect'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'
import ImportCustomer from './ImportCustomer'

type TProps = {
	rolePermission: boolean
	getAllCustomer: () => void
}

const types = [
	{
		label: 'Tải file mẫu',
		value: 1
	},
	{
		label: 'Tạo nhanh',
		value: 2
	}
]

const CustomerExportImport: FC<TProps> = ({ rolePermission, getAllCustomer }) => {
	const [showModal, setShowModal] = useState<boolean>(false)
	const [form] = Form.useForm()
	const router = useRouter()

	const type = Form.useWatch('Type', form)
	const branchId = Form.useWatch('BranchId', form)

	const handleToggleModal = (type: 'cancel' | '') => {
		setShowModal(!showModal)
		if (type === 'cancel') {
			form.resetFields()
		}
	}

	useEffect(() => {
		if (showModal) {
			form.setFieldValue('Type', 1)
		}
	}, [showModal])

	const mutationDownload = useMutation({
		mutationKey: ['GET api/Customer/template/branchId'],
		mutationFn: async () => await customerAdviseApi.downloadTemplate(branchId),
		onSuccess: (res) => router.push(res.data.data),
		onError: (error) => ShowNoti('error', error.message)
	})

	return (
		<>
			{rolePermission && (
				<PrimaryButton className="mr-2 btn-download" type="button" background="blue" onClick={() => handleToggleModal('')}>
					Tải file mẫu / Tạo nhanh
				</PrimaryButton>
			)}

			<MyModal open={showModal} onCancel={() => handleToggleModal('')} footer={null}>
				<Form form={form} layout="vertical">
					<Form.Item label="Chọn loại" name={'Type'}>
						<MySelect options={types} />
					</Form.Item>
					<Form.Item label="Chọn trung tâm" name={'BranchId'}>
						<MySelectBranch placeholder="Chọn trung tâm" disabled={!type} />
					</Form.Item>

					{Number(type) === 1 && (
						<PrimaryButton
							onClick={() => mutationDownload.mutateAsync()}
							disable={!branchId}
							background={'blue'}
							type={'button'}
							icon="download"
							loading={mutationDownload.isPending}
						>
							Tải file mẫu
						</PrimaryButton>
					)}
					{Number(type) === 2 && (
						<>
							{rolePermission && (
								<ImportCustomer
									className="mr-1 btn-import"
									onCancel={() => handleToggleModal('cancel')}
									onFetchData={() => getAllCustomer()}
									branchId={branchId}
									disable={!branchId}
								/>
							)}
						</>
					)}
				</Form>
			</MyModal>
		</>
	)
}

export default CustomerExportImport
