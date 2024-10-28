import { QueryObserverResult, RefetchOptions, useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import { FC } from 'preact/compat'
import React, { useEffect, useState } from 'react'
import { dormitoryApi } from '~/api/dormitory/dormitory'
import MyInput from '~/atomic/atoms/MyInput'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'

type TProps = {
	defaultData: TDormitoryList | null
	refetch:  (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitoryList[], Error>>
}

export const ModalCUDormitoryList: FC<TProps> = ({ defaultData, refetch }) => {
	const [open, setOpen] = useState<boolean>(false)
	// const queryClient = useQueryClient()

	const [form] = Form.useForm<TDormitoryList>()

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
		mutationKey: [dormitoryApi.keyCreate],
		mutationFn: async (data: TDormitoryList) => await dormitoryApi.create(data),
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
		mutationKey: [dormitoryApi.keyUpdate],
		mutationFn: async (data: TDormitoryList) => await dormitoryApi.update(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Cập nhật thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const onFinish = async (data: TDormitoryList) => {
		const dataSend = {...data}
		if (defaultData === null ) {
			await mutationCreate.mutateAsync(dataSend)
		} else {
			await mutationUpdate.mutateAsync({...defaultData, ...data})
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
				title={`${defaultData === null ? 'Tạo mới' : 'Cập nhật'} ký túc xá`}
			>
				<div className="max-h-[70vh] overflow-auto">
					<Form form={form} layout="vertical" onFinish={onFinish} disabled={isLoading}>
						<Form.Item name={'Name'} label="Tên ký túc xá" rules={formRequired}>
							<MyInput placeholder="Tên ký túc xá" />
						</Form.Item>
						<Form.Item name={'Code'} label="Mã ký túc xá" rules={formRequired}>
							<MyInput placeholder="Mã ký túc xá" />
						</Form.Item>
						{/* <Form.Item name={'BranchId'} label="Trung tâm" rules={formRequired}>
							<MySelectBranch placeholder="Trung tâm" />
						</Form.Item> */}
						<Form.Item name={'Fee'} label="Chi phí theo tháng" rules={formRequired}>
							<MyInputNumber placeholder="Chi phí theo tháng" />
						</Form.Item>
						<Form.Item name={'Description'} label="Mô tả" rules={formRequired}>
							<MyTextArea placeholder="Mô tả" rows={4} originalStyle={true} disabled={isLoading} />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	)
}
