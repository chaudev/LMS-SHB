import DocViewer, { DocViewerRenderers, PDFRenderer } from 'react-doc-viewer'
import React, { useState } from 'react'
import MyModal from '~/atomic/atoms/MyModal'

interface IModalViewFile {
	file: any
}

const ModalViewFile: React.FC<IModalViewFile> = (props) => {
	const { file } = props
	const [visible, setVisible] = useState(false)

	const handleCancel = () => {
		setVisible(false)
	}

	return (
		<>
			<p className="font-medium !text-primary hover:underline cursor-pointer" onClick={() => setVisible(true)}>
				{file.alt}
			</p>
			<MyModal width={'full'} open={visible} destroyOnClose onCancel={handleCancel} footer={false}>
				<div>
					{file.fileType == 'pdf' || file.fileType == 'mp3' ? (
						<div className="h-[80vh] mt-2">
							<p className="font-semibold bg-white text-[16px]">{file.FileName}</p>
							<iframe
								src={file.src}
								frameBorder={0}
								width="100%"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								height="100%"
								allowFullScreen
							></iframe>
						</div>
					) : (
						<DocViewer
							documents={[
								{
									uri: file.src,
									fileType: file.fileType
								}
							]}
							config={{
								header: {
									disableHeader: false,
									disableFileName: false,
									retainURLParams: false,
									overrideComponent: () => {
										return <p className="font-semibold bg-white text-[16px]">{file.alt}</p>
									}
								}
							}}
							className="w-full h-[80vh]"
							pluginRenderers={[PDFRenderer, ...DocViewerRenderers]}
						/>
					)}
				</div>
			</MyModal>
		</>
	)
}

export default ModalViewFile
