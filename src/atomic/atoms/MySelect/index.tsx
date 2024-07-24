import { Select, SelectProps } from 'antd'

export type TMySelectProps = {} & SelectProps

const MySelect: React.FC<TMySelectProps> = (props) => {
	const { className = '', ...rest } = props

	return <Select className={`${className}`} allowClear {...rest} />
}

export default MySelect
