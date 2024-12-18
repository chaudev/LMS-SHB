import { Editor } from '@tinymce/tinymce-react'
import { useEffect, useRef } from 'react'
import { UploadFileApi } from '~/api/common/upload-image'
import { ShowNoti } from '~/common/utils'

const quickMenu = 'undo redo customInsertButton | link image  | fontfamily fontSize blocks | bold italic underline strikethrough | alignleft aligncenter ' +
    'alignright alignjustforecolorify | bullist numlist outdent indent | ltr rtl ' +
    'removeformat | help | code'
	// 'undo redo | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | fontfamily fontsize blocks | forecolor backcolor | customInsertButton | code | link image'
const editorPlugins =
	'preview importcss searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons image code'

const EditorBase = (props) => {
	const { initialValue, value, placeholder, handleChangeDataEditor, customFieldProps, disableButton, height, disabled, allowPasteImage = false} = props
	const editorRef = useRef(null)

	const checkHandleChangeDataEditor = (content) => {
		if (!handleChangeDataEditor) return
		handleChangeDataEditor(content)
	}

	// integration in a Bootstrap dialog
	useEffect(() => {
		const handler = (e) => {
			if (e.target.closest('.tox-tinymce-aux, .moxman-window, .tam-assetmanager-root') !== null) {
				e.stopImmediatePropagation()
			}
		}
		document.addEventListener('focusin', handler)
		return () => document.removeEventListener('focusin', handler)
	}, [])

	return (
		<div className="w-full h-fit">
			<Editor
				id={!!props?.id ? props?.id : 'editor'}
				onInit={(evt, editor) => (editorRef.current = editor)}
				initialValue={initialValue}
				onChange={(event: any) => {
					// setTimeStamp(getTimeStamp())
				}}
				disabled={disabled}
				value={value}
				onEditorChange={(value) => {
					checkHandleChangeDataEditor(value)
				}}
				init={{
					// paste_data_images: false, // cái này để chặn không cho paste hình mà thấy k work
					// nên chơi kiểu remove cái tag img khi paste vô
					paste_preprocess: function (pl, o) {
						if (!allowPasteImage) {
							if (o.content.indexOf('<img ') > -1) {
								o.content = o.content.replace(/<img[^>\"']*(((\"[^\"]*\")|('[^']*'))[^\"'>]*)*>/g, '')
							}
						}
					},
					images_file_types: 'jpeg,jpg,jpe,jfi,jif,jfif,png,gif,bmp,webp',
					inline: false, // Remove iframe tag
					plugins: editorPlugins,
					placeholder: placeholder,
					toolbar: quickMenu,
					height: height || 600,
					content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					menubar: false,
					toolbar_mode: 'sliding',
					toolbar_location: 'top',
					toolbar_sticky: true,
					font_family_formats:
						'Arial=arial,helvetica,sans-serif;Comic Sans MS=comic sans ms,sans-serif; Georgia=georgia,palatino; Helvetica=helvetica;Tahoma=tahoma,arial,helvetica,sans-serif; Verdana=verdana,geneva;',

					image_title: true,
					file_picker_types: 'image',
					images_upload_handler: async function (blobInfo: any) {
						let imageFile = new FormData()
						imageFile.append('files[]', blobInfo.blob())
						!!disableButton && disableButton(true)
						try {
							let res = await UploadFileApi.uploadImage(blobInfo.blob())
							if (res.status == 200) {
								return new Promise((resolve, reject) => {
									resolve(res.data.data)
								})
							}
						} catch (error) {
							ShowNoti('error', error.message)
							return
						} finally {
							!!disableButton && disableButton(false)
						}
					},
					/* and here's our custom image picker*/
					...customFieldProps,
					relative_urls: 0,
					remove_script_host: 0,
					convert_urls: false
				}}
			/>
		</div>
	)
}

export default EditorBase
