import { useMutation } from '@tanstack/react-query'
import { Form, Tag } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { evaluationTimeApi } from '~/api/evaluation-time'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectRoleStaff from '~/atomic/molecules/MySelectRoleStaff'
import MySelectSampleEvaluation from '~/atomic/molecules/MySelectSampleEvaluation'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import useQueryAllBranch from '~/common/hooks/useQueryAllBranch'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IEvaluationTimeForm {
	defaultData?: any
	refreshData: any
}

const EvaluationTimeForm: React.FC<IEvaluationTimeForm> = (props) => {
	const { defaultData, refreshData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData, Date: defaultData?.Date ? moment(defaultData?.Date) : undefined })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationTimeApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationTimeApi.add(data)
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
				title={defaultData ? 'Cập nhật đợt đánh giá' : 'Thêm đợt đánh giá'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<Form form={form} layout="vertical" onFinish={onSubmit}>
					<div className="grid w750:grid-cols-2 gap-x-4">
						<InputTextField
							placeholder="Nhập tên đợt đánh giá"
							name="Name"
							label="Tên đợt đánh giá"
							// isRequired
							// rules={[{ required: true, message: 'Bạn không được để trống' }]}
						/>
						<DatePickerField
							mode="single"
							placeholder="Ngày đánh giá"
							name="Date"
							label="Chọn ngày đánh giá"
							isRequired
							format="DD-MM-YYYY"
							rules={[{ required: true, message: 'Bạn không được để trống' }]}
						/>
						<MyFormItem
							name="SampleEvaluationFormId"
							label="Phiếu đánh giá mẫu"
							required
							className="w750:col-span-2"
							rules={[{ required: true, message: 'Bạn không được để trống' }]}
						>
							<MySelectSampleEvaluation placeholder={'Chọn phiếu đánh giá mẫu'} />
						</MyFormItem>
						<div className="w750:col-span-2 rounded mb-4 px-2 py-1 text-[14px] w-full border !border-primary bg-primaryExtraLight !text-primary">
							Nội dung phiếu đánh giá sẽ dựa trên mẫu tại thời điểm mẫu được tạo và sẽ không bị ảnh hưởng bởi những thay đổi sau này của
							mẫu.
						</div>
						<MyFormItem name="BranchId" label="Chọn trung tâm" required rules={[{ required: true, message: 'Bạn không được để trống' }]}>
							<MySelectBranch disabled={defaultData} />
						</MyFormItem>
						<MyFormItem
							name="RoleId"
							label="Chức vụ được đánh giá"
							required
							rules={[{ required: true, message: 'Bạn không được để trống' }]}
						>
							<MySelectRoleStaff />
						</MyFormItem>
						<div className="w750:col-span-2 flex-all-center">
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
			</MyModal>
		</>
	)
}

export default EvaluationTimeForm
