import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import DormitoryRoomIndex from '~/common/pages/dormitory/room'
import DormitorySectionIndex from '~/common/pages/dormitory/section'

import style from './styles.module.scss'

const items: TabsProps['items'] = [
	{
		key: '1',
		label: 'Danh sách khu',
		children: <DormitorySectionIndex />
	},
	{
		key: '2',
		label: 'Danh sách phòng',
		children: <DormitoryRoomIndex />
	}
]

export default function ZonesRooms() {
	return (
		<div className={style.container}>
			<Tabs defaultActiveKey="1" items={items} accessKey="red" />
		</div>
	)
}
