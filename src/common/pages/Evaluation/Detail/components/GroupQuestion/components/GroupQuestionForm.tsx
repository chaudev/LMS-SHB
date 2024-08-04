import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Popconfirm } from 'antd'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import { BsFillGrid3X2GapFill } from 'react-icons/bs'
import { evaluationQuestionApi } from '~/api/evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis } from '~/common/utils'
import { EVALUATION_TYPES } from '~/common/utils/constants'
import { ShowErrorToast } from '~/common/utils/main-function'
import MultipleOptions from './MultipleOption'

interface IGroupQuestionForm {
	setIsCreating?: Function
	defaultData?: TSampleEvaluationQuestion
	refreshData: any
	evaluationGroupData: TSampleEvaluationGroup
	dragProps?: any
	isDragging?: boolean
}

const GroupQuestionForm: React.FC<IGroupQuestionForm> = (props) => {
	const { setIsCreating, defaultData, refreshData, evaluationGroupData, dragProps, isDragging } = props
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [formQuestion] = Form.useForm()
	const [isEditing, setIsEditing] = useState(true)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (defaultData) {
			setIsEditing(false)
			formQuestion.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationQuestionApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationQuestionApi.add({ ...data, SampleEvaluationGroupId: evaluationGroupData?.Id })
			}
		},
		onSuccess(data, variables, context) {
			if (defaultData) {
				setIsEditing(true)
			} else {
				setIsCreating(false)
				formQuestion.resetFields()
			}
			ShowNostis.success(`${defaultData ? 'Chỉnh sửa' : 'Tạo'} thành công`)
			!!refreshData && refreshData()

			// ** refetch lại list tổng để cập nhật lại state isHaveQuestion
			queryClient.refetchQueries({ queryKey: ['get-sample-group-in-form', evaluationFormId] })
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	// ** handle cancel create
	const handleCancelCreate = () => {
		setIsCreating(false)
	}

	// ** handle cancel edit
	const handleCancelEdit = () => {
		setIsEditing(false)
		// set lại data mặc định trước khi edit
		formQuestion.setFieldsValue({ ...defaultData })
	}

	// ** handle remove
	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return evaluationQuestionApi.delete(id)
		},
		onSuccess(data, variables, context) {
			ShowNostis.success(`Đã xóa nhóm câu hỏi`)
			!!refreshData && refreshData()

			// ** refetch lại list tổng để cập nhật lại state isHaveQuestion
			queryClient.refetchQueries({ queryKey: ['get-sample-group-in-form', evaluationFormId] })
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
		<div className={`hover:bg-[#f0f0f0] ${isDragging ? 'bg-primaryLight' : ''} transition rounded-[6px] group/question flex gap-1`}>
			<div className="hover:bg-[#e2e2e2] flex items-center px-1 rounded-tl-[6px] rounded-bl-[6px]" {...dragProps} title="Thay đổi vị trí">
				<BsFillGrid3X2GapFill size={20} className="group-hover/question:text-[#a0a0a0] text-tw-white transform rotate-90" />
			</div>
			<Form form={formQuestion} onFinish={onSubmit} className="flex-1 pt-2 pr-2">
				<div className="grid w750:grid-cols-4 gap-x-4">
					<MyFormItem name="Content" label="" className={`${isEditing ? 'col-span-3' : 'col-span-3 mb-0'} `} required rules={formRequired}>
						<MyTextArea
							autoSize
							originalStyle={false}
							placeholder="Nội dung câu hỏi (bắt buộc)"
							disabled={!isEditing}
							style={{ fontWeight: 500, fontSize: '15px' }}
						/>
					</MyFormItem>

					{/* nút hiển thị lúc tạo mới */}
					{!defaultData && (
						<div className="flex items-center gap-2 justify-end col-span-4">
							<PrimaryButton background="blue" icon="save" type="button" onClick={formQuestion.submit} disable={mutation.isPending}>
								Lưu
							</PrimaryButton>
							<PrimaryButton
								background="transparent"
								icon="cancel"
								type="button"
								onClick={() => handleCancelCreate()}
								disable={mutation.isPending}
							>
								Hủy
							</PrimaryButton>
						</div>
					)}

					{/* nút để hiển thị ra bên ngoài lúc không tạo mới */}
					{defaultData && (
						<div className="col-span-1">
							{!isEditing && (
								<div className="items-center gap-2 justify-end group-hover/question:flex hidden">
									<IconButton type="button" color="black" icon="edit" onClick={() => setIsEditing(true)} tooltip="Cập nhật" />
									<Popconfirm
										title={`Bạn có chắc muốn xóa?`}
										okText="Có"
										cancelText="Hủy"
										placement="left"
										onConfirm={() => mutationDelete.mutateAsync(defaultData?.Id)}
									>
										<IconButton type="button" color="black" icon="remove" tooltip="Xóa" />
									</Popconfirm>
								</div>
							)}
							{isEditing && (
								<div className="flex items-center gap-2 justify-end col-span-1">
									<PrimaryButton background="blue" icon="save" type="button" onClick={formQuestion.submit} disable={mutation.isPending}>
										Lưu
									</PrimaryButton>
									<PrimaryButton
										background="transparent"
										icon="cancel"
										type="button"
										onClick={() => handleCancelEdit()}
										disable={mutation.isPending}
									>
										Hủy
									</PrimaryButton>
								</div>
							)}
						</div>
					)}
					{!isEditing && defaultData?.Type == EVALUATION_TYPES.essay && <p className="col-span-3 text-[#2a2a2a]">Nội dung trả lời...</p>}

					{/* form để tạo đáp án câu trắc nghiệm nếu type là multiple */}
					{defaultData && !isEditing && defaultData?.Type == EVALUATION_TYPES.multipleChoice && (
						<MultipleOptions evaluationQuestionData={defaultData} />
					)}
				</div>
			</Form>
		</div>
	)
}

export default GroupQuestionForm
