import { useQuery } from '@tanstack/react-query'
import { staticsticalApi } from '~/api/statistic'

const useQueryStatisticUser12Months = (
	type: 'ForeignLanguage' | 'VisaStatus' | 'Process' | 'ProfileStatus',
	branchId,
	year,
	isTest?: boolean
) => {
	const data = useQuery({
		queryKey: ['get-user-status-12-month', type, branchId, year],
		queryFn: () => staticsticalApi.getUserStatus12Months({ branchId, type, year, isTest }).then((data) => data.data),
		enabled: !!year && !!type && !!branchId
	})

	return { ...data }
}

export default useQueryStatisticUser12Months
