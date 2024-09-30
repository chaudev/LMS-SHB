import Router from 'next/router'

export const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}

export const debounceV2 = (delay) => {
	let timer
	return (func) => {
		clearTimeout(timer)
		timer = setTimeout(() => {
			func()
		}, delay)
	}
}

export const fmSelectArr = (arr: Array<{ [key: string]: any }>, title: string, value: string, options = [], price?: string) => {
	if (Array.isArray(arr) && arr.length > 0) {
		return arr
			.filter((x) => (x.Enable === false ? false : x))
			.map((x) => ({
				title: x[title],
				value: x[value],
				options: options.reduce((obj, o) => ({ ...obj, [o]: x[o] }), {}),
				price: x[price]
			}))
	}
	return []
}

export function encode(str) {
	return window?.btoa(unescape(encodeURIComponent(str)))
}

export function decode(str) {
	return !!str && str != 'undefined' ? decodeURIComponent(escape(window?.atob(str))) : ''
}

export function removeAccents(str) {
	var AccentsMap = [
		'aàảãáạăằẳẵắặâầẩẫấậ',
		'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
		'dđ',
		'DĐ',
		'eèẻẽéẹêềểễếệ',
		'EÈẺẼÉẸÊỀỂỄẾỆ',
		'iìỉĩíị',
		'IÌỈĨÍỊ',
		'oòỏõóọôồổỗốộơờởỡớợ',
		'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
		'uùủũúụưừửữứự',
		'UÙỦŨÚỤƯỪỬỮỨỰ',
		'yỳỷỹýỵ',
		'YỲỶỸÝỴ'
	]
	for (var i = 0; i < AccentsMap.length; i++) {
		var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g')
		var char = AccentsMap[i][0]
		str = str.replace(re, char)
	}
	return str
}

export function parseSelectArray(arr: Array<{ [key: string]: any }>, title: string, value: string) {
	if (Array.isArray(arr) && arr.length > 0) {
		return arr
			.filter((item) => (item.Enable == false ? false : item))
			.map((item) => ({
				title: item[title],
				value: item[value]
			}))
	}
}

export function parseSelectArrayUser(arr: Array<{ [key: string]: any }>, title: string, title2: string, value: string) {
	if (Array.isArray(arr) && arr.length > 0) {
		return arr
			.filter((item) => (item.Enable == false ? false : item))
			.map((item) => ({
				title: `${item[title]} - ${item[title2]}`,
				value: item[value]
			}))
	}
	return []
}

export const parseStringToNumber = (str: number | string) => parseInt(str.toString().replace(/\D/g, '')) || 0

export const copyRightLog = () => {
	console.log('----------------------------------------------------')
	console.log('----------                                ----------')
	console.log('----------   LMS - © 2022 • NGUYEN CHAU   ----------')
	console.log('----------                                ----------')
	console.log('----------------------------------------------------')
}

export function getPreviousDay(date = new Date()) {
	const previous = new Date(date.getTime())
	previous.setDate(date.getDate() - 1)

	return previous
}

export const parseToMoney = (value: any) => {
	if (value == '' || value == undefined || value == null) {
		return '0'
	}
	value += ''
	let x = value.split('.')
	let x1 = x[0]
	let x2 = x.length > 1 ? '.' + x[1] : ''
	let rgx = /(\d+)(\d{3})/
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2')
	}
	return x1 + x2
}

import { logOut, parseJwt } from './token-handle'
import { TMenu } from '../libs/routers/menu'
import { ERole } from '~/enums/common'

export { logOut, parseJwt }

/**
 * Hàm kiểm tra vai trò của người dùng
 *
 * @param params - `params` thông tin của thằng đang đăng nhập`.
 *
 * Trả ra (true or false): nó có phải là "admin", "giáo viên", ...
 *
 * Cách xài: is(userInfo).admin
 * 1. Admin
 * 2. Giáo viên
 * 3. Học sinh
 * 4. Quản lý
 * 5. Tư vấn viên
 * 6. Kế toán
 * 7. Học vụ
 * 8. Phụ huynh
 * 9. Trợ lý đào tạo
 * 10. Sale-admin
 * 11. Marketing
 * 12. Kế toán trưởng
 * 13. Nhân viên hành chính - nhân sự
 * 14. Trưởng phòng hành chính - nhân sự
 * 15. Hồ sơ (giống học vụ)
 * 16. Nội trú (giống học vụ)
 * 17. Nhân viên nghiệp vụ và đối ngoại
 * 18. Phó tổng giám đốc (giống Admin)
 * 19. Giám đốc điều hành (giống Admin)
 * 20. CEO (giống Admin)
 */
export function is(params) {
	return {
		admin: params?.RoleId == ERole.admin,
		teacher: params?.RoleId == ERole.teacher,
		student: params?.RoleId == ERole.student,
		manager: params?.RoleId == ERole.manager,
		saler: params?.RoleId == ERole.saler,
		accountant: params?.RoleId == ERole.accountant,
		academic: params?.RoleId == ERole.academic,
		parent: params?.RoleId == ERole.parent,
		teachingAssistant: params?.RoleId == ERole.trainingAssistant,
		saleAdmin: params?.RoleId == ERole.saleAdmin,
		marketing: params?.RoleId == ERole.marketing,
		chiefAccountant: params?.RoleId == ERole.chiefAccountant,
		administrativeHRStaff: params?.RoleId == ERole.administrativeHRStaff,
		administrativeHRManager: params?.RoleId == ERole.administrativeHRManager,
		profile: params?.RoleId == ERole.profile,
		residency: params?.RoleId == ERole.residency,
		foreignAffairsOfficer: params?.RoleId == ERole.foreignAffairsOfficer
	}
}

export const checkIncludesRole = (roleArr: ERole[], roleId: number) => {
	return roleArr.includes(roleId)
}

export const getMenuByRole = (menuList: TMenu[], roleNumber: number): TMenu[] => {
	return menuList
		.filter((menu) => menu.Allow.includes(roleNumber)) // Kiểm tra Allow ở cấp độ menu bên ngoài
		.map((menu) => {
			// Chỉ xét các menu mà cha đã thoả điều kiện
			const filteredMenuItems = menu.MenuItem.filter((item) => item.Allow.includes(roleNumber)) // Kiểm tra Allow ở cấp độ item
				.map((item) => {
					// Chỉ xét submenu khi cha đã thoả điều kiện
					const filteredSubMenu = item.SubMenuList?.filter((subItem) => subItem.Allow.includes(roleNumber))

					return {
						...item,
						SubMenuList: filteredSubMenu // Lưu lại danh sách submenu đã lọc
					}
				})

			return {
				...menu,
				MenuItem: filteredMenuItems
			}
		})
		.filter((menu) => menu.MenuItem.length > 0) // Loại bỏ các menu không có item nào phù hợp
}
