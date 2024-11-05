import { useQuery } from '@tanstack/react-query'
import dormitoryReportApi from '~/api/dormitory/dormitory-report'

const useStudentInOutDormitoryQuery = (queryString?: TQueryStudentInOutDormitory) => {
	return useQuery({
		queryKey: ['student-in-out-dormitory', queryString],
		queryFn: () => dormitoryReportApi.studentInOutDormitory(queryString)
	})
}
export default useStudentInOutDormitoryQuery
