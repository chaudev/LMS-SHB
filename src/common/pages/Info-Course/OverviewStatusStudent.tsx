import { Card, Empty, Modal, Spin, Tooltip } from 'antd'
import React, { useState } from 'react'
import { FiBarChart2 } from 'react-icons/fi'
import { userInformationApi } from '~/api/user/user'
import StatisticComposedChart from '~/common/components/Statistic/StatisticComposedChart'
import { ShowNoti } from '~/common/utils'

const OverviewStatusStudent = () => {
    const [open, setOpen] = useState<boolean>(false)
	const [overviewStatus, setOverviewStatus] = useState<any>([])
	const [loading, setLoading] = useState(false)

	const getOverviewStatus = async () => {
		try {
			setLoading(true)
			const response = await userInformationApi.getOverviewStatus()
			if (response.status === 200) {
				let formats = []
				response.data.data.forEach((item) => {
					let templ = []
					item.Item.forEach((element) => {
						templ.push({
							Name: element.StatusName,
							Value: element.Amount
						})
					})
					formats.push({
						TypeName: item.TypeName,
						Type: item.Type,
						Item: templ
					})
				})
				setOverviewStatus(formats)
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
					<div className="d-flex flex-col gap-[16px]">
						{overviewStatus.map((item) => {
							return (
								<Card>
									<StatisticComposedChart
										titleBar={<div className="font-[500] text-xl">{item.TypeName}</div>}
										data={item.Item}
										color={color[item.Type - 1]}
									/>
								</Card>
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