import { DatePicker } from 'antd'
import { RangePickerProps } from 'antd/lib/date-picker'
export type TMyRangePickerProps = {} & RangePickerProps
const { RangePicker } = DatePicker

const MyDateRangePicker: React.FC<TMyRangePickerProps> = (props) => {
	const { className, ...rest } = props

	return <RangePicker className={className || 'h-[36px]'} format={'DD/MM/YYYY'} {...rest} />
}

export default MyDateRangePicker