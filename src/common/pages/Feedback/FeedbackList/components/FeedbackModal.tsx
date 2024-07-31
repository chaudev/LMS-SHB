import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { feedbackApi } from '~/api/feedback-list'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectFeedbackGroup from '~/atomic/molecules/MySelectFeedbackGroup'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IFeedbackModal {
	defaultData?: any
	refreshData: any
}

const FeedbackModal: React.FC<IFeedbackModal> = (props) => {
	const { defaultData, refreshData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return feedbackApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return feedbackApi.add(data)
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
				...data
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
				title={defaultData ? 'Cập nhật phản hồi' : 'Thêm phản hồi mới'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row">
							<MyFormItem name="FeedbackGroupId" label="Nhóm phản hồi" className="col-12" required rules={formRequired}>
								<MySelectFeedbackGroup />
							</MyFormItem>
							<MyFormItem name="Title" label="Tiêu đề" className="col-12" required rules={formRequired}>
								<MyInput />
							</MyFormItem>
							<MyFormItem name="Content" label="Nội dung" className="col-12">
								<MyTextArea cols={4} />
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

export default FeedbackModal
