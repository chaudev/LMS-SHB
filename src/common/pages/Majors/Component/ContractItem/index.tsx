import { useState } from 'react'
import { TContractItem } from '../../Registration'
import clsx from 'clsx'
import moment from 'moment'
import IconButton from '~/common/components/Primary/IconButton'
import { Popconfirm } from 'antd'
import RegistrationContractModal from '../RegistrationContractModal'

type TContractItemProps = {
	contractData: TContractItem
	index: number
	onUpdate: (index: number, data: TContractItem) => void
	onDelete: (index: number, data: TContractItem) => void
}

const ContractItem = ({ contractData, index, onUpdate, onDelete }: TContractItemProps) => {
	const [isOpenContractModal, setIsOpenContractModal] = useState(false)
	return (
		<>
			<div className={clsx('flex items-center justify-between gap-[16px]', { 'border-t border-[#e1e1e1] pt-[8px]': index !== 0 })}>
				<div className="flex items-center gap-[8px]">
					<span className="font-medium">{contractData?.ContractNumber} Hợp đồng cam kết đầu ra</span>
					<span>-</span>
					<span>Ngày ký: {moment(contractData?.ContractSigningDate).format('DD/MM/YYYY')}</span>
				</div>
				<div className="flex">
					<IconButton type="button" color="blue" icon="edit" tooltip="Chỉnh sửa" onClick={() => setIsOpenContractModal(true)} />

					<Popconfirm
						title="Bạn có chắc muốn xóa hợp đồng này?"
						okText="Có"
						cancelText="Hủy"
						placement="left"
						onConfirm={() => onDelete(index, contractData)}
					>
						<IconButton type="button" color="red" tooltip="Xóa" icon="remove" />
					</Popconfirm>
				</div>
			</div>

			<RegistrationContractModal
				type="edit"
				open={isOpenContractModal}
				onCancel={() => setIsOpenContractModal(false)}
				defaultContractData={contractData}
				onSubmit={(data) => {
					setIsOpenContractModal(false)
					onUpdate(index, data)
				}}
			/>
		</>
	)
}

export default ContractItem
