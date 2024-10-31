import { Button, Upload, UploadFile, UploadProps } from 'antd'
import React, { FC, useState } from 'react'
import styles from './styles.module.scss'
import { contractApi } from '~/api/contract'
import { ShowNoti } from '~/common/utils'
import { AxiosResponse } from 'axios'
import { UploadChangeParam } from 'antd/lib/upload'

type TMyUploadMutil = {
    uploadApi: (data: any) => Promise<IApiResultData<any[]>>
} & UploadProps

export const MyUploadMultiV2: FC<TMyUploadMutil> = (props) => {

    const { uploadApi, ...restProps } = props

	const [fileList, setFileList] = useState([])

    const handleUpdoadFiles = async (files) => {
		try {
			const uploadfiles = files.map((file) => file.originFileObj)
			const res = await uploadApi(uploadfiles)
			return res.data.map((item) => item.data.data)
		} catch (error) {
			ShowNoti('error', error?.message || 'Error upload files')
            return []
		}
	}

	const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {

        console.log(info.fileList)

		let newFileList = [...info.fileList]
		newFileList = newFileList.map((file) => {
			if (file.response) {
				file.url = file.response.url
			}
			return file
		})

        const uploadFiles = await handleUpdoadFiles(newFileList)
        console.log("uploadFiles", uploadFiles)

		setFileList([...uploadFiles.map(file => ({
            uid: "-1",
            url: file,
            name: file,
            status: "done",
        })), ...fileList])
	}

    console.log(fileList)

	const uploadProps: UploadProps = {
		onChange: handleChange,
		multiple: true,
		fileList: fileList,
		listType: 'picture',
		...restProps
	}

	return (
		<Upload {...uploadProps} className={styles['upload-multi']} customRequest={({ onSuccess }) => onSuccess('ok', null)}>
			<Button>Tải files lên</Button>
		</Upload>
	)
}