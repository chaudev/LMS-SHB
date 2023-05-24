import Router, { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { classApi } from '~/api/class'
import MenuClass from '~/common/components/Class/MenuClass'
import { ShowNostis } from '~/common/utils'
import { setCurrentClassDetails } from '~/store/classStateReducer'

const DetailClass = () => {
	const router = useRouter()
	const dispatch = useDispatch()

	useEffect(() => {
		getClassDetails()
	}, [router?.query?.class])

	async function getClassDetails() {
		try {
			const res = await classApi.getByID(Router.query?.class)
			if (res.status == 200) {
				dispatch(setCurrentClassDetails(res.data.data))
			} else {
				dispatch(setCurrentClassDetails(null))
			}
		} catch (error) {
			ShowNostis.error(error?.message)
		}
	}

	return (
		<div className="wrapper-detail-class class-details-container">
			<MenuClass />
		</div>
	)
}

export default DetailClass
