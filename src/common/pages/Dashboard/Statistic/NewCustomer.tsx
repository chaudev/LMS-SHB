import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import { StatisticClassNew } from '~/common/components/Dashboard/StatisticClassNew'

interface INewCustomer {
	todoApi: any
}
const NewCustomer: React.FC<INewCustomer> = ({ todoApi }) => {
	const [statisticNewCustomer, setStatisticNewCustomer] = useState([])
	const getNewCustomer = async () => {
		try {
			const res = await staticsticalApi.getNewCustomer(todoApi)
			if (res.status === 200) {
				setStatisticNewCustomer(res.data.data)
			}
			if (res.status === 204) {
				setStatisticNewCustomer([])
			}
		} catch (error) {}
	}
	useEffect(() => {
		getNewCustomer()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Tổng số buổi học trong từng tháng</h1>}>
			<StatisticClassNew data={statisticNewCustomer} titleBar="Buổi học trong từng tháng" type={1} />
		</Card>
	)
}

export default NewCustomer
