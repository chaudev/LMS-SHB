import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Popconfirm } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { evaluationGroupOptionApi } from '~/api/evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IGroupOptionForm {
	defaultData?: TSampleEvaluationGroupOption
	refreshData: any
	evaluationGroupData: TSampleEvaluationGroup
	dragProps?: any
	isDragging?: boolean
}

const GroupOptionForm: React.FC<IGroupOptionForm> = (props) => {
	const { defaultData, refreshData, evaluationGroupData, dragProps, isDragging } = props
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [formGroupOption] = Form.useForm()
	const queryClient = useQueryClient()
	const [displayData, setDisplayData] = useState({ Point: 0, Content: '' })
	const [isModalVisible, setIsModalVisible] = useState(false)

	useEffect(() => {
		if (defaultData) {
			formGroupOption.setFieldsValue({ ...defaultData })
			setDisplayData({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationGroupOptionApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationGroupOptionApi.add({ ...data, SampleEvaluationGroupId: evaluationGroupData?.Id })
			}
		},
		onSuccess(data, variables, context) {
			if (!defaultData) {
				formGroupOption.resetFields()
			}
			ShowNostis.success(`${defaultData ? 'Chỉnh sửa' : 'Tạo'} thành công`)
			!!refreshData && refreshData()
			setIsModalVisible(false)

			// ** refetch lại list tổng để cập nhật lại state isHaveQuestion
			queryClient.refetchQueries({ queryKey: ['get-sample-group-in-form', evaluationFormId] })
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	// ** handle submit form
	const onSubmit = (data) => {
		try {
			const DATA_SUBMIT = {
				...data
			}
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	return (
		<div>
			{defaultData ? (
				<div className="flex items-center" onClick={() => setIsModalVisible(true)}>
					<IconButton type="button" color="yellow" icon="edit" />
					<p>Chỉnh sửa</p>
				</div>
			) : (
				<PrimaryButton background="transparent" type="button" icon="add" onClick={() => setIsModalVisible(true)}>
					Cột đánh giá
				</PrimaryButton>
			)}
			<MyModal title={'Thêm cột đánh giá'} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
				<Form layout="vertical" form={formGroupOption} onFinish={onSubmit}>
					<div>
						<MyFormItem name="Point" label="Điểm" required rules={[{ required: true, message: '' }]}>
							<MyInputNumber title="Điểm" />
						</MyFormItem>
						<MyFormItem name="Content" label="Nội dung" className={``} required rules={[{ required: true, message: '' }]}>
							<MyTextArea autoSize originalStyle={true} placeholder="Nội dung (bắt buộc)" style={{ borderRadius: '6px' }} />
						</MyFormItem>

						<div className="flex items-center gap-2 justify-end">
							<PrimaryButton background="blue" icon="save" type="button" onClick={formGroupOption.submit} disable={mutation.isPending}>
								Lưu
							</PrimaryButton>
						</div>
					</div>
				</Form>
			</MyModal>
		</div>
	)
}

export default GroupOptionForm
