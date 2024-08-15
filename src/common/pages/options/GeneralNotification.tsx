import { Tabs } from 'antd'
import GeneralNotificationHistory from '~/common/components/GeneralNotification/GeneralNotifcationHistory'
import GeneralNotificationForm from '~/common/components/GeneralNotification/GeneralNotificationForm'

const GeneralNotification = () => {
	

	return (
		<Tabs
			defaultActiveKey="1"
			tabBarStyle={{background: "white", padding: "0 12px"}}
			items={[
				{
					label: 'Tạo thông báo',
					key: '1',
					children: <GeneralNotificationForm />
				},
				{
					label: 'Lịch sử',
					key: '2',
					children: <GeneralNotificationHistory />
				}
			]}
		/>
	)
}

export default GeneralNotification
