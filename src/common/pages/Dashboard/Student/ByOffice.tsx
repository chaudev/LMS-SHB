import React, { useEffect, useState } from 'react'
import { FaBuilding } from 'react-icons/fa'
import { statisticalStudentApi } from '~/api/dashboard/student'

const StudentByOffice = () => {
	const [statisticalStudentAmountByOffice, setStatisticalStudentAmountByOffice] = useState([])

	useEffect(() => {
		handleGetStatisticalStudentByOffice()
	}, [])

	const handleGetStatisticalStudentByOffice = async () => {
		try {
			const res = await statisticalStudentApi.GetByOffice()
			if (res.status == 200) {
				setStatisticalStudentAmountByOffice(res.data.data)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<div className="dashboard-content col-span-4 !flex">
			<div className="items w-full flex-1 shadow-sm">
				<div className="inner-item">
					<div className="name bg-[#e42b6f]">
						<div className="ttl">Học viên theo trung tâm</div>
						<div className="icon">
							<FaBuilding size={22} />
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
	)
}

export default StudentByOffice
