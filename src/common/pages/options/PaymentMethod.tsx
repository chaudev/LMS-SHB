import React, { useEffect, useState } from 'react'
import { paymentMethodsApi } from '~/api/payment-method'
import PaymentMethodForm from '~/common/components/PaymentMethod/PaymentMethodForm'
import PrimaryTable from '~/common/components/Primary/Table'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNoti } from '~/common/utils'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'
import { setPaymentMethod } from '~/store/paymentMethodReducer'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { checkIncludesRole } from '~/common/utils/common'

let initTodoApi = {
	pageSize: PAGE_SIZE,
	pageIndex: 1
}

const PaymentMethodPage = () => {
	const [todoApi, setTodoApi] = useState(initTodoApi)
	const paymentMethod = useSelector((state: RootState) => state.paymentMethod.PaymentMethod)
	const userInformation = useSelector((state: RootState) => state.user.information)
	const dispatch = useDispatch()

	const columns = [
		{
			title: '',
			dataIndex: 'Thumbnail',
			key: 'Thumbnail',
			width: 110,
			render: (image) => {
				return <img src={image} alt="Thumbnail" className="w-[100px] h-auto rounded-[6px] shadow-md" />
			}
		},
		{
			title: 'Phương thức',
			dataIndex: 'Name',
			key: 'Name',
			render: (value) => {
				return <div className="font-[600] text-[#B32025]">{value}</div>
			}
		},
		{
			title: 'Trạng thái',
			dataIndex: 'Active',
			align: 'center',
			key: 'Active',
			render: (active) => {
				return !!active ? <p className="tag blue">{'Hoạt động'}</p> : <p className="tag gray">{'Khóa'}</p>
			}
		},
		{
			title: 'Mô tả',
			dataIndex: 'Description',
			key: 'Description',
			render: (description) => {
				return ReactHtmlParser(description)
			}
		},
		{
			title: 'Chức năng',
			dataIndex: '',
			key: '',
			align: 'center',
			width: 100,
			fixed: 'right',
			render: (data) => {
				return (
					<>
						{checkIncludesRole(listPermissionsByRoles.config.paymentMethod.update, Number(userInformation?.RoleId))}
						<PaymentMethodForm dataRow={data} setTodoApi={setTodoApi} initTodoApi={initTodoApi} />
					</>
				)
			}
		}
	]

	const getAllPaymentMethod = async (params) => {
		try {
			const res = await paymentMethodsApi.getAll(params)
			if (res.status === 200) {
				dispatch(setPaymentMethod(res.data.data))
			}
			if (res.status === 204) {
				dispatch(setPaymentMethod([]))
			}
		} catch (err) {
			ShowNoti('error', err.message)
		}
	}

	useEffect(() => {
		getAllPaymentMethod(todoApi)
	}, [todoApi])

	return (
		<div>
			<PrimaryTable columns={columns} data={paymentMethod} TitleCard="Danh sách phương thức thanh toán" />
		</div>
	)
}

export default PaymentMethodPage
