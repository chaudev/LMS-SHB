import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import { useState } from 'react'
import { contractApi } from '~/api/contract'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import MyUploadMutil from '~/atomic/atoms/MyUploadMutil'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'

type TProps = {
	contractData: IContract
	refetch: () => void
}
const ContractUploadFileButton = ({ contractData, refetch }: TProps) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<>
			<IconButton type="button" color="green" icon="upload" tooltip="Upload files" onClick={() => setIsOpen(true)} />

			<ContractUploadFileModal contractData={contractData} refetch={refetch} open={isOpen} onCancel={() => setIsOpen(false)} />
		</>
	)
}

export default ContractUploadFileButton

type TContractUploadFileModalProps = TMyModalProps & {
	open: boolean
	onCancel: () => void
	contractData: IContract
	refetch: () => void
}
const ContractUploadFileModal = (props: TContractUploadFileModalProps) => {
	const { open, onCancel, contractData, refetch, ...restProps } = props
	const [form] = Form.useForm()

	const handleUpdoadFiles = async (files) => {
		try {
			const uploadPromises = files.map((file) => {
				if (file.originFileObj) {
					return contractApi.upload(file.originFileObj)
				}
				return Promise.resolve() // Nếu không có file, trả về Promise.resolve()
			})
			const res = await Promise.all(uploadPromises)
			return res.map((item) => item.data.data)
		} catch (error) {
			ShowNoti('error', error?.message || 'Error upload files')
		}
	}

	const updateMutation = useMutation({
		mutationFn: async (data: any) => {
			const resUpload = await handleUpdoadFiles(data.FileList)
			if (!resUpload?.length) return '---Lỗi tải file---'

			const dataSubmit = {
				...contractData,
				Files: [...(contractData?.Files || []), ...resUpload.map((item, index) => ({ Link: item, FileName: data?.FileList[index]?.name }))]
			}

			return await contractApi.update(dataSubmit)
		},
		onSuccess: (res) => {
			if (res !== '---Lỗi tải file---') {
				ShowNoti('success', 'Thành công !')
				onCancel()
				form.resetFields()
				refetch()
			}
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onSubmit = async (data) => {
		if (data?.FileList?.length > 0) {
			updateMutation.mutate(data)
		}
	}

	return (
		<MyModal title="Upload files" open={open} onCancel={onCancel} footer={null}>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<Form.Item
					label="Tải tệp tại đây"
					valuePropName="fileList"
					name="FileList"
					getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
					rules={formRequired}
				>
					<MyUploadMutil disabled={false} />
				</Form.Item>

				<div className="flex justify-end mt-[20px]">
					<PrimaryButton type="submit" background="primary" icon="save">
						Lưu
					</PrimaryButton>
				</div>
			</Form>
		</MyModal>
	)
}
