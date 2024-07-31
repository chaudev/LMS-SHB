import { Rate, RateProps } from 'antd'
import React from 'react'
import styles from './styles.module.scss'

type TMyRate = {} & RateProps

const MyRate: React.FC<TMyRate> = (props) => {
	return <Rate {...props} className={`${styles.wrapper} ${props.className}`} />
}

export default MyRate
