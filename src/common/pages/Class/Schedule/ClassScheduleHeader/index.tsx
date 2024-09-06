import moment from 'moment'
import MyDatePicker from '~/atomic/atoms/MyDatePicker'
import MyInputNumber from '~/atomic/atoms/MyInputNumber'
import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'
import MySelectDateOfWeek from '~/atomic/molecules/MySelectDateOfWeek'
import MySelectProgram from '~/atomic/molecules/MySelectProgram'
import MySelectRoom from '~/atomic/molecules/MySelectRoom'
import MySelectUserAvailable from '~/atomic/molecules/MySelectUserAvailable'
import { USER_ROLES } from '~/common/utils/constants'
import { TClassScheduleParams } from '..'
import { useDebounceFunc } from '~/common/hooks/useDebounceFunc'

type TProps = {
	params: TClassScheduleParams
	onFilter: (params: Partial<TClassScheduleParams>) => void
}

const ClassScheduleHeader = ({ params, onFilter }: TProps) => {
	const debouncedFilter = useDebounceFunc(onFilter, 800)

	return (
		<div className="grid grid-cols-4 gap-[16px]">
			<div>
				<label className="font-medium mb-[6px]">Chọn tuần</label>
				<MyDatePicker
					className="w-full primary-input"
					picker="week"
					format={'Tuần wo - YYYY'}
					placeholder="Chọn tuần"
					value={moment(params.from)}
					allowClear={false}
					onChange={(val) => {
						onFilter({
							from: moment(val).startOf('week').format('YYYY/MM/DD'),
							to: moment(val).endOf('week').format('YYYY/MM/DD')
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn chi nhánh</label>
				<MySelectBranch
					onChange={(val) => {
						debouncedFilter({
							branchIds: val
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn lớp</label>
				<MySelectClassByBranches
					mode="multiple"
					placeholder={!params?.branchIds ? 'Vui lòng chọn chi nhánh trước' : 'Chọn lớp'}
					className="h-[36px]"
					branchIds={`${params?.branchIds}`}
					onChange={(val) => {
						debouncedFilter({
							classIds: val?.toString()
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn phòng</label>
				<MySelectRoom
					mode="multiple"
					placeholder={!params?.branchIds ? 'Vui lòng chọn chi nhánh trước' : 'Chọn phòng'}
					enabledQuery={Boolean(params?.branchIds)}
					branchId={params?.branchIds ? Number(params?.branchIds) : undefined}
					onChange={(val) => {
						debouncedFilter({
							roomIds: val?.toString()
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn chương trình</label>
				<MySelectProgram
					mode="multiple"
					onChange={(val) => {
						debouncedFilter({
							programIds: val?.toString()
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn giáo viên</label>
				<MySelectUserAvailable
					mode="multiple"
					roleId={USER_ROLES.teacher}
					placeholder="Chọn giáo viên"
					onChange={(val) => {
						debouncedFilter({
							teacherIds: val?.toString()
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn thứ</label>
				<MySelectDateOfWeek
					mode="multiple"
					placeholder="Chọn thứ"
					onChange={(val) => {
						debouncedFilter({
							datesOfWeek: val?.toString()
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Số thứ tự buổi học</label>
				<MyInputNumber
					placeholder="Số thứ tự buổi học"
					onChange={(val) => {
						if (typeof val === 'number') {
							debouncedFilter({
								scheduleIndex: val
							})
						} else {
							debouncedFilter({
								scheduleIndex: undefined
							})
						}
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Giờ ca học từ</label>
				<MyDatePicker
					className="w-full primary-input"
					picker="time"
					format={'HH:mm'}
					placeholder="Giờ ca học từ"
					value={params?.timeFrom}
					onChange={(val) => {
						onFilter({
							timeFrom: val
						})
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Giờ ca học đến</label>
				<MyDatePicker
					className="w-full primary-input"
					picker="time"
					format={'HH:mm'}
					placeholder="Giờ ca học đến"
					value={params?.timeTo}
					onChange={(val) => {
						onFilter({
							timeTo: val
						})
					}}
				/>
			</div>
		</div>
	)
}

export default ClassScheduleHeader
