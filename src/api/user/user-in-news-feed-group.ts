import { instance } from "../instance"

export const userInNewsFeedGroup = {
	getAllUserInRoom(params: { newsFeedGroupId: number }) {
		return instance.get<IApiResultData<any>>('/api/UserInNewsFeedGroup', {
			params
		})
	},
	addMember(params) {
		return instance.post('/api/UserInNewsFeedGroup', params)
	},
	getUserNotIn(groupId) {
		return instance.get(`/api/UserInNewsFeedGroup/user-not-in-group/${groupId}`, {})
	},

	deleteMember(memberId) {
		return instance.delete(`/api/UserInNewsFeedGroup/${memberId}`, {})
	}
}
