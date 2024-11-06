import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { userEvaluationFormApi } from '~/api/user-evaluation'
import MyModal from '~/atomic/atoms/MyModal'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'
import { RootState } from '~/store'

interface IConfirmEvaluate {
	staffName: string
	refetch: Function
}

const ConfirmEvaluate: React.FC<IConfirmEvaluate> = (propss) => {
	const { staffName, refetch } = propss
	const [isModalVisible, setIsModalVisible] = useState(false)
	const evaluationGroupDetailSubmit = useSelector((state: RootState) => state.evaluationState.EvaluationGroupDetails)
	const router = useRouter()
	const { id } = router.query

	// ** handle submit form
	const mutationSubmitForm = useMutation({
		mutationKey: ['SUBMIT-FORM'],
		mutationFn(payload: TGroupDetail[]) {
			return userEvaluationFormApi.submit({
				EvaluationGroupDetails: payload,
				Id: Number(id)
			})
		},
		// onMutate() {
		// 	setIsSaving(true)
		// },
		onSuccess() {
			refetch()
			ShowNostis.success('Đã gửi đánh giá thành công')
			setIsModalVisible(false)
		}
	})

	return (
		<div>
			<PrimaryButton type="button" icon="send" background="blue" onClick={() => setIsModalVisible(true)}>
				Gửi đánh giá
			</PrimaryButton>
			<MyModal
				title={'Xác nhận gửi đánh giá'}
				open={isModalVisible}
				centered
				onCancel={() => setIsModalVisible(false)}
				footer={
					<div className="flex-all-center">
						<PrimaryButton
							type="button"
							icon="cancel"
							background="transparent"
							onClick={() => setIsModalVisible(false)}
							className="mr-2 btn-outline"
						>
							Hủy
						</PrimaryButton>

						<PrimaryButton
							type="button"
							icon="send"
							background="blue"
							onClick={() => mutationSubmitForm.mutateAsync(evaluationGroupDetailSubmit)}
							disable={mutationSubmitForm.isPending}
							loading={mutationSubmitForm.isPending}
						>
							Gửi
						</PrimaryButton>
					</div>
				}
			>
				<p className="font-medium text-[16px] text-center">Xác nhận gửi đánh giá cho {staffName}?</p>
				<p className="text-center text-tw-red mt-2">Lưu ý: phiếu đánh giá đã được gửi sẽ không thể chỉnh sửa</p>
			</MyModal>
		</div>
	)
}

export default ConfirmEvaluate
