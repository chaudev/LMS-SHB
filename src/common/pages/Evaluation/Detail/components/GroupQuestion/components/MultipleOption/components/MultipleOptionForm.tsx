import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { BsFillGrid3X2GapFill } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa'
import { evaluationOptionApi } from '~/api/evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IMultipleOptionForm {
	setIsCreating?: Function
	defaultData?: TSampleEvaluationOption
	refreshData: any
	dragProps?: any
	isDragging?: boolean
	evaluationQuestionData: TSampleEvaluationQuestion
}

const MultipleOptionForm: React.FC<IMultipleOptionForm> = (props) => {
	const { setIsCreating, defaultData, refreshData, dragProps, isDragging, evaluationQuestionData } = props
	const [formOption] = Form.useForm()
	const [isEditing, setIsEditing] = useState(true)
	const queryClient = useQueryClient()

	useEffect(() => {
		if (defaultData) {
			setIsEditing(false)
			formOption.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationOptionApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationOptionApi.add({ ...data, SampleEvaluationQuestionId: evaluationQuestionData?.Id })
			}
		},
		onSuccess(data, variables, context) {
			if (defaultData) {
				setIsEditing(true)
			} else {
				setIsCreating(false)
				formOption.resetFields()
			}
			ShowNostis.success(`${defaultData ? 'Chỉnh sửa' : 'Tạo'} thành công`)
			!!refreshData && refreshData()
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
		formOption.setFieldsValue({ ...defaultData })
	}

	// ** handle remove
	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return evaluationOptionApi.delete(id)
		},
		onSuccess(data, variables, context) {
			ShowNostis.success(`Đã xóa tùy chọn`)
			!!refreshData && refreshData()
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
		<div className={`hover:bg-[#e2e2e2] ${isDragging ? 'bg-primaryLight' : ''} transition rounded-[6px] group/option flex gap-1`}>
			{!isEditing && (
				<>
					<div
						className="hover:bg-[#c7c7c7] rounded-tl-[6px] rounded-bl-[6px] px-1 group-hover/option:flex hidden items-center"
						{...dragProps}
						title="Thay đổi vị trí"
					>
						<BsFillGrid3X2GapFill size={18} className=" text-[#a0a0a0] transform rotate-90" />
					</div>
					<div className="group-hover/option:hidden flex items-center px-[4.5px]">
						<FaRegCircle size={16} color="#a3a3a3 " />
					</div>
				</>
			)}
			<Form layout="horizontal" form={formOption} onFinish={onSubmit} className="flex-1 p-2">
				<div className="flex gap-x-4 items-center">
					<MyFormItem
						name="Point"
						label={isEditing ? 'Điểm' : ''}
						className={`${isEditing ? 'w-[100px]' : 'w-[40px]'}  mb-0`}
						required
						rules={[{ required: true, message: '' }]}
					>
						<MyInputNumber disabled={!isEditing} title="Điểm" />
					</MyFormItem>
					<MyFormItem name="Content" label="" className={`w-[80%] flex-1 mb-0`} required rules={[{ required: true, message: '' }]}>
						<MyTextArea
							autoSize
							originalStyle={false}
							placeholder="Nội dung câu hỏi (bắt buộc)"
							disabled={!isEditing}
							style={{ lineHeight: 1.6, height: '33px', paddingTop: '4px' }}
						/>
					</MyFormItem>

					{/* nút hiển thị lúc tạo mới */}
					{!defaultData && (
						<div className="flex items-center gap-2 justify-end col-span-3">
							<PrimaryButton background="blue" icon="save" type="button" onClick={formOption.submit} disable={mutation.isPending}>
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
								<div className="items-center gap-2 justify-end group-hover/option:flex hidden">
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
									<PrimaryButton background="blue" icon="save" type="button" onClick={formOption.submit} disable={mutation.isPending}>
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
				</div>
			</Form>
		</div>
	)
}

export default MultipleOptionForm
