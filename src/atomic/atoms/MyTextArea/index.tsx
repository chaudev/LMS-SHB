import { TextAreaProps } from 'antd/lib/input'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'

type TMyTextArea = {} & TextAreaProps

const MyTextArea: React.FC<TMyTextArea> = (props) => {
	return <TextArea {...props} />
}

export default MyTextArea
