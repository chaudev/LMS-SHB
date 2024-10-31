import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { feedbackApi } from '~/api/feedback-list'
import { MySelectDormitory, MySelectDormitoryArea, MySelectDormitoryRoom, MySelectFeedbackType } from '~/atomic'
import { MyUploadMultiV2, MyUploadMutil } from '~/atomic/atoms'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectFeedbackGroup from '~/atomic/molecules/MySelectFeedbackGroup'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { EFeedbackType } from '~/enums'
import { useCurrentUserDormitory } from '~/hooks'

interface IFeedbackModal {
	defaultData?: TFeedback
	refreshData: any
}

const FeedbackModal: React.FC<IFeedbackModal> = (props) => {
	const { defaultData, refreshData } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [form] = Form.useForm()
	const FeedBackType = Form.useWatch('FeedBackType', form)

	const DormitoryId = Form.useWatch('DormitoryId', form)
	const DormitoryAreaId = Form.useWatch('DormitoryAreaId', form)

	const { data: userDormitories } = useCurrentUserDormitory({
		enabled: FeedBackType === EFeedbackType.Dormitory
	})


	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	// * handle mutation
	const mutation = useMutation({
		mutationFn: (data: any) => {
			if (defaultData) {
				return feedbackApi.update({ ...data, Id: defaultData?.Id })
			} else {
				return feedbackApi.add(data)
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

	const onSubmit = (data: TFeedback) => {
		try {
			delete data["files"]

			const DATA_SUBMIT = data.FeedBackType === EFeedbackType.Dormitory ? {
				...data,
				// DormitoryId: userDormitories[0].DormitoryId,
				// DormitoryAreaId: userDormitories[0].DormitoryAreaId,
				// DormitoryRoomId: userDormitories[0].DormitoryRoomId,
			} : {
				...data
			}
			console.log(DATA_SUBMIT, 'DATA_SUBMIT')
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	const handleUpdoadFiles = async ({ fileList }) => {
		if (!fileList?.length || fileList.some(file => file.response !== "ok")) return
		try {
			const uploadfiles = fileList.map((file) => file.originFileObj)
			feedbackApi.uploadImages(uploadfiles).then(res => {
				form.setFieldValue("RoomImages", res.data.resultData)
			})
		} catch (error) {
			ShowNoti('error', error?.message || 'Error upload files')
            return []
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
				title={defaultData ? 'Cập nhật phản hồi' : 'Thêm phản hồi mới'}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={null}
			>
				<div className="container-fluid">
					<Form form={form} layout="vertical" onFinish={onSubmit}>
						<div className="row gy-1">
							<MyFormItem name="FeedbackGroupId" label="Nhóm phản hồi" className="col-6 pr-1 mb-3" required rules={formRequired}>
								<MySelectFeedbackGroup />
							</MyFormItem>
							<MyFormItem name="FeedBackType" label="Loại phản hồi" className="col-6 pl-1 mb-3" required rules={formRequired}>
								<MySelectFeedbackType />
							</MyFormItem>

							{FeedBackType === EFeedbackType.Dormitory &&
								<>
									<Form.Item className="col-12 mb-3" label="Ký túc xá" name={'DormitoryId'} rules={formRequired}>
										<MySelectDormitory />
									</Form.Item>

									<Form.Item className="col-6 pr-1 mb-3" label="Khu ký túc xá" name={'DormitoryAreaId'} rules={formRequired}>
										<MySelectDormitoryArea DormitoryId={DormitoryId} disabled={!Boolean(DormitoryId)} allowClear={false} />
									</Form.Item>

									<Form.Item className="col-6 pl-1 mb-3" label="Phòng ký túc xá" name={'DormitoryRoomId'} rules={formRequired}>
										<MySelectDormitoryRoom
											DormitoryId={DormitoryId}
											DormitoryAreaId={DormitoryAreaId}
											disabled={!Boolean(DormitoryAreaId) || !Boolean(DormitoryId)}
											allowClear={false}
										/>
									</Form.Item>

									<Form.Item
										label="Tải tệp tại đây"
										valuePropName="fileList"
										name="files"
										getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
									>
										<MyUploadMutil onChange={handleUpdoadFiles} />
									</Form.Item>
							</>}

							<MyFormItem name="Title" label="Tiêu đề" className="col-12 mb-3" required rules={formRequired}>
								<MyInput />
							</MyFormItem>
							<MyFormItem name="Content" label="Nội dung" className="col-12 mb-3">
								<MyTextArea cols={4} />
							</MyFormItem>

						</div>
						<div className="row">
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

export default FeedbackModal
