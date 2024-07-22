import { Input } from 'antd'
import React, { useEffect, useState } from 'react'
import RestApi from '~/api/RestApi'
import { MainLayout } from '~/common'
import { PrimaryTooltip } from '~/common/components'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'
import Head from 'next/head'
import appConfigs from '~/appConfig'
import { ImWarning } from 'react-icons/im'
import { ButtonEye } from '~/common/components/TableButton'
import { ChangeClass } from '~/common/components/Student/StudentInClass'
import { userInfoColumn } from '~/common/libs/columns/user-info'
import Filters from '~/common/components/Student/Filters'

import Link from 'next/link'
import { useRole } from '~/common/hooks/useRole'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import { CLASS_TYPES } from '~/common/utils/constants'
import useClasses from '~/common/utils/hooks/useClasses'

const initFilters = { PageSize: PAGE_SIZE, PageIndex: 1, Search: '' }

const StudentInClassPage = () => {
	const [loading, setLoading] = React.useState(true)
	const [totalPage, setTotalPage] = React.useState(1)
	const [data, setData] = React.useState([])
	const [filters, setFilter] = React.useState(initFilters)

	const { classes, isLoading } = useClasses()

	const { isSaler } = useRole()

	useEffect(() => {
		getData()
	}, [filters])

	async function getData() {
		setLoading(true)
		try {
			const res = await RestApi.get<any>('StudentInClass', filters)
			if (res.status == 200) {
				setData(res.data.data)
				setTotalPage(res.data.totalRow)
			} else {
				setData([])
				setTotalPage(1)
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}

	function handleColumn(value, item) {
		if (isSaler) return ''

		return (
			<div className="flex item-center">
				<PrimaryTooltip content="Thông tin học viên" place="left" id={`view-st-${item?.Id}`}>
					<Link
						href={{
							pathname: '/info-course/student/detail',
							query: { StudentID: item?.StudentId }
						}}
					>
						<a>
							<ButtonEye />
						</a>
					</Link>
				</PrimaryTooltip>

				{item?.ClassType !== 3 && (
					<>
						<ChangeClass item={item} onRefresh={getData} />
						{/* <ReserveForm item={item} onRefresh={getData} /> */}
					</>
				)}
			</div>
		)
	}

	const columns = [
		userInfoColumn,
		{
			title: 'Điện thoại',
			dataIndex: 'Mobile'
		},
		{
			title: 'Email',
			dataIndex: 'Email'
		},
		{
			title: 'Lớp',
			dataIndex: 'ClassName',
			width: 170,
			render: (value, item) => {
				return (
					<PrimaryTooltip className="flex items-center" id={`class-tip-${item?.Id}`} content={'Xem lớp: ' + value} place="top">
						<Link href={`/class/list-class/detail/?class=${item.ClassId}`}>
							<a>
								<div className="max-w-[150px] in-1-line cursor-pointer font-[500] text-[#1976D2] hover:text-[#1968b7] hover:underline">
									{value}
								</div>
							</a>
						</Link>
					</PrimaryTooltip>
				)
			}
		},
		{
			title: 'Loại học viên',
			dataIndex: 'Type',
			width: 120,
			render: (value, item) => (
				<p className="font-[600] text-[#E53935]">
					{value == 1 && <span className="tag green">{item?.TypeName}</span>}
					{value == 2 && <span className="tag yellow">{item?.TypeName}</span>}
					{value == 3 && <span className="tag blue">{item?.TypeName}</span>}
				</p>
			)
		},
		{
			title: 'Loại lớp',
			dataIndex: 'ClassType',
			width: 110,
			render: (value, item) => (
				<p className="font-[600] text-[#E53935]">
					{value == 1 && <span className="tag green">{item?.ClassTypeName}</span>}
					{value == 2 && <span className="tag yellow">{item?.ClassTypeName}</span>}
					{value == 3 && <span className="tag blue">{item?.ClassTypeName}</span>}
				</p>
			)
		},
		{
			title: 'Cảnh báo',
			dataIndex: 'Warning',
			align: 'center',
			width: 100,
			render: (value, item) => {
				if (!!value) {
					return <ImWarning size={18} className="text-[#EF6C00]" />
				}
				return ''
			}
		},
		{
			title: '',
			dataIndex: 'Type',
			width: 60,
			fixed: 'right',
			render: handleColumn
		}
	]
	const dataFilterStudent = [
		{
			name: 'classId',
			title: 'Lớp học',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: classes?.map((item) => ({ title: item?.Name, value: item?.Id }))
		},
		{
			name: 'warning',
			title: 'Cảnh báo',
			type: 'select',
			col: 'col-span-2',
			mode: 'multiple',
			optionList: [
				{
					value: false,
					title: 'Không bị cảnh báo'
				},
				{
					value: true,
					title: 'Bị cảnh báo'
				}
			]
		}
	]

	const handleFilter = (params) => {
		const paramsForrmat = {
			...filters,
			pageIndex: 1,
			classId: params.classId ? params.classId.join(',') : null,
			warning: params.warning
		}
		setFilter(paramsForrmat)
	}

	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Học viên trong khoá</title>
			</Head>

			<ExpandTable
				currentPage={filters.PageIndex}
				totalPage={totalPage && totalPage}
				getPagination={(page: number) => setFilter({ ...filters, PageIndex: page })}
				loading={{ type: 'GET_ALL', status: loading }}
				dataSource={data}
				columns={columns}
				TitleCard={
					<div className="w-full flex items-center">
						{/* <Filters
							showClass
							showSort
							showWarning
							filters={filters}
							onSubmit={(event) => setFilter(event)}
							onReset={() => setFilter(initFilters)}
						/> */}
						<FilterBaseVer2
							dataFilter={dataFilterStudent}
							handleFilter={handleFilter}
							handleReset={(value) => {
								setFilter(initFilters)
							}}
						/>
						<Input.Search
							className="primary-search max-w-[250px] ml-[8px]"
							onChange={(event) => {
								if (event.target.value == '') {
									setFilter({ ...filters, PageIndex: 1, Search: '' })
								}
							}}
							onSearch={(event) => setFilter({ ...filters, PageIndex: 1, Search: event })}
							placeholder="Tìm kiếm"
						/>
					</div>
				}
			/>
		</>
	)
}

StudentInClassPage.Layout = MainLayout
export default StudentInClassPage
