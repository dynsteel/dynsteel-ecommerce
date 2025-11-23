import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="tr">
      <Head>
        <meta charSet="utf-8" />
        
        {/* PWA Meta Tags - Müşteri Sitesi */}
        <meta name="application-name" content="DynSteel" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DynSteel" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon.svg" />
        
        {/* Splash Screens for iOS */}
        <link rel="apple-touch-startup-image" href="/icons/icon.svg" />
        
        {/* Manifest - Müşteri Sitesi */}
        <link rel="manifest" href="/manifest.json" />
        
              {/* Favicon */}
              <link rel="icon" type="image/x-icon" href="/favicon.ico" />
              <link rel="icon" type="image/svg+xml" href="/icons/icon.svg" />
              <link rel="shortcut icon" href="/favicon.ico" />
              <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
              <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

