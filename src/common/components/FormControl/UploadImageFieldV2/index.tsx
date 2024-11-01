import { Form, Modal, Spin, Upload, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import { UploadFileApi } from '~/api/common/upload-image';
import { ShowNoti } from '~/common/utils';
import { PlusOutlined } from '@ant-design/icons';
import { IUploadImageField } from '../form-control';
import { feedbackApi } from '~/api/feedback-list';
import { UploadChangeParam } from 'antd/lib/upload';
import { UploadRequestOption } from 'rc-upload/lib/interface';

const UploadImageFieldV2 = (props: IUploadImageField) => {
    const { style, label, name, isRequired, className, disabled, multiple, form, max = 1 } = props;
    const [loading, setLoading] = useState(false)
    const [fileList, setFileList] = useState<any[]>([])
    const [firstRender, setFirstRender] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')

    const getBase64 = (file): Promise<string> =>
		new Promise((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as string)
			reader.onerror = (error) => reject(error)
		})

    const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}

		setPreviewImage(file.url || (file.preview as string))
		setPreviewOpen(true)
	}

    const handleCancel = () => setPreviewOpen(false)


    const value = Form.useWatch(name, form)

    useEffect(() => {
        if (!firstRender) {
            if (!!value && typeof value === 'string') {
                if (multiple) {
                    const imageArray = value
                    const formatImageArray = Array.isArray(imageArray)
                        ? imageArray.map(
                            (url: string): UploadFile<any> => ({
                                uid: new Date().getTime().toString() + url,
                                name: url,
                                status: 'done',
                                url
                            })
                        )
                        : []

                    setFileList(formatImageArray)
                } else {
                    setFileList([
                        {
                            uid: '-1',
                            url: value,
                            name: value,
                            status: 'done'
                        }
                    ])
                }
                setFirstRender(true)
            }
        }
    }, [value])

    const handleChange = async (info: UploadChangeParam<UploadFile<any>>) => {

        console.log(info.fileList)
        setFileList(info.fileList)


    }

    const customUpload = async (info: UploadRequestOption) => {
        const { onSuccess, onError, file, onProgress } = info;
        try {
          let res = await UploadFileApi.uploadImage(file, onProgress as any)
		  if (res.status == 200) {
              const currentFileUrls = form.getFieldValue(name) || []
              const updateUrls = multiple ? [...currentFileUrls, res.data.data] : res.data.data
              console.log(updateUrls)
              form.setFieldValue(name, updateUrls)
		  }
          onSuccess(file);
        } catch (error) {
          // Handle errors
          onError(error);
          ShowNoti('error', error)
        }
    };

    const onRemove = (removeFile: UploadFile) => {
        const newList = fileList.filter((file) => file.uid !== removeFile.uid)
        const fileUrls = newList.map((file) => file.url)
        setFileList(newList)

        const updateUrls = multiple ? fileUrls : fileUrls[0]
        form.setFieldValue(name, updateUrls)
    }

    return (
        <div className="flex" style={style}>
            {label && (
                <label className={`upload-label ${isRequired ? 'required' : ''}`}>
                    {label}
                </label>
            )}
            <Upload
                className={`avatar-uploader ${className}`}
                listType="picture-card"
                multiple={multiple}
                disabled={disabled}
                onPreview={handlePreview}
                onRemove={onRemove}
                customRequest={customUpload}
                fileList={fileList}
                onChange={handleChange}
            >
                {fileList.length < max && (
                    <div>
                        <PlusOutlined />
                        <div>Upload</div>
                    </div>
                )}
                {loading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
                        <Spin />
                    </div>
                )}
            </Upload>

            <Modal visible={previewOpen} title={""} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default UploadImageFieldV2;

