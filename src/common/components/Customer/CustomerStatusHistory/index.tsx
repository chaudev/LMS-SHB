import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { customerAdviseApi } from '~/api/customer'
import IconButton from '../../Primary/IconButton'
import { Empty, Modal, Skeleton, Timeline } from 'antd'
import moment from 'moment'
import { isNull } from '~/common/utils/main-function'

interface IcustomerStatusHistory {
	customer: any
}

const CustomerStatusHistory: React.FC<IcustomerStatusHistory> = (props) => {
	const { customer } = props
	const [visible, setVisible] = useState(false)

	// ** get data
	const { data, isLoading } = useQuery({
		queryKey: ['get/customer-history-change', customer?.Id],
		queryFn: () => {
			return customerAdviseApi.getHistoryChange(customer?.Id).then((data) => data.data.data)
		},
		enabled: !!customer?.Id && visible
	})

	const toggle = () => {
		setVisible((prev) => !prev)
	}

	return (
		<div>
			<IconButton type="button" color="blue" tooltip="Lịch sử thay đổi trạng thái" icon="history" onClick={() => setVisible(true)} />

			<Modal
				title={
					<span>
						Lịch sử thay đổi trạng thái <span className="font-medium !text-primary">{customer?.FullName}</span>
					</span>
				}
				open={visible}
				onCancel={toggle}
				footer={false}
				width={700}
			>
				<div className="max-h-[350px] overflow-y-auto pr-2 py-2">
					<Timeline mode={'left'}>
						{data?.length > 0 &&
							!isLoading &&
							data?.map((item) => {
								return (
									<Timeline.Item key={item?.Id}>
										<p>
											Thời gian thay đổi: <span className="font-medium">{moment(item.ModifiedOn).format('DD/MM/YYYY HH:mm')}</span>
										</p>
										<div
											// style={{ borderColor: item?.newColorStatus || '#bdc3c7' }}
											className="grid border shadow-sm grid-cols-2 gap-2 p-3 bg-[#fff] rounded-lg mt-1 border-l-[5px]"
										>
											{item?.CustomerStatusName}
										</div>
									</Timeline.Item>
								)
							})}
					</Timeline>
				</div>
				{isNull(data) && !isLoading && (
					<div className="my-2">
						<Empty description={'Không có dữ liệu'} />
					</div>
				)}
				{isLoading && (
					<div className="flex items-center gap-2">
						<Skeleton />
					</div>
				)}
			</Modal>
		</div>
	)
}

export default CustomerStatusHistory
