import Modal from 'antd/lib/modal/Modal'
import { useState } from 'react'
import PrimaryButton from '../Primary/Button'
import IconButton from '../Primary/IconButton'
import { Trash2 } from 'react-feather'

const DeleteTableRow = (props) => {
	const { handleDelete, text, title, setShowPop, overrideText, warning, modalTitle = 'Xác nhận xóa', icon = 'remove', isDormitoryRegistrationList = false } = props
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const checkHandleDelete = () => {
		if (!handleDelete) return
		setIsLoading(true)
		handleDelete()
			.then((res) => {
				if (res?.status == 200) {
					setIsModalVisible(false)
				}
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	return (
		<>
			{isDormitoryRegistrationList ? (
				<button
					className="flex items-center gap-2.5 py-1 hover:text-tw-red"
					type="button"
					onClick={() => {
						setIsModalVisible(true)
						setShowPop && setShowPop('')
					}}
				>
					<Trash2 size={20} />
					<p>{title || 'Xóa'}</p>
				</button>
			) : (
				<IconButton
					color="red"
					type="button"
					icon={icon}
					tooltip={title || 'Xóa'}
					onClick={() => {
						setIsModalVisible(true)
						setShowPop && setShowPop('')
					}}
				/>
			)}

			<Modal
				title={modalTitle}
				open={isModalVisible}
				onCancel={() => setIsModalVisible(false)}
				footer={
					<div className="flex-all-center">
						<PrimaryButton
							type="button"
							icon="cancel"
							background="transparent"
							onClick={() => setIsModalVisible(false)}
							className="mr-2 btn-outline"
						>
							Hủy
						</PrimaryButton>

						<PrimaryButton
							type="button"
							icon="remove"
							background="red"
							onClick={() => checkHandleDelete()}
							disable={isLoading}
							loading={isLoading}
						>
							Xóa
						</PrimaryButton>
					</div>
				}
			>
				{!overrideText ? (
					<p className="mb-4 text-base">
						Bạn có chắc muốn xóa <span className="text-[#f25767]">{text}</span> ?
					</p>
				) : (
					<>
						<p className="mb-4 text-base">{overrideText}</p>
					</>
				)}
				{warning && (
					<p className="mb-4 text-base">
						<span className="text-[#f25767]">{warning}</span>
					</p>
				)}
			</Modal>
		</>
	)
}

export default DeleteTableRow
