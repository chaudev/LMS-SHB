import { Dropdown, MenuProps, Popconfirm, Popover } from 'antd'
import React, { useState } from 'react'
import IconButton from '~/common/components/Primary/IconButton'
import { SAMPLE_GRADE_COLUMN_TYPES_OBJECTS } from '~/common/utils/constants'
import TranscriptColumnModal from './TranscriptColumnModal'
import { useMutation } from '@tanstack/react-query'
import { sampleTranscriptDetailApi } from '~/api/grade-templates'
import { ShowNostis } from '~/common/utils'
import { ShowErrorToast } from '~/common/utils/main-function'

interface ISampleColumn {
	data: TSampleTranscriptDetail
	refreshData: any
	sampleTranscriptData: any
}

const SampleColumn: React.FC<ISampleColumn> = (props) => {
	const { data, refreshData, sampleTranscriptData } = props
	const [openDelete, setOpenDelete] = useState(false)

	const mutationDelete = useMutation({
		mutationFn: (id: any) => {
			return sampleTranscriptDetailApi.delete(id)
		},
		onSuccess(data, variables, context) {
			!!refreshData && refreshData()
			ShowNostis.success('Đã xóa')
		},
		onError(data, variables, context) {
			ShowErrorToast(data)
		}
	})

	const handleCancel = () => {
		setOpenDelete(false)
	}

	const items: MenuProps['items'] = [
		{
			label: <TranscriptColumnModal defaultData={data} refreshData={refreshData} sampleTranscriptData={sampleTranscriptData} />,
			key: '1'
		},
		{
			label: (
				<Popconfirm
					title={`Xóa cột ${data.Name}?`}
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
			className={`p-2 outline-2 outline-primary outline ${
				data.Type == SAMPLE_GRADE_COLUMN_TYPES_OBJECTS.grades ? 'bg-primaryExtraLight' : 'bg-[#fffbe7]'
			}  flex justify-between h-full`}
		>
			<span className="font-medium">{data?.Name}</span>
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

export default SampleColumn
