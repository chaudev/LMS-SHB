import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { dormitoryRegisterApi } from '~/api/dormitory/dormitory-register'
import ExpandTable from '~/common/components/Primary/Table/ExpandTable'
import { ShowNoti } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

const TabDormitory = () => {
	const router = useRouter()
	const query = router.query

	const [filters, setFilters] = useState({
		PageIndex: 1,
		PageSize: 9999,
		StudentId: +query?.StudentID,
	})

	const handleFetching = async () => {
		if (!filters.StudentId) return

		try {
			const response = await dormitoryRegisterApi.getAll(filters)
			const data = response.data.data

			return data
		} catch (error) {
			ShowNoti('error', error.message)
		}
	}

	const { data, isFetching, isLoading } = useQuery({
		queryKey: [dormitoryRegisterApi.keyGetAll, [filters.PageIndex, filters.StudentId]],
		queryFn: handleFetching,
		enabled: !!query.StudentID
	})

	const columns = [
		{
			dataIndex: 'DormitoryName',
			title: 'Tên ký túc xá'
		},
		{
			dataIndex: 'DormitoryAreaName',
			title: 'Tên khu'
		},
		{
			dataIndex: 'DormitoryRoomName',
			title: 'Tên phòng'
		},
		{
			dataIndex: 'Price',
			title: 'Chi phí theo tháng',
			render: (fee: number) => <div>{parseToMoney(fee)}</div>
		},
		{
			dataIndex: 'Status',
			title: 'Trạng thái',
			render: (status: number, record: TDormitoryItem) => {
				const color = ['blue', 'green', 'yellow', 'gray']
				return <div className={`tag ${color[status - 1]}`}>{record?.StatusName}</div>
			}
		},
		{
			dataIndex: 'Description',
			title: 'Mô tả ký túc xá',
			render: (text) => <div className='min-w-[120px]'>{text}</div>
		}
	]

	return (
		<>
			<ExpandTable
				loading={isLoading || isFetching}
				// Extra={<ModalCUDormitoryList defaultData={null} refetch={refetch} />}
				currentPage={filters.PageIndex}
				totalPage={data && data.length}
				dataSource={data}
				columns={columns}
			/>
		</>
	)
}

export default TabDormitory
