import { instance } from '~/api/instance'

const url = '/api/ProfileTemplate'
export const profileTemplateApi = {
	// Lấy tất cả data
	getAll() {
		return instance.get<IApiResultData<IProfileTemplate[]>>(url, {})
	},

	// // Thêm mới data
	// add(data: INewsFeedCommentReply) {
	// 	return instance.post(url, data)
	// },

	// // Update data
	// update(data: any) {
	// 	return instance.put(url, data)
	// }
}
