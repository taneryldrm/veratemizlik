'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './hizmet-detay.module.css';
import { getServiceBySlug } from '@/lib/servicesStore';
import { useContactInfo } from '@/hooks/useContactInfo';

// Types
interface ServiceStaticData {
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    equipment: string[];
    steps: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    price: string;
    color: string;
}

interface ServiceDetailClientProps {
    slug: string;
    initialService: ServiceStaticData;
}

// SVG Icons
const serviceIcons: Record<string, React.ReactNode> = {
    'ev-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    'ofis-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    'dis-cephe-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    'insaat-sonrasi-temizlik': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    'merdiven-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4V8h4V4" />
            <path d="M4 20v-4h4v-4h4V8h4V4h4" />
        </svg>
    ),
    'yangin-sonrasi-temizlik': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
        </svg>
    ),
    'villa-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4 8 4v14" />
            <path d="M9 21v-6h6v6" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
        </svg>
    ),
    'yerinde-koltuk-yikama': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 12v-2a2 2 0 00-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v2C2 12 2 14 4 14v4a2 2 0 002 2h2a2 2 0 002-2v-2h4v2a2 2 0 002 2h2a2 2 0 002-2v-4c2 0 2-2 2-2z" />
            <path d="M4 10h16" />
        </svg>
    ),
};

export default function ServiceDetailClient({ slug, initialService }: ServiceDetailClientProps) {
    const [service, setService] = useState(initialService);
    const { phoneUrl, mobileUrl, whatsappUrl, settings } = useContactInfo();

    useEffect(() => {
        // Store'dan güncel veriyi kontrol et
        const storedService = getServiceBySlug(slug);

        if (storedService) {
            setService(prev => ({
                ...prev,
                title: storedService.name,
                price: storedService.price
            }));
        }

        // Store güncellemelerini dinle
        const handleUpdate = (e: CustomEvent) => {
            const updatedServices = e.detail;
            const updated = updatedServices.find((s: any) => s.slug === slug);
            if (updated) {
                setService(prev => ({
                    ...prev,
                    title: updated.name,
                    price: updated.price
                }));
            }
        };

        window.addEventListener('servicesUpdated', handleUpdate as EventListener);
        return () => window.removeEventListener('servicesUpdated', handleUpdate as EventListener);
    }, [slug]);

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section
                className={styles.hero}
                style={{ '--accent-color': service.color } as React.CSSProperties}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/hizmetler" className={styles.backLink}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Tüm Hizmetler
                        </Link>
                        <span className={styles.heroIcon}>{serviceIcons[slug]}</span>
                        <h1 className={styles.heroTitle}>{service.title}</h1>
                        <p className={styles.heroDescription}>{service.description}</p>
                        <div className={styles.heroActions}>
                            <Link href="/teklif-al" className="btn btn-accent btn-lg">
                                Teklif Al
                            </Link>
                            <a href={mobileUrl} className={`${styles.phoneBtn} btn btn-lg`}>
                                {settings.mobile}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            {/* Description */}
                            <div className={styles.section}>
                                <h2>Hizmet Hakkında</h2>
                                <p>{service.longDescription}</p>
                            </div>

                            {/* Features */}
                            <div className={styles.section}>
                                <h2>Hizmet Kapsamı</h2>
                                <ul className={styles.featuresList}>
                                    {service.features.map((feature, i) => (
                                        <li key={i}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Steps */}
                            <div className={styles.section}>
                                <h2>Uygulama Adımları</h2>
                                <div className={styles.steps}>
                                    {service.steps.map((step, i) => (
                                        <div key={i} className={styles.step}>
                                            <div className={styles.stepNumber}>{i + 1}</div>
                                            <div className={styles.stepContent}>
                                                <h4>{step.title}</h4>
                                                <p>{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* FAQ */}
                            <div className={styles.section}>
                                <h2>Sıkça Sorulan Sorular</h2>
                                <div className={styles.faq}>
                                    {service.faq.map((item, i) => (
                                        <details key={i} className={styles.faqItem}>
                                            <summary>
                                                {item.question}
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <polyline points="6 9 12 15 18 9" />
                                                </svg>
                                            </summary>
                                            <p>{item.answer}</p>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.sidebarCard}>
                                <h3>Fiyat Bilgisi</h3>
                                <p className={styles.price}>{service.price}</p>
                                <Link href="/teklif-al" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Ücretsiz Teklif Al
                                </Link>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>Kullanılan Ekipmanlar</h3>
                                <ul className={styles.equipmentList}>
                                    {service.equipment.map((item, i) => (
                                        <li key={i}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className={styles.sidebarCard}>
                                <h3>Kullanılan Ekipmanlar</h3>
                                <div className={styles.contactLinks}>
                                    <a href={mobileUrl} className={styles.contactLink}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                        {settings.mobile}
                                    </a>
                                    <a
                                        href={whatsappUrl}
                                        className={styles.contactLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
