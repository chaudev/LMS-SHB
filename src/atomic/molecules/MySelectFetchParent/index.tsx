import { userInformationApi } from '~/api/user/user'
import { PAGE_SIZE } from '~/common/libs/others/constant-constructer'
import MySelectFetch, { TMySelectFetchFetchResponse, TMySelectFetchProps } from '~/atomic/atoms/MySelectFetch'
import { USER_ROLES } from '~/common/utils/constants'

export const CREATE_NEW_PARENT_ID = -1

type TMySelectFetchParentProps = {
	branchId?: number | 'all'
	isHaveCreateNewOption?: boolean
} & Omit<TMySelectFetchProps, 'fetchFn' | 'queryKey' | 'fetchActivelyFn'>

const MySelectFetchParent: React.FC<TMySelectFetchParentProps> = (props) => {
	const { branchId, isHaveCreateNewOption, ...rest } = props

	const fetchUser = async ({ pageParam, textSearchDebounced }): Promise<TMySelectFetchFetchResponse> => {
		const res = await userInformationApi.getAll({
			pageSize: PAGE_SIZE,
			pageIndex: pageParam,
			roleIds: USER_ROLES.parent,
			search: textSearchDebounced
		})
		let data =
			res?.data?.data?.map((item) => {
				return {
					label: `[${item?.UserCode}] ${item?.FullName}`,
					value: Number(item?.UserInformationId)
				}
			}) || []

		if (isHaveCreateNewOption && pageParam === 1) {
			data = [
				{
					label: `Tạo mới`,
					value: CREATE_NEW_PARENT_ID
				},
				...data
			]
		}

		return {
			data,
			totalRow: res.data.totalRow
		}
	}
	const fetchActivelyFn = async (currentValue) => {
		const res = await userInformationApi.getAll({
			roleIds: USER_ROLES.parent,
			userIds: currentValue ? currentValue?.toString() : undefined
		})
		return (
			res?.data?.data?.map((item) => {
				return {
					label: `[${item?.UserCode}] ${item?.FullName}`,
					value: Number(item?.UserInformationId)
				}
			}) || []
		)
	}

	return (
		<MySelectFetch
			fetchFn={fetchUser}
			fetchActivelyFn={fetchActivelyFn}
			queryKey={[`${userInformationApi.keyGetAll}-Fetch-Parents`]}
			className="h-[36px] w-full"
			{...rest}
		/>
	)
}

export default MySelectFetchParent
