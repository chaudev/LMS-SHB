import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import { StatisticClassNew } from '~/common/components/Dashboard/StatisticClassNew'

interface ICustomerOfSales {
	todoApi: any
}

const CustomerOfSales: React.FC<ICustomerOfSales> = ({ todoApi }) => {
	const [statisticCustomerofSales, setStatisticCustomerofSales] = useState([])
	const getNewCustomerofsales = async () => {
		try {
			const res = await staticsticalApi.getNewCustomer(todoApi)

			console.log('CustomerOfSales',res);
			
			if (res.status === 200) {
				setStatisticCustomerofSales(res.data.data)
			}
			if (res.status === 204) {
				setStatisticCustomerofSales([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getNewCustomerofsales()
	}, [todoApi])
	return (
		<Card title={<h1 className="text-2xl font-medium">Khách mới mỗi tháng</h1>}>
			<StatisticClassNew data={statisticCustomerofSales} titleBar="Khách mới mỗi tháng" type={2} />
		</Card>
	)
}

export default CustomerOfSales
