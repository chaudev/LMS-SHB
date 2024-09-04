import React, { useState } from 'react'
import { LiaFileContractSolid } from 'react-icons/lia'
import MajorContractListModal from '../MajorContractListModal'
import { TContractItem } from '../../Registration'

interface ICreateContract {
	majorId: number
	onAddContract: (contract: TContractItem) => void
}

const AddRegistrationContractButton: React.FC<ICreateContract> = (props) => {
	const { majorId, onAddContract } = props
	const [isModalVisible, setIsModalVisible] = useState(false)

	const onClose = () => {
		setIsModalVisible(false)
	}

	return (
		<div>
			<div className="flex justify-between items-center">
				<p className="font-medium">Hợp đồng cam kết</p>
				<button
					type="button"
					onClick={() => setIsModalVisible(true)}
					className="font-normal p-2 rounded-[6px] hover:bg-primaryLight hover:text-primary transition flex items-center gap-1"
				>
					<LiaFileContractSolid size={18} /> Thêm hợp đồng
				</button>
			</div>
			<MajorContractListModal onAddContract={onAddContract} majorId={majorId} open={isModalVisible} onCancel={onClose} />
		</div>
	)
}

export default AddRegistrationContractButton
