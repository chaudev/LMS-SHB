import { Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { giftApi } from '~/api/gift'
import { majorsRegistrationApi } from '~/api/majors/registration'
import { PrimaryTooltip } from '~/common/components'
import Avatar from '~/common/components/Avatar'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { ButtonEye } from '~/common/components/TableButton'
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
	const [gifts, setGift] = useState([])

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

	const getAllGift = async () => {
		try {
			const res = await giftApi.getAll({
				pageSize: 9999,
				pageIndex: 1
			})
			if (res.status === 200) {
				// setData(res.data.data)
				let temlp = []

				res.data.data.map((item) => {
					temlp.push({
						value: item.Id,
						title: item.Name
					})
				})
				setGift(temlp)
			}
			if (res.status === 204) {
				setGift([])
			}
		} catch (error) {
		} finally {
		}
	}

	useEffect(() => {
		if (!!slug) {
			getMajorsRegistration()
		}
		getAllGift()
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
			render: (text) => <p>{parseToMoney(text)}₫</p>
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
			width: 250,
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
		},
		{
			width: 100,
			title: '',
			fixed: 'right',
			dataIndex: '',
			render: (text, item) => (
				<div className="d-flex items-center">
					<PrimaryTooltip content="Thông tin học viên" place="left" id={`view-st-${item?.StudentId}`}>
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
					<Link
						href={{
							pathname: '/majors/change-majors/',
							query: { studentId: item?.StudentId }
						}}
					>
						<a>
							<IconButton tooltip="Thay đổi ngành học" type="button" icon="exchange" color="primary" />
						</a>
					</Link>
				</div>
			)
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
					<FilterBaseVer2
						dataFilter={[
							{
								name: 'status',
								title: 'Trạng thái',
								type: 'select',
								col: 'col-span-2',

								optionList: [
									{
										value: 1,
										title: 'Đang theo học'
									},
									{
										value: 2,
										title: 'Đã kết thúc'
									}
								]
							},
							{
								name: 'giftId',
								title: 'Quà tặng',
								type: 'select',
								col: 'col-span-2',
								optionList: gifts
							}
						]}
						handleFilter={(event) => setApiParameters({ ...initParamters, ...event })}
						handleReset={() => setApiParameters(initParamters)}
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
