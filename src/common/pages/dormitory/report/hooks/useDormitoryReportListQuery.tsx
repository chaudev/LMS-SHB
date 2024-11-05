import { useQuery } from '@tanstack/react-query'
import dormitoryReportApi from '~/api/dormitory/dormitory-report'

const useDormitoryReportListQuery = () => {
	return useQuery({
		queryKey: ['dormitory-report-list'],
		queryFn: dormitoryReportApi.dormitoryReportList
	})
}
export default useDormitoryReportListQuery
