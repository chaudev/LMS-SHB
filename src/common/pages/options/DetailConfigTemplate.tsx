import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { configTemplateApi } from '~/api/config-example'
import { ShowNoti } from '~/common/utils'
import { Form, Popover, Spin, Tooltip } from 'antd'
import EditorField from '~/common/components/FormControl/EditorField'
import PrimaryButton from '~/common/components/Primary/Button'
import { checkIncludesRole } from '~/common/utils/common'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

const DetailConfigTemplate = () => {
	const router = useRouter()
	const slug = router.query.slug
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [template, setTemplate] = useState<IConfigExample>()
	const [guide, setGuide] = useState<IGuideExample[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [form] = Form.useForm()

	const getTemplateByType = async () => {
		try {
			const res = await configTemplateApi.getTemplateByType(slug)
			if (res.status === 200) {
				setTemplate(res.data.data)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const getGuideByType = async () => {
		try {
			const res = await configTemplateApi.getGuide(slug)
			if (res.status === 200) {
				setGuide(res.data.data)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	const content = useMemo(() => {
		return guide.map((item) => {
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
	}, [guide])

	useEffect(() => {
		if (slug) {
			getTemplateByType()
			getGuideByType()
		}
	}, [slug])

	useEffect(() => {
		if (template) {
			console.log(template);
			form.setFieldValue('Content', template.Content)
		}
	}, [template])

	const onSubmit = async (data) => {
		setIsLoading(true)
		try {
			const dataSubmit = {
				...data,
				Type: parseInt(slug.toString())
			}
			const res = await configTemplateApi.update(dataSubmit)
			if (res.status === 200) {
				ShowNoti('success', res.data.message)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<div className="wrapper-config-template">
			<h2 className="font-medium mb-4 text-tw-primary">Điều chỉnh hợp đồng</h2>
			<Popover content={content} placement="bottomLeft" title="Mã hướng dẫn" className="popover-guide">
				<button className="btn-guide">Mã hướng dẫn</button>
			</Popover>
			<Form form={form} layout="vertical" onFinish={onSubmit}>
				<EditorField name="Content" label="Mẫu hợp đồng" onChangeEditor={(value) => form.setFieldValue('Content', value)} />
				{checkIncludesRole(listPermissionsByRoles.config.contractTemplate.update, Number(userInformation?.RoleId)) && (
					<PrimaryButton className="!flex mx-auto" background="blue" type="submit" icon="save">
						Lưu {isLoading && <Spin className="loading-base" />}
					</PrimaryButton>
				)}
			</Form>
		</div>
	)
}

export default DetailConfigTemplate
