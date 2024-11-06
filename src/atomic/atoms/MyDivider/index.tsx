import React from 'react'

interface IMyDivider {
	marginTop?: number
	marginBottom?: number
}

const MyDivider: React.FC<IMyDivider> = (props) => {
	const { marginTop = 20, marginBottom = 20 } = props
	return <div style={{ marginTop: `${marginTop}px`, marginBottom: `${marginBottom}px` }} className="mx-auto h-[1px] w-[100%] bg-tw-gray" />
}

export default MyDivider
