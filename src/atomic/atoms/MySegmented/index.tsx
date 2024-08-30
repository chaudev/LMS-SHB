import React, { forwardRef } from 'react'
import { Segmented, SegmentedProps } from 'antd'

type TMySegmentedProps = SegmentedProps

const MySegmented = forwardRef<HTMLDivElement, TMySegmentedProps>((props, ref) => {
	return <Segmented {...props} ref={ref} />
})

export default MySegmented
