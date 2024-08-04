import { Dropdown, MenuProps, Popconfirm, Popover } from 'antd'
import React, { useState } from 'react'
import IconButton from '~/common/components/Primary/IconButton'
import { SAMPLE_GRADE_COLUMN_TYPES_OBJECTS } from '~/common/utils/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { sampleTranscriptDetailApi } from '~/api/grade-templates'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'
import { evaluationGroupOptionApi } from '~/api/evaluation'
import { useRouter } from 'next/router'
import GroupOptionForm from './GroupOptionForm'

interface IGroupOptionColumn {
	data: TSampleEvaluationGroupOption
	refreshData: any
	evaluationGroupData: TSampleEvaluationGroup
}

const GroupOptionColumn: React.FC<IGroupOptionColumn> = (props) => {
	const { data, refreshData, evaluationGroupData } = props
	const [openDelete, setOpenDelete] = useState(false)
	const queryClient = useQueryClient()
	const router = useRouter()
	const { evaluationFormId } = router.query

	// ** handle remove
	const mutationDelete = useMutation({
		mutationFn: (id: number) => {
			return evaluationGroupOptionApi.delete(id)
		},
		onSuccess(data, variables, context) {
			ShowNostis.success(`Đã xóa cột đánh giá`)
			!!refreshData && refreshData()

			// ** refetch lại list tổng để cập nhật lại state isHaveQuestion
			queryClient.refetchQueries({ queryKey: ['get-sample-group-in-form', evaluationFormId] })
		}
	})

	const handleCancel = () => {
		setOpenDelete(false)
	}

	const items: MenuProps['items'] = [
		{
			label: <GroupOptionForm defaultData={data} refreshData={refreshData} evaluationGroupData={evaluationGroupData} />,
			key: '1'
		},
		{
			label: (
				<Popconfirm
					title={`Xóa cột đánh giá này?`}
					open={openDelete}
					onConfirm={() => mutationDelete.mutateAsync(data.Id)}
					okButtonProps={{ loading: mutationDelete.isPending }}
					onCancel={handleCancel}
					// placement="right"
				>
					<div className="flex items-center" onClick={() => setOpenDelete(true)}>
						<IconButton color="red" type="button" icon="remove" />
						<p>Xóa</p>
					</div>
				</Popconfirm>
			),
			key: '2'
		}
	]

	return (
		<div
			className={`p-2 outline-2 outline-primary outline bg-primaryExtraLight
			flex justify-between h-full`}
		>
			<div className="flex flex-col">
				<p className="font-medium text-[16px] mb-2">{data?.Point}</p>
				<p className="font-normal ">{data?.Content}</p>
			</div>
			<div>
				<Dropdown
					// trigger={['click']}
					menu={{ items }}
				>
					<div>
						<IconButton type="button" color="red" icon="more" tooltip="Cập nhật" size={15} />
					</div>
				</Dropdown>
			</div>
		</div>
	)
}

export default GroupOptionColumn
