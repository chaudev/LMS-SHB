import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { feedbackApi } from '~/api/feedback-list'
import MyStatusListFilter from '~/atomic/atoms/MyStatusListFilter'
import FilterBaseVer2 from '~/common/components/Elements/FilterBaseVer2'
import useQueryFeedbackGroup from '~/common/hooks/useQueryFeedbackGroup'
import useQueryGetByRole from '~/common/hooks/useQueryGetByRole'
import { checkIncludesRole } from '~/common/utils/common'
import { FEEDBACK_STATUS } from '~/common/utils/constants'
import { listPermissionsByRoles } from '~/common/utils/list-permissions-by-roles'
import { RootState } from '~/store'
import FeedbackModal from './components/FeedbackModal'
import FeedbackTable from './components/FeedbackTable'

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
		if (checkIncludesRole(listPermissionsByRoles.feedback.viewList, Number(userInfo?.RoleId))) {
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
					Extra={
						checkIncludesRole(listPermissionsByRoles.feedback.create, Number(userInfo?.RoleId)) ? (
							<FeedbackModal refreshData={refetch} />
						) : undefined
					}
					data={data?.data || []}
					refreshData={refetch}
				/>
			)}
		</div>
	)
}

export default FeedbackList
