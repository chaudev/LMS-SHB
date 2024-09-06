import moment from 'moment'
import ClassScheduleForm, { TClassScheduleForm } from './ClassScheduleForm'
import { useMutation } from '@tanstack/react-query'
import { scheduleApi } from '~/api/schedule'
import { ShowNoti } from '~/common/utils'
import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import { Form } from 'antd'
import PrimaryButton from '~/common/components/Primary/Button'

export type TClassSchedultData = {
	ScheduleId: number
	BranchId: number
	CurriculumId: number
	ClassId: number
	StartTime: string
	EndTime: string
	ClassName: string
	RoomId: number
	TeachingFee: number
	ScheduleCurrent: number
	ScheduleTotal: number
	TotalStudent: number
	TeacherId: number
	TeacherName: string
	Note: string
}

type TProps = TMyModalProps & {
	classScheduleData?: TClassSchedultData
	scheduleId: number
	branchId: number
	curriculumId: number
	open: boolean
	onCancel: () => void
	refetch?: () => void
}
const EditClassScheduleModal = ({ classScheduleData, scheduleId, branchId, curriculumId, refetch, open, onCancel }: TProps) => {
	const [form] = Form.useForm<TClassScheduleForm>()

	const mutationUpdate = useMutation({
		mutationFn: (data: any) => scheduleApi.update(data),
		onSuccess(data, variables, context) {
			ShowNoti('success', 'Chỉnh sửa lịch thành công')
			refetch?.()
			onCancel()
		},
		onError(error) {
			ShowNoti('error', error?.message)
		}
	})

	const onSubmit = (data: TClassScheduleForm) => {
		const dataSubmit = {
			...data,
			Id: scheduleId,
			StartTime: moment(data.StartTime).format(),
			EndTime: moment(data.EndTime).format()
		}

		mutationUpdate.mutate(dataSubmit)
	}
	return (
		<MyModal open={open} onCancel={onCancel} footer={false}>
			<ClassScheduleForm
				defaultData={{
					StartTime: classScheduleData.StartTime,
					EndTime: classScheduleData.EndTime,
					TeachingFee: classScheduleData.TeachingFee,
					TeacherId: classScheduleData.TeacherId,
					RoomId: classScheduleData.RoomId,
					Note: classScheduleData.Note
				}}
				form={form}
				scheduleId={scheduleId}
				branchId={branchId}
				curriculumId={curriculumId}
				onSubmit={onSubmit}
			/>

			<div className="flex justify-end">
				<PrimaryButton icon={'save'} type="button" loading={mutationUpdate.isPending} background={'primary'} onClick={form.submit}>
					Lưu
				</PrimaryButton>
			</div>
		</MyModal>
	)
}

export default EditClassScheduleModal
