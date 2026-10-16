import site from '../data/site.json';
import { pagePath, withBase, type Lang } from './i18n';

/** 検索エンジン向けの店舗情報（JSON-LD） */
export function restaurantJsonLd(lang: Lang, siteUrl: URL) {
  const abs = (p: string) => new URL(p, siteUrl).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: site.name,
    alternateName: site.nameEn,
    url: abs(pagePath(lang, 'home')),
    image: abs(withBase('images/og.jpg')),
    logo: abs(withBase('images/logo.png')),
    telephone: site.phoneIntl,
    servesCuisine: ['Ramen', 'Chuka soba'],
    priceRange: site.priceRange,
    acceptsReservations: false,
    paymentAccepted: 'Cash',
    currenciesAccepted: 'JPY',
    hasMenu: abs(pagePath(lang, 'menu')),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.streetAddressEn,
      addressLocality: site.locality,
      addressRegion: site.region,
      postalCode: site.postalCode,
      addressCountry: 'JP',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
    openingHoursSpecification: site.openingHoursSpec.map((s) => ({ '@type': 'OpeningHoursSpecification', ...s })),
    sameAs: [site.instagram, site.tabelog],
  };
}
