import React from 'react'
import IconButton from '../../Primary/IconButton'

interface IButtonUpdateUser {
    onClick: Function
    loading:boolean
    isShow:boolean
}

const IconButonUpdateUser:React.FC<IButtonUpdateUser> = ({ onClick, loading, isShow = false }) => {
	return (
		<>
			{isShow && (
				<IconButton
					onClick={onClick}
					tooltip="Cập nhật"
					loading={loading}
					type="button"
					color="green"
					icon="save"
					background="transparent"
				/>
			)}
		</>
	)
}
export default IconButonUpdateUser