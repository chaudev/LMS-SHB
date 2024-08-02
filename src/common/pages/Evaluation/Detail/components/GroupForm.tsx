import { useMutation } from '@tanstack/react-query'
import { Card, Form } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { evaluationGroupApi } from '~/api/evaluation'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MySelect from '~/atomic/atoms/MySelect'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IGroupForm {
	setIsCreating: Function
	defaultData?: any
	refreshData: any
}

const GroupForm: React.FC<IGroupForm> = (props) => {
	const { setIsCreating, defaultData, refreshData } = props
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [form] = Form.useForm()

	const handleCancelCreate = () => {
		setIsCreating(false)
	}

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return evaluationGroupApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return evaluationGroupApi.add(data)
			}
		},
		onSuccess(data, variables, context) {
			setIsCreating(false)
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
				Name: data?.Name
			}
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	return (
		<Card>
			<Form form={form} onFinish={onSubmit}>
				<div>
					<MyFormItem name="Name" label="Tên nhóm" className="">
						<MyInput />
					</MyFormItem>
					<MyFormItem name="Description" label="Mô tả" className="">
						<MyTextArea />
					</MyFormItem>
					<MyFormItem name="Type" label="Loại" className="">
						<MySelect />
					</MyFormItem>
					<div className="flex items-center gap-2 justify-end">
						<PrimaryButton background="blue" icon="save" type="submit">
							Lưu
						</PrimaryButton>
						<PrimaryButton background="transparent" icon="cancel" type="button" onClick={() => handleCancelCreate()}>
							Hủy
						</PrimaryButton>
					</div>
				</div>
			</Form>
		</Card>
	)
}

export default GroupForm
