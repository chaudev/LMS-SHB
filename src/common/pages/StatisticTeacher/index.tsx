import React, { useEffect, useState } from 'react'
import { statisticalTeacherApi } from '~/api/dashboard/teacher'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNostis } from '~/common/utils'
import TeacherStatisticDetails from './Details'
import Head from 'next/head'
import appConfigs from '~/appConfig'

const StatisticTeacher = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getData()
	}, [])

	async function getData() {
		try {
			const res = await statisticalTeacherApi.getAll()
			if (res.status == 200) {
				setData(res.data.data)
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		}
	}

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'FullName',
			render: (text, item) => (
				<>
					<p className="font-weight-primary">{text}</p>
					<p className="text-[14px]">{item?.UserCode}</p>
				</>
			)
		},
		{
			title: 'Liên hệ',
			dataIndex: 'FullName',
			render: (text, item) => (
				<>
					<p className="font-[600]">Điện thoại: {item?.Mobile}</p>
					<p className="text-[14px]">Email: {item?.Email}</p>
				</>
			)
		},
		{
			title: 'Tổng số buổi',
			dataIndex: 'TotalSession',
			className: 'min-w-[120px] font-[600] text-[#1b73e8]'
		},
		{
			title: 'Đã dạy',
			dataIndex: 'TotalTaught',
			className: 'min-w-[100px] font-[600]',
			render: (text, item) => {
				if (text == 0) {
					return <p className="font-[600] text-[red]">{text}</p>
				}

				if (item?.TotalSession == text) {
					return <p className="font-[600] text-[green]">{text}</p>
				}

				return <p className="font-[600]">{text}</p>
			}
		}
	]

	const expandedRowRender = (item) => {
		return <TeacherStatisticDetails item={item} />
	}

	return (
		<>
			<Head>
				<title>{`${appConfigs.appName} - Thống kê giảng dạy`}</title>
			</Head>
			<ExpandTable
				className="shadow-sm"
				loading={loading}
				TitleCard="Thống kê giảng dạy"
				dataSource={data}
				columns={columns}
				expandable={expandedRowRender}
			/>
		</>
	)
}

export default StatisticTeacher
