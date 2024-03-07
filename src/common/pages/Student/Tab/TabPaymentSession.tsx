import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { paymentSessionApi } from '~/api/payment-session'
import PrimaryTable from '~/common/components/Primary/Table'
import PrimaryTag from '~/common/components/Primary/Tag'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti, _format } from '~/common/utils'

type ITabPaymentSession = {
	StudentDetail: IUserResponse
}
const TabPaymentSession: React.FC<ITabPaymentSession> = ({ StudentDetail }) => {
	const initialParams = { pageIndex: 1, pageSize: PAGE_SIZE }

	const [todoApi, setTodoApi] = useState(initialParams)
	const [isLoading, setIsLoading] = useState(false)
	const [dataSource, setDataSource] = useState<IPaymentSession[]>()
	const [totalPage, setTotalPage] = useState(0)

	const getDataPayment = async () => {
		setIsLoading(true)
		try {
			let res = await paymentSessionApi.getAll({
				userId: StudentDetail.UserInformationId,
				...todoApi
			})
			if (res.status == 200) {
				setDataSource(res.data.data)
				setTotalPage(res.data.totalRow)
			}
			if (res.status == 204) {
				setDataSource([])
				setTotalPage(0)
			}
		} catch (error) {
			ShowNoti('error', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (StudentDetail) {
			getDataPayment()
		}
	}, [StudentDetail])
	const columns = [
		{
			title: 'Học viên',
			width: 220,
			dataIndex: 'FullName',
			fixed: 'left',
			render: (text, item) => {
				return (
					<>
						<p className="font-weight-primary">{text}</p>
						<p className="table-row-sub-text ">
							<span className="text-black">{item.UserCode}</span>
						</p>
					</>
				)
			}
		},
		{
			width: 270,
			title: 'Trung tâm',
			dataIndex: 'BranchName',
			render: (text, item) => {
				return (
					<>
						<p className="font-weight-primary">{text}</p>
						<p className="table-row-sub-text">
							Người tạo: <span className="text-black">{item.CreatedBy}</span>
						</p>
						<p className="table-row-sub-text">
							Thời gian: <span className="text-black"> {moment(item.CreatedOn).format('DD/MM/YYYY HH:mm')}</span>
						</p>
					</>
				)
			}
		},

		{
			title: 'Giá trị',
			width: 250,
			dataIndex: 'Value',
			render: (text, item) => {
				return (
					<>
						<p className={`table-row-main-text ${item.Type == 1 ? 'text-tw-green' : 'text-tw-red'} !font-[600]`}>
							{_format.numberToPrice(text)}₫
						</p>
						<p className="table-row-sub-text">
							Phương thức: <span className="table-row-main-text text-black">{item.PaymentMethodName}</span>
						</p>
					</>
				)
			}
		},
		{
			title: 'Loại',
			width: 100,
			dataIndex: 'TypeName',
			render: (text, item) => {
				return <PrimaryTag children={<span>{text}</span>} color={item.Type == 1 ? 'green' : 'red'} />
			}
		},
		{
			title: 'Lý do',
			width: 200,
			dataIndex: 'Reason',
			render: (text) => {
				return <p className="">{text}</p>
			}
		},
		{
			title: 'Ghi chú',
			width: 200,
			dataIndex: 'Note',
			render: (text) => {
				return <p className="">{text}</p>
			}
		}
	]

	return (
		<PrimaryTable
			columns={columns}
			data={dataSource}
			total={totalPage}
			loading={isLoading}
			onChangePage={(event: number) => setTodoApi({ ...todoApi, pageIndex: event })}
		/>
	)
}

export default TabPaymentSession
