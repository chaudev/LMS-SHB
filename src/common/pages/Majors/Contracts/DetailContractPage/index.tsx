import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
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

const DetailMajorContractPage = () => {
	const router = useRouter()
	const { query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const queryClient = useQueryClient()

	const [form] = Form.useForm<TPutTemplateMajor>()

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

	const { data: contractData } = useQuery({
		queryKey: [templateMajorApi.keyGetById],
		queryFn: () => {
			return templateMajorApi.getById(Number(query?.id)).then((data) => data.data?.data)
		},
		enabled: !!query?.id
	})

	useEffect(() => {
		if (contractData) {
			form.setFieldsValue({
				Name: contractData?.Name,
				Content: contractData?.Content
			})
		}
	}, [contractData])

	const updateMutation = useMutation({
		mutationFn(payload: TPutTemplateMajor) {
			return templateMajorApi.update(payload)
		},
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: [templateMajorApi.keyGetAll]
			})
			ShowNoti('success', 'Điều chỉnh thành công!')
		},
		onError(error, variables, context) {
			ShowNoti('error', error?.message)
		}
	})

	const onSubmit = (data: TPutTemplateMajor) => {
		if (!query?.id) return

		updateMutation.mutate({ ...data, Id: Number(query?.id) })
	}

	return (
		<div className="wrapper-config-template">
			<h2 className="font-medium mb-4 text-tw-primary">Chi tiết hợp đồng</h2>
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
				<PrimaryButton background="blue" type="button" icon="save" onClick={form.submit}>
					Lưu {updateMutation.isPending && <Spin className="loading-base" />}
				</PrimaryButton>
			</div>
		</div>
	)
}

export default DetailMajorContractPage
