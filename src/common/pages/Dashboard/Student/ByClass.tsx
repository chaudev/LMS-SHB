import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaUserGraduate } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { MdClass } from 'react-icons/md'
import { statisticalStudentApi } from '~/api/dashboard/student'

const StudentByClass = () => {
	const [statisticalStudentAmountByClass, setStatisticalStudentAmountByClass] = useState([])
	const [top5, setTop5] = useState([])

	useEffect(() => {
		handleGetStatisticalStudentByClass()
	}, [])

	const handleGetStatisticalStudentByClass = async () => {
		try {
			const res = await statisticalStudentApi.GetByClass()
			if (res.status == 200) {
				setStatisticalStudentAmountByClass(res.data.data)
				let temp = []
				res.data.data.forEach((item, index) => {
					if (index < 3) {
						temp.push(item)
					}
				})
				setTop5(temp)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const [visible, setVisible] = useState<boolean>(false)

	return (
		<>
			<div className="dashboard-content col-span-4 !flex">
				<div className="items w-full flex-1 shadow-sm">
					<div className="inner-item">
						<div className="name bg-[#e42b6f]">
							<div className="ttl">Học viên theo lớp</div>
							<div className="icon">
								<MdClass size={22} />
							</div>
						</div>

						<div className="value !pb-0">
							{top5?.map((item) => (
								<div className="item">
									<div className="left">
										<div className="n">{item?.Name}</div>
									</div>
									<div className="right ml-[24px]">{item?.StudentAmount}</div>
								</div>
							))}

							<div className="item none-selection">
								<div className="left"></div>
								<div
									onClick={() => setVisible(true)}
									className="left flex items-center text-[#e42b6f] hover:mr-[-8px] duration-300 cursor-pointer"
								>
									<div className="font-[500] mr-[4px]">Xem tất cả</div>
									<IoIosArrowForward size={18} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal width={600} open={visible} onCancel={() => setVisible(false)} closable={false} className="dashboard" footer={null}>
				<div className="dashboard-content col-span-4 !flex">
					<div className="items w-full flex-1 shadow-sm">
						<div className="inner-item">
							<div className="name bg-[#e42b6f]">
								<div className="ttl">Học viên theo lớp</div>
								<div className="icon">
									<FaUserGraduate size={22} />
								</div>
							</div>

							<div className="value !pb-0">
								{statisticalStudentAmountByClass?.map((item) => (
									<div className="item">
										<div className="left">
											<div className="n">{item?.Name}</div>
										</div>
										<div className="right ml-[24px]">{item?.StudentAmount}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
}

export default StudentByClass
