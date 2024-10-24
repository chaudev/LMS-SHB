import Head from 'next/head'
import React from 'react'
import appConfigs from '~/appConfig'

const viewport = 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
const siteTitle = 'DU HỌC NGHỀ ĐỨC - SHD'
const description =
	'Du học nghề CHLB Đức đang là lựa chọn hàng đầu của các bạn trẻ Việt nam, với cơ hội được học tập, làm việc và định cư tại CHLB Đức - Đất nước có nền kinh tế'

const MainHeader = () => {
	return (
		<Head>
			<link rel="icon" href="/logo/fav.png" />
			<title>{appConfigs.appName} - Du học nghề Đức</title>

			<meta property="og:locale" content="vi_VN" />
			<meta content={viewport} name="viewport" />
			<meta name="description" content={description} />

			<meta name="og:title" content={siteTitle} />
			<meta property="og:site_name" content="DU HỌC NGHỀ ĐỨC SHD" />
			<meta property="og:description" content={description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={`${appConfigs.appName} - Du học nghề Đức`} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content="du-hoc-nghe-duc-shd" />

			<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
			<meta http-equiv="Pragma" content="no-cache" />
			<meta http-equiv="Expires" content="0" />

			<script src="/tinymce/tinymce.min.js" />
		</Head>
	)
}

export default MainHeader
