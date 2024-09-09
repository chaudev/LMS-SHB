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
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch value={params?.branchId} placeholder="" onChange={(val) => onChangeParams({ branchId: val })} allowClear={false} />
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn trạng thái lớp học</label>
				<MySelectClassStatus
					className="max-h-[36px]"
					placeholder=""
					value={params?.classStatus}
					allowClear={false}
					options={[
						{ value: `ALL`, label: 'Tất cả' },
						{ value: `${EClassStatus.InProgress}`, label: 'Đang diễn ra' },
						{ value: `${EClassStatus.Finished}`, label: 'Kết thúc' }
					]}
					onChange={(val) => onChangeParams({ classStatus: val, classId: undefined })}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn lớp</label>
				<MySelectClassByBranches
					branchIds={`${params?.branchId}`}
					value={params?.classId}
					classStatus={params?.classStatus === 'ALL' ? `${(EClassStatus.InProgress, EClassStatus.Finished)}` : params?.classStatus}
					placeholder=""
					onChange={(val) => onChangeParams({ classId: val })}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn buổi học</label>
				<MySelectScheduleOfClass
					classId={params?.classId}
					className="max-h-[36px]"
					mode="multiple"
					allowClear
					placeholder=""
					onChange={(val) => onChangeParams({ scheduleIds: val ? val.toString() : undefined })}
				/>
			</div>
		</div>
	)
}

export default RollUpHeader
