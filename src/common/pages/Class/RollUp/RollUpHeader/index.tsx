import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'
import MySelectClassStatus from '~/atomic/molecules/MySelectClassStatus'
import MySelectScheduleOfClass from '~/atomic/molecules/MySelectScheduleOfClass'
import { EClassStatus } from '~/enums/class'
import { TRollUpParam } from '..'

type TProps = {
	params: TRollUpParam
	onChangeParams: (newParams: TRollUpParam) => void
}

const RollUpHeader = ({ params, onChangeParams }: TProps) => {
	return (
		<div className="grid grid-cols-4 gap-[10px]">
			<MySelectBranch value={params?.branchId} placeholder="Chọn trung tâm" onChange={(val) => onChangeParams({ branchId: val })} />
			<MySelectClassStatus
				placeholder="Chọn trạng thái lớp học"
				value={params?.classStatus}
				options={[
					{ value: `ALL`, label: 'Tất cả' },
					{ value: `${EClassStatus.InProgress}`, label: 'Đang diễn ra' },
					{ value: `${EClassStatus.Finished}`, label: 'Kết thúc' }
				]}
				onChange={(val) => onChangeParams({ classStatus: val, classId: undefined })}
			/>
			<MySelectClassByBranches
				branchIds={`${params?.branchId}`}
				value={params?.classId}
				classStatus={params?.classStatus === 'ALL' ? `${(EClassStatus.InProgress, EClassStatus.Finished)}` : params?.classStatus}
				placeholder="Chọn lớp"
				onChange={(val) => onChangeParams({ classId: val })}
			/>
			<MySelectScheduleOfClass
				classId={params?.classId}
				className="max-h-[36px]"
				mode="multiple"
				allowClear
				placeholder="Chọn buổi học"
				onChange={(val) => onChangeParams({ scheduleIds: val ? val.toString() : undefined })}
			/>
		</div>
	)
}

export default RollUpHeader
