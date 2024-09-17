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
 * 2. Teacher
 * 3. Student
 * 4. Manager
 * 5. Saler
 * 6. Accountant
 * 7. Academic
 * 8. Parent
 * 9. TeachingAssistant
 */
export function is(params) {
	return {
		admin: params?.RoleId == 1,
		teacher: params?.RoleId == 2,
		student: params?.RoleId == 3,
		manager: params?.RoleId == 4,
		saler: params?.RoleId == 5,
		accountant: params?.RoleId == 6,
		academic: params?.RoleId == 7,
		parent: params?.RoleId == 8,
		teachingAssistant: params?.RoleId == 9
	}
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
