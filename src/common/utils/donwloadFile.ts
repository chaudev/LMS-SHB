import { saveAs } from 'file-saver'
import ShowNoti from './ShowNoti'

type TFileDownloadByFileSaver = {
	FileUrl: string
	FileName: string
}

export const downloadByFileSaver = async (file: TFileDownloadByFileSaver) => {
	try {
		const response = await fetch(file.FileUrl)
		const blob = await response.blob()
		saveAs(blob, file.FileName)
	} catch (error) {
		ShowNoti('error', 'Tải file thất bại!')
	}
}