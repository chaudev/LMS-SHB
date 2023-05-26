import React, { FC, useState } from 'react'
import NestedTable from '../../NestedTable'
import PrimaryButton from '../../Primary/Button'
import { Form, Input, Modal } from 'antd'
import { formNoneRequired, formRequired } from '~/common/libs/others/form'
import ModalFooter from '../../ModalFooter'
import { studentPointRecordApi } from '~/api/class/report'
import { ShowNostis } from '~/common/utils'

type TReportForm = {
	data: any
	onUpdateItem: Function
}

const ReportForm: FC<TReportForm> = (props) => {
	const { data, onUpdateItem } = props

	const [visible, setVisible] = useState<boolean>(false)

	function toggle() {
		setVisible(!visible)
	}

	console.log('data: ', data)

	const formattedData = [
		{
			AcademicPerformance: data?.AcademicPerformance || 'Chưa nhận xét',
			Behaviour: data?.Behaviour || 'Chưa nhận xét',
			Note: data?.Note || 'Chưa nhận xét'
		}
	]

	const [form] = Form.useForm()

	const [loading, setLoading] = useState<boolean>(true)

	async function handleUpdate(params) {
		setLoading(true)
		try {
			const res = await studentPointRecordApi.update(params)
			if (res.status == 200) {
				ShowNostis.success('Thành công')
				toggle()
				!!onUpdateItem && onUpdateItem(params)
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}

	function handleOpenEdit() {
		form.setFieldsValue({ ...data })
		toggle()
	}

	function handleSubmit(params) {
		handleUpdate({ ...params, Id: data?.Id })
		console.log(params)
	}

	return (
		<>
			<NestedTable
				Extra="Nhận xét của GVCN"
				TitleCard={
					<div className="w-full">
						<PrimaryButton onClick={handleOpenEdit} icon="edit" type="button" background="blue">
							Cập nhật
						</PrimaryButton>
					</div>
				}
				addClass="basic-header hide-pani"
				dataSource={formattedData}
				columns={[
					{
						title: 'Học lực',
						dataIndex: 'AcademicPerformance',
						width: 70,
						className: 'font-[500]',
						render: (text, item) => {
							return (
								<>
									<div className="whitespace-pre-wrap opacity-0">{text}</div>
									<div className="whitespace-pre-wrap absolute top-[6px]">{text}</div>
								</>
							)
						}
					},
					{
						title: 'Hạnh kiểm',
						width: 70,
						dataIndex: 'Behaviour',
						className: 'font-[500]',
						render: (text, item) => {
							return (
								<>
									<div className="whitespace-pre-wrap opacity-0">{text}</div>
									<div className="whitespace-pre-wrap absolute top-[6px]">{text}</div>
								</>
							)
						}
					},
					{
						title: 'Ghi chú',
						width: 70,
						dataIndex: 'Note',
						className: 'font-[500]',
						render: (text, item) => {
							return (
								<>
									<div className="whitespace-pre-wrap opacity-0">{text}</div>
									<div className="whitespace-pre-wrap absolute top-[6px]">{text}</div>
								</>
							)
						}
					}
				]}
				haveBorder={true}
			/>

			<Modal
				open={visible}
				closable={false}
				title="Cập nhật nhận xét của GVCN"
				footer={<ModalFooter onCancel={toggle} onOK={form.submit} loading={false} />}
			>
				<div className="none-ant-border">
					<Form form={form} layout="vertical" onFinish={handleSubmit}>
						<Form.Item name="AcademicPerformance" label="Học lực" rules={formRequired}>
							<Input.TextArea rows={4} className="primary-input rounded-[6px]" onChange={(e) => {}} />
						</Form.Item>
						<Form.Item name="Behaviour" label="Hạnh kiểm" rules={formRequired}>
							<Input.TextArea rows={4} className="primary-input rounded-[6px]" onChange={(e) => {}} />
						</Form.Item>
						<Form.Item name="Note" label="Ghi chú và đề xuất" rules={formNoneRequired}>
							<Input.TextArea rows={4} className="primary-input rounded-[6px]" onChange={(e) => {}} />
						</Form.Item>
					</Form>
				</div>
			</Modal>
		</>
	)
}

export default ReportForm
