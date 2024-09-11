import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import moment from 'moment'
import React, { useEffect, useId, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { contractApi } from '~/api/contract'
import MyModal from '~/atomic/atoms/MyModal'
import DatePickerField from '~/common/components/FormControl/DatePickerField'
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
	const editorId = useId()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()
	const [contractContent, setContractContent] = useState('')

	const printRef = useRef()

	const Content = Form.useWatch('Content', form)

	useEffect(() => {
		if (defaultData && isModalVisible) {
			form.setFieldsValue({
				...defaultData,
				ContractSigningDate: defaultData?.ContractSigningDate ? moment(defaultData.ContractSigningDate) : undefined
			})
		}
	}, [defaultData, isModalVisible])

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
				Name: data?.Name,
				...data,
				MajorId: defaultData?.MajorId,
				ContractSigningDate: moment(data?.ContractSigningDate).toISOString()
			}
			console.log('---datahihi', DATA_SUBMIT)
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const changeContractContent = (value) => {
		setContractContent(value)
		form.setFieldValue('Content', value)
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
							<div className="col-6">
								<InputTextField
									placeholder="Nhập tên hợp đồng"
									name="ContractNumber"
									label="Mã hợp đồng"
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
							<div className="col-6">
								<DatePickerField
									mode="single"
									placeholder="Chọn ngày ký hợp đồng"
									name="ContractSigningDate"
									label="Ngày ký hợp đồng"
									isRequired
									format="DD/MM/YYYY"
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
							<div className="col-12">
								<EditorField
									id={editorId}
									label="Nội dung hợp đồng"
									name="Content"
									onChangeEditor={changeContractContent}
									isRequired
									rules={[{ required: true, message: 'Bạn không được để trống' }]}
								/>
							</div>
						</div>
						<div className="row ">
							<div className="col-12 flex-all-center gap-4">
								<ReactToPrint
									trigger={() => <PrimaryButton background={'green'} type={'button'} icon="print" children="In" />}
									content={() => printRef.current}
								/>
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
				<div className="d-none">
					<div ref={printRef} style={{ padding: 40 }}>
						<div dangerouslySetInnerHTML={{ __html: Content }} />
					</div>
				</div>
			</MyModal>
		</>
	)
}

export default ContractModal
