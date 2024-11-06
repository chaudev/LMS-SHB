import { Input } from 'antd'
import { SearchProps } from 'antd/lib/input'
import React from 'react'

type TMyInputSearch = { className?: string } & SearchProps

const MyInputSearch: React.FC<TMyInputSearch> = (props, className) => {
	return (
		<div className={`${className} primary-search flex flex-1 w-full gap-2`}>
			<Input.Search
				// onSearch={(search) => {
				// 	router.push({
				// 		query: {
				// 			...router?.query,
				// 			pageIndex: 1,
				// 			searchContent: search
				// 		}
				// 	})
				// }}
				placeholder={props.placeholder || 'Tìm kiếm'}
				{...props}
			/>
		</div>
	)
}

export default MyInputSearch
