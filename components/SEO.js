import Head from 'next/head'
import { useRouter } from 'next/router'

export default function SEO({
  title = 'DynSteel - Araba Modifiye Parçaları ve Minyatür Araba Koleksiyonu',
  description = 'DynSteel ile araba modifiye parçaları ve premium minyatür araba modelleri. 3D tarama teknolojisi ile özel parça üretimi. Hızlı kargo, kaliteli hizmet.',
  keywords = 'araba modifiye, minyatür araba, 3D tarama, araba parçaları, modifiye parça, BMW parça, Mercedes parça, Audi parça',
  image = '/og-image.jpg',
  type = 'website'
}) {
  const router = useRouter()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dynsteel.com'
  const canonicalUrl = `${siteUrl}${router.asPath}`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Turkish" />
      <meta name="author" content="DynSteel" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:site_name" content="DynSteel" />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0f172a" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      
      {/* Structured Data - Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'DynSteel',
            description: 'Araba modifiye parçaları ve minyatür araba koleksiyonu',
            url: siteUrl,
            logo: `${siteUrl}/logo.png`,
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+90-545-846-3523',
              contactType: 'customer service',
              availableLanguage: 'Turkish'
            },
            sameAs: [
              'https://instagram.com/dynsteelauto'
            ]
          })
        }}
      />

      {/* Structured Data - LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'DynSteel',
            image: `${siteUrl}/logo.png`,
            '@id': siteUrl,
            url: siteUrl,
            telephone: '+90-545-846-3523',
            priceRange: '₺₺',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'TR'
            },
            openingHoursSpecification: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
              ],
              opens: '00:00',
              closes: '23:59'
            }
          })
        }}
      />
    </Head>
  )
}
