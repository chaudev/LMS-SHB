import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import { templateMajorApi } from '~/api/template-major'
import PrimaryButton from '~/common/components/Primary/Button'
import { Form, Popover, Spin, Tooltip } from 'antd'
import { ShowNoti } from '~/common/utils'
import EditorField from '~/common/components/FormControl/EditorField'
import MyInput from '~/atomic/atoms/MyInput'
import MyFormItem from '~/atomic/atoms/MyFormItem'

const DetailMajorContractPage = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
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

	const { data: guideData } = useQuery({
		queryKey: [templateMajorApi.keyGetGuide],
		queryFn: () => {
			return templateMajorApi.getGuide().then((data) => data.data?.data)
		}
	})

	const content = useMemo(() => {
		if (!guideData) return <></>

		return guideData?.map((item) => {
			return (
				<Tooltip title="Nhấn để sao chép" placement="left">
					<div
						className="text-guide"
						onClick={() => (navigator.clipboard.writeText(item.Code), ShowNoti('success', 'Sao chép thành công'))}
					>
						<span>{item.Code}: </span>
						<span>{item.Name}</span>
					</div>
				</Tooltip>
			)
		})
	}, [guideData])

	const updateMutation = useMutation({
		mutationFn(payload: TPutTemplateMajor) {
			return templateMajorApi.update(payload)
		},
		onSuccess() {
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
			<h2 className="font-medium mb-4 text-tw-primary">Điều chỉnh hợp đồng</h2>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<div className="w-1/2">
					<MyFormItem name="Name" label="Tên hợp đồng">
						<MyInput placeholder="Tên hợp đồng" />
					</MyFormItem>
				</div>
				<Popover content={content} placement="bottomLeft" title="Mã hướng dẫn" className="popover-guide">
					<button className="btn-guide">Mã hướng dẫn</button>
				</Popover>
				<EditorField name="Content" label="Mẫu hợp đồng" onChangeEditor={(value) => form.setFieldValue('Content', value)} />
				<PrimaryButton className="!flex mx-auto" background="blue" type="submit" icon="save">
					Lưu {updateMutation.isPending && <Spin className="loading-base" />}
				</PrimaryButton>
			</Form>
		</div>
	)
}

export default DetailMajorContractPage
