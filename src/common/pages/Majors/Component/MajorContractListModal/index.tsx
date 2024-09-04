import MyModal, { TMyModalProps } from '~/atomic/atoms/MyModal'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import RegistrationContractModal from '../RegistrationContractModal'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { templateMajorApi } from '~/api/template-major'
import { TContractItem } from '../../Registration'

const PAGE_SIZE = 20

type TProps = TMyModalProps & {
	majorId: number
	tableProps?: TMyTable
	onAddContract: (contract: TContractItem) => void
	onCancel: () => void
}

const MajorContractListModal = ({ majorId, open, onCancel, tableProps, onAddContract }: TProps) => {
	const [selectedContract, setSelectedContract] = useState<TTemplateMajor>()
	const [isOpenContractModal, setIsOpenContractModal] = useState(false)
	const [pagination, setPagination] = useState({
		pageSize: PAGE_SIZE,
		pageIndex: 1
	})

	const { data, isLoading, refetch } = useQuery({
		queryKey: [templateMajorApi.keyGetAll, [majorId, open]],
		queryFn: () => {
			return templateMajorApi
				.getAll({
					majorId: majorId,
					pageSize: pagination.pageSize || PAGE_SIZE,
					pageIndex: pagination.pageIndex || 1
				})
				.then((data) => data.data)
		},
		enabled: open && !!majorId
	})

	const columns = [
		{
			title: 'Tên hợp đồng',
			className: 'min-w-[120px] font-medium',
			dataIndex: 'Name'
		},
		{
			title: 'Chức năng',
			align: 'center',
			width: 120,
			render: (value, record) => (
				<div className="flex">
					<IconButton
						type="button"
						icon={'add'}
						color="blue"
						onClick={() => {
							setSelectedContract(record)
							setIsOpenContractModal(true)
						}}
						tooltip="Chọn hợp đồng này"
					/>
				</div>
			)
		}
	]

	return (
		<MyModal title={'Danh sách hợp đồng'} open={open} onCancel={onCancel} footer={null} width={1000}>
			<PrimaryTable
				data={data?.data || []}
				total={data?.totalRow || 0}
				loading={isLoading}
				onChangePage={(pageIndex) => setPagination({ ...pagination, pageIndex: pageIndex })}
				columns={columns}
				{...tableProps}
			/>

			<RegistrationContractModal
				open={isOpenContractModal}
				onCancel={() => setIsOpenContractModal(false)}
				defaultContractData={{ ContractContent: selectedContract?.Content }}
				onSubmit={onAddContract}
				onCallbackAfterSuccess={onCancel}
			/>
		</MyModal>
	)
}

export default MajorContractListModal
