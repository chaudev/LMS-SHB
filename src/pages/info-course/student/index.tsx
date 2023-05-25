import { set } from 'immer/dist/internal'
import React, { useEffect, useState } from 'react'
import { registerApi } from '~/api/user/user'
import MainLayout from '~/common/components/MainLayout'
import Student from '~/common/pages/Info-Course/Student'
import { ShowNoti } from '~/common/utils'

const StudentPage = () => {
	const [allowed, setAllow] = useState<any>()

	useEffect(() => {
		getAllow()
	}, [])

	const getAllow = async () => {
		try {
			const response = await registerApi.getAllowRegister()
			if (response.status === 200) {
				setAllow(response.data.data == 'Allow' ? true : false)
			}
		} catch (error) {
			ShowNoti('error', error?.message)
		}
	}

	return <Student role={3} allowRegister={allowed} reFresh={getAllow} />
}

StudentPage.Layout = MainLayout

export default StudentPage
