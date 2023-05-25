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

	getAllUserByRole(role) {
		return instance.get<IApiResultData<IUserInformation[]>>(`${url}/user-available/${role}`)
	},

	getName(params) {
		return instance.get<IApiResultData<IUserInformation[]>>('/api/Staff', { params: params })
	},

	getAll(params: IUserInputGetall) {
		return instance.get<IApiResultData<IUserResponse[]>>(url, {
			params
		})
	},
	getByID(ID) {
		return instance.get<IApiResultData<IUserResponse>>(`${url}/${ID}`)
	},

	add(data) {
		return instance.post(url, data)
	},
	update(data: { Enable?: boolean } & any) {
		return instance.put(url, data)
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

	// profile template
	getAllProfileTemplate(Id: string | number) {
		return instance.get<IApiResultData<IUserProfileTemplateItem[]>>(url + '/profile/' + Id)
	},

	updateProfileTemplateItem(params: IUpdateUserProfileTemplate) {
		return instance.put<IApiResultData<IUserProfileTemplateItem>>(url + '/profile/', params)
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
