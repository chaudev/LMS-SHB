import Head from 'next/head'
import React from 'react'
import appConfigs from '~/appConfig'

const viewport = 'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
const siteTitle = ''
const description = ''

const MainHeader = () => {
	return (
		<Head>
			<link rel="icon" href="/white-logo.png" />
			<title>{appConfigs.appName}</title>

			<meta property="og:locale" content="vi_VN" />
			<link rel="canonical" href="https://edugo-lms.vercel.app" />
			<meta content={viewport} name="viewport" />
			<meta name="description" content={description} />

			<meta name="og:title" content={siteTitle} />
			<meta property="og:site_name" content="Hệ thống quản lý giáo dục" />
			<meta property="og:description" content={description} />

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content="Edugo LMS - Phần mềm quản lý giáo dục" />
			<meta name="twitter:image:alt" content="edugo-lms" />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:url" content="https://edugo-lms.vercel.app" />
			<meta name="twitter:site" content="@edugo" />
			<meta name="twitter:domain" content="" />

			<script src="https://cdn.tiny.cloud/1/lmr9ug3bh4iwjsrap9hgwgxqcngllssiraqluwto4slerrwg/tinymce/6/tinymce.min.js" />
		</Head>
	)
}

export default MainHeader
