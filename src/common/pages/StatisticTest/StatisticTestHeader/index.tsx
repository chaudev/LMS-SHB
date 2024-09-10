import MySelectBranch from '~/atomic/molecules/MySelectBranch'
import { TStatisticTestParams } from '..'
import styles from './styles.module.scss'
import MySelectClassByBranches from '~/atomic/molecules/MySelectClassByBranches'
import MySelectClassTranscriptByClass from '~/atomic/molecules/MySelectClassTranscriptByClass'
import { useDebounceFunc } from '~/common/hooks/useDebounceFunc'
import { useState } from 'react'

type TProps = {
	params: TStatisticTestParams
	onChangeParams: (newParams: TStatisticTestParams) => void
	isLoading?: boolean
}

const StatisticTestHeader = ({ params, onChangeParams, isLoading }: TProps) => {
	const [paramsNotDebounce, setParamsNotDebounce] = useState<{ sampleTranscriptIds: number[] }>({ sampleTranscriptIds: undefined })
	const debouncedChangeParams = useDebounceFunc(onChangeParams, 800)

	return (
		<div className={styles.wrapper}>
			<div>
				<label className="font-medium mb-[6px]">Chọn trung tâm</label>
				<MySelectBranch
					className="h-[38px] w-full"
					value={params?.branchIds}
					placeholder=""
					onChange={(val) => {
						setParamsNotDebounce({ sampleTranscriptIds: undefined })
						onChangeParams({ branchIds: val, classIds: undefined, sampleTranscriptIds: undefined })
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
						setParamsNotDebounce({ sampleTranscriptIds: undefined })
						onChangeParams({ classIds: val, sampleTranscriptIds: undefined })
					}}
					disabled={isLoading}
				/>
			</div>
			<div>
				<label className="font-medium mb-[6px]">Chọn bảng điểm</label>
				<MySelectClassTranscriptByClass
					className="h-[38px] w-full"
					mode="multiple"
					classId={params?.classIds ? Number(params?.classIds) : undefined}
					value={paramsNotDebounce?.sampleTranscriptIds}
					placeholder=""
					onChange={(val) => {
						setParamsNotDebounce({ sampleTranscriptIds: val })
						if (!val || (Array.isArray(val) && !val?.length)) {
							onChangeParams({ sampleTranscriptIds: undefined })
						} else {
							debouncedChangeParams({ sampleTranscriptIds: val.toString() })
						}
					}}
					disabled={isLoading}
				/>
			</div>
		</div>
	)
}

export default StatisticTestHeader
