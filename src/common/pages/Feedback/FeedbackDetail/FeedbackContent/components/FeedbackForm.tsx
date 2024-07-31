import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { feedbackReplyApi } from '~/api/feedback-reply'
import MyFormItem from '~/atomic/atoms/MyFormItem'
import MyTextArea from '~/atomic/atoms/MyTextArea'
import Avatar from '~/common/components/Avatar'
import PrimaryButton from '~/common/components/Primary/Button'
import { RootState } from '~/store'

interface IForm {
	onRefresh?: Function
	defaultData?: TFeedbackReply
	onOpen?: Function
	setEditContent?: Function
	detailsData: TFeedbackDetail
}

const FeedbackForm: React.FC<IForm> = (props) => {
	const { onRefresh, defaultData, onOpen, setEditContent, detailsData } = props
	const router = useRouter()
	const { id } = router.query
	const { push, query } = router
	const [form] = Form.useForm()
	const queryClient = useQueryClient()
	const [visible, setVisible] = useState(false)
	const [commentValue, setCommentValue] = useState('')
	const user = useSelector((state: RootState) => state.user.information)

	// ** toggle
	function toggle() {
		setVisible(!visible)
	}
	function submitForm() {
		form.submit()
	}

	const mutationCreate = useMutation({
		mutationKey: ['REPLY-FB'],
		mutationFn: (data: any) => feedbackReplyApi.add(data),
		onSuccess(data, variables, context) {
			onRefresh()
			queryClient.refetchQueries({ queryKey: ['get-feedback-list', detailsData?.Id] })
			// ShowNoti.success(t(LANGUAGE_CONSTANT.success))
			// queryClient?.setQueryData(['FEEDBACK-DETAILS', query], (oldList: any) => {
			// 	return { ...oldList, replies: [...oldList?.replies, data.data.data] }
			// })
		},
		onSettled(data, error, variables, context) {
			form.resetFields()
			setCommentValue('')
		}
	})

	const mutationUpdate = useMutation({
		mutationKey: ['UPDATE-REPLY-FB'],
		mutationFn: (data: any) => feedbackReplyApi.update(data),
		onSuccess(data, variables, context) {
			// ShowNoti.success(t(LANGUAGE_CONSTANT.success))
			onRefresh()
			queryClient.refetchQueries({ queryKey: ['get-feedback-list', detailsData?.Id] })
			// queryClient?.setQueryData(['FEEDBACK-DETAILS', query], (oldList: any) => {
			// 	const updatedItems = oldList.replies.map((item) => (item.id === data.data.data.id ? data.data.data : item))
			// 	return { ...oldList, replies: updatedItems }
			// })
		},
		onSettled(data, error, variables, context) {
			form.resetFields()
			toggle()
			setEditContent(false)
		}
	})

	const handleSubmit = (data: any) => {
		console.log({
			...data
		})
		const DATA_SUBMIT = { ...data, feedbackId: id }

		if (defaultData) {
			mutationUpdate.mutate({
				...DATA_SUBMIT,
				Id: defaultData.Id
			})
		} else {
			mutationCreate.mutate(DATA_SUBMIT)
		}
	}

	const handleFinish = (data) => {
		handleSubmit({ ...data })
	}

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			if (!checkDisableSend()) {
				form.submit()
			}
		}
	}

	const onChangeComment = (e) => {
		setCommentValue(e.target.value)
	}

	const checkDisableSend = () => {
		return !(commentValue && commentValue.trim() !== '')
	}

	useEffect(() => {
		if (defaultData) {
			form.setFieldValue('Content', defaultData?.Content)
			setCommentValue(defaultData?.Content)
			toggle()
			onOpen()
		}
	}, [defaultData])

	return (
		<div className="flex items-start gap-2 w-full">
			<Avatar uri={user?.Avatar} className="h-10 w-10 object-cover rounded-full" />

			<div className="flex-1">
				<Form
					form={form}
					className="grid grid-cols-1 gap-x-4"
					layout="vertical"
					initialValues={{ remember: true }}
					onFinish={handleFinish}
					autoComplete="on"
				>
					<MyFormItem className="col-span-1 !mb-2" name="Content">
						<MyTextArea
							onChange={onChangeComment}
							value={commentValue}
							onKeyDown={handleKeyPress}
							placeholder={'Nội dung phản hồi'}
							autoSize={{ minRows: 2, maxRows: 4 }}
							disabled={mutationCreate.isPending}
						/>
					</MyFormItem>
				</Form>

				<div className="flex gap-2">
					<PrimaryButton
						disable={checkDisableSend() || mutationCreate.isPending}
						type="button"
						background="primary"
						icon="send"
						onClick={submitForm}
					>
						Gửi
					</PrimaryButton>
					{defaultData && (
						<PrimaryButton type="button" background="red" icon="cancel" onClick={() => setEditContent(false)}>
							Hủy
						</PrimaryButton>
					)}
				</div>
			</div>
		</div>
	)
}

export default FeedbackForm
