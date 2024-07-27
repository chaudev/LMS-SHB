import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
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
		<MyStatisticCard title={'Khách mới mỗi tháng'}>
			<StatisticClassNew data={statisticNewCustomer} titleBar="Khách mới mỗi tháng" type={1} />
		</MyStatisticCard>
	)
}

export default NewCustomer
