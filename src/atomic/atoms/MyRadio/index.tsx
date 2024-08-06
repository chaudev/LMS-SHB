import { Radio, RadioProps } from 'antd'
import React from 'react'
import styles from './styles.module.scss'

export type TMyRadio = { type?: 'button' } & RadioProps

const MyRadio: React.FC<TMyRadio> = (props) => {
	const { type, ...rest } = props
	if (type == 'button') {
		return <Radio.Button {...rest} />
	}
	return (
		<div className={`${styles.wrapper}`}>
			<Radio {...rest} />
		</div>
	)
}

export default MyRadio
