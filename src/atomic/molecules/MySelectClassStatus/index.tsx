import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import { classStatusOptions } from '~/common/utils/constants'

type TMySelectClassStatus = TMySelectProps

const MySelectClassStatus: React.FC<TMySelectClassStatus> = (props) => {
	const { className, placeholder = '', ...restProps } = props

	return <MySelect className={`${styles.wrapper} ${className}`} placeholder={placeholder} options={classStatusOptions} {...restProps} />
}

export default MySelectClassStatus
