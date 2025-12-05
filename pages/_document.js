import Document, { Html, Head, Main, NextScript } from 'next/document'

class DynSteelDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)

    return {
      ...initialProps,
      pathname: ctx.pathname || initialProps.__NEXT_DATA__?.page || '/'
    }
  }

  render() {
    const pagePath =
      this.props.pathname || this.props.__NEXT_DATA__?.page || '/'
    const isAdminRoute = pagePath.startsWith('/admin')
    const manifestHref = isAdminRoute ? '/admin-manifest.json' : '/manifest.json'
    const manifestSwitcher = `
(function() {
  const applyManifest = () => {
    try {
      const isAdmin = window.location.pathname.startsWith('/admin')
      const targetHref = isAdmin ? '/admin-manifest.json' : '/manifest.json'
      let link = document.querySelector('link[rel="manifest"][data-dynsteel-manifest]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'manifest'
        link.setAttribute('data-dynsteel-manifest', 'true')
        document.head.appendChild(link)
      }
      const absoluteTarget = new URL(targetHref, window.location.origin).href
      if (link.href !== absoluteTarget) {
        link.href = targetHref
      }
    } catch (err) {
      console.error('DynSteel manifest update failed', err)
    }
  }

  const wrapHistory = (method) => {
    const original = history[method]
    history[method] = function() {
      const result = original.apply(this, arguments)
      applyManifest()
      return result
    }
  }

  wrapHistory('pushState')
  wrapHistory('replaceState')
  window.addEventListener('popstate', applyManifest)
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) applyManifest()
  })
  applyManifest()
})()
    `
    const themeColor = '#0f172a'

    return (
      <Html lang="tr">
        <Head>
          <meta charSet="utf-8" />

          {/* PWA Meta Tags */}
          <meta name="application-name" content="DynSteel" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="DynSteel" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={themeColor} />

          {/* Apple Touch Icons */}
          <link rel="apple-touch-icon" href="/icons/icon.svg" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon.svg" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon.svg" />
          <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon.svg" />

          {/* Splash Screens for iOS */}
          <link rel="apple-touch-startup-image" href="/icons/icon.svg" />

          {/* Route-aware Manifest */}
          <link rel="manifest" href={manifestHref} data-dynsteel-manifest="true" />
          <script dangerouslySetInnerHTML={{ __html: manifestSwitcher }} />

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
}

export default DynSteelDocument

