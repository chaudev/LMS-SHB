import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import { FC } from 'preact/compat'
import { useEffect, useState } from 'react'
import { dormitoryRoomApi } from '~/api/dormitory/dormitoryRoom'
import MyInput from '~/atomic/atoms/MyInput'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectDormitoryArea from '~/atomic/molecules/MySelectArea'
import MySelectDormitory from '~/atomic/molecules/MySelectDormitory'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNoti } from '~/common/utils'

type TProps = {
	defaultData: TDormitoryRoom | null
	refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<TDormitoryRoom[], Error>>
}

export const ModalCUDormitoryRoom: FC<TProps> = ({ defaultData, refetch }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [form] = Form.useForm<TDormitoryRoom>()

	const DormitoryId = Form.useWatch('DormitoryId', form)
	// const DormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

	const handleToggleModal = () => {
		setOpen(!open)
		form.resetFields()
	}

	useEffect(() => {
		if (defaultData !== null && open) {
			form.setFieldsValue({ ...defaultData, DormitoryAreaId: defaultData.DormitoryAreaId })
		}
	}, [defaultData, open])


	useEffect(() => {
		if (defaultData !== null) {
			if (DormitoryId !== defaultData.DormitoryId) {
				form.setFieldValue('DormitoryAreaId', null)
			}
		}
	}, [DormitoryId])

	const mutationCreate = useMutation({
		mutationKey: [dormitoryRoomApi.keyCreate],
		mutationFn: async (data: TDormitoryRoom) => await dormitoryRoomApi.create(data),
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
		mutationKey: [dormitoryRoomApi.keyUpdate],
		mutationFn: async (data: TDormitoryRoom) => await dormitoryRoomApi.update(data),
		onSuccess: () => {
			refetch()
			ShowNoti('success', 'Cập nhật thành công')
			handleToggleModal()
		},
		onError: (error) => {
			ShowNoti('error', error.message)
		}
	})

	const onFinish = async (data: TDormitoryRoom) => {
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
				title={`${defaultData === null ? 'Tạo mới' : 'Cập nhật'} phòng`}
			>
				<div className="max-h-[70vh] overflow-auto">
					<Form form={form} layout="vertical" onFinish={onFinish} disabled={isLoading}>
						<Form.Item name={'Name'} label="Tên phòng" rules={formRequired}>
							<MyInput placeholder="Tên phòng" />
						</Form.Item>
						<Form.Item name={'Code'} label="Mã phòng" rules={formRequired}>
							<MyInput placeholder="Mã phòng" />
						</Form.Item>

						<Form.Item name={'DormitoryId'} label="Ký túc xá" rules={formRequired}>
							<MySelectDormitory />
						</Form.Item>

						<Form.Item name={'DormitoryAreaId'} label="Khu" rules={formRequired}>
							<MySelectDormitoryArea DormitoryId={DormitoryId} placeholder="Khu ký túc xá" disabled={!Boolean(DormitoryId)} />
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
