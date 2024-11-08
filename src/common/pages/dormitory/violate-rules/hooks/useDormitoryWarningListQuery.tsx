import { useQuery } from '@tanstack/react-query'
import dormitoryWarningApi from '~/api/dormitory/dormitory-warning'

const useDormitoryWarningListQuery = (queryString?: TQueryDormitoryWarning) => {
	return useQuery({
		queryKey: ['dormitory-warning-list', queryString],
		queryFn: () => dormitoryWarningApi.dormitoryWarningList(queryString)
	})
}

export default useDormitoryWarningListQuery
