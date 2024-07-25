import { FormOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, Tag } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { giftApi } from '~/api/gift'
import { majorsRegistrationApi } from '~/api/majors/registration'
import { PrimaryTooltip } from '~/common/components'
import Avatar from '~/common/components/Avatar'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import ModalFooter from '~/common/components/ModalFooter'

import IconButton from '~/common/components/Primary/IconButton'
import PrimaryTable from '~/common/components/Primary/Table'
import { ButtonEye } from '~/common/components/TableButton'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'

type FieldType = {
	GiftIds: any
	Note: string
}

const MajorsStudentPage = () => {
	const router = useRouter()
	const { slug } = router.query
	const [form] = Form.useForm()
	const [majors, setMajors] = useState<IMajorsRegistration[]>([])
	const [loading, setLoading] = useState<'' | 'GET_ALL'>('')
	const [totalRow, setTotalRow] = useState(0)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [giftsList, setGiftsList] = useState<any>([])
	const [idSelected, setIdSelected] = useState<number>(null)

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
			align: 'right',
			render: (text) => <p>{parseToMoney(text)}</p>
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
			width: 250,
			dataIndex: 'GiftInfos',
			render: (_, { item }) => (
				<>
					{_?.map((e) => {
						return (
							<Tag color="green" key={e.Id}>
								{e.Name}
							</Tag>
						)
					})}
				</>
			)
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
					<IconButton onClick={() => showModal(item)} tooltip="Cập nhật thông tin" type="button" icon="edit" color="primary" />
				</div>
			)
		}
	]

	const showModal = async (item: any) => {
		const tam = []
		item?.GiftInfos?.map((_item) =>
			tam.push({
				label: _item.Name,
				value: _item.Id
			})
		)

		setIdSelected(item?.Id)
		form.setFieldValue('GiftIds', tam)
		form.setFieldValue('Note', item?.Note)
		if (giftsList?.length < 1) {
			const res = await giftApi.getAll({ pageSize: 9999, pageIndex: 1 })
			if (res.status === 200) {
				const team = []
				res.data.data.map((_item) =>
					team.push({
						label: _item.Name,
						value: _item.Id
					})
				)

				setGiftsList(team)
			}
		}
		setIsModalOpen(true)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}
	const onFinish = async (values: any) => {
		try {
			const dataSumit = {
				...values,
				Id: idSelected,
				GiftIds: values.GiftIds.join(',')
			}

			const res = await majorsRegistrationApi.updatemajorsRegistration(dataSumit)
			if (res.status === 200) {
				setIsModalOpen(false)
				getMajorsRegistration()
				ShowNostis.success('Cập nhật thành công!')
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	return (
		<>
			<Modal
				title="Cập nhật ngành học"
				open={isModalOpen}
				closable={false}
				footer={
					<ModalFooter
						// hideOK={scheduleList?.length < 1}
						onOK={form.submit}
						onCancel={handleCancel}
						// disable={}
					/>
				}
				width={600}
			>
				<Form form={form} layout="vertical" onFinish={onFinish}>
					<Form.Item<FieldType> label="Quà tặng" name="GiftIds" rules={[{ required: false }]}>
						<Select
							mode="multiple"
							allowClear
							className="selec-antd-gift"
							maxTagCount={2}
							placeholder="Chọn quà tặng"
							options={giftsList}
						/>
					</Form.Item>
					<Form.Item<FieldType> label="Ghi chú" name="Note" rules={[{ required: false }]}>
						<TextArea
							placeholder="Ghi chú"
							allowClear
							style={{
								borderRadius: 8
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
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
		</>
	)
}

export default MajorsStudentPage
