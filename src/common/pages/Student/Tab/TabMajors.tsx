import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { majorsRegistrationApi } from '~/api/majors/registration'
import PrimaryTable from '~/common/components/Primary/Table'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

interface TabMajors {
	StudentDetail: IUserResponse
}
const TabMajors: React.FC<TabMajors> = ({ StudentDetail }) => {
	const router = useRouter()
	const { StudentID } = router.query
	const [majors, setMajors] = useState<IMajorsRegistration[]>([])
	const [loading, setLoading] = useState<'' | 'GET_ALL'>('')

	const getMajorsRegistration = async () => {
		try {
			setLoading('GET_ALL')
			const params = {
				studentId: Number(StudentID),
				pageSize: 9999,
				pageIndex: 1
			}
			const response = await majorsRegistrationApi.getAllMajorsRegistration(params)

			if (response.status === 200) {
				console.log(response)
				setMajors(response.data.data)
			}
			if (response.status === 204) {
				setMajors([])
			}
			setLoading('')
		} catch (error) {
			ShowNostis.error(error.message)
			setLoading('')
		}
	}

	useEffect(() => {
		if (!!StudentID) getMajorsRegistration()
	}, [StudentID])

	const columns = [
		{
			title: 'Ngành học',
			dataIndex: 'MajorsName',
			render: (text) => <p className="text-[16px] font-[600]">{text}</p>
		},
		{
			title: 'Giá tiền',
			dataIndex: 'TotalPrice',
			render: (text) => <p>{parseToMoney(text)}</p>
		},
		{
			title: 'Trạng thái',
			dataIndex: 'StatusName',
			render: (value, item) => {
				console.log(item)
				return <span className={`tag ${item.Status == 1 ? 'blue' : 'gray'}`}>{value}</span>
			}
		},
		{
			title: 'Ghi chú',
			dataIndex: 'Note',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Quà tặng',
			dataIndex: 'GiftName',
			render: (text) => <p>{text}</p>
		},
		{
			title: 'Phương Thức thanh toán',
			dataIndex: 'PaymentTypeName',
			render: (text) => <p>{text}</p>
		}
	]

	return <PrimaryTable columns={columns} loading={loading === 'GET_ALL'} data={majors} />
}

export default TabMajors
