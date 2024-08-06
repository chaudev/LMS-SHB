import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { evaluationApi } from '~/api/evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IEvaluationForm {
	defaultData?: any
	refreshData: any
}

const EvaluationForm: React.FC<IEvaluationForm> = (props) => {
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
				return evaluationApi.updateForm({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationApi.addForm(data)
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
				Name: data?.Name,
				...data
			}
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
				title={defaultData ? 'Cập nhật phiếu đánh giá mẫu' : 'Thêm phiếu đánh giá mẫu'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Form form={form} layout="vertical" onFinish={onSubmit} className="grid gap-x-4">
					<InputTextField
						placeholder="Nhập tên phiếu đánh giá mẫu"
						name="Name"
						label="Tên phiếu đánh giá mẫu"
						isRequired
						rules={[{ required: true, message: 'Bạn không được để trống' }]}
					/>
					<MyFormItem name="Description" label="Mô tả">
						<MyTextArea placeholder="Nhập mô tả" autoSize={{ minRows: 2 }} style={{ borderRadius: '6px' }} />
					</MyFormItem>
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
				</Form>
			</MyModal>
		</>
	)
}

export default EvaluationForm
