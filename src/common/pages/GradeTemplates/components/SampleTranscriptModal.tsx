import { useMutation } from '@tanstack/react-query'
import { Form, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { sampleTranscriptApi } from '~/api/grade-templates'
import MyModal from '~/atomic/atoms/MyModal'
import InputTextField from '~/common/components/FormControl/InputTextField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface ISampleTranscriptModal {
	defaultData?: any
	refreshData: any
}

const SampleTranscriptModal: React.FC<ISampleTranscriptModal> = (props) => {
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
				return sampleTranscriptApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return sampleTranscriptApi.add(data)
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
				title={defaultData ? 'Cập nhật bảng điểm' : 'Thêm bảng điểm'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row">
							<div className="col-12">
								<InputTextField
									placeholder="Nhập tên bảng điểm mẫu"
									name="Name"
									label="Tên bảng điểm mẫu"
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

export default SampleTranscriptModal
