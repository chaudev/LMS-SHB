import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import { rollUpStatusOptions } from '~/common/utils/constants'

type TMySelectRollUpStatus = TMySelectProps

const MySelectRollUpStatus: React.FC<TMySelectRollUpStatus> = (props) => {
	const { className, placeholder = '', ...restProps } = props

	return <MySelect className={`${styles.wrapper} ${className}`} placeholder={placeholder} options={rollUpStatusOptions} {...restProps} />
}

export default MySelectRollUpStatus
