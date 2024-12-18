import { Card, Empty, List, Popover, Tooltip } from 'antd'
import Modal from 'antd/lib/modal/Modal'
import moment from 'moment'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationApi } from '~/api/notification'
import { ShowNoti } from '~/common/utils'
import { RootState } from '~/store'
import { getAll } from '~/store/notificateReducer'
import ReactHtmlParser from 'react-html-parser'
import { FaBell, FaImages } from 'react-icons/fa'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'
import { downloadByFileSaver } from '~/common/utils/donwloadFile'

const RenderFile = ({ fileLink }: { fileLink: string }) => {
	const extension = fileLink.split('.').pop().toLowerCase()
	const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'tiff', 'svg']

	return (
		<Tooltip placement="top" title={fileLink} key={fileLink}>
			<div
				onClick={() => downloadByFileSaver({ FileName: fileLink, FileUrl: fileLink })}
				className="w-[24px] cursor-pointer h-[24px] flex items-center justify-center"
			>
				{imageExtensions.includes(extension) ? (
					<FaImages size={18} color="#1E88E5" />
				) : (
					<BsFillFileEarmarkPdfFill size={18} color="#1E88E5" />
				)}
			</div>
		</Tooltip>
	)
}

const Notification = () => {
	const notification = useSelector((state: RootState) => state.notificate.dataNotificate)
	const dispatch = useDispatch()
	const [show, setShow] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [countNotification, setCountNotification] = useState(0)
	const [contentToShow, setContentToShow] = useState<INotification[]>([])

	const onCloseModal = () => {
		setIsModalVisible(false)
	}

	const onOpenModal = () => {
		setIsModalVisible(true)
	}

	const getDataNotification = async () => {
		try {
			let res = await notificationApi.getAll({ pageSize: 10, pageIndex: 1 })
			if (res.status == 200) {
				dispatch(getAll(res.data.data))
				let countNotSeen = 0
				res.data.data.forEach((item) => {
					if (!item.IsSeen) {
						countNotSeen = countNotSeen + 1
					}
				})
				setCountNotification(countNotSeen)
			}
			if (res.status == 204) {
				dispatch(getAll([]))
			}
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	useEffect(() => {
		if (notification?.length === 0) {
			getDataNotification()
		}
	}, [])

	useMemo(() => {
		let countNotSeen = 0
		if (notification) {
			notification.forEach((item) => {
				if (!item.IsSeen) {
					countNotSeen = countNotSeen + 1
				}
			})
			setCountNotification(countNotSeen)
		}
	}, [notification])

	const handleSeenNotification = async (data) => {
		onOpenModal()
		setShow(false)
		setContentToShow([...data])
		try {
			let res = null
			if (data.length > 1) {
				res = await notificationApi.seenAll()
			} else {
				res = await notificationApi.seen(data[0].Id)
			}
			if (res.status === 200) {
				getDataNotification()
			}
		} catch (err) {
			ShowNoti('error', err.message)
		} finally {
		}
	}

	const content_notification = (
		<div className="notification-card">
			<Card
				title="Thông báo"
				extra={
					<>
						{notification && notification.length > 0 ? (
							<div onClick={() => handleSeenNotification(notification)} className="select-none cursor-pointer hover:text-tw-blue font-bold">
								<p>Xem tất cả</p>
							</div>
						) : (
							''
						)}
					</>
				}
				bordered={false}
			>
				<div className="w-96 h-96 overflow-y-auto scrollbar mr-[-10px] pr-[5px]">
					{notification && notification.length > 0 ? (
						notification?.map((item, index) => {
							return (
								<div
									key={index}
									onClick={() => handleSeenNotification([item])}
									className="bg-[#f3f3f3] hover:bg-[#e8e8e8] rounded-xl mb-tw-2 last:m-tw-0 px-tw-3 py-tw-2.5 cursor-pointer"
								>
									<div className="flex justify-between items-center">
										<p className={`${item.IsSeen ? '' : 'font-bold'} text-tw-blue line-clamp-1`}>{item.Title}</p>
										<p className={`${item.IsSeen ? '' : 'font-bold'}`}>{moment(item.CreatedOn).format('DD/MM/YYYY')}</p>
									</div>
									<div>
										<p className={`${item.IsSeen ? '' : 'font-bold'} line-clamp-3`}>{ReactHtmlParser(item.Content)}</p>
									</div>
								</div>
							)
						})
					) : (
						<Empty />
					)}
				</div>
			</Card>
		</div>
	)

	return (
		<>
			<Modal
				centered
				title={contentToShow.length > 1 ? 'Tất cả thông báo' : 'Chi tiết thông báo'}
				visible={isModalVisible}
				width={800}
				onCancel={() => onCloseModal()}
				footer={null}
			>
				<div className={`${contentToShow.length > 1 ? 'h-tw-750' : 'h-auto'} overflow-y-auto scrollbar antd-custom-wrap`}>
					{contentToShow && contentToShow.length > 1 ? (
						<List
							dataSource={contentToShow}
							pagination={{
								total: contentToShow?.length,
								size: 'small',
								pageSize: 10,
								showTotal: () => (
									<p className="font-weight-black" style={{ marginTop: 2, color: '#000' }}>
										Tổng cộng: {contentToShow?.length}
									</p>
								)
							}}
							renderItem={(item, index) => (
								<List.Item className="mr-2" key={index}>
									<List.Item.Meta />
									<div onClick={() => {}} className=" w-full bg-tw-gray rounded-xl mb-tw-2 last:m-tw-0 px-tw-3 py-tw-2.5">
										<div className="flex justify-between items-center">
											<p className="font-bold text-tw-blue">{item.Title}</p>
											<p>{moment(item.CreatedOn).format('DD/MM/YYYY')}</p>
										</div>
										<div>
											<p>{ReactHtmlParser(item.Content)}</p>
										</div>
										<div className="mt-2 pt-2">
											<span className="font-semibold mb-2 py-2">File đính kèm</span>
											<div className="flex gap-4">
												{item?.Achievements &&
													JSON.parse(item?.Achievements) &&
													JSON.parse(item?.Achievements)?.map((x) => <RenderFile fileLink={x} key={x} />)}
											</div>
										</div>
									</div>
								</List.Item>
							)}
						/>
					) : (
						<div className=" w-full bg-tw-gray rounded-xl mb-tw-2 last:m-tw-0 px-tw-3 py-tw-2.5">
							<div className="flex justify-between items-center">
								<p className="font-bold text-tw-blue">{contentToShow[0]?.Title}</p>
								<p>{moment(contentToShow[0]?.CreatedOn).format('DD/MM/YYYY')}</p>
							</div>
							<div>
								<p>{ReactHtmlParser(contentToShow[0]?.Content)}</p>
							</div>
							<div className="mt-2 pt-2">
								<span className="font-semibold mb-2 py-2">File đính kèm</span>
								<div className="flex gap-4">
									{contentToShow[0]?.Achievements &&
										JSON.parse(contentToShow[0]?.Achievements) &&
										JSON.parse(contentToShow[0]?.Achievements)?.map((item) => <RenderFile fileLink={item} key={item} />)}
								</div>
							</div>
						</div>
					)}
				</div>
			</Modal>

			<Popover
				placement="bottomRight"
				content={content_notification}
				trigger="click"
				visible={show}
				onVisibleChange={(visible) => setShow(visible)}
			>
				<div className="relative w-12 h-12 flex justify-center items-center rounded-xl bg-tw-gray cursor-pointer">
					<FaBell className={`${countNotification > 0 ? 'animate-bell' : ''}`} size={22} />

					{countNotification > 0 && (
						<div className="absolute flex justify-center items-center -top-2 -right-2 w-6 h-6 rounded-xl bg-basicBlue">
							<p className="text-tw-white">{countNotification}</p>
						</div>
					)}
				</div>
			</Popover>
		</>
	)
}

export default Notification
