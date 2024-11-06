import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import { TStatisticAttendanceParams } from '..'
import styles from './styles.module.scss'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'

type TProps = {
	params: TStatisticAttendanceParams
	onChangeParams: (newParams: Partial<TStatisticAttendanceParams>) => void
	isLoading?: boolean
}

const StatisticAttendanceHeader = ({ params, onChangeParams, isLoading }: TProps) => {
	return (
		<div className={styles.wrapper}>
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch
					className="h-[38px] w-full"
					value={params?.branchIds}
					placeholder=""
					onChange={(val) => {
						onChangeParams({ branchIds: val, classIds: undefined })
					}}
					allowClear={false}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn lớp</label>
				<MySelectClassByBranches
					className="h-[38px] w-full"
					branchIds={`${params?.branchIds}`}
					value={params?.classIds}
					placeholder=""
					onChange={(val) => {
						onChangeParams({ classIds: val })
					}}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
}

export default StatisticAttendanceHeader
