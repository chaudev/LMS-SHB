import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { feedbackApi } from '~/api/feedback-list'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import { is } from '~/common/utils/common'
import { RootState } from '~/store'
import FeedbackTable from './components/FeedbackTable'
import FeedbackModal from './components/FeedbackModal'
import { ShowErrorToast } from '~/common/utils/main-function'
import useQueryGetByRole from '~/common/hooks/useQueryGetByRole'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import useQueryFeedbackGroup from '~/common/hooks/useQueryFeedbackGroup'
import MyStatusListFilter from '~/atomic/atoms/MyStatusListFilter'
import { FEEDBACK_STATUS } from '~/common/utils/constants'

const FeedbackList = () => {
	const router = useRouter()
	const { push, query } = router
	const userInfo = useSelector((state: RootState) => state.user.information)
	const { data: feedbackGroups, isLoading: isLoadingFeedbackGroups } = useQueryFeedbackGroup()
	const [feedbackStatus, setFeedbackStatus] = useState([
		{ id: null, name: 'Tất cả', count: 0 },
		{ id: FEEDBACK_STATUS.sent, name: 'Mới gửi', count: 0 },
		{ id: FEEDBACK_STATUS.processing, name: 'Đang xử lý', count: 0 },
		{ id: FEEDBACK_STATUS.done, name: 'Đã xong', count: 0 }
	])

	const isAllow = () => {
		if (is(userInfo).admin || is(userInfo).manager || is(userInfo).student || is(userInfo).parent || is(userInfo).teacher) {
			return true
		}
		return false
	}

	useEffect(() => {
		if (!isAllow()) {
			router.push('/')
		}
	}, [])

	const { data, isLoading, refetch } = useQueryGetByRole({
		enabled: router?.isReady && isAllow(),
		query: query,
		queryKey: ['Get/feedback', query],
		adminApi: feedbackApi.getAll,
		othersApi: feedbackApi.getAllMine
	})

	useEffect(() => {
		if (data) {
			setFeedbackStatus([
				{ id: null, name: 'Tất cả', count: data?.totalRow },
				{ id: FEEDBACK_STATUS.sent, name: 'Mới gửi', count: data?.sent },
				{ id: FEEDBACK_STATUS.processing, name: 'Đang xử lý', count: data?.processing },
				{ id: FEEDBACK_STATUS.done, name: 'Đã xong', count: data?.done }
			])
		}
	}, [data])

	return (
		<div>
			{isAllow() && (
				<FeedbackTable
					total={data?.totalRow || 0}
					loading={isLoading}
					onChangePage={(pageIndex) => router.push({ query: { ...query, pageIndex: pageIndex } })}
					TitleCard={
						<div className="flex items-center">
							<FilterBaseVer2
								dataFilter={[
									{
										name: 'feedbackGroupId',
										title: 'Nhóm phản hồi',
										type: 'select',
										col: 'col-span-2',
										optionList: feedbackGroups?.data?.map((item) => ({
											title: item.Name,
											value: item?.Id
										}))
									}
								]}
								handleFilter={(values) => {
									router.push({ query: { ...query, ...values, pageIndex: 1 } })
								}}
								handleReset={(value) => {
									router.push({ query: { ...query, status: null, feedbackGroupId: null } })
								}}
							/>
							<MyStatusListFilter
								statusList={feedbackStatus}
								initVal={query.status ? query.status : undefined}
								onSubmit={(event) => {
									console.log(event)
									router.push({
										query: {
											...query,
											status: event
										}
									})
								}}
							/>
						</div>
					}
					Extra={<FeedbackModal refreshData={refetch} />}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default FeedbackList
