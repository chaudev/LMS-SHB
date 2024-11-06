import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { feedbackApi } from '~/api/feedback-list'
import { MySelectDormitory, MySelectDormitoryArea, MySelectDormitoryRoom, MySelectFeedbackType } from '~/atomic'
import { MyUploadMultiV2, MyUploadMutil } from '~/atomic/atoms'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MyModal from '~/atomic/atoms/MyModal'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import MySelectFeedbackGroup from '~/atomic/molecules/MySelectFeedbackGroup'
import { UploadImageField, UploadImageFieldV2 } from '~/common/components'
import UploadFileField from '~/common/components/FormControl/UploadFileField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { formRequired } from '~/common/libs/others/form'
import { ShowNostis, ShowNoti } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { EFeedbackType } from '~/enums'
import { ERole } from '~/enums/common'
import { useCurrentUserDormitory } from '~/hooks'
import { RootState } from '~/store'

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

	const userInformation = useSelector((state: RootState) => state.user.information)
	const isStudent = (+userInformation.RoleId || ERole.student) === ERole.student
	const { data: userDormitories } = useCurrentUserDormitory({
		enabled: FeedBackType === EFeedbackType.Dormitory
	})


	useEffect(() => {
		if (defaultData) {
			form.setFieldsValue({ ...defaultData })
		}
	}, [defaultData])

	useEffect(() => {
		if (userDormitories.length && FeedBackType === EFeedbackType.Dormitory) {
			form.setFieldValue('DormitoryAreaId', userDormitories[0].DormitoryAreaId)
			form.setFieldValue('DormitoryId', userDormitories[0].DormitoryId)
			form.setFieldValue('DormitoryRoomId', userDormitories[0].DormitoryRoomId)
		}
	}, [userDormitories.length, FeedBackType])

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
			const currentFileUrls = form.getFieldValue("RoomImages") || []

			const DATA_SUBMIT = {
				...data,
				RoomImages: currentFileUrls
			}
			mutation.mutateAsync(DATA_SUBMIT)
		} catch (error) {
			ShowErrorToast(error)
		}
	}

	// const onChangeFile = async (data) => {
	// 	setIsLoadingVideo({ type: 'UPLOAD_VIDEO', status: true })
	// 	try {
	// 		let res = await VideoCourseLessonUploadFileApi.upload(data)
	// 		if (res.status == 200) {
	// 			ShowNoti('success', res.data.message)
	// 			return res
	// 		}
	// 	} catch (error) {
	// 		ShowNoti('error', error.message)
	// 	} finally {
	// 		setIsLoadingVideo({ type: 'UPLOAD_VIDEO', status: false })
	// 	}
	// }

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
							<MyFormItem name="FeedBackType" label="Loại phản hồi" className="col-6 pl-1 mb-3">
								<MySelectFeedbackType />
							</MyFormItem>

							{FeedBackType === EFeedbackType.Dormitory &&
								<>
									<Form.Item className="col-12 mb-3" label="Ký túc xá" name={'DormitoryId'} rules={formRequired}>
										<MySelectDormitory
											disabled={isStudent}
										/>
									</Form.Item>

									<Form.Item className="col-6 pr-1 mb-3" label="Khu ký túc xá" name={'DormitoryAreaId'} rules={formRequired}>
										<MySelectDormitoryArea
											DormitoryId={DormitoryId}
											disabled={!Boolean(DormitoryId) || isStudent}
											allowClear={false}
										/>
									</Form.Item>

									<Form.Item
										className="col-6 pl-1 mb-3"
										label="Phòng ký túc xá"
										name={'DormitoryRoomId'}
										rules={formRequired}
									>
										<MySelectDormitoryRoom
											DormitoryId={DormitoryId}
											DormitoryAreaId={DormitoryAreaId}
											disabled={!Boolean(DormitoryAreaId) || !Boolean(DormitoryId) || isStudent}
											allowClear={false}
										/>
									</Form.Item>

									<UploadImageFieldV2 max={5} label="" name="RoomImages" form={form} multiple={true} />
							</>}

							<MyFormItem name="Title" label="Tiêu đề" className="col-12 mb-3" required rules={formRequired}>
								<MyInput />
							</MyFormItem>
							<MyFormItem name="Content" label="Nội dung" className="col-12 mb-3" required rules={formRequired}>
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
