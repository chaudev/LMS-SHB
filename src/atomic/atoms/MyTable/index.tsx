import { Table } from 'antd'
import { TableProps } from 'antd/es/table'
import styles from './styles.module.scss'

export type TMyTableProps<T extends object> = TableProps<T>

const MyTable = <T extends object>(props: TMyTableProps<T>) => {
	const { rowKey, ...restProps } = props
	return (
		<div className={styles.wrapper}>
			<Table scroll={{ x: 'max-content', y: window.innerHeight - 295 }} rowKey={rowKey || 'Id'} {...restProps} />
		</div>
	)
}

export default MyTable
