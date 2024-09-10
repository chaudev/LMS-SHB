import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'
import MySelectClassStatus from '~/atomic/molecules/MySelectClassStatus'
import MySelectScheduleOfClass from '~/atomic/molecules/MySelectScheduleOfClass'
import { EClassStatus } from '~/enums/class'
import { TRollUpParam } from '..'
import { useDebounceFunc } from '~/common/hooks/useDebounceFunc'

type TProps = {
	params: TRollUpParam
	onChangeParams: (newParams: TRollUpParam) => void
	isLoading?: boolean
}

const RollUpHeader = ({ params, onChangeParams, isLoading }: TProps) => {
	const debouncedChangeParams = useDebounceFunc(onChangeParams, 800)

	return (
		<div className="grid grid-cols-4 gap-[10px]">
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch
					className="h-[38px] w-full"
					value={params?.branchId}
					placeholder=""
					onChange={(val) => onChangeParams({ branchId: val })}
					allowClear={false}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn trạng thái lớp học</label>
				<MySelectClassStatus
					className="h-[38px] w-full"
					placeholder=""
					value={params?.classStatus}
					allowClear={false}
					options={[
						{ value: `ALL`, label: 'Tất cả' },
						{ value: `${EClassStatus.InProgress}`, label: 'Đang diễn ra' },
						{ value: `${EClassStatus.Finished}`, label: 'Kết thúc' }
					]}
					onChange={(val) => onChangeParams({ classStatus: val, classId: undefined })}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn lớp</label>
				<MySelectClassByBranches
					className="h-[38px] w-full"
					branchIds={`${params?.branchId}`}
					value={params?.classId}
					classStatus={params?.classStatus === 'ALL' ? `${(EClassStatus.InProgress, EClassStatus.Finished)}` : params?.classStatus}
					placeholder=""
					onChange={(val) => onChangeParams({ classId: val })}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn buổi học</label>
				<MySelectScheduleOfClass
					classId={params?.classId}
					className="h-[38px]"
					mode="multiple"
					allowClear
					placeholder=""
					onChange={(val) => {
						if (!val || (Array.isArray(val) && !val?.length)) {
							onChangeParams({ scheduleIds: undefined })
						} else {
							if (val?.length > 1) {
								onChangeParams({ scheduleIds: val.toString() })
							} else {
								debouncedChangeParams({ scheduleIds: val.toString() })
							}
						}
					}}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
}

export default RollUpHeader
