import React, { useEffect, useState } from 'react'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { HiArrowNarrowDown, HiOutlineUser } from 'react-icons/hi'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { TbArrowNarrowUp, TbPencil } from 'react-icons/tb'
import { staticsticalApi } from '~/api/statistic'

interface IStatisticOverview {
	todoApiOverView
}
const StatisticOverview: React.FC<IStatisticOverview> = ({ todoApiOverView }) => {
	const [statisticOverview, setStatisticOverview] = useState([])

	const getOverView = async () => {
		try {
			const res = await staticsticalApi.getOverview(todoApiOverView)
			if (res.status === 200) {
				setStatisticOverview(res.data.data)
				console.log('res.data.data', res.data.data)
			}
			if (res.status === 204) {
				setStatisticOverview([])
			}
		} catch (error) {}
	}

	useEffect(() => {
		getOverView()
	}, [todoApiOverView])

	return (
		<div className="dashboard-content">
			{statisticOverview?.length > 0 &&
				statisticOverview?.map((item, index) => (
					<div className="items">
						<div className="inner-item">
							<div className={`name ${item?.Id === 1 ? 'kh' : item?.Id === 3 ? 'dt' : item?.Id === 4 ? 'gd' : item?.Id === 2 ? 'ht' : ''}`}>
								<div className="ttl">{item?.Title}</div>
								<div className="icon">
									{item?.Id === 1 ? (
										<HiOutlineUser />
									) : item?.Id === 3 ? (
										<RiMoneyDollarCircleLine />
									) : item?.Id === 4 ? (
										<FaChalkboardTeacher />
									) : item?.Id === 2 ? (
										<TbPencil />
									) : (
										''
									)}
								</div>
							</div>
							<div className="value">
								{item?.OverviewModel?.map((i) => (
									<div className="item">
										<div className="left">
											<div className="n">{i?.Name}</div>
											<div className="sub">
												<p>{i?.SubValue}</p>
												<div className={`ic ${i?.Type === 1 ? 'up' : i?.Type === 2 ? 'down' : ''}`}>
													{i?.Type === 1 ? <TbArrowNarrowUp /> : i?.Type === 2 ? <HiArrowNarrowDown /> : ''}
												</div>
											</div>
										</div>
										<div className="right">{item?.Id !== 3 ? i?.Value : Intl.NumberFormat('ja-JP').format(i?.Value)}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
		</div>
	)
}

export default StatisticOverview
