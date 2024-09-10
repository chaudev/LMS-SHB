import { Form } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { useEffect, useState } from 'react'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import MyTable, { TMyTableProps } from '~/atomic/atoms/MyTable'
import PrimaryButton from '~/common/components/Primary/Button'
import RollUpMultipleStudentModal from '../RollUpMultipleStudentModal'
import MySelectLearningStatus from '~/atomic/molecules/MySelectLearningStatus'
import MySelectRollUpStatus from '~/atomic/molecules/MySelectRollUpStatus'
import { ShowNoti } from '~/common/utils'
import { useMutation } from '@tanstack/react-query'
import { rollUpApi } from '~/api/rollup'
import { is } from '~/common/utils/common'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

type TProps = TMyTableProps<any> & {
	scheduleIds: string
	studentData: (IStudentInClass & { Status?: number; LearningStatus?: number; Note?: string })[]
}

const RollUpTable = ({ scheduleIds, studentData, ...restProps }: TProps) => {
	const userInfo = useSelector((state: RootState) => state.user.information)

	const [openRollUpMultipleModal, setOpenRollUpMultipleModal] = useState<boolean>(false)
	const [selectedStudents, setSelectedStudents] = useState<IStudentInClass[]>([])

	const [form] = Form.useForm()

	// ===== Side effects =====
	useEffect(() => {
		if (studentData) {
			const formData = {}
			studentData?.map((item) => {
				formData[`Status_${item.StudentId}`] = item?.Status
				formData[`LearningStatus_${item.StudentId}`] = item?.LearningStatus
				formData[`Note_${item.StudentId}`] = item?.Note
			})
			form.setFieldsValue(formData)
		}
	}, [studentData])

	// ===== METHOD =====
	// ----- Set form value after update multiple students -----
	const onUpdateFormAfterUpdateMultiple = (status: number, learningStatus: number) => {
		const formData = {}
		selectedStudents?.map((item) => {
			formData[`Status_${item.StudentId}`] = status
			formData[`LearningStatus_${item.StudentId}`] = learningStatus
		})
		form.setFieldsValue(formData)
	}

	// ----- Submit update -----
	const allPropertiesAreNullOrUnderfine = (obj: Record<string, any>): boolean => {
		for (const key in obj) {
			if (obj[key] !== null && obj[key] !== undefined) {
				return false
			}
		}
		return true
	}

	const updateStatusMutation = useMutation({
		mutationFn: async (data: { Items: any[] }) => await rollUpApi.insertOrUpdateMultiple(data),
		onSuccess: () => {
			ShowNoti('success', 'Điểm danh thành công !')
		},
		onError: (error) => ShowNoti('error', error.message)
	})

	const onFinish = (data: any) => {
		if (!scheduleIds) {
			ShowNoti('warning', 'Vui lòng chọn buổi học')
			return
		}
		if (allPropertiesAreNullOrUnderfine(data)) {
			ShowNoti('warning', 'Vui lòng chỉnh sửa thông tin trước khi cập nhật')
			return
		}

		const dataSubmit = {
			Items: studentData?.map((item) => {
				return {
					StudentId: item.StudentId,
					ScheduleIds: scheduleIds,
					Status: data[`Status_${item.StudentId}`],
					LearningStatus: data[`LearningStatus_${item.StudentId}`],
					Note: data[`Note_${item.StudentId}`]
				}
			})
		}
		updateStatusMutation.mutate(dataSubmit)
	}

	// ===== UI table =====
	const rowSelection: TableRowSelection<IStudentInClass> = {
		selectedRowKeys: selectedStudents?.map((item) => item.StudentId),
		onChange: (selectedRowKeys: number[], selectedRows: IStudentInClass[]) => {
			setSelectedStudents(selectedRows)
		}
	}

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'FullName',
			width: 180,
			render: (text) => <p className="font-semibold text-[#B32025]">{text}</p>
		},
		{
			title: 'Điểm danh',
			width: 180,
			dataIndex: 'Status',
			render: (text, record, index) => (
				<div className="antd-custom-wrap">
					<MyFormItem name={`Status_${record.StudentId}`} className="mb-0">
						<MySelectRollUpStatus className="h-[36px]" disabled={!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic} />
					</MyFormItem>
				</div>
			)
		},
		{
			title: 'Học lực',
			width: 180,
			dataIndex: 'LearningStatus',
			render: (text, record, index) => (
				<div className="antd-custom-wrap">
					<MyFormItem name={`LearningStatus_${record.StudentId}`} className="mb-0">
						<MySelectLearningStatus
							className="h-[36px]"
							disabled={!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic}
						/>
					</MyFormItem>
				</div>
			)
		},
		{
			title: 'Đánh giá',
			width: 550,
			dataIndex: 'Note',
			render: (text, record, index) => (
				<div className="antd-custom-wrap">
					<MyFormItem name={`Note_${record.StudentId}`} className="mb-0">
						<MyInput className="rounded-lg mb-0" disabled={!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic} />
					</MyFormItem>
				</div>
			)
		}
	]

	return (
		<>
			<Form form={form} layout="vertical" onFinish={onFinish}>
				{(is(userInfo).admin || is(userInfo).manager || is(userInfo).academic) && (
					<div className="flex items-center justify-end gap-[10px] mb-[10px]">
						<PrimaryButton
							type="button"
							background="green"
							icon="check"
							onClick={() => {
								if (!selectedStudents?.length) {
									ShowNoti('warning', 'Vui lòng chọn học viên trước')
									return
								}
								setOpenRollUpMultipleModal(true)
							}}
							disable={!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic}
						>
							Điểm danh
						</PrimaryButton>
						<PrimaryButton
							type="submit"
							background="primary"
							icon="save"
							loading={updateStatusMutation.isPending}
							disable={!is(userInfo).admin && !is(userInfo).manager && !is(userInfo).academic}
						>
							Cập nhật
						</PrimaryButton>
					</div>
				)}

				<MyTable
					dataSource={studentData}
					columns={columns}
					pagination={false}
					bordered
					className="custom-table"
					rowKey={'StudentId'}
					rowSelection={rowSelection}
					{...restProps}
				/>
			</Form>

			<RollUpMultipleStudentModal
				open={openRollUpMultipleModal}
				scheduleIds={scheduleIds}
				studentData={selectedStudents}
				onCancel={() => setOpenRollUpMultipleModal(false)}
				onCallbackAfterSuccess={(status, learningStatus) => {
					onUpdateFormAfterUpdateMultiple(status, learningStatus)
					setSelectedStudents([])
				}}
			/>
		</>
	)
}

export default RollUpTable
