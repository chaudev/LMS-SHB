import { instance } from '../instance'

import { toQueryString } from '~/common/utils/common'

const prefix = '/api/DormitoryWarning'

const dormitoryWarningApi = {
	dormitoryWarningList: (queryString: TQueryDormitoryWarning) =>
		instance.get<TResultDormitoryWarning<TDormitoryWarningRules[]>>(`${prefix}?${queryString ? toQueryString(queryString) : ''}`),
	createDormitoryWarning: (body: TCreacteDormitoryWarningBody) =>
		instance.post<IApiResultCertificate<TCreacteDormitoryWarning>>(`${prefix}`, body),
	deleteDormitoryWarning: (id: number) => instance.delete<{ message: string }>(`${prefix}/${id}`),
	updateDormitoryWarning: (body: TUpdateDormitoryWarning) =>
		instance.put<IApiResultCertificate<TUpdateDormitoryWarningBody>>(`${prefix}`, body)
}
export default dormitoryWarningApi
