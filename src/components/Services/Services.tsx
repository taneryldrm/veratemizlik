import Link from 'next/link';
import styles from './Services.module.css';

const services = [
    {
        id: 'ev-temizligi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        ),
        title: 'Ev Temizliği',
        description: 'Evinizi profesyonel ekibimiz ve çevre dostu ürünlerle pırıl pırıl yapıyoruz. Düzenli veya tek seferlik temizlik seçenekleri.',
        features: ['Genel Temizlik', 'Derin Temizlik', 'Haftalık/Aylık Paketler'],
        color: '#0056b3',
    },
    {
        id: 'ofis-temizligi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        title: 'Ofis Temizliği',
        description: 'İş yeriniz için hijyenik ve profesyonel çalışma ortamı sağlıyoruz. Günlük ve haftalık temizlik programları.',
        features: ['Günlük Temizlik', 'Hijyen Dezenfektasyonu', 'Cam Temizliği'],
        color: '#20c997',
    },
    {
        id: 'dis-cephe-temizligi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        title: 'Dış Cephe Temizliği',
        description: 'Bina dış cephelerinizi endüstriyel ekipmanlarla temizliyor, ilk günkü görünümüne kavuşturuyoruz.',
        features: ['Yüksek Basınçlı Yıkama', 'Cam Cephe Temizliği', 'Kireç ve Leke Çıkarma'],
        color: '#17a2b8',
    },
    {
        id: 'insaat-sonrasi-temizlik',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        title: 'İnşaat Sonrası Temizlik',
        description: 'Tadilat ve inşaat sonrası oluşan toz, boya ve moloz artıklarını profesyonelce temizliyoruz.',
        features: ['Moloz Temizliği', 'Boya Lekesi Çıkarma', 'Detaylı İç Temizlik'],
        color: '#fd7e14',
    },
    {
        id: 'merdiven-temizligi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 20h4v-4h4v-4h4V8h4V4" />
                <path d="M4 20v-4h4v-4h4V8h4V4h4" />
            </svg>
        ),
        title: 'Merdiven Temizliği',
        description: 'Apartman ve site merdiven temizliği ile ortak alanlarınızı hijyenik tutuyoruz.',
        features: ['Korkuluk Temizliği', 'Zemin Dezenfektasyonu', 'Periyodik Bakım'],
        color: '#6f42c1',
    },
    {
        id: 'yangin-sonrasi-temizlik',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
            </svg>
        ),
        title: 'Yangın Sonrası Temizlik',
        description: 'Yangın hasarı sonrası is, kurum ve koku giderim hizmeti ile mekanlarınızı restore ediyoruz.',
        features: ['İs ve Kurum Temizliği', 'Koku Giderme', 'Hasar Restorasyon'],
        color: '#dc3545',
    },
    {
        id: 'villa-temizligi',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4 8 4v14" />
                <path d="M9 21v-6h6v6" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
            </svg>
        ),
        title: 'Villa Temizliği',
        description: 'Villalarınız için kapsamlı iç ve dış mekan temizlik hizmeti. Havuz ve bahçe dahil.',
        features: ['İç Mekan Temizliği', 'Havuz Kenarı Temizlik', 'Bahçe Düzenlemesi'],
        color: '#28a745',
    },
];

export default function Services() {
    return (
        <section className={styles.services} id="hizmetler">
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Hizmetlerimiz</span>
                    <h2 className={styles.title}>
                        Profesyonel Temizlik <span className={styles.highlight}>Çözümlerimiz</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Antalya&apos;da ev, ofis ve endüstriyel temizlik ihtiyaçlarınız için kapsamlı hizmet yelpazesi sunuyoruz.
                        Her projede çevre dostu ürünler ve uzman ekibimizle yanınızdayız.
                    </p>
                </div>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <Link
                            href={`/hizmetler/${service.id}`}
                            key={service.id}
                            className={styles.card}
                            style={{ '--accent-color': service.color } as React.CSSProperties}
                        >
                            <div className={styles.cardIcon} style={{ animationDelay: `${index * 0.1}s` }}>
                                {service.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{service.title}</h3>
                            <p className={styles.cardDescription}>{service.description}</p>
                            <ul className={styles.cardFeatures}>
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <span className={styles.cardLink}>
                                Detaylı Bilgi
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className={styles.cta}>
                    <Link href="/hizmetler" className="btn btn-primary btn-lg">
                        Tüm Hizmetleri Görüntüle
                    </Link>
                    <Link href="/teklif-al" className="btn btn-secondary btn-lg">
                        Ücretsiz Teklif Al
                    </Link>
                </div>
            </div>
        </section>
    );
}
