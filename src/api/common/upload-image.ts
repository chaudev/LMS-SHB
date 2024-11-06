import { instance } from '../instance'

const url = '/api/Base'
export const UploadFileApi = {
	uploadImage(data, onProgress?: (progress: number) => void) {
        let fData = new FormData
        fData.append("file", data )
		return instance.post(`${url}/Upload`, fData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			onUploadProgress: (event) => {
				// Calculate the progress percentage and call `onProgress`
				onProgress?.((event.loaded / event.total) * 100);
			},
	})},
}
