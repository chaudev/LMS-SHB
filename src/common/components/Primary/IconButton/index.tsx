import { Spin, Tooltip } from 'antd'
import { FC, useRef } from 'react'
import { Edit, LogIn, X, FileMinus, Edit3, Book, Trash2 } from 'react-feather'
import { AiOutlineCheckCircle, AiOutlineEye, AiOutlineInfoCircle, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { BiReset } from 'react-icons/bi'
import { CgAddR, CgFileDocument } from 'react-icons/cg'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { FiArrowDownCircle, FiArrowUpCircle, FiMenu, FiMoreVertical, FiPrinter, FiSave, FiSend } from 'react-icons/fi'
import { HiOutlineFilter } from 'react-icons/hi'
import { MdOutlineCancel, MdOutlineHistory, MdPendingActions } from 'react-icons/md'
import { RiExchangeLine } from 'react-icons/ri'
import { TbDownload, TbReportMoney, TbSchool, TbUpload } from 'react-icons/tb'
import { VscRootFolderOpened } from 'react-icons/vsc'

const IconButton: FC<IIconButton> = (props) => {
	const { tooltip, background, icon, type, onClick, className, color, size, disabled, loading, tooltipPlacement } = props
	const refTooltip = useRef(null)
	function getBG() {
		if (background == 'green') {
			return 'bg-[#4CAF50] hover:bg-[#449a48] focus:bg-[#38853b]'
		}
		if (background == 'blue') {
			return 'bg-[#005DE0] hover:bg-[#0A70FF] focus:bg-[#005DE0]'
		}
		if (background == 'red') {
			return 'bg-[#C94A4F] hover:bg-[#b43f43] focus:bg-[#9f3136]'
		}
		if (background == 'yellow') {
			return 'bg-[#FFBA0A] hover:bg-[#e7ab11] focus:bg-[#d19b10]'
		}
		if (background == 'black') {
			return 'bg-[#000] hover:bg-[#191919] focus:bg-[#313131]'
		}
		if (background == 'primary') {
			return 'bg-[#B32025] hover:bg-[#B32025] focus:bg-[#B32025]'
		}
		if (background == 'disabled') {
			return 'bg-[#cacaca] hover:bg-[#bababa] focus:bg-[#acacac] cursor-not-allowed'
		}
		if (background == 'orange') {
			return 'bg-[#ab1d38] hover:bg-[#9a1b33] focus:bg-[#85172c]'
		}
		if (background == 'transparent') {
			return 'bg-transparent'
		}
		return 'bg-transparent'
	}

	function getColor() {
		if (color == 'white') {
			return 'text-[#fff] hover:text-[#fff] focus:text-[#fff]'
		}
		if (color == 'green') {
			return 'text-[#4CAF50] hover:text-[#449a48] focus:text-[#38853b]'
		}
		if (color == 'blue') {
			return 'text-[#005DE0] hover:text-[#0A70FF] focus:text-[#005DE0]'
		}
		if (color == 'red') {
			return 'text-[#C94A4F] hover:text-[#b43f43] focus:text-[#9f3136]'
		}
		if (color == 'yellow') {
			return 'text-[#FFBA0A] hover:text-[#e7ab11] focus:text-[#d19b10]'
		}
		if (color == 'black') {
			return 'text-[#000] hover:text-[#191919] focus:text-[#313131]'
		}
		if (color == 'primary') {
			return 'text-[#B32025] hover:text-[#00337A] focus:text-[#B32025]'
		}
		if (color == 'disabled') {
			return 'text-[#cacaca] hover:text-[#bababa] focus:text-[#acacac] cursor-not-allowed'
		}
		if (color == 'orange') {
			return 'text-[#FF9800] hover:text-[#f49302] focus:text-[#f49302]'
		}
		if (color == 'purple') {
			return 'text-[#9000ff] hover:text-[#7517bd] active:text-[#9000ff] cursor-pointer none-selection'
		}
		if (color == 'transparent') {
			return 'text-transparent'
		}
	}

	function getIcon() {
		if (icon == 'add') {
			return <CgAddR size={!!size ? size : 22} />
		}
		if (icon == 'edit') {
			return <Edit size={20} />
		}
		if (icon == 'edit3') {
			return <Edit3 size={20} />
		}
		if (icon == 'remove') {
			return <Trash2 size={20} />
		}
		if (icon == 'check') {
			return <AiOutlineCheckCircle size={!!size ? size : 22} />
		}
		if (icon == 'eye') {
			return <AiOutlineEye size={!!size ? size : 22} />
		}
		if (icon == 'exchange') {
			return <RiExchangeLine size={!!size ? size : 24} />
		}
		if (icon == 'more') {
			return <FiMoreVertical size={!!size ? size : 22} />
		}
		if (icon == 'document') {
			return <CgFileDocument size={!!size ? size : 22} />
		}
		if (icon == 'download') {
			return <TbDownload size={!!size ? size : 22} />
		}
		if (icon == 'filter') {
			return <HiOutlineFilter size={!!size ? size : 22} />
		}
		if (icon == 'menu') {
			return <FiMenu />
		}
		if (icon == 'upload') {
			return <TbUpload size={!!size ? size : 22} />
		}
		if (icon == 'cancel') {
			return <MdOutlineCancel size={!!size ? size : 22} />
		}
		if (icon == 'x') {
			return <X size={!!size ? size : 22} />
		}
		if (icon == 'login') {
			return <LogIn size={!!size ? size : 22} />
		}
		if (icon == 'send') {
			return <FiSend size={22} />
		}
		if (icon == 'file') {
			return <FileMinus size={!!size ? size : 22} />
		}
		if (icon == 'print') {
			return <FiPrinter size={!!size ? size : 22} />
		}
		if (icon == 'user-group') {
			return <AiOutlineUsergroupAdd size={!!size ? size : 22} />
		}
		if (icon == 'book') {
			return <Book size={!!size ? size : 20} />
		}
		if (icon == 'info') {
			return <AiOutlineInfoCircle size={!!size ? size : 20} />
		}
		if (icon == 'save') {
			return <FiSave size={!!size ? size : 20} />
		}
		if (icon == 'up-arrow') {
			return <FiArrowUpCircle size={!!size ? size : 20} />
		}
		if (icon == 'down-arrow') {
			return <FiArrowDownCircle size={!!size ? size : 20} />
		}
		if (icon == 'tutoring') {
			return <FaChalkboardTeacher size={!!size ? size : 20} />
		}
		if (icon == 'reset') {
			return <BiReset size={!!size ? size : 20} />
		}
		if (icon == 'study') {
			return <TbSchool size={!!size ? size : 20} />
		}
		if (icon == 'hide') {
			return <VscRootFolderOpened size={!!size ? size : 20} />
		}
		if (icon == 'salary') {
			return <TbReportMoney size={!!size ? size : 20} />
		}
		if (icon == 'reserved') {
			return <MdPendingActions size={!!size ? size : 20} />
		}
		if (icon == 'history') {
			return <MdOutlineHistory size={!!size ? size : 20} />
		}
	}

	const _onClick = (event) => {
		if (type == 'button' && !!onClick) {
			onClick(event)
			refTooltip.current.close()
		}
	}

	return (
		<Tooltip title={tooltip} ref={refTooltip} placement={tooltipPlacement}>
			{/* <button
				type={type}
				onClick={_onClick}
				className={`none-selection rounded-lg w-auto inline-flex items-center btn-icon cursor-pointer ${getBG()} ${getColor()} ${className}`}
				disabled={disabled}
			>
				{!!icon && getIcon()}
			</button> */}
			<button
				type={type}
				disabled={loading}
				onClick={_onClick}
				className={`none-selection rounded-lg px-2 w-auto items-center btn-icon cursor-pointer ${getBG()} ${getColor()} ${className}`}
			>
				{loading ? <Spin /> : <>{!!icon && getIcon()} </>}
			</button>
		</Tooltip>
	)
}

export default IconButton
