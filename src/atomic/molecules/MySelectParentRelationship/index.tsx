import React from 'react'
import MySelect, { TMySelectProps } from '~/atomic/atoms/MySelect'
import styles from './styles.module.scss'
import { parentRelationshipOptions } from '~/common/utils/constants'

type TMySelectParentRelationship = TMySelectProps

const MySelectParentRelationship: React.FC<TMySelectParentRelationship> = (props) => {
	const { className, placeholder = '', ...restProps } = props

	return (
		<MySelect className={`${styles.wrapper} ${className}`} placeholder={placeholder} options={parentRelationshipOptions} {...restProps} />
	)
}

export default MySelectParentRelationship
