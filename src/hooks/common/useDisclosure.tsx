import { useCallback, useState } from 'react'

export interface IDisclosure {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	onToggle: () => void
}
export const useDisclosure = (
	{ isOpen: defaultIsOpen = false, onOpen = () => {}, onClose: onClose1 = () => {} } = {
		isOpen: false,
		onOpen: () => {},
		onClose: () => {}
	}
): IDisclosure => {
	const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen)
	const setTrue = useCallback(() => {
		onOpen?.()
		setIsOpen(true)
	}, [])

	const setFalse = useCallback(() => {
		onClose1?.()
		setIsOpen(false)
	}, [])
	const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
	return {
		isOpen,
		onOpen: setTrue,
		onClose: setFalse,
		onToggle: toggle
	}
}
