import { instance } from '../instance'

const url = '/api/UserInformation'

export const userInformationApi = {
	getAllRole(role) {
		return instance.get<IApiResultData<IUserInformation[]>>('/api/UserInformation', {
			params: {
				RoleID: role
			}
		})
	},
	deleteMultipleUser(userIds: string) {
		return instance.delete(url, {
			params: {
				userIds
			}
		})
	},

	exportStudents: (params) => {
		return instance.get(url + '/export-student', {
			params: params
		})
	},
	// GET /api/UserInformation/export-student
	getAllUserByRole(role) {
		return instance.get<IApiResultData<IUserInformation[]>>(`${url}/user-available/${role}`)
	},

	keyGetAllUserAvailable: 'GET /api/UserInformation/user-available',
	getAllUserAvailable(params: { roleId: string; branchId: string }) {
		return instance.get<IApiResultData<IUserInformation[]>>(`${url}/user-available/`, { params: params })
	},

	getName(params) {
		return instance.get<IApiResultData<IUserInformation[]>>('/api/Staff', { params: params })
	},

	keyGetAll: 'GET /api/UserInformation',
	getAll(params: IUserInputGetall) {
		return instance.get<IApiResultData<IUserResponse[]>>(url, {
			params
		})
	},

	keyById: 'GET /api/UserInformation/id',
	getByID(ID) {
		return instance.get<IApiResultData<IUserResponse>>(`${url}/${ID}`)
	},

	add(data) {
		return instance.post(url, data)
	},
	update(data: { Enable?: boolean } & any) {
		return instance.put(url, data)
	},
	addStudent(data) {
		return instance.post(`${url}/student`, data)
	},
	updateStudent(data: { Enable?: boolean } & any) {
		return instance.put(`${url}/student`, data)
	},
	delete(data) {
		return instance.delete(`${url}/${data}`)
	},
	reverse(studentId) {
		return instance.put(`${url}/reserve/${studentId}`)
	},
	importUser(data) {
		let fData = new FormData()
		fData.append('File', data)
		return instance.post(`${url}/ImportStudent`, fData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	},

	getTemplate() {
		return instance.get(`${url}/student-template`)
	},

	// profile template
	getAllProfileTemplate(Id: string | number) {
		return instance.get<IApiResultData<IUserProfileTemplateItem[]>>(url + '/profile/' + Id)
	},

	updateProfileTemplateItem(params: IUpdateUserProfileTemplate) {
		return instance.put<IApiResultData<IUserProfileTemplateItem>>(url + '/profile/', params)
	},
	checkExistUserName(data: any) {
		return instance.post('/api/check-exist-username', data)
	},

	getOverviewStatus() {
		return instance.get<IApiResultData<IStatisticOverviewStudent[]>>(url + '/overview-status')
	},

	keyGetStudentInClass: 'GET /api/UserInformation/student-in-class',
	getStudentInClass(classes: string) {
		return instance.get<IApiResultData<IUserInformation[]>>(`${url}/student-in-class/${classes}`, {})
	},

	keyGetStaffAvailable: 'GET /api/UserInformation/staff-available',
	getStaffAvailable() {
		return instance.get<IApiResultData<IUserInformation[]>>(`${url}/staff-available`, {})
	},
	

	keyGetUserDormitory: 'dormitory-information',
	getDormitory(userId: number) {
		return instance.get<IApiResultData<TDormitoryItem[]>>(`${url}/dormitory-information/${userId}`, {})
	}
}

export const uploadImageApi = {
	upload(file) {
		let dataFile = new FormData()
		dataFile.append('File', file)
		return instance.post<IApiResultData<any>>('/api/Base/Upload', dataFile, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const registerApi = {
	changeRegister(params: 'Allow' | 'UnAllow') {
		return instance.post<IApiResultData<any>>('/api/ChangeRegister/' + params, {})
	},
	getAllowRegister() {
		return instance.get<IApiResultData<any>>('/api/AllowRegister', {})
	},
	register(params) {
		return instance.post<IApiResultData<any>>('/api/Register/', params, {})
	}
}

export const accountApi = {
	changePassword(params) {
		return instance.post<IApiResultData<any>>('/api/ChangePassword', params, {})
	},
	forgotPassword(params) {
		return instance.post<IApiResultData<any>>('/api/KeyForgotPassword', params, {})
	},
	resetPassword(params) {
		return instance.post<IApiResultData<any>>('/api/ResetPassword', params, {})
	}
}

export const roleApi = {
	getRole(roleType) {
		return instance.get<IApiResultData<IRole[]>>('/api/GetRole', {
			params: {
				style: roleType // 0 lấy tất cả, 1 lấy nhân viên
			}
		})
	}
}
