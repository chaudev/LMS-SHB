import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { sampleTranscriptDetailApi } from '~/api/grade-templates'
import MyModal from '~/atomic/atoms/MyModal'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'
import { SAMPLE_GRADE_COLUMN_TYPES } from '~/common/utils/constants'
import { ShowErrorToast } from '~/common/utils/main-function'

interface ITranscriptColumnModal {
	refreshData: any
	defaultData?: any
	sampleTranscriptData: TSampleTranscript
}

const TranscriptColumnModal: React.FC<ITranscriptColumnModal> = (props) => {
	const { refreshData, defaultData, sampleTranscriptData } = props
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
				return sampleTranscriptDetailApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return sampleTranscriptDetailApi.add(data)
			}
		},
		onSuccess(data, variables, context) {
			setIsModalVisible(false)
			form.resetFields()
			ShowNostis.success('Thêm thành công')
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
				Type: data?.Type,
				SampleTranscriptId: sampleTranscriptData.Id
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
				<PrimaryButton background="green" type="button" icon="add" onClick={() => setIsModalVisible(true)}>
					Thêm cột điểm
				</PrimaryButton>
			)}

			<MyModal title={'Thêm cột điểm mới'} open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row">
							<div className="col-12">
								<InputTextField
									placeholder="Nhập tên cột điểm"
									name="Name"
									label="Tên cột điểm"
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
							<div className="col-12">
								<SelectField
									placeholder="Loại cột điểm"
									name="Type"
									label="Loại"
									optionList={SAMPLE_GRADE_COLUMN_TYPES}
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
		</div>
	)
}

export default TranscriptColumnModal
