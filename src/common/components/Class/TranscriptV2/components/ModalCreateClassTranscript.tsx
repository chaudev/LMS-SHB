import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { classTranscriptApi } from '~/api/class-transcript'
import MyModal from '~/atomic/atoms/MyModal'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
import InputTextField from '~/common/components/FormControl/InputTextField'
import SelectField from '~/common/components/FormControl/SelectField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import useQuerySampleTranscript from '~/common/hooks/useQuerySampleTranscript'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface IModalCreateClassTranscript {
	defaultData?: any
	refreshData: any
	classId: number
}

const ModalCreateClassTranscript: React.FC<IModalCreateClassTranscript> = (props) => {
	const { defaultData, refreshData, classId } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()
	const { sampleTranscript, isLoading } = useQuerySampleTranscript()

	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData, Date: defaultData?.Date ? moment(defaultData.Date) : null })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return classTranscriptApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return classTranscriptApi.add({ ...data, ClassId: classId })
			}
		},
		onSuccess(data, variables, context) {
			setIsModalVisible(false)
			if (!defaultData) {
				form.resetFields()
			}
			ShowNostis.success(`${defaultData ? 'Cập nhật' : 'Tạo'} thành công`)
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
				Date: data?.Date ? moment(data?.Date).toISOString() : null,
				SampleTranscriptId: data?.SampleTranscriptId
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
				// <IconButton type="button" color="yellow" icon="edit" onClick={() => setIsModalVisible(true)} tooltip="Cập nhật" />
				<PrimaryButton background="yellow" type="button" icon="edit" onClick={() => setIsModalVisible(true)}></PrimaryButton>
			) : (
				<PrimaryButton background="green" type="button" icon="add" onClick={() => setIsModalVisible(true)}>
					Bảng điểm mới
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
									placeholder="Nhập tên bảng điểm"
									name="Name"
									label="Tên bảng điểm"
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
							{!defaultData && (
								<div className="col-12">
									<SelectField
										isLoading={isLoading}
										optionList={sampleTranscript?.data?.map((item) => ({ title: item.Name, value: item?.Id }))}
										placeholder="Chọn bảng điểm mẫu"
										name="SampleTranscriptId"
										label="Bảng điểm mẫu"
										// isRequired={false}
										// rules={[{ required: false, message: 'Bạn không được để trống' }]}
									/>
								</div>
							)}
							<div className="col-12">
								<DatePickerField mode="single" label="Ngày thi" name="Date" placeholder="Chọn ngày thi" />
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

export default ModalCreateClassTranscript
