import { Button, Upload, UploadProps } from 'antd'
import React, { FC, useState } from 'react'
import styles from './styles.module.scss'

type TMyUploadMutil = {} & UploadProps

const MyUploadMutil: FC<TMyUploadMutil> = (props) => {
	const [fileList, setFileList] = useState([])

	const handleChange = (info) => {
		let newFileList = [...info.fileList]

		newFileList = newFileList.map((file) => {
			if (file.response) {
				file.url = file.response.url
			}
			return file
		})

		setFileList(newFileList)
	}

	const uploadProps: UploadProps = {
		onChange: handleChange,
		multiple: true,
		// beforeUpload: beforeUpload,
		fileList: fileList,
		listType: 'picture',
		...props
	}

	return (
		<Upload {...uploadProps} className={styles['upload-multi']} customRequest={({ onSuccess }) => onSuccess('ok', null)}>
			<Button>Tải files lên</Button>
		</Upload>
	)
}

export default MyUploadMutil
