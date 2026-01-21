import Script from 'next/script';

// Organization Schema
export function OrganizationJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': 'https://antalyaveratemizlik.com',
        name: 'Vera Temizlik',
        alternateName: 'Vera Temizlik Hizmetleri',
        description: "Antalya'da profesyonel ev temizliği, ofis temizliği, villa temizliği ve daha fazlası. Çevre dostu ürünler ve uzman kadromuzla 12 yıldır hizmetinizdeyiz.",
        url: 'https://antalyaveratemizlik.com',
        logo: 'https://antalyaveratemizlik.com/logo.png',
        image: 'https://antalyaveratemizlik.com/og-image.jpg',
        telephone: '+90-544-312-77-98',
        email: 'info@veratemizlik.com',
        foundingDate: '2012',
        priceRange: '₺₺',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Merkez Mahallesi',
            addressLocality: 'Antalya',
            addressRegion: 'Antalya',
            postalCode: '07100',
            addressCountry: 'TR',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: 36.8841,
            longitude: 30.7056,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '08:00',
                closes: '20:00',
            },
        ],
        areaServed: {
            '@type': 'City',
            name: 'Antalya',
        },
        sameAs: [
            'https://www.facebook.com/veratemizlik',
            'https://www.instagram.com/veratemizlik',
        ],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '5000',
            bestRating: '5',
            worstRating: '1',
        },
    };

    return (
        <Script
            id="organization-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Service Schema
interface ServiceJsonLdProps {
    name: string;
    description: string;
    price: string;
    slug: string;
}

export function ServiceJsonLd({ name, description, price, slug }: ServiceJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: name,
        description: description,
        provider: {
            '@type': 'LocalBusiness',
            name: 'Vera Temizlik',
            url: 'https://antalyaveratemizlik.com',
        },
        areaServed: {
            '@type': 'City',
            name: 'Antalya',
        },
        url: `https://antalyaveratemizlik.com/hizmetler/${slug}`,
        offers: {
            '@type': 'Offer',
            price: price.replace(/[^0-9]/g, ''),
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
        },
    };

    return (
        <Script
            id={`service-jsonld-${slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// BreadcrumbList Schema
interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbJsonLdProps {
    items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <Script
            id="breadcrumb-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// FAQ Schema
interface FAQItem {
    question: string;
    answer: string;
}

interface FAQJsonLdProps {
    faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    return (
        <Script
            id="faq-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Article Schema (for blog posts)
interface ArticleJsonLdProps {
    title: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    slug: string;
}

export function ArticleJsonLd({
    title,
    description,
    image,
    datePublished,
    dateModified,
    author,
    slug,
}: ArticleJsonLdProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description: description,
        image: image,
        datePublished: datePublished,
        dateModified: dateModified || datePublished,
        author: {
            '@type': 'Organization',
            name: author,
            url: 'https://antalyaveratemizlik.com',
        },
        publisher: {
            '@type': 'Organization',
            name: 'Vera Temizlik',
            logo: {
                '@type': 'ImageObject',
                url: 'https://antalyaveratemizlik.com/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://antalyaveratemizlik.com/blog/${slug}`,
        },
    };

    return (
        <Script
            id={`article-jsonld-${slug}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}

// Website Schema (for search box in Google)
export function WebsiteJsonLd() {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Vera Temizlik',
        url: 'https://antalyaveratemizlik.com',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: 'https://antalyaveratemizlik.com/blog?search={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
        },
    };

    return (
        <Script
            id="website-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
