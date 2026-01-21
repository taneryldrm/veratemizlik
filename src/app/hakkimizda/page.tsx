import { Metadata } from 'next';
import styles from './hakkimizda.module.css';

export const metadata: Metadata = {
    title: 'Hakkımızda',
    description: 'Vera Temizlik, 12 yıllık deneyimi ile Antalya\'nın lider temizlik şirketidir. Misyonumuz, vizyonumuz ve değerlerimiz hakkında bilgi edinin.',
};

const values = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
            </svg>
        ),
        title: 'Güvenilirlik',
        description: 'Müşterilerimize karşı dürüst ve şeffaf bir iletişim ile güven inşa ediyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
            </svg>
        ),
        title: 'Dakiklik',
        description: 'Randevularımıza sadık kalarak, işlerimizi zamanında tamamlıyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
        ),
        title: 'Kalite',
        description: 'Her projede en yüksek standartlarda hizmet sunmayı hedefliyoruz.',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
        ),
        title: 'Müşteri Memnuniyeti',
        description: 'Müşteri memnuniyeti bizim için en önemli başarı kriteridir.',
    },
];



const timeline = [
    { year: '2012', title: 'Kuruluş', description: 'Vera Temizlik, Antalya\'da küçük bir ekiple faaliyetlerine başladı.' },
    { year: '2015', title: 'Büyüme', description: 'Ekibimiz 20 kişiye ulaştı ve kurumsal müşterilerimiz arttı.' },
    { year: '2018', title: 'Genişleme', description: 'Yeni hizmet alanları eklendi ve endüstriyel temizlik hizmetine başlandı.' },
    { year: '2021', title: 'Modernizasyon', description: 'En son teknoloji ekipmanlar ve çevre dostu ürünlerle hizmet kalitemizi artırdık.' },
    { year: '2024', title: 'Liderlik', description: 'Antalya\'nın en güvenilir temizlik şirketi olarak konumumuzu güçlendirdik.' },
];

export default function HakkimizdaPage() {
    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Bizi Tanıyın</span>
                        <h1 className={styles.heroTitle}>Hakkımızda</h1>
                        <p className={styles.heroDescription}>
                            12 yıllık deneyimimizle Antalya&apos;nın lider temizlik şirketi olarak
                            binlerce müşteriye güvenilir hizmet sunuyoruz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className={styles.story}>
                <div className={styles.container}>
                    <div className={styles.storyGrid}>
                        <div className={styles.storyContent}>
                            <span className={styles.sectionBadge}>Hikayemiz</span>
                            <h2>Temizlikte Mükemmelliğe Adanmış Bir Yolculuk</h2>
                            <p>
                                Vera Temizlik, 2012 yılında Antalya&apos;da küçük bir ekiple kuruldu.
                                Amacımız basitti: müşterilerimize en kaliteli, en güvenilir ve en
                                profesyonel temizlik hizmetini sunmak.
                            </p>
                            <p>
                                Yıllar içinde ekibimiz büyüdü, hizmet yelpazemiz genişledi ve teknolojimiz
                                gelişti. Ancak değişmeyen tek şey, kaliteye ve müşteri memnuniyetine olan
                                bağlılığımız oldu.
                            </p>
                            <p>
                                Bugün, 50&apos;den fazla uzman personelimiz ve modern ekipmanlarımızla
                                Antalya ve çevresinde binlerce eve, ofise ve işletmeye hizmet veriyoruz.
                            </p>
                        </div>
                        <div className={styles.storyStats}>
                            <div className={styles.statCard}>
                                <span className={styles.statNumber}>12+</span>
                                <span className={styles.statLabel}>Yıllık Deneyim</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statNumber}>5000+</span>
                                <span className={styles.statLabel}>Mutlu Müşteri</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statNumber}>50+</span>
                                <span className={styles.statLabel}>Uzman Personel</span>
                            </div>
                            <div className={styles.statCard}>
                                <span className={styles.statNumber}>%98</span>
                                <span className={styles.statLabel}>Memnuniyet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className={styles.missionVision}>
                <div className={styles.container}>
                    <div className={styles.mvGrid}>
                        <div className={styles.mvCard}>
                            <div className={styles.mvIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <circle cx="12" cy="12" r="6" />
                                    <circle cx="12" cy="12" r="2" />
                                </svg>
                            </div>
                            <h3>Misyonumuz</h3>
                            <p>
                                Çevre dostu ürünler ve profesyonel ekibimizle, yaşam ve çalışma alanlarınızı
                                sağlıklı, hijyenik ve ferah ortamlara dönüştürmek. Müşterilerimizin
                                beklentilerini aşan hizmet sunarak sektörde fark yaratmak.
                            </p>
                        </div>
                        <div className={styles.mvCard}>
                            <div className={styles.mvIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            </div>
                            <h3>Vizyonumuz</h3>
                            <p>
                                Türkiye&apos;nin en güvenilir ve yenilikçi temizlik şirketi olmak.
                                Sürdürülebilir uygulamalar ve teknolojik yeniliklerle sektöre öncülük
                                ederek, temizlik hizmetlerinde standartları yükseltmek.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className={styles.values}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Değerlerimiz</span>
                        <h2>Bizi Biz Yapan Değerler</h2>
                    </div>
                    <div className={styles.valuesGrid}>
                        {values.map((value, index) => (
                            <div key={index} className={styles.valueCard}>
                                <div className={styles.valueIcon}>{value.icon}</div>
                                <h4>{value.title}</h4>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className={styles.timeline}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.sectionBadge}>Kilometre Taşları</span>
                        <h2>Yolculuğumuz</h2>
                    </div>
                    <div className={styles.timelineWrapper}>
                        {timeline.map((item, index) => (
                            <div key={index} className={styles.timelineItem}>
                                <div className={styles.timelineYear}>{item.year}</div>
                                <div className={styles.timelineContent}>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


        </div>
    );
}
