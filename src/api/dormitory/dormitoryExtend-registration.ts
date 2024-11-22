import { instance } from '../instance'

const url = '/api/DormitoryExtendRegistration'

const dormitoryExtendRegistrationApi = {
	addDormitoryExtendRegistration: (body: IAddDormitoryExtendRegistrationBody) =>
		instance.post<IApiResultCreate<IAddDormitoryExtendRegistrationRes>>(url, body)
}
export default dormitoryExtendRegistrationApi
