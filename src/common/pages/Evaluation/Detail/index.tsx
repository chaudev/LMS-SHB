import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { evaluationGroupApi } from '~/api/evaluation'
import FormLoading from './components/FormLoading'
import { isNull, ShowErrorToast } from '~/common/utils/main-function'
import Lottie from 'react-lottie-player'
import empty from '~/common/components/json/empty-table.json'
import PrimaryButton from '~/common/components/Primary/Button'
import GroupForm from './components/GroupForm'

const EvaluationDetail = () => {
	const router = useRouter()
	const { evaluationFormId } = router.query
	const [isCreating, setIsCreating] = useState(false)

	const { data, isLoading, refetch } = useQuery({
		queryKey: ['get-sample-group-in-form', evaluationFormId],
		queryFn: () => {
			return evaluationGroupApi
				.getDetail(evaluationFormId)
				.then((res) => res.data.data)
				.catch((err) => {
					ShowErrorToast(err)
					throw err
				})
		},
		enabled: router.isReady && !!evaluationFormId
	})

	// ** handle click create group
	const handleCreateGroup = () => {
		setIsCreating(true)
	}

	return (
		<div className="w750:max-w-[800px] mx-auto">
			{isLoading && isNull(data) && <FormLoading />}
			{!isLoading && isNull(data) && !isCreating && (
				<div className="flex items-center flex-col">
					<Lottie loop animationData={empty} play className="inner w-[300px] mx-auto" />
					<div className="flex items-center gap-2">
						<p className="font-medium text-[18px]">Tạo nhóm câu hỏi đầu tiên để bắt đầu</p>
						<PrimaryButton background="green" type="button" icon="add" onClick={() => handleCreateGroup()}>
							Thêm nhóm câu hỏi
						</PrimaryButton>
					</div>
				</div>
			)}
			{isCreating && <GroupForm setIsCreating={setIsCreating} refreshData={refetch} />}
		</div>
	)
}

export default EvaluationDetail
