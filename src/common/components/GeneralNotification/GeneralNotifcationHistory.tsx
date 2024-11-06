import { useQuery } from '@tanstack/react-query'
import moment from 'moment'
import { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { generalNotificationApi } from '~/api/general-notification'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import ExpandTable from '../Primary/Table/ExpandTable'
import GeneralNotificationUserReceiver from './GeneralNotificationUserReceiver'

const GeneralNotificationHistory = () => {
	const [filter, setFilter] = useState({
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		totalPage: 0
	})
	const [generalNotification, setGeneralNotification] = useState<TGeneralNotification[]>([])

	const getAllGeneralNotifications = async () => {
		try {
			const res = await generalNotificationApi.getAll(filter)
			if (res.status === 200) {
				setGeneralNotification(res.data.data)
				setFilter({ ...filter, totalPage: res.data.totalRow })

        return res.data.data
			}
		} catch (err) {
			ShowNoti('error', err.message)
      return []
		}
	}


	const { data, isLoading, isFetching, refetch } = useQuery({
		queryKey: ['GET /api/GeneralNotification'],
		queryFn: getAllGeneralNotifications,
		retry: false,
		refetchOnMount: false,
		refetchOnWindowFocus: false
	})

	useEffect(() => {
		refetch()
	}, [])

	const columns = [
		{
			title: 'Tiêu đề',
			dataIndex: 'Title'
		},
		{
			title: 'Date',
			dataIndex: 'ModifiedOn',
			render: (date) => <p className="font-weight-black">{moment(date).format('DD/MM/YYYY')}</p>
		},
		{
			title: 'Người tạo',
			dataIndex: 'CreatedBy'
		},
		{
			title: 'Chức năng',
			width: 100,
			align: 'center',
			render: (data) => {
				return <GeneralNotificationUserReceiver dataRow={data} />
			}
		}
	]

	const expandedRowRender = (data, index) => {
		return (
			<div className="pt-2 pb-2">
				<span className="weight-600">Nội dung:</span> {ReactHtmlParser(data?.Content)}
			</div>
		)
	}

	const getPagination = (pageNumber: number, pageSize: number) => {
		if (!pageSize) pageSize = 10

    setFilter({...filter, pageIndex: pageNumber, pageSize})
	}
	return (
		<ExpandTable
			currentPage={filter.pageIndex}
			loading={isLoading || isFetching}
			columns={columns}
			dataSource={generalNotification}
			totalPage={filter.totalPage}
			getPagination={getPagination}
			expandable={expandedRowRender}
		/>
	)
}

export default GeneralNotificationHistory
