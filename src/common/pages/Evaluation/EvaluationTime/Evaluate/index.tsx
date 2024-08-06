import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { userEvaluationFormApi } from '~/api/user-evaluation'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import EvaluationCard from './components/EvaluationCard'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { is } from '~/common/utils/common'
import { EVALUATION_TYPES, USER_EVALUATION_FORM_STATUS } from '~/common/utils/constants'
import Lottie from 'react-lottie-player'
import empty from '~/common/components/json/empty-table.json'
import GroupEvaluate from './components/GroupEvaluate'
import PrimaryButton from '~/common/components/Primary/Button'
import { useDispatch } from 'react-redux'
import { setSubmitData } from '~/store/evaluationReducer'
import ConfirmEvaluate from './components/ConfirmEvaluate'

const Evaluate = () => {
	const router = useRouter()
	const dispatch = useDispatch()
	const { id } = router.query
	const userInfo = useSelector((state: RootState) => state.user.information)
	const evaluationGroupDetailSubmit = useSelector((state: RootState) => state.evaluationState.EvaluationGroupDetails)

	// ** get details evaluation form data
	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-user-evaluation-form-detail', id],
		queryFn: () => {
			return userEvaluationFormApi
				.getDetail(id)
				.then((res) => res.data.data)
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: !!id && router.isReady
	})

	useEffect(() => {
		if (!isNull(data)) {
			dispatch(setSubmitData(data?.EvaluationGroupDetails))
		}
	}, [data])

	// ** hỏi trước khi muốn f5 hay tắt page
	useEffect(() => {
		const handleBeforeUnload = (event) => {
			const message = 'Are you sure you want to leave?'
			event.returnValue = message
			return message
		}

		if (data?.Status == USER_EVALUATION_FORM_STATUS.waiting) {
			window.addEventListener('beforeunload', handleBeforeUnload)
		}

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload)
		}
	}, [])

	return (
		<div className="w750:max-w-[800px] mx-auto">
			{/* tiêu đề phiếu đánh giá */}
			{!isNull(data) && (
				<EvaluationCard type="header" title={data?.EvaluationFormName}>
					{/* role nào được đánh giá thì xem được status */}
					{(!is(userInfo).admin || !is(userInfo).manager) && (
						<div className="mt-3">
							{data?.Status == USER_EVALUATION_FORM_STATUS.waiting && (
								<div className="px-2 py-1 uppercase rounded-[6px] w-fit font-medium border-[1px] border-tw-blue bg-[#d2e8ff] text-tw-blue">
									Đang đánh giá
								</div>
							)}
							{data?.Status == USER_EVALUATION_FORM_STATUS.done && (
								<div className="px-2 py-1 uppercase rounded-[6px] w-fit font-medium border-[1px] border-tw-green bg-[#d3ffd2] text-tw-green">
									Đã đánh giá
								</div>
							)}
						</div>
					)}
					<div className="mt-3 flex flex-wrap justify-between">
						<p>
							<span className="font-medium !text-primary">Người đánh giá:</span> {data?.AssessorName}
						</p>
						<p>
							<span className="font-medium !text-primary">Nhân viên được đánh giá:</span> {data?.FullName}
						</p>
					</div>
				</EvaluationCard>
			)}
			{/* nội dung phiếu đánh giá */}
			{!isNull(data?.EvaluationGroupDetails) && !isLoading && (
				<div className="my-3">
					{data?.EvaluationGroupDetails?.map((item) => (
						<div key={item.Id} className="first:mt-0 mt-3">
							<EvaluationCard type={item.Type} title={item.Name} description={item.Description}>
								<GroupEvaluate data={item} disabled={data?.Status == USER_EVALUATION_FORM_STATUS.done} />
							</EvaluationCard>
						</div>
					))}

					{data?.Status == USER_EVALUATION_FORM_STATUS.waiting && (
						<div className="w-full flex justify-end mt-3">
							<ConfirmEvaluate staffName={data?.FullName} refetch={refetch} />
						</div>
					)}
				</div>
			)}
			{/* không tìm thấy nội dung đánh giá */}
			{isNull(data?.EvaluationGroupDetails) && !isLoading && (
				<div className="my-3">
					<EvaluationCard type="">
						<div className="text-center">
							<Lottie loop animationData={empty} play className="inner w-[300px] mx-auto" />
							<p className="font-medium text-[16px]">Không có nội dung đánh giá</p>
						</div>
					</EvaluationCard>
				</div>
			)}
		</div>
	)
}

export default Evaluate
