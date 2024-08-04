import { Select, SelectProps } from 'antd'
import styles from './styles.module.scss'
export type TMySelectProps = {
	originalStyle?: boolean
} & SelectProps

const MySelect: React.FC<TMySelectProps> = (props) => {
	const { originalStyle = true, className = '', ...rest } = props

	if (originalStyle) {
		return <Select showSearch optionFilterProp="children" className={`primary-input ${className}`} allowClear {...rest} />
	}

	return (
		<div className={styles.wrapper}>
			<Select className={`${className}`} {...rest} />
		</div>
	)
}

export default MySelect
