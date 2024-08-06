import { useMutation } from '@tanstack/react-query'
import { Card, Form, Popconfirm } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillGrid3X2GapFill } from 'react-icons/bs'
import { evaluationGroupApi } from '~/api/evaluation'
import MyDivider from '~/atomic/atoms/MyDivider'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MySelect from '~/atomic/atoms/MySelect'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis } from '~/common/utils'
import { EVALUATION_TYPES } from '~/common/utils/constants'
import { ShowErrorToast } from '~/common/utils/main-function'
import GroupQuestion from './GroupQuestion'
import GroupOption from './GroupOption'
import { getBorderStyle } from '../../functions'

interface IGroupForm {
	setIsCreating?: Function
	defaultData?: TSampleEvaluationGroup
	refreshData: any
	dragProps?: any
}

const GroupForm: React.FC<IGroupForm> = (props) => {
	const { setIsCreating, defaultData, refreshData, dragProps } = props
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [form] = Form.useForm()
	const [isEditing, setIsEditing] = useState(true)

	const handleCancelCreate = () => {
		setIsCreating(false)
	}

	useEffect(() => {
		if (defaultData) {
			setIsEditing(false)
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationGroupApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationGroupApi.add({ ...data, SampleEvaluationFormId: evaluationFormId })
			}
		},
		onSuccess(data, variables, context) {
			if (defaultData) {
				setIsEditing(true)
			} else {
				setIsCreating(false)
				form.resetFields()
			}
			ShowNostis.success(`${defaultData ? 'Chỉnh sửa' : 'Tạo'} thành công`)
			!!refreshData && refreshData()
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	// ** handle remove
	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return evaluationGroupApi.delete(id)
		},
		onSuccess(data, variables, context) {
			ShowNostis.success(`Đã xóa nhóm đánh giá`)
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

	// ** handle cancel edit
	const handleCancelEdit = () => {
		setIsEditing(false)
		// set lại data mặc định trước khi edit
		form.setFieldsValue({ ...defaultData })
	}

	return (
		<Card className={`border-l-[5px] ${getBorderStyle(defaultData?.Type)} group`}>
			<Form form={form} onFinish={onSubmit} disabled={false}>
				<div className="grid w750:grid-cols-4 gap-x-4">
					{/* form chính (form của group tổng bên ngoài) */}
					<MyFormItem name="Name" label="" className={`${isEditing ? 'col-span-3' : 'col-span-4'} `} required rules={formRequired}>
						<MyTextArea autoSize size="large" originalStyle={false} placeholder="Tên nhóm đánh giá (bắt buộc)" disabled={!isEditing} />
					</MyFormItem>
					{(!defaultData || isEditing) && (
						<MyFormItem name="Type" label="" className="col-span-1" required rules={formRequired}>
							<MySelect
								options={[
									{ label: <p className="text-tw-orange">Nhận xét</p>, value: EVALUATION_TYPES.essay },
									{ label: <p className="text-tw-blue">Trắc nghiệm</p>, value: EVALUATION_TYPES.multipleChoice },
									{ label: <p className="text-tw-secondary">Bảng đánh giá</p>, value: EVALUATION_TYPES.evaluate }
								]}
								placeholder="Loại đánh giá"
								allowClear={false}
								originalStyle={true}
								disabled={!isEditing || defaultData?.IsHaveQuestion}
							/>
						</MyFormItem>
					)}
					<MyFormItem name="Description" label="" className="col-span-4">
						<MyTextArea
							placeholder={isEditing ? 'Mô tả (không bắt buộc)' : ''}
							originalStyle={false}
							disabled={!isEditing}
							autoSize
							style={{ fontSize: '16px' }}
						/>
					</MyFormItem>

					{/* form của dạng đánh giá */}
					{defaultData && !isEditing && defaultData?.Type == EVALUATION_TYPES.evaluate && (
						<div className="mb-4 col-span-4">
							<GroupOption evaluationGroupData={defaultData} />
						</div>
					)}

					{/* form của questions */}
					{defaultData && !isEditing && <GroupQuestion evaluationGroupData={defaultData} />}

					{/* nút hiển thị lúc tạo mới */}
					{!defaultData && (
						<div className="flex items-center gap-2 justify-end col-span-4">
							<PrimaryButton background="blue" icon="save" type="submit" disable={mutation.isPending}>
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
						<div className="col-span-4 relative" {...dragProps} title="Thay đổi vị trí">
							<MyDivider marginBottom={15} />
							<BsFillGrid3X2GapFill
								size={20}
								className="group-hover:text-[#bdc3c7] text-tw-white absolute left-[50%] translate-x-[50%] bottom-1"
							/>
							{!isEditing && (
								<div className="flex items-center gap-2 justify-end">
									<IconButton type="button" color="black" icon="edit" onClick={() => setIsEditing(true)} tooltip="Cập nhật" />
									<Popconfirm
										title={`Bạn có chắc muốn xóa ${defaultData?.Name}?`}
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
								<div className="flex items-center gap-2 justify-end col-span-4">
									<PrimaryButton background="blue" icon="save" type="submit" disable={mutation.isPending}>
										Lưu thay đổi
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
		</Card>
	)
}

export default GroupForm
