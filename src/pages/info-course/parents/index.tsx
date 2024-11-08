import Head from 'next/head'
import appConfigs from '~/appConfig'
import MainLayout from '~/common/components/MainLayout'
import Parents from '~/common/pages/Info-Course/parents'

const ParentsPage = () => {
	return (
		<>
			<Head>
				<title>{appConfigs.appName} | Học viên chuyển khoá</title>
			</Head>
			<Parents />
		</>
	)
}

ParentsPage.Layout = MainLayout
export default ParentsPage
