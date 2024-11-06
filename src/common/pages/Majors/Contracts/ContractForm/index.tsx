import { useQuery } from '@tanstack/react-query'
import { Form, Popover, Tooltip } from 'antd'
import { FormInstance } from 'antd/es/form/Form'
import { useMemo } from 'react'
import { templateMajorApi } from '~/api/template-major'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyInput from '~/atomic/atoms/MyInput'
import EditorField from '~/common/components/FormControl/EditorField'
import { ShowNoti } from '~/common/utils'

type TContractForm = {
	Name: string
	Content: string
}

type TProps = {
	form: FormInstance<TContractForm>
	onFinish: (values: TContractForm) => void
}

const MajorContractForm = ({ form, onFinish }: TProps) => {
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

	return (
		<Form form={form} layout="vertical" onFinish={onFinish}>
			<div className="w-1/2">
				<MyFormItem name="Name" label="Tên hợp đồng">
					<MyInput placeholder="Tên hợp đồng" />
				</MyFormItem>
			</div>
			<Popover content={content} placement="bottomLeft" title="Mã hướng dẫn" className="popover-guide">
				<button className="btn-guide">Mã hướng dẫn</button>
			</Popover>
			<EditorField
				height={'calc(100vh - 210px)'}
				name="Content"
				label="Mẫu hợp đồng"
				onChangeEditor={(value) => form.setFieldValue('Content', value)}
			/>
		</Form>
	)
}

export default MajorContractForm
