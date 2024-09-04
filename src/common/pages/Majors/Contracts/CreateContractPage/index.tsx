import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import { templateMajorApi } from '~/api/template-major'
import PrimaryButton from '~/common/components/Primary/Button'
import { Form, Spin } from 'antd'
import { ShowNoti } from '~/common/utils'
import MajorContractForm from '../ContractForm'

const CreateMajorContractPage = () => {
	const router = useRouter()
	const { query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const queryClient = useQueryClient()

	const [form] = Form.useForm()

	const isAllow = useMemo(() => {
		if (is(userInfo).admin) {
			return true
		}
		return false
	}, [userInfo])

	useEffect(() => {
		if (!isAllow) {
			router.push('/')
		}
	}, [isAllow])

	const createMutation = useMutation({
		mutationFn(payload: TPostTemplateMajor) {
			return templateMajorApi.add(payload)
		},
		onSuccess() {
			ShowNoti('success', 'Tạo thành công!')
			queryClient.invalidateQueries({
				queryKey: [templateMajorApi.keyGetAll]
			})
			router.push({
				pathname: '/majors/contracts',
				query: {
					id: query?.majorId,
					group: query?.group
				}
			})
		},
		onError(error, variables, context) {
			ShowNoti('error', error?.message)
		}
	})

	const onSubmit = (data: TPostTemplateMajor) => {
		if (!query?.majorId) return

		createMutation.mutate({ ...data, MajorId: query?.majorId.toString() })
	}

	return (
		<div className="wrapper-config-template">
			<h2 className="font-medium mb-4 text-tw-primary">Tạo hợp đồng</h2>

			<MajorContractForm form={form} onFinish={onSubmit} />

			<div className="flex justify-center gap-[16px]">
				<PrimaryButton
					background="transparent"
					type="button"
					icon="back"
					onClick={() => {
						router.push({
							pathname: '/majors/contracts',
							query: {
								id: query?.majorId,
								group: query?.group
							}
						})
					}}
				>
					Quay lại
				</PrimaryButton>
				<PrimaryButton className="" background="blue" type="button" icon="save" onClick={form.submit}>
					Lưu {createMutation.isPending && <Spin className="loading-base" />}
				</PrimaryButton>
			</div>
		</div>
	)
}

export default CreateMajorContractPage
