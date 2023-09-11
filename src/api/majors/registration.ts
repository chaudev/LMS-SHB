import { instance } from '~/api/instance'

const URl = 'api/MajorsRegistration'

export const majorsRegistrationApi = {
	getAllMajorsRegistration(params: object) {
		return instance.get<IApiResultData<IMajorsRegistration[]>>(URl, { params: params })
	},

	majorsRegistration(params) {
		return instance.post<IApiResultCreate<IMajorsRegistrationAvailble>>(URl, params)
	},
	updatemajorsRegistration(params) {
		return instance.put<IApiResultCreate<any>>(URl, params)
	},

	getAllMajorsRegistrationAvailble() {
		return instance.get<IApiResultData<IMajorsRegistrationAvailble[]>>(URl + '/student-available')
	},
	getTuitionInOldMajors(id) {
		return instance.get<IApiResultData<string>>(URl + '/tuition-in-old-majors/' + id)
	},
	changeMajors(params) {
		return instance.post<IApiResultCreate<IMajorsRegistrationAvailble>>(URl + '/change-majors', params)
	}
}
