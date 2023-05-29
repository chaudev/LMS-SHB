import { Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import { HiArrowNarrowDown } from 'react-icons/hi'
import { TbArrowNarrowUp } from 'react-icons/tb'
import { Bar, CartesianGrid, ComposedChart, Legend, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { statisticalStudentApi } from '~/api/dashboard/student'
import { log } from '~/common/utils'

const StudentByLearningStatus = () => {
	const [statisticalStudentAmountByOffice, setStatisticalStudentAmountByOffice] = useState([])

	// ----------------------------------------------------------------

	useEffect(() => {
		handleGetStatisticalStudentByOffice()
	}, [])

	const handleGetStatisticalStudentByOffice = async () => {
		try {
			const res = await statisticalStudentApi.GetByLearningStatus()
			setStatisticalStudentAmountByOffice(res.data.data)
		} catch (error) {
			console.log('error', error)
		}
	}

	log.Yellow('statisticalStudentAmountByOffice: ', statisticalStudentAmountByOffice)

	return (
		<>
			<div className="dashboard-content col-span-4 !flex">
				<div className="items w-full flex-1 shadow-sm">
					<div className="inner-item">
						<div className="name bg-[#e42b6f]">
							<div className="ttl">Học viên theo tình trạng</div>
							<div className="icon">
								<FaUserGraduate size={22} />
							</div>
						</div>
						<div className="value !pb-0">
							{statisticalStudentAmountByOffice?.map((item) => (
								<div className="item">
									<div className="left">
										<div className="n">{item?.Name}</div>
									</div>
									<div className="right">{item?.StudentAmount}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default StudentByLearningStatus
