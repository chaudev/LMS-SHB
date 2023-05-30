import React, { useEffect, useState } from 'react'
import { AiFillStop } from 'react-icons/ai'
import { BsFillCalendarCheckFill, BsFillCalendarXFill } from 'react-icons/bs'
import { FaBookReader, FaCalendarDay } from 'react-icons/fa'
import { GiStopwatch } from 'react-icons/gi'
import { statisticalStudentApi } from '~/api/dashboard/student'

const StudentByAttenance = () => {
	const [attenance, setAttenance] = useState([])
	const [learningStatus, setLearningStatus] = useState([])

	useEffect(() => {
		// handleGetByAttenance()
		handleGetByLearningStatus()
	}, [])

	const handleGetByLearningStatus = async () => {
		try {
			const res = await statisticalStudentApi.GetByLearningStatus()
			if (res.status == 200) {
				setLearningStatus(res.data.data)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	// const handleGetByAttenance = async () => {
	// 	try {
	// 		const res = await statisticalStudentApi.GetByAttenance()
	// 		if (res.status == 200) {
	// 			setAttenance(res.data.data)
	// 		}
	// 	} catch (error) {
	// 		console.log('error', error)
	// 	}
	// }

	const icons = [
		<FaCalendarDay size={24} color="#fff" />,
		<BsFillCalendarCheckFill size={22} color="#fff" />,
		<BsFillCalendarXFill size={22} color="#fff" />,
		<GiStopwatch size={24} color="#fff" />,
		<FaBookReader size={22} color="#fff" />,
		<AiFillStop size={22} color="#fff" />
	]

	const colors = ['#ef8b43', '#599f50', '#d44141', '#0262db', '#FB8C00', '#E53935']

	function getColor(params) {
		if (params == 'Vắng có phép') {
			return { color: colors[1], icon: icons[1] }
		}
		if (params == 'Vắng không phép') {
			return { color: colors[2], icon: icons[2] }
		}

		if (params == 'Bảo lưu') {
			return { color: colors[4], icon: icons[3] }
		}
		if (params == 'Đang học') {
			return { color: colors[3], icon: icons[4] }
		}
		if (params == 'Dừng học') {
			return { color: colors[5], icon: icons[5] }
		}

		return { color: colors[0], icon: icons[0] }
	}

	function getStatusValue(params) {
		const thisIndex = learningStatus.findIndex((item) => item.Name == params)
		return thisIndex > -1 ? learningStatus[thisIndex]?.StudentAmount : 0
	}

	return (
		<>
			<div className="grid grid-cols-1 w500:grid-cols-2 w1100:grid-cols-3 gap-4">
				{/* {attenance?.map((item, index) => (
					<div className="shadow-sm bg-[#fff] flex items-center rounded-[12px] p-[16px] col-span-1">
						<div
							className="w-[50px] h-[50px] rounded-[12px] flex items-center justify-center shadow-sm"
							style={{ background: getColor(item?.Name).color }}
						>
							{getColor(item?.Name).icon}
						</div>
						<div className="ml-[8px]">
							<div className="font-[500] text-[16px]">{item?.Name || 'Unknow'}</div>
							<div className="font-[500] text-[18px]">{item?.StudentAmount}</div>
						</div>
					</div>
				))} */}

				{[{ Name: 'Đang học' }, { Name: 'Bảo lưu' }, { Name: 'Dừng học' }]?.map((item, index) => (
					<div className="shadow-sm bg-[#fff] flex items-center rounded-[12px] p-[16px] col-span-1">
						<div
							className="w-[50px] h-[50px] rounded-[12px] flex items-center justify-center shadow-sm"
							style={{ background: getColor(item?.Name).color }}
						>
							{getColor(item?.Name).icon}
						</div>
						<div className="ml-[8px]">
							<div className="font-[500] text-[16px]">{item?.Name || 'Unknow'}</div>
							<div className="font-[500] text-[18px]">{getStatusValue(item?.Name) || 0}</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default StudentByAttenance
