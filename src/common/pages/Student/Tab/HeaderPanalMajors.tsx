import { EditOutlined } from '@ant-design/icons'
import { Form, Input, Modal, Select, Tag } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { giftApi } from '~/api/gift'
import { majorsRegistrationApi } from '~/api/majors/registration'
import ModalFooter from '~/common/components/ModalFooter'

import PrimaryButton from '~/common/components/Primary/Button'
import { ShowNostis } from '~/common/utils'
import { parseToMoney } from '~/common/utils/common'
import { RootState } from '~/store'

interface IHeaderPanalMajors {
	majorsName: string
	status: number
	statusName: string
	paymentTypeName: string
	giftName: string
	note: string
	paid: string
	totalPrice: number
}

type FieldType = {
	GiftIds: any
	Note: string
}

const { TextArea } = Input

const HeaderPanalMajors = ({ Id, majorsName, status, statusName, paymentTypeName, gifts, note, paid, totalPrice, setIsReLoad }) => {
	const userInformation = useSelector((state: RootState) => state.user.information)
	const [form] = Form.useForm()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [giftsList, setGiftsList] = useState<any>([])
	// const router = useRouter()
	// const { StudentID } = router.query

	const showModal = async () => {
		const tam = []
		gifts?.map((_item) =>
			tam.push({
				label: _item.Name,
				value: _item.Id
			})
		)
		form.setFieldValue('GiftIds', tam)
		form.setFieldValue('Note', note)
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
				Id,
				GiftIds: values.GiftIds.join(',')
			}
			
			const res = await majorsRegistrationApi.updatemajorsRegistration(dataSumit)
			if (res.status === 200) {
				setIsModalOpen(false)
				setIsReLoad()
				ShowNostis.success('Cập nhật thành công!')
			}
		} catch (error) {
			ShowNostis.error(error.message)
		}
	}

	return (
		<>
			<Modal
				title="Cập nhật chương trình học"
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
			<div className="d-flex flex-col gap-3">
				<div
					style={{
						display: 'flex',
						alignItems: 'center'
					}}
				>
					<span className="font-[500] text-[gray] inline-block w-2/6">Chương trình học</span>
					<span className="text-[green] text-base">{majorsName} </span>
					{userInformation && userInformation.RoleId != '3' && userInformation.RoleId != '2' ? (
						// <PrimaryButton onClick={showModal} icon="edit" background="blue" type="button">
						// 	Cập nhật
						// </PrimaryButton>
						<EditOutlined
							onClick={(e) => {
								e.stopPropagation()
								showModal()
							}}
							style={{
								marginLeft: 5
							}}
						/>
					) : (
						''
					)}
				</div>
				<div className="d-flex">
					<span className="font-[500] text-[gray] inline-block w-2/6">Trạng thái</span>
					<Tag color={status == 1 ? 'green' : 'blue'} className="font-[500] d-flex justify-center">
						{statusName}
					</Tag>
				</div>
				<div>
					<span className="font-[500] text-[gray] inline-block w-2/6">Kiểu thanh toán</span>
					<span className="font-[500]">{paymentTypeName}</span>
				</div>
				<div>
					<span className="font-[500] text-[gray] inline-block w-2/6">Học phí</span>
					<span className="text-[blue]">{parseToMoney(totalPrice)}₫</span>
				</div>
				<div>
					<span className="font-[500] text-[gray] inline-block w-2/6">Số tiền đã đóng</span>
					<span className="text-[green]">{parseToMoney(paid)}₫</span>
				</div>
				<div style={{ display: 'flex' }}>
					<span className="font-[500] text-[gray] inline-block w-2/6">Quà tặng</span>
					<div>
						{gifts?.map((e) => {
							return (
								<Tag color="green" key={e.Id}>
									{e.Name}
								</Tag>
							)
						})}
					</div>
				</div>
				<div>
					<span className="font-[500] text-[gray] inline-block w-2/6">Ghi chú</span>
					<span>{note}</span>
				</div>
			</div>
		</>
	)
}

export default HeaderPanalMajors
