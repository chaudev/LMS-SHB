import { InputNumber, InputNumberProps } from 'antd'
import styles from './styles.module.scss'

export type TMyInputNumberProps = {} & InputNumberProps

const MyInputNumber: React.FC<TMyInputNumberProps> = (props) => {
	const { className = '', ...rest } = props
	return (
		<div className={styles.wrapper}>
			<InputNumber
				className={`w-full ${styles.root} ${className}`}
				formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				{...rest}
				style={{ textAlign: 'center' }}
			/>
		</div>
	)
}

export default MyInputNumber
