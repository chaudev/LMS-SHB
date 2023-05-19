import { instance } from '~/api/instance'

const URl = 'api/MajorsRegistration'

export const majorsRegistrationApi = {
	getAllMajorsRegistration(params) {
		return instance.get<IApiResultData<IMajorsRegistrationAvailble[]>>(URl, { params })
	},

	majorsRegistration(params) {
		return instance.post<IApiResultCreate<IMajorsRegistrationAvailble>>(URl, params)
	},

	getAllMajorsRegistrationAvailble() {
		return instance.get<IApiResultData<IMajorsRegistrationAvailble[]>>(URl + '/student-available')
	}
}
