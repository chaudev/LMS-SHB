import { Result } from 'antd'
import React from 'react'

interface ResultSuccessProps {
	message: string
	subTitle?: string
}

export default function ResultSuccess({ message, subTitle }: ResultSuccessProps) {
	return <Result status="success" title={message} subTitle={subTitle} />
}
