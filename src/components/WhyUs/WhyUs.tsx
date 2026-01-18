import styles from './WhyUs.module.css';

const features = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Güvenilir Hizmet',
        description: '12 yıllık tecrübemiz ve binlerce mutlu müşterimizle Antalya\'nın en güvenilir temizlik firmasıyız.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Zamanında Teslimat',
        description: 'Randevularımıza sadık kalarak, işlerimizi belirlenen sürede tamamlıyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
                <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                <polyline points="7.5 19.79 7.5 14.6 3 12" />
                <polyline points="21 12 16.5 14.6 16.5 19.79" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
        ),
        title: 'Çevre Dostu Ürünler',
        description: 'Sağlığınızı ve çevreyi düşünerek sadece sertifikalı, organik temizlik ürünleri kullanıyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 00-3-3.87" />
                <path d="M16 3.13a4 4 0 010 7.75" />
            </svg>
        ),
        title: 'Uzman Kadro',
        description: '50+ eğitimli ve deneyimli personelimizle her türlü temizlik işini profesyonelce gerçekleştiriyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2v4" />
                <path d="M12 18v4" />
                <path d="M4.93 4.93l2.83 2.83" />
                <path d="M16.24 16.24l2.83 2.83" />
                <path d="M2 12h4" />
                <path d="M18 12h4" />
                <path d="M4.93 19.07l2.83-2.83" />
                <path d="M16.24 7.76l2.83-2.83" />
            </svg>
        ),
        title: 'Modern Ekipman',
        description: 'En son teknoloji endüstriyel temizlik makineleri ve ekipmanları ile hizmet veriyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 1v22" />
                <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        title: 'Uygun Fiyat',
        description: 'Kaliteli hizmeti uygun fiyatlarla sunuyoruz. Ücretsiz keşif ve şeffaf fiyatlandırma garantisi.',
    },
];

export default function WhyUs() {
    return (
        <section className={styles.whyUs}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.textSide}>
                        <span className={styles.badge}>Neden Vera Temizlik?</span>
                        <h2 className={styles.title}>
                            Temizlikte <span className={styles.highlight}>Fark Yaratan</span> Hizmet Anlayışımız
                        </h2>
                        <p className={styles.description}>
                            Sektördeki tecrübemiz, müşteri odaklı yaklaşımımız ve kaliteden ödün vermeyen
                            hizmet felsefemizle Antalya&apos;nın tercih edilen temizlik şirketiyiz.
                        </p>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>%98</span>
                                <span className={styles.statLabel}>Müşteri Memnuniyeti</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>24/7</span>
                                <span className={styles.statLabel}>Destek Hattı</span>
                            </div>
                            <div className={styles.statItem}>
                                <span className={styles.statValue}>%100</span>
                                <span className={styles.statLabel}>Sigortalı Hizmet</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.featuresSide}>
                        <div className={styles.featuresGrid}>
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className={styles.featureCard}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className={styles.featureIcon}>
                                        {feature.icon}
                                    </div>
                                    <div className={styles.featureContent}>
                                        <h4 className={styles.featureTitle}>{feature.title}</h4>
                                        <p className={styles.featureDescription}>{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className={styles.decoration1}></div>
            <div className={styles.decoration2}></div>
        </section>
    );
}
