import { DatePicker } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { statisticalTeacherApi } from '~/api/dashboard/teacher'
import NestedTable from '~/common/components/NestedTable'
import PrimaryTag from '~/common/components/Primary/Tag'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'

const TeacherStatisticDetails = (props) => {
	const { item } = props

	const [loading, setLoading] = useState<boolean>(true)
	const [data, setData] = useState([])
	const [totalPage, setTotalPage] = useState(0)
	const [filter, setFilter] = useState({ teacherId: '', dateStart: null, dateEnd: null, pageSize: PAGE_SIZE, pageIndex: 1 })

	useEffect(() => {
		if (!!item) {
			getDetail()
		}
	}, [filter])

	async function getDetail() {
		setLoading(true)
		try {
			const res = await statisticalTeacherApi.getDetail({ ...filter, teacherId: item?.TeacherId })
			if (res.status == 200) {
				setData(res.data.data)
				setTotalPage(res.data.totalRow)
			} else {
				setData([])
				setTotalPage(0)
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		} finally {
			setLoading(false)
		}
	}

	const columns = [
		{
			title: 'Lớp',
			dataIndex: 'ClassName',
			className: 'font-weight-primary max-w-[250px]'
		},
		{
			title: 'Phòng học',
			dataIndex: 'RoomName',
			className: 'font-[500]'
		},
		{
			title: 'Bắt đầu',
			dataIndex: 'StartTime',
			className: 'font-[500]',
			render: (text, item) => {
				return <p className="font-[600]">{moment(text).format('HH:mm DD/MM/YYYY')}</p>
			}
		},
		{
			title: 'Kết thúc',
			dataIndex: 'EndTime',
			className: 'font-[500]',
			render: (text, item) => {
				return <p className="font-[600]">{moment(text).format('HH:mm DD/MM/YYYY')}</p>
			}
		},
		{
			title: 'Trạng thái',
			dataIndex: 'TeachingStatus',
			window:100,
		
			render: (text, item) => {
				if (text == 1) {
					return (
						<PrimaryTag  className="justify-center" color="green">
							{item?.TeachingStatusName}
						</PrimaryTag>
					)
				}
				return (
					<PrimaryTag  className="justify-center" color="red">
						{item?.TeachingStatusName}
					</PrimaryTag>
				)
			}
		}
	]

	function handleChangeRange(params) {
		if (!!params) {
			setFilter({ ...filter, dateStart: new Date(params[0]), dateEnd: new Date(params[1]) })
		} else {
			setFilter({ ...filter, dateStart: null, dateEnd: null })
		}
	}

	return (
		<NestedTable
			Extra="Chi tiết"
			loading={loading}
			TitleCard={
				<div className="w-full ">
					<DatePicker.RangePicker className="primary-input w-[250px]" onChange={handleChangeRange} />
				</div>
			}
			addClass="basic-header"
			dataSource={data}
			columns={columns}
			haveBorder={true}
			pageSize={PAGE_SIZE}
			getPagination={(event: number) => {
				setFilter({ ...filter, pageIndex: event })
			}}
			totalPage={totalPage}
		/>
	)
}

export default TeacherStatisticDetails
