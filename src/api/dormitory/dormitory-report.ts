import { instance } from '../instance'
import { toQueryString } from '~/common/utils/common'

const prefix = '/api/Dormitory'

const dormitoryReportApi = {
	dormitoryReportList: () => instance.get<IApiResultCertificate<TDormitoryReportItem[]>>(`${prefix}/statistic`),
	studentInOutDormitory: (queryString: TQueryStudentInOutDormitory) =>
		instance.get<IApiResultCertificate<TStudentInOutDormitory[]>>(
			`${prefix}/statistic-student-in-out-dormitory?${queryString ? toQueryString(queryString) : ''}`
		),
	dormitoryWarning: (queryString: TQueryDormitoryWarning) =>
		instance.get<IApiResultCertificate<TDormitoryWarning>>(`${prefix}Warning/statistic?${queryString ? toQueryString(queryString) : ''}`)
}

export default dormitoryReportApi
