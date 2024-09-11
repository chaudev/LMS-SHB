import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import styles from './styles.module.scss'
import { TStatisticRollUpByTimeShiftParams } from '..'
import MyInputSearch from '~/atomic/atoms/MyInputSearch'
import { DatePicker } from 'antd'
import moment from 'moment'

type TProps = {
	params: TStatisticRollUpByTimeShiftParams
	onChangeParams: (newParams: Partial<TStatisticRollUpByTimeShiftParams>) => void
	isLoading?: boolean
}

const StatisticRollUpByTimeShiftHeader = ({ params, onChangeParams, isLoading }: TProps) => {
	return (
		<div className={styles.wrapper}>
			<div>
				<label className="font-medium mb-[6px]">Tìm kiếm</label>
				<MyInputSearch
					placeholder=""
					onSearch={(val) => {
						onChangeParams({ search: val || '' })
					}}
					onChange={(e) => {
						if (!e.target.value) {
							onChangeParams({ search: '' })
						}
					}}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch
					className="h-[36px] w-full"
					value={params?.branchIds}
					placeholder=""
					onChange={(val) => {
						onChangeParams({ branchIds: val })
					}}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn ngày học</label>
				<DatePicker
					value={moment(params?.date, 'DD/MM/YYYY')}
					format="DD/MM/YYYY"
					placeholder=""
					className="w-full rounded-[6px] h-[36px]"
					allowClear={false}
					disabled={isLoading}
					onChange={(_, dateString) => {
						onChangeParams({ date: dateString })
					}}
				/>
			</div>
		</div>
	)
}

export default StatisticRollUpByTimeShiftHeader
