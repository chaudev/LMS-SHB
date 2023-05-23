import { Tag } from 'antd'
import React from 'react'
import { parseToMoney } from '~/common/utils/common'

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

const HeaderPanalMajors = ({ majorsName, status, statusName, paymentTypeName, giftName, note, paid, totalPrice }) => {
	return (
		<div className="d-flex flex-col gap-3">
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Ngành học</span>
				<span className="text-[green] text-base">{majorsName} </span>
			</div>
			<div className="d-flex">
				<span className="font-[500] text-[gray] inline-block w-2/6">Trạng thái</span>
				<Tag color={status == 1 ? 'blue' : ''} className="font-[500] d-flex justify-center">
					{statusName}
				</Tag>
			</div>
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Kiểu thanh toán</span>
				<span>{paymentTypeName}</span>
			</div>
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Học phí</span>
				<span className="text-[primary]">{parseToMoney(totalPrice)} VND</span>
			</div>
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Số tiền đã đóng</span>
				<span className="text-[green]">{parseToMoney(paid)} VND</span>
			</div>
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Quà tặng</span>
				<span>{giftName}</span>
			</div>
			<div>
				<span className="font-[500] text-[gray] inline-block w-2/6">Ghi chú</span>
				<span>{note}</span>
			</div>
		</div>
	)
}

export default HeaderPanalMajors
