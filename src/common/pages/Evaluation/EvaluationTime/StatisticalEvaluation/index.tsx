import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React from 'react'
import { evaluationTimeApi } from '~/api/evaluation-time'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import EvaluationCard from '../Evaluate/components/EvaluationCard'
import { EVALUATION_TYPES, USER_EVALUATION_FORM_STATUS } from '~/common/utils/constants'
import EssayStatistical from './components/Essay'
import MultipleChoiceStatistical from './components/MultipleChoice'

const StatisticalEvaluation = () => {
	const router = useRouter()
	const { id } = router.query

	// ** get statistical data
	const { data, isLoading } = useQuery({
		queryKey: ['get-evaluation-statistical', id],
		queryFn: () => {
			return evaluationTimeApi
				.getStatistic(id)
				.then((res) => res.data.data)
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!id && router.isReady
	})

	return (
		<div className="w750:max-w-[800px] mx-auto">
			{/* nội dung thống kê */}
			{!isNull(data) && !isLoading && <EvaluationCard type="header" title={data?.Name} description={`Mã: ${data?.Code}`}></EvaluationCard>}
			{isNull(data) && isLoading && <div>Đang tải dữ liệu...</div>}
			{!isNull(data) &&
				!isLoading &&
				data?.ListGroup?.filter((item) => item?.Type !== EVALUATION_TYPES.essay)?.map((item) => (
					<div key={crypto.randomUUID()} className="first:mt-0 mt-3">
						<EvaluationCard type="" title={item?.Name} description={item?.Description}>
							{/* {item?.Type === EVALUATION_TYPES.essay && <EssayStatistical data={item} />} */}
							<MultipleChoiceStatistical data={item} />
						</EvaluationCard>
					</div>
				))}
		</div>
	)
}

export default StatisticalEvaluation
