import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Analytics() {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      // Google Analytics sayfa görünümü
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'GA-XXXXXXXXX', {
          page_path: url,
        })
      }

      // Facebook Pixel sayfa görünümü
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'PageView')
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Head>
      {/* Analytics scripts are disabled in development */}
      {process.env.NODE_ENV === 'production' && (
        <>
          {/* Google Analytics */}
          {process.env.NEXT_PUBLIC_GA_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                      page_path: window.location.pathname,
                    });
                  `,
                }}
              />
            </>
          )}

          {/* Facebook Pixel */}
          {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
            <>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
                    fbq('track', 'PageView');
                  `,
                }}
              />
              <noscript>
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
                />
              </noscript>
            </>
          )}

          {/* Hotjar Heatmap */}
          {process.env.NEXT_PUBLIC_HOTJAR_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `,
              }}
            />
          )}
        </>
      )}
    </Head>
  )
}

// E-ticaret event'leri için yardımcı fonksiyonlar
export const trackPurchase = (transactionId, value, currency = 'TRY', items = []) => {
  // Google Analytics Enhanced Ecommerce
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items
    })
  }

  // Facebook Pixel Purchase
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      content_type: 'product',
      contents: items
    })
  }
}

export const trackAddToCart = (productId, productName, value, currency = 'TRY') => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'add_to_cart', {
      currency: currency,
      value: value,
      items: [{
        item_id: productId,
        item_name: productName,
        currency: currency,
        value: value
      }]
    })
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: value,
      currency: currency
    })
  }
}

export const trackViewContent = (productId, productName, value, currency = 'TRY') => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: currency,
      value: value,
      items: [{
        item_id: productId,
        item_name: productName,
        currency: currency,
        value: value
      }]
    })
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: value,
      currency: currency
    })
  }
}

export const trackBeginCheckout = (value, currency = 'TRY', items = []) => {
  // Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      currency: currency,
      value: value,
      items: items
    })
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency,
      content_type: 'product',
      contents: items
    })
  }
}
