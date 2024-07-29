import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { contractApi } from '~/api/contract'
import MyModal from '~/atomic/atoms/MyModal'
import EditorField from '~/common/components/FormControl/EditorField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IContractModal {
	defaultData?: any
	refreshData?: Function
}

const ContractModal: React.FC<IContractModal> = (props) => {
	const { defaultData, refreshData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()
	const [contractContent, setContractContent] = useState('')

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return contractApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return contractApi.addContract(data)
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
				Name: data?.Name
			}
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const changeContractContent = (value) => {
		setContractContent(value)
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
				title={defaultData ? 'Cập nhật hợp đồng' : 'Thêm hợp đồng'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
				width={1000}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row">
							<div className="col-12">
								<InputTextField
									placeholder="Nhập tên hợp đồng mẫu"
									name="Name"
									label="Tên bảng điểm mẫu"
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
							<div className="col-12">
								<EditorField
									label="Nội dung hợp đồng"
									name="Content"
									onChangeEditor={changeContractContent}
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
						</div>
						<div className="row ">
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

export default ContractModal
