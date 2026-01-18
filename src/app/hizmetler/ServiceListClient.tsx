'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './hizmetler.module.css';
import { getServices } from '@/lib/servicesStore';
import { useContactInfo } from '@/hooks/useContactInfo';

// SVG Icons
const icons = {
    ev: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    ofis: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    disCephe: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    insaat: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    merdiven: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4V8h4V4" />
            <path d="M4 20v-4h4v-4h4V8h4V4h4" />
        </svg>
    ),
    yangin: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
        </svg>
    ),
    villa: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4 8 4v14" />
            <path d="M9 21v-6h6v6" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
        </svg>
    ),
    koltuk: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 12v-2a2 2 0 00-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v2C2 12 2 14 4 14v4a2 2 0 002 2h2a2 2 0 002-2v-2h4v2a2 2 0 002 2h2a2 2 0 002-2v-4c2 0 2-2 2-2z" />
            <path d="M4 10h16" />
        </svg>
    ),
};

const initialServices = [
    {
        id: 'ev-temizligi',
        icon: icons.ev,
        title: 'Ev Temizliği',
        description: 'Evinizi profesyonel ekibimiz ve çevre dostu ürünlerle pırıl pırıl yapıyoruz. Düzenli veya tek seferlik temizlik seçenekleri ile ihtiyacınıza uygun hizmet.',
        features: ['Genel Temizlik', 'Derin Temizlik', 'Haftalık/Aylık Paketler', 'Taşınma Öncesi/Sonrası'],
        price: '₺500\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    {
        id: 'yerinde-koltuk-yikama',
        icon: icons.koltuk,
        title: 'Yerinde Koltuk Yıkama',
        description: 'Koltuklarınızı yerinde, profesyonel vakumlu makinelerle derinlemesine temizliyoruz. Leke çıkarma ve hijyen garantisi.',
        features: ['Vakumlu Yıkama', 'Leke Çıkarma', 'Bakteri Temizliği', 'Koku Giderme'],
        price: '₺750\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    {
        id: 'ofis-temizligi',
        icon: icons.ofis,
        title: 'Ofis Temizliği',
        description: 'İş yeriniz için hijyenik ve profesyonel çalışma ortamı sağlıyoruz. Günlük ve haftalık temizlik programları ile çalışanlarınız için sağlıklı ortam.',
        features: ['Günlük Temizlik', 'Hijyen Dezenfektasyonu', 'Cam Temizliği', 'Halı Yıkama'],
        price: '₺750\'den başlayan fiyatlar',
        color: '#20c997',
    },
    {
        id: 'dis-cephe-temizligi',
        icon: icons.disCephe,
        title: 'Dış Cephe Temizliği',
        description: 'Bina dış cephelerinizi endüstriyel ekipmanlarla temizliyor, ilk günkü görünümüne kavuşturuyoruz. Yüksek basınçlı yıkama ve özel solüsyonlar.',
        features: ['Yüksek Basınçlı Yıkama', 'Cam Cephe Temizliği', 'Kireç ve Leke Çıkarma', 'Koruyucu Kaplama'],
        price: '₺1.500\'den başlayan fiyatlar',
        color: '#17a2b8',
    },
    {
        id: 'insaat-sonrasi-temizlik',
        icon: icons.insaat,
        title: 'İnşaat Sonrası Temizlik',
        description: 'Tadilat ve inşaat sonrası oluşan toz, boya ve moloz artıklarını profesyonelce temizliyoruz. Teslim öncesi kusursuz temizlik garantisi.',
        features: ['Moloz Temizliği', 'Boya Lekesi Çıkarma', 'Detaylı İç Temizlik', 'Doğrama Temizliği'],
        price: '₺1.000\'den başlayan fiyatlar',
        color: '#fd7e14',
    },
    {
        id: 'merdiven-temizligi',
        icon: icons.merdiven,
        title: 'Merdiven Temizliği',
        description: 'Apartman ve site merdiven temizliği ile ortak alanlarınızı hijyenik tutuyoruz. Periyodik bakım ve dezenfeksiyon hizmeti.',
        features: ['Korkuluk Temizliği', 'Zemin Dezenfektasyonu', 'Periyodik Bakım', 'Cam ve Ayna Temizliği'],
        price: '₺300\'den başlayan fiyatlar',
        color: '#6f42c1',
    },
    {
        id: 'yangin-sonrasi-temizlik',
        icon: icons.yangin,
        title: 'Yangın Sonrası Temizlik',
        description: 'Yangın hasarı sonrası is, kurum ve koku giderim hizmeti ile mekanlarınızı restore ediyoruz. Uzman ekip ve profesyonel ekipman.',
        features: ['İs ve Kurum Temizliği', 'Koku Giderme', 'Hasar Restorasyon', 'Dezenfeksiyon'],
        price: 'Keşif sonrası fiyatlandırma',
        color: '#dc3545',
    },
    {
        id: 'villa-temizligi',
        icon: icons.villa,
        title: 'Villa Temizliği',
        description: 'Villalarınız için kapsamlı iç ve dış mekan temizlik hizmeti. Havuz kenarından bahçeye, tüm alanlar için özel çözümler.',
        features: ['İç Mekan Temizliği', 'Havuz Kenarı Temizlik', 'Bahçe Düzenlemesi', 'Periyodik Bakım'],
        price: '₺1.200\'den başlayan fiyatlar',
        color: '#28a745',
    },
];

