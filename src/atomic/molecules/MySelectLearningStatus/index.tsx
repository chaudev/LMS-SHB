import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import { learningStatusOptions } from '~/common/utils/constants'

type TMySelectLearningStatus = TMySelectProps

const MySelectLearningStatus: React.FC<TMySelectLearningStatus> = (props) => {
	const { className, placeholder = '', ...restProps } = props

	return <MySelect className={`${styles.wrapper} ${className}`} placeholder={placeholder} options={learningStatusOptions} {...restProps} />
}

export default MySelectLearningStatus
