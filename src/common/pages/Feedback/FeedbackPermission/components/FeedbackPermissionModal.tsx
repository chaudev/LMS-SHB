import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { feedbackPermissionApi } from '~/api/feedback-permission'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MySelectFeedbackGroup from '~/atomic/molecules/MySelectFeedbackGroup'
import MySelectRoleStaff from '~/atomic/molecules/MySelectRoleStaff'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IFeedbackPermissionModal {
	defaultData?: any
	refreshData: any
}

const FeedbackPermissionModal: React.FC<IFeedbackPermissionModal> = (props) => {
	const { defaultData, refreshData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData, FeedbackGroupIds: defaultData?.FeedbackGroupIds?.split(',')?.map((item) => Number(item)) })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return feedbackPermissionApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return feedbackPermissionApi.add(data)
			}
		},
		onSuccess(data, variables, context) {
			setIsModalVisible(false)
			form.resetFields()
			ShowNostis.success('Tạo thành công')
			!!refreshData && refreshData()
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	const onSubmit = (data) => {
		try {
			const DATA_SUBMIT = {
				...data,
				FeedbackGroupIds: data?.FeedbackGroupIds?.toString()
			}
			console.log(DATA_SUBMIT, 'DATA_SUBMIT')
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	return (
		<>
			{defaultData ? (
				<IconButton type="button" color="yellow" icon="edit" onClick={() => setIsModalVisible(true)} tooltip="Cập nhật" />
			) : (
				<PrimaryButton background="green" type="button" icon="add" onClick={() => setIsModalVisible(true)}>
					Thêm mới
				</PrimaryButton>
			)}

			<MyModal
				title={defaultData ? 'Cập nhật phân quyền' : 'Thêm phân quyền'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row">
							<MyFormItem name="RoleId" label="Chức vụ" className="col-12">
								<MySelectRoleStaff />
							</MyFormItem>
							<MyFormItem name="FeedbackGroupIds" label="Nhóm phản hồi" className="col-12">
								<MySelectFeedbackGroup mode="multiple" />
							</MyFormItem>
						</div>
						<div className="row">
							<div className="col-12 flex-all-center">
								<PrimaryButton
									icon={defaultData ? 'save' : 'add'}
									type="submit"
									disable={mutation?.isPending}
									loading={mutation?.isPending}
									background={defaultData ? 'primary' : 'green'}
								>
									{defaultData ? 'Lưu' : 'Thêm mới'}
								</PrimaryButton>
							</div>
						</div>
					</Form>
				</div>
			</MyModal>
		</>
	)
}

export default FeedbackPermissionModal
