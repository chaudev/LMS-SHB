import React, { useEffect } from 'react'

import type { AppProps } from 'next/app'
import AuthProvider from '~/common/components/Auth/Provider'

// ant
import { ConfigProvider } from 'antd'
import locale from 'antd/lib/locale/vi_VN'

// redux
import { Provider as StoreProvider } from 'react-redux'
import { store } from '~/store'

// css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/global.scss'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'react-tooltip/dist/react-tooltip.css'

import ToastifyContainer from '~/common/providers/Toastify'
import { checkInternet } from '~/common/utils/main-function'
import MainHeader from '~/common/libs/SEO/main-header'

import { GoogleAnalytics } from 'nextjs-google-analytics'
import Script from 'next/script'
import ReactQueryProvider from '~/common/providers/ReactQuery/ReactQueryProvider'

const gaMeasurementId = 'G-LX9VLW177F'

function App({ Component, pageProps }: AppProps & IViewProps) {
	const Layout = Component.Layout || ((props) => <>{props.children}</>)
	const breadcrumb = Component.breadcrumb || ''

	useEffect(() => {
		checkInternet()
	}, [])

	ConfigProvider.config({
		prefixCls: 'custom',
		theme: {
			primaryColor: '#B32025',
			errorColor: '#ff4d4f',
			warningColor: '#faad14',
			successColor: '#52c41a',
			infoColor: '#1890ff'
		}
	})
	return (
		<>
			<Script src="/tinymce/tinymce.min.js" />

			<GoogleAnalytics trackPageViews gaMeasurementId={gaMeasurementId} />

			<MainHeader />

			<StoreProvider store={store}>
				<ReactQueryProvider>
					<AuthProvider>
						<ConfigProvider locale={locale}>
							<ToastifyContainer />
							<Layout breadcrumb={breadcrumb}>
								<Component {...pageProps} />
							</Layout>
						</ConfigProvider>
					</AuthProvider>
				</ReactQueryProvider>
			</StoreProvider>
		</>
	)
}

export default App
