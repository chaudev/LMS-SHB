import { Form, Modal } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { StudyRouteTemplateDetailApi } from '~/api/option/study-router-template-detail'
import { programApi } from '~/api/program'
import SelectField from '~/common/components/FormControl/SelectField'
import TextBoxField from '~/common/components/FormControl/TextBoxField'
import PrimaryButton from '~/common/components/Primary/Button'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNostis } from '~/common/utils'

interface IModalActionStudyRouteTemplateDetail {
	mode: 'CREATE' | 'UPDATE'
	onRefresh: Function
	item?: IStudyRouteTemplateDetail
}

const ModalActionStudyRouteTemplateDetail: React.FC<IModalActionStudyRouteTemplateDetail> = ({ mode = '', onRefresh, item }) => {
	const router = useRouter()
	const { slug } = router.query
	const [form] = Form.useForm()
	const [isLoading, setIsLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [program, setProgram] = useState<{ title: string; value: string }[]>([])

	const getProgram = async () => {
		try {
			const res = await programApi.getAll({ pageSize: 9999, pageIndex: 1 })
			if (res.status === 200) {
				let temp = []
				res?.data?.data?.forEach((item) => {
					temp.push({ title: item?.Name, value: item?.Id })
				})
				setProgram(temp)
			}
			if (res.status === 204) {
				setProgram([])
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	const onOpen = () => {
		if (mode === 'UPDATE') {
			form.setFieldsValue(item)
		}
		getProgram()
		setVisible(true)
	}

	const onClose = () => {
		setVisible(false)
		form.resetFields()
	}

	const _onSubmit = async (params) => {
		try {
			setIsLoading(true)
			const payload = {
				StudyRouteTemplateId: Number(slug),
				...params
			}
			if (mode === 'CREATE') {
				const response = await StudyRouteTemplateDetailApi.createStudyRouteTemplateDetail(payload)
				if (response.status === 200) {
					setIsLoading(false)
					ShowNostis.success(response.data.message)
					onRefresh()
				}
			} else {
				const payload = {
					Id: item.Id,
					...params
				}
				const response = await StudyRouteTemplateDetailApi.updateStudyRouteTemplateDetail(payload)
				if (response.status === 200) {
					setIsLoading(false)
					ShowNostis.success(response.data.message)
					onRefresh()
				}
			}
			onClose()
		} catch (error) {
			ShowNostis.error(error.message)
			setIsLoading(false)
		}
	}

	return (
		<>
			{mode === 'CREATE' ? (
				<PrimaryButton
					background="green"
					type="button"
					icon="add"
					onClick={() => {
						onOpen()
					}}
				>
					Thêm mới
				</PrimaryButton>
			) : (
				<IconButton onClick={onOpen} type="button" icon={'edit'} color="yellow" tooltip="Sửa" />
			)}

			<Modal
				destroyOnClose
				open={visible}
				onCancel={onClose}
				title={mode === 'CREATE' ? 'Thêm mới chương trình học' : 'Cập nhật chương trình học'}
				footer={false}
			>
				<Form form={form} layout="vertical" onFinish={_onSubmit}>
					<div className="col-span-2">
						<SelectField
							label="Khóa học"
							name="ProgramId"
							optionList={program}
							placeholder="Chọn chương trình"
							rules={[{ required: true, message: 'Bạn không được để trống' }]}
						/>
					</div>
					<div className="col-span-2">
						<TextBoxField name="Note" label="Ghi chú" />
					</div>
					<div className="d-flex justify-center">
						<PrimaryButton onClick={() => onClose()} background="red" icon="cancel" type="button">
							Huỷ
						</PrimaryButton>
						<PrimaryButton
							loading={isLoading}
							className="ml-2"
							background="blue"
							icon={mode === 'CREATE' ? 'add' : 'save'}
							type="submit"
							children={mode === 'CREATE' ? 'Thêm mới' : 'Cập nhật'}
						/>
					</div>
				</Form>
			</Modal>
		</>
	)
}

export default ModalActionStudyRouteTemplateDetail
