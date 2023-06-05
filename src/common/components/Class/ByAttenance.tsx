import Router from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiFillStop } from 'react-icons/ai'
import { BsCalendarEvent, BsFillCalendarCheckFill, BsFillCalendarFill, BsFillCalendarXFill } from 'react-icons/bs'
import { FaBookReader, FaCalendarDay } from 'react-icons/fa'
import { GiStopwatch } from 'react-icons/gi'
import { TbCalendarTime } from 'react-icons/tb'
import { statisticalStudentApi } from '~/api/dashboard/student'

interface IStudentByAttenance {
	scheduleId: number
}

const StudentByAttenance: React.FC<IStudentByAttenance> = ({ scheduleId }) => {
	const [attenance, setAttenance] = useState([])

	useEffect(() => {
		if (Router.query?.class && scheduleId) {
			handleGetByAttenance()
		}
	}, [Router.query, scheduleId])

	const handleGetByAttenance = async () => {
		try {
			const res = await statisticalStudentApi.GetByAttenance({ classId: Router.query?.class, scheduleId: scheduleId })
			if (res.status == 200) {
				setAttenance(res.data.data)
			}
		} catch (error) {
			console.log('error', error)
		}
	}

	const icons = [
		<FaCalendarDay size={22} color="#fff" />,
		<BsFillCalendarCheckFill size={20} color="#fff" />,
		<BsFillCalendarXFill size={20} color="#fff" />,
		<GiStopwatch size={22} color="#fff" />,
		<FaBookReader size={20} color="#fff" />,
		<AiFillStop size={20} color="#fff" />,
		<BsFillCalendarFill size={20} color="#fff" />,
		<TbCalendarTime size={24} color="#fff" />,
		<BsCalendarEvent size={24} color="#fff" />
	]

	const colors = ['#ef8b43', '#599f50', '#d44141', '#0262db', '#FB8C00', '#E53935', '#35762c', '#d7b936']

	function getColor(params) {
		if (params == 'Có mặt') {
			return { color: colors[1], icon: icons[1] }
		}
		if (params == 'Vắng có phép') {
			return { color: colors[6], icon: icons[6] }
		}
		if (params == 'Về sớm') {
			return { color: colors[7], icon: icons[7] }
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
		if (params == 'Nghỉ lễ') {
			return { color: colors[6], icon: icons[8] }
		}

		return { color: colors[0], icon: icons[0] }
	}

	return (
		<>
			<div className="grid grid-cols-1 w500:grid-cols-2 w1200:grid-cols-3 gap-3 mb-3">
				{attenance?.map((item, index) => (
					<div className="shadow-sm bg-[#fff] flex items-center rounded-[6px] p-[14px] col-span-1">
						<div
							className="w-[40px] h-[40px] rounded-[6px] flex items-center justify-center shadow-sm"
							style={{ background: getColor(item?.Name).color }}
						>
							{getColor(item?.Name).icon}
						</div>
						<div className="ml-[8px]">
							<div className="font-[500] text-[14px]">{item?.Name || 'Unknow'}</div>
							<div className="font-[500] text-[16px]">{item?.StudentAmount}</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default StudentByAttenance
