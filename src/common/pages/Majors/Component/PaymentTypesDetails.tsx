import { Tag } from 'antd'
import React from 'react'
import MyDivider from '~/atomic/atoms/MyDivider'
import InputNumberField from '~/common/components/FormControl/InputNumberField'

interface IPaymentTypesDetails {
	datas: IPaymentTypeDetail[]
}

const PaymentTypesDetails: React.FC<IPaymentTypesDetails> = (props) => {
	const { datas } = props
	return (
		<div>
			<p className="font-medium">Các đợt thanh toán</p>
			<div className="max-h-[400px] scrollable py-2">
				{datas?.map((item) => (
					<div
						key={item.Id}
						className="!border-primary border !border-l-[4px] rounded-[6px] !rounded-tl-[8px] rounded-bl-[8px] p-2 mb-2 last:mb-0 hover:bg-primaryExtraLight"
					>
						<div className="flex justify-between flex-wrap gap-y-2">
							<div className="flex items-center flex-wrap">
								<span className="mr-2">Đợt {item?.Index}</span>
								<Tag className="rounded" color="blue">
									{item?.TypeName || 'Chưa cấu hình loại'}
								</Tag>
								<Tag className="rounded" color="green">
									{item?.ValueName || 'Chưa cấu hình tình trạng'}
								</Tag>
							</div>
							<InputNumberField label={''} name={`Price_${item.Id}`} className="!mb-0" />
						</div>
					</div>
				))}
			</div>
			<MyDivider />
		</div>
	)
}

export default PaymentTypesDetails
