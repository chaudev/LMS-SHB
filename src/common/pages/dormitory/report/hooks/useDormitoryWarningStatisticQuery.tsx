import { useQuery } from '@tanstack/react-query'
import dormitoryReportApi from '~/api/dormitory/dormitory-report'

export const useDormitoryWarningStatisticQuery = (queryString?: TQueryDormitoryWarning) => {
	return useQuery({
		queryKey: ['dormitory-warning', queryString],
		queryFn: () => dormitoryReportApi.dormitoryWarningStatistic(queryString)
	})
}
export default useDormitoryWarningStatisticQuery
