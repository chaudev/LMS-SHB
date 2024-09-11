import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'
import { TStatisticRollUpByStudentParams } from '..'
import { DatePicker } from 'antd'
import styles from './styles.module.scss'

const { RangePicker } = DatePicker

type TProps = {
	params: TStatisticRollUpByStudentParams
	onChangeParams: (newParams: TStatisticRollUpByStudentParams) => void
	isLoading?: boolean
}

const StatisticRollUpByStudentHeader = ({ params, onChangeParams, isLoading }: TProps) => {
	return (
		<div className={styles.wrapper}>
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch
					className="h-[38px] w-full"
					value={params?.branchIds}
					placeholder=""
					onChange={(val) => onChangeParams({ branchIds: val, classIds: undefined })}
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
					onChange={(val) => onChangeParams({ classIds: val })}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Từ ngày - Đến ngày</label>
				<RangePicker
					format={'DD/MM/YYYY'}
					className={styles.rangePicker}
					allowClear={true}
					onChange={(value, dateStrings) => {
						onChangeParams({ from: dateStrings[0], to: dateStrings[1] })
					}}
				/>
			</div>
		</div>
	)
}

export default StatisticRollUpByStudentHeader
