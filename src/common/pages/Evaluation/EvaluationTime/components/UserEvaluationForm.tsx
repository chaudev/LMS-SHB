import { useMutation, useQuery } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { MdInterpreterMode } from 'react-icons/md'
import { userEvaluationFormApi } from '~/api/user-evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyModal from '~/atomic/atoms/MyModal'
import MySelect from '~/atomic/atoms/MySelect'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IUserEvaluationForm {
	defaultData?: any
	refreshData: any
	evaluationTimeId: number
}

const UserEvaluationForm: React.FC<IUserEvaluationForm> = (props) => {
	const { defaultData, refreshData, evaluationTimeId } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// ** get user available
	const {
		data: userAvailable,
		isLoading: isLoadingUserAvailable,
		refetch: refetchUserAvailable
	} = useQuery({
		queryKey: ['get-user-available-for-evaluation', evaluationTimeId],
		queryFn: () => {
			return userEvaluationFormApi.getListAvailableUser(evaluationTimeId).then((res) => res.data.data)
		},
		enabled: !!evaluationTimeId
	})

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return userEvaluationFormApi.submit({ ...data, Id: defaultData?.Id })
			} else {
				return userEvaluationFormApi.add({ ...data, EvaluationTimeId: evaluationTimeId })
			}
		},
		onSuccess(data, variables, context) {
			setIsModalVisible(false)
			form.resetFields()
			refetchUserAvailable()
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
					Thêm phiếu đánh giá
				</PrimaryButton>
			)}

			<MyModal
				title={defaultData ? 'Cập nhật phiếu đánh giá' : 'Thêm phiếu đánh giá'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
				width={600}
			>
				<Form form={form} layout="vertical" onFinish={onSubmit}>
					<div className="grid w750:grid-cols-2 gap-x-4">
						<MyFormItem
							name="UserIds"
							label="Chọn nhận viên cần đánh giá"
							required
							className="w750:col-span-2"
							rules={[{ required: true, message: 'Bạn không được để trống' }]}
						>
							<MySelect
								// maxTagCount={'responsive'}
								mode="multiple"
								options={userAvailable?.map((item) => ({
									label: (
										<>
											{item.FullName} [{item?.UserCode}]
										</>
									),
									value: item.UserId,
									hiddenLabel: item.FullName + item.UserCode
								}))}
								optionFilterProp="hiddenLabel"
								style={{ flexWrap: 'wrap' }}
							/>
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

export default UserEvaluationForm