export default function ServiceListClient() {
    const [services, setServices] = useState(initialServices);
    const { phoneUrl, settings } = useContactInfo();

    useEffect(() => {
        // Store'dan verileri al ve state'i güncelle
        const storedServices = getServices();

        if (storedServices.length > 0) {
            setServices(prevServices => {
                return prevServices.map(service => {
                    const stored = storedServices.find(s => s.slug === service.id);
                    if (stored) {
                        return {
                            ...service,
                            title: stored.name,
                            price: stored.price
                        };
                    }
                    return service;
                });
            });
        }

        // Dinleyici
        const handleUpdate = (e: CustomEvent) => {
            const updatedList = e.detail;
            setServices(prevServices => {
                return prevServices.map(service => {
                    const stored = updatedList.find((s: any) => s.slug === service.id);
                    if (stored) {
                        return {
                            ...service,
                            title: stored.name,
                            price: stored.price
                        };
                    }
                    return service;
                });
            });
        };

        window.addEventListener('servicesUpdated', handleUpdate as EventListener);
        return () => window.removeEventListener('servicesUpdated', handleUpdate as EventListener);
    }, []);

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Profesyonel Temizlik Hizmetleri</span>
                        <h1 className={styles.heroTitle}>Hizmetlerimiz</h1>
                        <p className={styles.heroDescription}>
                            Antalya&apos;da ev, ofis ve endüstriyel temizlik ihtiyaçlarınız için
                            kapsamlı ve profesyonel çözümler sunuyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className={styles.services}>
                <div className={styles.container}>
                    <div className={styles.servicesGrid}>
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className={styles.serviceCard}
                                style={{ '--accent-color': service.color } as React.CSSProperties}
                            >
                                <div className={styles.serviceIcon}>{service.icon}</div>
                                <h2 className={styles.serviceTitle}>{service.title}</h2>
                                <p className={styles.serviceDescription}>{service.description}</p>

                                <ul className={styles.serviceFeatures}>
                                    {service.features.map((feature, i) => (
                                        <li key={i}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.serviceFooter}>
                                    <span className={styles.servicePrice}>{service.price}</span>
                                    <Link href={`/hizmetler/${service.id}`} className={styles.serviceLink}>
                                        Detaylı Bilgi
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2>İhtiyacınıza Uygun Hizmeti Bulamadınız mı?</h2>
                        <p>Özel temizlik ihtiyaçlarınız için bizimle iletişime geçin. Size özel çözümler sunalım.</p>
                        <div className={styles.ctaButtons}>
                            <Link href="/teklif-al" className="btn btn-accent btn-lg">
                                Teklif Al
                            </Link>
                            <a href={phoneUrl} className="btn btn-secondary btn-lg">
                                Hemen Ara: {settings.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
