import { Card, Empty, List, Modal, Spin, Tooltip, Typography } from 'antd'
import React, { useState } from 'react'
import { AiOutlineFileSync } from 'react-icons/ai'
import { BsFileEarmarkCheck } from 'react-icons/bs'
import { FiBarChart2 } from 'react-icons/fi'
import { MdOutlineLanguage } from 'react-icons/md'
import { RiVisaFill } from 'react-icons/ri'
import { userInformationApi } from '~/api/user/user'
import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNoti } from '~/common/utils'

const OverviewStatusStudent = () => {
	const [open, setOpen] = useState<boolean>(false)
	const [overviewStatus, setOverviewStatus] = useState<IStatisticOverviewStudent[]>([])
	const [loading, setLoading] = useState(false)

	const getOverviewStatus = async () => {
		try {
			setLoading(true)
			const response = await userInformationApi.getOverviewStatus()
			if (response.status === 200) {
				setOverviewStatus(response.data.data)
			}
			if (response.status === 204) {
				setOverviewStatus([])
			}
			setOpen(true)
			setLoading(false)
		} catch (error) {
			setLoading(false)
			ShowNoti('error', error.message)
		}
	}
	const color = ['#4caf50', '#0365c0', '#4cbbb9', '#ff7c38', '#e21b1b']
	return (
		<>
			<Tooltip title="Xem thống kê theo trạng thái">
				<div onClick={getOverviewStatus} className="btn btn-secondary light btn-filter">
					{loading ? <Spin size="small"></Spin> : <FiBarChart2 size={24} />}
				</div>
			</Tooltip>
			<Modal
				open={open}
				onCancel={() => setOpen(false)}
				centered
				title={'Thống kê theo trạng thái theo thông tin hồ sơ'}
				width={800}
				bodyStyle={{
					maxHeight: '80vh',
					overflow: 'auto'
				}}
				footer={false}
			>
				{overviewStatus && overviewStatus.length ? (
					<div className="grid grid-cols-1 tablet:grid-cols-2 gap-[16px]">
						{overviewStatus.map((item) => {
							let headerColor =
								item.Type == 1 ? 'bg-[green]' : item.Type == 2 ? 'bg-[#ef8b43]' : item.Type == 3 ? 'bg-[#0262db]' : 'bg-[#d44141]'
							return (
								<div className="shadow-lg col-span-1" key={item.Type}>
									<div className={`text-lg text-white px-3 py-2 d-flex justify-between items-center rounded-t-lg ${headerColor}`}>
										<span>{item.TypeName}</span>
										<div className="bg-[hsla(25,65%,88%,.3);] p-2 rounded-lg">
											{item.Type == 1 ? (
												<BsFileEarmarkCheck size={24} />
											) : item.Type == 2 ? (
												<MdOutlineLanguage size={24} />
											) : item.Type == 3 ? (
												<AiOutlineFileSync size={24} />
											) : (
												<RiVisaFill size={24} />
											)}
										</div>
									</div>
									<List
										key={item.Type}
										className="rounded-lg col-span-1"
										dataSource={item.Item}
										renderItem={(e) => (
											<List.Item className="px-3">
												<Typography.Text className="font-[500] text-[14px] text-[#08569f]">{e.StatusName}</Typography.Text>
												<Typography.Text className="font-[600] text-[18px]">{e.Amount}</Typography.Text>
											</List.Item>
										)}
									/>
								</div>
							)
						})}
					</div>
				) : (
					<Empty></Empty>
				)}
			</Modal>
		</>
	)
}

export default OverviewStatusStudent
