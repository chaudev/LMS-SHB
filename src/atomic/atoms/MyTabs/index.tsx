import { Tabs, TabsProps } from 'antd'

type TMyTabsProps = TabsProps

const MyTabs = (props: TMyTabsProps) => {
	return <Tabs {...props} />
}

export default MyTabs
