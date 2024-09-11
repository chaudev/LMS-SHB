import { useState } from 'react'
import styles from './styles.module.scss'
import MyTabs from '~/atomic/atoms/MyTabs'
import StatisticRollUpByStudent from './StatisticRollUpByStudent'
import StatisticRollUpByTimeShift from './StatisticRollUpByTimeShift'

enum EStatisticRollUpType {
	ByStudent = '1',
	ByTimeShift = '2'
}

const StatisticRollUpPage = () => {
	const [activedStatisticRollUpTypeTab, setActivedStatisticRollUpTypeTab] = useState<EStatisticRollUpType>(EStatisticRollUpType.ByStudent)

	return (
		<div className={styles.wrapper}>
			<p className="font-medium text-[18px] mb-[16px]">Thống kê điểm danh</p>
			<MyTabs
				type="card"
				items={[
					{
						label: 'Theo học viên trong lớp',
						key: EStatisticRollUpType.ByStudent
					},
					{
						label: 'Theo ca học của lớp',
						key: EStatisticRollUpType.ByTimeShift
					}
				]}
				activeKey={activedStatisticRollUpTypeTab}
				onChange={(e: EStatisticRollUpType) => setActivedStatisticRollUpTypeTab(e)}
				className={styles.tabWrapper}
			/>
			<div className={styles.mainContent}>
				{activedStatisticRollUpTypeTab === EStatisticRollUpType.ByStudent && <StatisticRollUpByStudent />}
				{activedStatisticRollUpTypeTab === EStatisticRollUpType.ByTimeShift && <StatisticRollUpByTimeShift />}
			</div>
		</div>
	)
}

export default StatisticRollUpPage
