import { Loading3QuartersOutlined } from '@ant-design/icons'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Spin } from 'antd'
import { useMemo, useState } from 'react'
import { debounceV2 } from '~/common/utils/common'
import MySelect, { TMySelectProps } from '../MySelect'

const DEFAULT_PAGE_INDEX = 1

export type TMySelectFetchFetchResponse = {
	data: {
		label: string
		value: number
		[key: string]: any
	}[]
	totalRow: number
}

const getValueMissingOptions = (options, values = []): number[] => {
	const setValues = new Set([...values])
	for (const option of options) {
		if (setValues.has(option.value)) {
			setValues.delete(option.value)
		}
	}
	return Array.from(setValues)
}

export type TMySelectFetchProps = {
	// paginated fetch
	fetchFn: ({ pageParam, textSearchDebounced }: { pageParam: number; textSearchDebounced: string }) => Promise<TMySelectFetchFetchResponse>
	queryKey: any[]
	// fetch actively when value doesn't exist in options - usually occurs when update
	fetchActivelyFn?: (currentValue: number[]) => Promise<
		{
			label: string
			value: number
			[key: string]: any
		}[]
	>
} & TMySelectProps

const MySelectFetch: React.FC<TMySelectFetchProps> = (props) => {
	const { fetchFn, queryKey, fetchActivelyFn, value, ...rest } = props
	const [textSearch, setTextSearch] = useState<string>('')
	const [textSearchDebounced, setTextSearchDebounce] = useState<string>('')
	const debounced = useMemo(() => debounceV2(500), [])

	const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isFetchingNextPage } = useInfiniteQuery({
		queryKey: [...queryKey, textSearchDebounced],
		queryFn: ({ pageParam }: { pageParam: number }) => fetchFn({ pageParam, textSearchDebounced }),
		initialPageParam: DEFAULT_PAGE_INDEX,
		getNextPageParam: (_, pages, lastPageParam: number) => {
			const total = pages?.[0]?.totalRow
			const users = pages.flatMap((page) => page?.data || [])
			if (users.length >= total) {
				// there're nothing to get anymore
				return undefined
			}
			return lastPageParam + 1
		}
	})

	const options = useMemo(() => {
		return data?.pages?.flatMap((page) => page?.data || []) || []
	}, [data, data?.pages?.length])

	const missingOptionValues = useMemo(() => getValueMissingOptions(options, Array.isArray(value) ? value : [value]), [options, value])

	// handle when value doesn't exist in current options => fetch it
	const { data: dataDonHave, isLoading: isLoadingDonHave } = useQuery({
		queryKey: [...queryKey, 'detail', missingOptionValues],
		queryFn: () => fetchActivelyFn(missingOptionValues),
		enabled: Boolean(missingOptionValues.length > 0 && fetchActivelyFn && value)
	})

	const onScroll = async (event) => {
		const target = event.target
		const scrollReachedBottom = target.scrollTop + target.offsetHeight === target.scrollHeight
		if (!(isFetching || isFetchingNextPage || isLoading) && scrollReachedBottom && hasNextPage) {
			fetchNextPage()
		}
	}
	const currentOptions = missingOptionValues.length === 0 ? options : [...options, ...(dataDonHave || [])]
	return (
		<MySelect
			showSearch
			filterOption={false}
			value={value}
			searchValue={textSearch}
			onSearch={(value) => {
				setTextSearch(value)
				debounced(() => {
					setTextSearchDebounce(value)
				})
			}}
			onPopupScroll={onScroll}
			notFoundContent={
				isLoading ? (
					<div className="flex justify-center items-center">
						<Spin />
					</div>
				) : undefined
			}
			loading={isLoading || isLoadingDonHave}
			options={currentOptions}
			dropdownRender={(menu) => (
				<>
					{menu}
					{isFetchingNextPage && (
						<div className="flex justify-center items-center gap-2">
							<Spin indicator={<Loading3QuartersOutlined style={{ color: 'black', fontSize: '12px' }} spin />} />
							<span className="font-medium">Đang tải...</span>
						</div>
					)}
				</>
			)}
			optionFilterProp="label"
			{...rest}
		/>
	)
}

export default MySelectFetch
