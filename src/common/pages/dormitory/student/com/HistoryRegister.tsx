import { useMutation } from '@tanstack/react-query'
import { Divider, Modal, Timeline } from 'antd'
import moment from 'moment'
import { FC, useEffect, useState } from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import MyLoadingSmallContent from '~/atomic/atoms/MyLoadingSmallContent'
import IconButton from '~/common/components/Primary/IconButton'
import { ShowNoti } from '~/common/utils'
import { FaUserPen } from 'react-icons/fa6'

type TProps = {
	domitoryRegistrationId: number
}

export const HistoryRegister: FC<TProps> = ({ domitoryRegistrationId }) => {
	const [open, setOpen] = useState<boolean>(false)
	const [dataRender, setDataRender] = useState<TDormitoryRegisterHistory[]>([])

	const handleToggleModal = () => {
		setOpen(!open)
		setDataRender([])
	}

	const handleFetching = async () => {
		if (!domitoryRegistrationId) return

		try {
			const response = await dormitoryRegisterApi.getRegisterHistory({ domitoryRegistrationId })

			const data = response.data.data

			setDataRender(data.length > 0 ? data : [])
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	const mutationGetHistory = useMutation({
		mutationKey: [dormitoryRegisterApi.getRegisterHistory],
		mutationFn: handleFetching
	})

	useEffect(() => {
		if (domitoryRegistrationId && open) {
			mutationGetHistory.mutateAsync()
		}
	}, [domitoryRegistrationId, open])

	return (
		<>
			<IconButton color="green" type="button" icon="history" tooltip="Lịch sử" onClick={handleToggleModal} />

			<Modal forceRender={null} footer={false} centered open={open} onCancel={handleToggleModal} title="Chi tiết lịch sử">
				{mutationGetHistory.isPending ? (
					<MyLoadingSmallContent />
				) : (
					<Timeline mode="right">
						{dataRender.map((item) => (
							<Timeline.Item
								key={item.Id}
								label={
									<div>
										<div>{moment(item.DateChange).format('DD/MM/YYYY - HH:mm')}</div>
										<div className='flex gap-2 items-center'>
											<FaUserPen color='#505050' />
											<div className='font-semibold text-[12px]'>{item.CreatedBy}</div>
										</div>
									</div>
								}
							>
								<div className="p-2 border rounded-md">
									<div className="font-semibold mb-2 pb-2 border-b-[1px] border-[#f0f0f0]">{item.Description}</div>
									<div className=''>
										<div className="flex items-center justify-between">
											<div className='text-[14px]'>Tên KTX:</div>
											<div>{item.DormitoryName}</div>
										</div>
										<div className="flex items-center justify-between">
											<div className='text-[14px]'>Tên khu:</div>
											<div>{item.DormitoryAreaName}</div>
										</div>
										<div className="flex items-center justify-between">
											<div className='text-[14px]'>Tên phòng:</div>
											<div>{item.DormitoryRoomName}</div>
										</div>
									</div>
								</div>
							</Timeline.Item>
						))}
					</Timeline>
				)}
			</Modal>
		</>
	)
}
