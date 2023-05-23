import { Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { majorsRegistrationApi } from '~/api/majors/registration'
import Avatar from '~/common/components/Avatar'
import PrimaryTable from '~/common/components/Primary/Table'
import Filters from '~/common/components/Student/Filters'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

const MajorsStudentPage = () => {
	const router = useRouter()
	const { slug } = router.query
	const [majors, setMajors] = useState<IMajorsRegistration[]>([])
	const [loading, setLoading] = useState<'' | 'GET_ALL'>('')
	const [totalRow, setTotalRow] = useState(0)

	const initParamters = {
		majorsId: slug,
		pageSize: PAGE_SIZE,
		pageIndex: 1,
		search: null,
		status: null
	}
	const [apiParameters, setApiParameters] = useState(initParamters)

	const getMajorsRegistration = async () => {
		try {
			setLoading('GET_ALL')
			const response = await majorsRegistrationApi.getAllMajorsRegistration(apiParameters)
			if (response.status === 200) {
				setMajors(response.data.data)
				setTotalRow(response.data.totalRow)
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
		if (!!slug) getMajorsRegistration()
	}, [slug])
	useEffect(() => {
		getMajorsRegistration()
	}, [apiParameters])

	const columns = [
		{
			title: 'Thông tin sinh viên',
			dataIndex: 'Code',
			render: (value, item) => (
				<div className="flex items-center">
					<Avatar className="h-[36px] w-[36px] rounded-full shadow-sm" uri={item?.StudentAvatar} />
					<div className="ml-[8px]">
						<h2 className="text-[16px] font-[600]">{item?.StudentName}</h2>
						<h3 className="text-[14px] font-[400]">{item?.StudentCode}</h3>
					</div>
				</div>
			)
		},
		{
			title: 'Giá tiền',
			dataIndex: 'TotalPrice',
			render: (text) => <p>{parseToMoney(text)} VND</p>
		},
		{
			width: 100,
			title: 'Trạng thái',
			dataIndex: 'StatusName',
			render: (value, item) => {
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
			width: 250,
			title: 'Phương Thức thanh toán',
			dataIndex: 'PaymentTypeName',
			render: (text) => <p>{text}</p>
		}
	]
	return (
		<PrimaryTable
			columns={columns}
			loading={loading === 'GET_ALL'}
			total={totalRow}
			pageSize={apiParameters.pageSize}
			data={majors}
			TitleCard={
				<>
					<Filters
						filters={apiParameters}
						statusList={[
							{
								value: 1,
								title: 'Đang theo học'
							},
							{
								value: 2,
								title: 'Đã kết thúc'
							}
						]}
						onSubmit={(event) => setApiParameters(event)}
						onReset={() => setApiParameters(initParamters)}
					/>
					<Input.Search
						className="primary-search max-w-[250px] ml-[8px]"
						onChange={(event) => {
							if (event.target.value == '') {
								setApiParameters({ ...apiParameters, pageIndex: 1, search: '' })
							}
						}}
						onSearch={(event) => setApiParameters({ ...apiParameters, pageIndex: 1, search: event })}
						placeholder="Tìm kiếm"
					/>
				</>
			}
			onChangePage={(event: number) => setApiParameters({ ...apiParameters, pageIndex: event })}
		/>
	)
}

export default MajorsStudentPage
