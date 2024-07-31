import React, { useEffect, useState } from 'react'

type TItem = {
	id: any
	name: React.ReactNode
	count?: number
}

type TMyStatusListFilter = {
	statusList: TItem[]
	onSubmit: Function
	initVal?: any
	getActiveStatusColor?: Function
	getStatusColor?: Function
}

const MyStatusListFilter: React.FC<TMyStatusListFilter> = (props) => {
	const { statusList, onSubmit, initVal, getActiveStatusColor, getStatusColor } = (props = props)
	const [active, setActive] = useState(initVal)

	useEffect(() => {
		if (!!initVal) {
			setActive(initVal)
		} else {
			setActive(null)
		}
	}, [initVal])

	const onClickTab = (item: TItem) => {
		setActive(item.id)
		onSubmit(item.id)
	}

	return (
		<div className="flex gap-2 tablet:max-w-[40vw] max-w-[70vw] scrollable-horizal none-scrollbar">
			{statusList?.map((item) => (
				<button
					key={item.id}
					onClick={() => onClickTab(item)}
					className={`${
						active == item.id ? 'bg-tw-disable' : 'bg-tw-gray'
					} transition rounded-[6px] px-2 h-[36px] py-1 text-[14px] font-medium`}
				>
					{item.name} {item?.count ? `(${item?.count || 0})` : <></>}
				</button>
			))}
		</div>
	)
}

export default MyStatusListFilter
