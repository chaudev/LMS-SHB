import { Loading3QuartersOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import React from 'react'
import { CgSpinner } from 'react-icons/cg'
import styles from './styles.module.scss'

type TMyLoadingSmallContent = {
	content?: string
}

const MyLoadingSmallContent: React.FC<TMyLoadingSmallContent> = (props) => {
	const { content } = props
	return (
		<div className="w-full flex items-center justify-center gap-2">
			<CgSpinner className={styles.spin} size={16} />
			<span className="text-[14px]">{content || 'Đang tải dữ liệu'}</span>
		</div>
	)
}

export default MyLoadingSmallContent
