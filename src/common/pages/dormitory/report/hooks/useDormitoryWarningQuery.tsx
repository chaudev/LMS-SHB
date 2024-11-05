import { useQuery } from '@tanstack/react-query'
import dormitoryReportApi from '~/api/dormitory/dormitory-report'

export const useDormitoryWarningQuery = (queryString?: TQueryDormitoryWarning) => {
	return useQuery({
		queryKey: ['dormitory-warning', queryString],
		queryFn: () => dormitoryReportApi.dormitoryWarning(queryString)
	})
}
export default useDormitoryWarningQuery
