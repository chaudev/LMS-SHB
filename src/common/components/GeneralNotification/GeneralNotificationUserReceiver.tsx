import { Modal } from 'antd'
import { useState } from 'react'
import { generalNotificationApi } from '~/api/general-notification'
import { ShowNoti } from '~/common/utils'
import IconButton from '../Primary/IconButton'

const GeneralNotificationUserReceiver = (props) => {
	const { dataRow } = props
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [dataReceiver, setDataReceiver] = useState([])

	const showModal = () => {
		getUserReceiver(dataRow?.Id)
		setIsModalOpen(true)
	}
	const handleCancel = () => {
		setIsModalOpen(false)
	}
	
	const getUserReceiver = async (id) => {
		try {
			const res = await generalNotificationApi.getReceiverById(id)
			if (res.status === 200) {
				setDataReceiver(res.data.data)
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	return (
		<>
			<IconButton color="orange" tooltip="Danh sách người nhận" onClick={showModal} icon="eye" type="button" />
			<Modal title="Danh sách người nhận" open={isModalOpen} onCancel={handleCancel} footer={null} width={400}>
				{dataReceiver?.length > 0 && (
					<div className="">
						{dataReceiver?.map((item) => (
							<div key={item?.UserInformationId}>
								<span className='font-semibold'>{item?.UserCode}</span>
								<span> - </span>
								<span className='font-blod'>{item?.FullName}</span>
							</div>
						))}
					</div>
				)}
				{dataReceiver?.length <= 0 && (
					<div className="w-full text-center">
						Chưa có người nhận thông báo
					</div>
				)}
			</Modal>
		</>
	)
}

export default GeneralNotificationUserReceiver
