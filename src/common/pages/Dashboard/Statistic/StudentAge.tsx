import { useQuery } from '@tanstack/react-query'
import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { staticsticalApi } from '~/api/statistic'
import MyStatisticCard from '~/atomic/molecules/MyStatisticCard'
import StatisticStudentByAge from '~/common/components/Dashboard/StatisticStudentByAge'

const StudentAge = ({ todoApi }) => {
	const [statisticStudentAge, setStatisticStudentAge] = useState([])

	// const getStaticStudentAge = async () => {
	// 	try {
	// 		const res = await staticsticalApi.getStudentAge(todoApi)
	// 		if (res.status === 200) {
	// 			setStatisticStudentAge(res.data.data)
	// 		}
	// 		if (res.status === 204) {
	// 			setStatisticStudentAge([])
	// 		}
	// 	} catch (error) {}
	// }

	// useEffect(() => {
	// 	getStaticStudentAge()
	// }, [todoApi])

	const { data, isLoading } = useQuery({
		queryKey: ['get/statis-student-age', todoApi],
		queryFn: () => {
			return staticsticalApi.getStudentAge(todoApi).then((data) => data.data)
		},
		enabled: !!todoApi
	})

	return (
		<MyStatisticCard title={'Thống kê học viên theo độ tuổi'}>
			<StatisticStudentByAge loading={isLoading} data={data?.data || []} titleBar="Độ tuổi học viên " />
		</MyStatisticCard>
	)
}

export default StudentAge
