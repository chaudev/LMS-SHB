import { Divider, Modal, Tooltip } from 'antd'
import { useState } from 'react'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { FaImages } from 'react-icons/fa'
import { generalNotificationApi } from '~/api/general-notification'
import { ShowNoti } from '~/common/utils'
import { downloadByFileSaver } from '~/common/utils/donwloadFile'
import IconButton from '../Primary/IconButton'

const RenderFile = ({ fileLink }: { fileLink: string }) => {
	const extension = fileLink.split('.').pop().toLowerCase()
	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']

	return (
		<Tooltip placement="top" title={fileLink} key={fileLink}>
			<div
				onClick={() => downloadByFileSaver({ FileName: fileLink, FileUrl: fileLink })}
				className="w-[24px] cursor-pointer h-[24px] flex items-center justify-center"
			>
				{imageExtensions.includes(extension) ? <FaImages size={18} color="#1E88E5"/> : <BsFillFileEarmarkPdfFill size={18} color="#1E88E5" />}
			</div>
		</Tooltip>
	)
}

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
								<span className="font-semibold">{item?.UserCode}</span>
								<span> - </span>
								<span className="font-blod">{item?.FullName}</span>
							</div>
						))}
					</div>
				)}
				{dataReceiver?.length <= 0 && <div className="w-full text-center">Chưa có người nhận thông báo</div>}

				{dataReceiver[0]?.Achievements && (
					<>
						<Divider />
						<div className="flex flex-col">
							<span className="font-semibold mb-2 py-2">File đính kèm</span>

							<div className="flex gap-4">
								{JSON.parse(dataReceiver[0]?.Achievements)?.map((item, index) => (
									<RenderFile fileLink={item} key={item} />
								))}
							</div>
						</div>
					</>
				)}
			</Modal>
		</>
	)
}

export default GeneralNotificationUserReceiver
