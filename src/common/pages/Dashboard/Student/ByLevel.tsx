import React, { useEffect, useState } from 'react'
import { BsFillTrophyFill } from 'react-icons/bs'
import { statisticalStudentApi } from '~/api/dashboard/student'

const ByLevel = () => {
	const [statisticalByLevel, setStatisticalByLevel] = useState([])

	useEffect(() => {
		handleGetByLevel()
	}, [])

	const handleGetByLevel = async () => {
		try {
			const res = await statisticalStudentApi.GetByLevel()
			if (res.status == 200) {
				setStatisticalByLevel(res.data.data)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	return (
		<>
			<div className="dashboard-content col-span-4 !flex">
				<div className="items w-full flex-1 shadow-sm">
					<div className="inner-item">
						<div className="name bg-[#e42b6f]">
							<div className="ttl">Học viên theo trình độ</div>
							<div className="icon">
								<BsFillTrophyFill size={22} />
							</div>
						</div>
						<div className="value !pb-0">
							{statisticalByLevel?.map((item) => (
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

export default ByLevel
