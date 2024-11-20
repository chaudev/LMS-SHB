import { useContext, createContext, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '~/store'

import ChangePasswordForm from '~/common/providers/ModalCheckLoginFirst/components/ChangePasswordForm'

type ModalCheckLoginFirstContextType = {
	triggerModal: boolean
	openModal: () => void
	closeModal: () => void
}

export const ModalCheckLoginFirstContext = createContext<ModalCheckLoginFirstContextType>({
	triggerModal: false,
	openModal: () => null,
	closeModal: () => null
})

export const useModalCheckLoginFirstContext = () => useContext(ModalCheckLoginFirstContext)

export default function ModalCheckLoginFirstProvider({ children }: { children: React.ReactNode }) {
	const [triggerModal, setTriggerModal] = useState<boolean>(false)
	const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null)

	const userRoleId = useSelector((state: RootState) => state.user.information?.RoleId)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedIsFirstLogin = JSON.parse(localStorage.getItem('isFirstLogin'))
			if (storedIsFirstLogin) {
				console.log(storedIsFirstLogin)
				setIsFirstLogin(storedIsFirstLogin)
			}
		}
	}, [])

	useEffect(() => {
		if (userRoleId == 3 && isFirstLogin) {
			openModal()
		}
	}, [userRoleId, isFirstLogin])

	const openModal = useCallback(() => {
		setTriggerModal(true)
	}, [])

	const closeModal = useCallback(() => {
		setTriggerModal(false)
		localStorage.setItem('isFirstLogin', 'false')
		setIsFirstLogin(false)
	}, [])

	return (
		<>
			<ModalCheckLoginFirstContext.Provider
				value={{
					openModal,
					triggerModal,
					closeModal
				}}
			>
				{triggerModal && <ChangePasswordForm />}
				{children}
			</ModalCheckLoginFirstContext.Provider>
		</>
	)
}
