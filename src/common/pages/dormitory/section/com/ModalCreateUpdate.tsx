import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import { FC } from 'preact/compat'
import { useEffect, useState } from 'react'
import { dormitoryAreaApi } from '~/api/dormitory/dormitoryArea'
import MyInput from '~/atomic/atoms/MyInput'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'

type TProps = {
	defaultData: TDormitorySection | null
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitorySection[], Error>>
}

export const ModalCUDormitorySecion: FC<TProps> = ({ defaultData, refetch }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [form] = Form.useForm<TDormitorySection>()

	const handleToggleModal = () => {
		setOpen(!open)
		form.resetFields()
	}

	useEffect(() => {
		if (defaultData !== null) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData, open])

	const mutationCreate = useMutation({
		mutationKey: [dormitoryAreaApi.keyCreate],
		mutationFn: async (data: TDormitorySection) => await dormitoryAreaApi.create(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Tạo mới thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const mutationUpdate = useMutation({
		mutationKey: [dormitoryAreaApi.keyUpdate],
		mutationFn: async (data: TDormitorySection) => await dormitoryAreaApi.update(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Cập nhật thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const onFinish = async (data: TDormitorySection) => {
		const dataSend = { ...data }
		if (defaultData === null) {
			await mutationCreate.mutateAsync(dataSend)
		} else {
			await mutationUpdate.mutateAsync({ ...defaultData, ...dataSend })
		}
	}

	const isLoading = mutationCreate.isPending || mutationUpdate.isPending

	return (
		<>
			{defaultData !== null ? (
				<IconButton onClick={handleToggleModal} type="button" background="transparent" color="yellow" icon="edit" tooltip="Cập nhật" />
			) : (
				<PrimaryButton onClick={handleToggleModal} type="button" background="green" icon="add">
					Tạo mới
				</PrimaryButton>
			)}
			<Modal
				centered
				open={open}
				onCancel={handleToggleModal}
				footer={
					<div className="flex gap-2 justify-center">
						<PrimaryButton disable={isLoading} onClick={handleToggleModal} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton loading={isLoading} onClick={() => form.submit()} background="primary" icon="save" type="button">
							{`${defaultData === null ? 'Tạo' : 'Lưu'}`}
						</PrimaryButton>
					</div>
				}
				title={`${defaultData === null ? 'Tạo mới' : 'Cập nhật'} khu`}
			>
				<div className="max-h-[70vh] overflow-auto">
					<Form form={form} layout="vertical" onFinish={onFinish} disabled={isLoading}>
						<Form.Item name={'Name'} label="Tên khu" rules={formRequired}>
							<MyInput placeholder="Tên khu" />
						</Form.Item>
						<Form.Item name={'Code'} label="Mã khu" rules={formRequired}>
							<MyInput placeholder="Mã khu" />
						</Form.Item>
						<Form.Item name={'DormitoryId'} label="Ký túc xá" rules={formRequired}>
							<MySelectDormitory />
						</Form.Item>
						<Form.Item name={'Description'} label="Mô tả">
							<MyTextArea placeholder="Mô tả" rows={4} originalStyle={true} disabled={isLoading} />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	)
}
