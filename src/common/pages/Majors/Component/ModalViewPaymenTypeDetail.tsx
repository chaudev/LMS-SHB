import React, { useState } from 'react'
import { Avatar, Modal, Timeline, Tooltip } from 'antd'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

const ModalViewPaymenTypeDetail = ({ paymentType, paymentTypeDetail = [], PaymentTypeId }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const showModal = () => {
		setIsModalOpen(true)
	}

	const handleOk = () => {
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	const title = paymentType.find((item) => item.value == PaymentTypeId)

	return (
		<>
			{paymentTypeDetail && paymentTypeDetail.length > 0 && (
				<Tooltip title="Xem chi tiết">
					&nbsp;&nbsp;
					<AiOutlineExclamationCircle className="cursor-pointer" onClick={showModal} size={16} color="#1b73e8" />
				</Tooltip>
			)}
			<Modal
				centered
				destroyOnClose
				title={title ? title.title : ''}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={false}
			>
				<Timeline>
					{paymentTypeDetail && paymentTypeDetail.length ? (
						<>
							{paymentTypeDetail.map((item, index) => (
								<Timeline.Item
									key={index}
									dot={
										<Avatar style={{ backgroundColor: '#198754', verticalAlign: 'middle' }} size="small">
											{index + 1}
										</Avatar>
									}
								>
									<div className="d-flex flex-col">
										<span className="font-[500] text-[green]">{item.TypeName}</span>
										<div>
											<span className="font-[500]">Tình trạng: </span>
											{item.ValueName}
										</div>
										<div>
											<span className="font-[500]">Phần trăm: </span>
											{item.Percent}%
										</div>
									</div>
								</Timeline.Item>
							))}
						</>
					) : (
						''
					)}
				</Timeline>
			</Modal>
		</>
	)
}

export default ModalViewPaymenTypeDetail
