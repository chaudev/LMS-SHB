import { Select, SelectProps } from 'antd'
import styles from './styles.module.scss'
export type TMySelectProps = {
	originalStyle?: boolean
} & SelectProps

const MySelect: React.FC<TMySelectProps> = (props) => {
	const { originalStyle = true, className = '', ...rest } = props

	if (originalStyle) {
		return <Select showArrow showSearch optionFilterProp="children" className={` ${className}`} allowClear {...rest} />
	}

	return (
		<div className={styles.wrapper}>
			<Select className={`${className}`} {...rest} showArrow />
		</div>
	)
}

export default MySelect
