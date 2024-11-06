import { Skeleton } from 'antd'
import React from 'react'

const FormLoading = () => {
	return (
		<div>
			<Skeleton.Button active style={{ height: '200px' }} block />
		</div>
	)
}

export default FormLoading
