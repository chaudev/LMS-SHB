import React, { useEffect, useState } from 'react'
import { statisticalTeacherApi } from '~/api/dashboard/teacher'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNostis } from '~/common/utils'
import TeacherStatisticDetails from './Details'
import Head from 'next/head'
import appConfigs from '~/appConfig'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'

const initParamters = { pageSize: PAGE_SIZE, pageIndex: 1 }

const StatisticTeacher = () => {
	const [data, setData] = useState([])
	const [totalPage, setTotalPage] = React.useState(1)
	const [filters, setFilter] = React.useState(initParamters)

	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		getData()
	}, [filters])

	async function getData() {
		try {
			setLoading(true)
			const res = await statisticalTeacherApi.getAll()
			if (res.status == 200) {
				setData(res.data.data)
				setTotalPage(res.data.totalRow)
			}
			setLoading(false)
		} catch (error) {
			ShowNostis.error(error?.message)
			setLoading(false)
		}
	}

	const columns = [
		{
			title: 'Học viên',
			dataIndex: 'FullName',
			render: (text, item) => (
				<>
					<p className="font-weight-primary">{text}</p>
					<p className="text-[14px] font-[600] text-gray">{item?.UserCode}</p>
				</>
			)
		},
		{
			title: 'Liên hệ',
			dataIndex: 'FullName',
			render: (text, item) => (
				<>
					<p className="text-[14px]  text-gray">
						Điện thoại: <span className="font-[600]">{item?.Mobile}</span>
					</p>
					<p className="text-[14px] text-gray">
						Email: <span className="font-[600]">{item?.Email}</span>
					</p>
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
				pageSize={filters.pageSize}
				currentPage={filters.pageIndex}
				className="shadow-sm"
				loading={loading}
				TitleCard="Thống kê giảng dạy"
				dataSource={data}
				columns={columns}
				totalPage={totalPage}
				expandable={expandedRowRender}
				getPagination={(page: number) => setFilter({ ...filters, pageIndex: page })}
			/>
		</>
	)
}

export default StatisticTeacher
