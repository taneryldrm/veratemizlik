import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './blog-detay.module.css';

// Mock blog data
const blogPosts: Record<string, {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    author: { name: string; avatar: string };
}> = {
    'ev-temizliginde-10-altin-kural': {
        title: 'Ev Temizliğinde 10 Altın Kural',
        excerpt: 'Profesyonel temizlikçilerden öğrendiğimiz, evinizi her zaman pırıl pırıl tutacak 10 önemli temizlik kuralı.',
        content: `
      <p>Evinizi temiz ve düzenli tutmak, hem fiziksel hem de zihinsel sağlığınız için son derece önemlidir. Profesyonel temizlik ekibimizin yıllarca edindiği deneyimlerden derlediğimiz bu 10 altın kural, evinizi her zaman pırıl pırıl tutmanıza yardımcı olacak.</p>

      <h2>1. Yukarıdan Aşağıya Temizlik Yapın</h2>
      <p>Temizlik yaparken her zaman tavandan başlayıp zemine doğru inin. Bu sayede toz ve kirler yukarıdan aşağıya düşer ve daha önce temizlediğiniz yerleri tekrar kirletmezsiniz.</p>

      <h2>2. Her Odaya 10 Dakika Kuralı</h2>
      <p>Her gün her odada sadece 10 dakika temizlik yapın. Bu küçük alışkanlık, büyük temizlik günlerinin gerekliliğini azaltır ve evinizi sürekli düzenli tutar.</p>

      <h2>3. Doğru Ürünleri Kullanın</h2>
      <p>Her yüzey için doğru temizlik ürününü kullanmak hem daha etkili temizlik sağlar hem de yüzeylerinizi korur. Örneğin, mermer için asidik temizleyiciler kullanmayın.</p>

      <h2>4. Mikrofiber Bez Tercih Edin</h2>
      <p>Mikrofiber bezler, normal bezlere göre çok daha fazla toz ve kiri tutar. Üstelik yeniden yıkanıp kullanılabilirler, bu da hem ekonomik hem de çevre dostudur.</p>

      <h2>5. Döküntüleri Hemen Temizleyin</h2>
      <p>Halıya dökülen kahve veya yere dökülen sos, hemen temizlenirse leke bırakmaz. Bekledikçe temizlemesi zorlaşır.</p>

      <h2>6. Düzenli Havalandırma</h2>
      <p>Her gün en az 15-20 dakika pencerelerinizi açarak evinizi havalandırın. Temiz hava, hem ortam havasını tazeler hem de nem ve kokuları giderir.</p>

      <h2>7. Kapı Önü Paspası Kullanın</h2>
      <p>Kapı önüne bir paspas koymak, dışarıdan gelen kir ve tozun büyük kısmını engeller. Bu basit önlem, iç mekan temizliğini önemli ölçüde kolaylaştırır.</p>

      <h2>8. Haftalık Temizlik Planı Oluşturun</h2>
      <p>Her güne belirli görevler atayın: Pazartesi mutfak, Salı banyolar gibi. Bu sistem, işleri yönetilebilir parçalara böler.</p>

      <h2>9. Temizlik Malzemelerinizi Organize Edin</h2>
      <p>Tüm temizlik malzemelerinizi tek bir yerde, kolayca erişilebilir şekilde saklayın. Bu, temizlik yapma motivasyonunuzu artırır.</p>

      <h2>10. Profesyonel Desteği İhmal Etmeyin</h2>
      <p>Yılda en az 2-3 kez profesyonel derin temizlik yaptırmak, evinizin uzun vadeli temizliği ve hijyeni için önemlidir. Vera Temizlik olarak bu konuda size yardımcı olmaktan mutluluk duyarız.</p>

      <h2>Sonuç</h2>
      <p>Bu 10 altın kuralı takip ederek evinizi her zaman temiz ve düzenli tutabilirsiniz. Unutmayın, temizlik bir maraton, sprint değil. Küçük ama düzenli adımlar, büyük sonuçlar doğurur.</p>
    `,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=600&fit=crop',
        category: 'Temizlik İpuçları',
        date: '15 Ocak 2024',
        readTime: '5 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
    'cevre-dostu-temizlik-urunleri': {
        title: 'Çevre Dostu Temizlik Ürünleri Neden Önemli?',
        excerpt: 'Sağlığınız ve çevre için neden organik ve doğal temizlik ürünleri tercih etmelisiniz?',
        content: `
      <p>Günümüzde çevre bilinci artarken, evlerimizde kullandığımız temizlik ürünlerinin de çevre dostu olması önem kazanıyor. Bu yazıda, doğal temizlik ürünlerinin neden tercih edilmesi gerektiğini ve faydalarını inceleyeceğiz.</p>

      <h2>Geleneksel Temizlik Ürünlerinin Riskleri</h2>
      <p>Birçok geleneksel temizlik ürünü, sert kimyasallar içerir. Bu kimyasallar hem sağlığımıza hem de çevreye zarar verebilir. Özellikle kapalı mekanlarda kullanıldığında, bu ürünler iç hava kalitesini olumsuz etkiler.</p>

      <h2>Çevre Dostu Ürünlerin Avantajları</h2>
      <ul>
        <li>Daha az toksik madde içerir</li>
        <li>Biyolojik olarak parçalanabilir</li>
        <li>Ozon tabakasına zarar vermez</li>
        <li>Su kaynaklarını korur</li>
        <li>Alerjik reaksiyonları azaltır</li>
      </ul>

      <h2>Vera Temizlik'in Yaklaşımı</h2>
      <p>Vera Temizlik olarak, tüm temizlik hizmetlerimizde çevre dostu ve sertifikalı ürünler kullanıyoruz. Müşterilerimizin sağlığını ve çevreyi korumak önceliğimizdir.</p>
    `,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
        category: 'Sürdürülebilirlik',
        date: '12 Ocak 2024',
        readTime: '4 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
    'ofis-temizliginin-calisan-verimliligi-uzerine-etkisi': {
        title: 'Ofis Temizliğinin Çalışan Verimliliği Üzerine Etkisi',
        excerpt: 'Temiz ve düzenli bir çalışma ortamının iş performansına etkilerini araştırdık.',
        content: `
      <p>Çalışma ortamınızın temizliği, sadece görsel açıdan değil, çalışan sağlığı ve verimliliği açısından da büyük önem taşıyor. Araştırmalar, temiz bir ofisin çalışan performansını %15'e kadar artırabildiğini gösteriyor.</p>

      <h2>Temiz Ofisin Faydaları</h2>
      <ul>
        <li>Hastalık oranlarında azalma</li>
        <li>Konsantrasyon artışı</li>
        <li>Motivasyon yükselmesi</li>
        <li>Profesyonel imaj</li>
        <li>Müşteri memnuniyeti</li>
      </ul>

      <h2>Düzenli Temizliğin Önemi</h2>
      <p>Günlük temizlik rutinleri, bakterilerin ve virüslerin yayılmasını önler. Özellikle sık temas edilen yüzeyler (kapı kolları, klavyeler, telefonlar) düzenli olarak dezenfekte edilmelidir.</p>

      <h2>Profesyonel Çözümler</h2>
      <p>Vera Temizlik olarak, ofislerinize özel temizlik programları sunuyoruz. Mesai saatleri dışında hizmet vererek iş akışınızı kesintiye uğratmadan çalışma ortamınızı hijyenik tutuyoruz.</p>
    `,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop',
        category: 'İş Hayatı',
        date: '10 Ocak 2024',
        readTime: '6 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
    'kis-temizligi-icin-oneriler': {
        title: 'Kış Aylarında Ev Temizliği İçin Öneriler',
        excerpt: 'Soğuk havalarda evinizdeki hijyeni korumak için pratik temizlik tavsiyeleri.',
        content: `
      <p>Kış ayları, evinizde daha fazla vakit geçirdiğiniz dönemlerdir. Bu nedenle iç mekan temizliği ve hava kalitesi daha da önem kazanır. İşte kış temizliği için önerilerimiz.</p>

      <h2>Havalandırma</h2>
      <p>Soğuk havaya rağmen her gün en az 10-15 dakika evinizi havalandırın. Bu, iç ortamdaki mikropların azalmasına yardımcı olur.</p>

      <h2>Halı ve Kilim Bakımı</h2>
      <p>Kışın halılar daha fazla toz ve kir toplar. Haftada en az iki kez elektrikli süpürge ile temizlik yapın ve yılda bir kez profesyonel yıkama yaptırın.</p>

      <h2>Kalorifer ve Klimaların Temizliği</h2>
      <p>Isıtma sistemlerinizin filtrelerini düzenli temizleyin. Kirli filtreler enerji verimliliğini düşürür ve havadaki toz parçacıklarını artırır.</p>

      <h2>Profesyonel Destek</h2>
      <p>Kış dönemi öncesi derin temizlik yaptırmak, sezon boyunca daha sağlıklı bir ortam sağlar. Vera Temizlik olarak kış öncesi paketlerimizle hizmetinizdeyiz.</p>
    `,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&h=600&fit=crop',
        category: 'Temizlik İpuçları',
        date: '8 Ocak 2024',
        readTime: '4 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
    'antalya-temizlik-sirketi-nasil-secilir': {
        title: 'Antalya\'da Temizlik Şirketi Nasıl Seçilir?',
        excerpt: 'Güvenilir bir temizlik şirketi seçerken dikkat etmeniz gereken 7 önemli kriter.',
        content: `
      <p>Evinizi veya iş yerinizi emanet edeceğiniz temizlik şirketini seçerken dikkatli olmalısınız. İşte güvenilir bir temizlik şirketi seçerken dikkat etmeniz gereken 7 önemli kriter.</p>

      <h2>1. Referansları İnceleyin</h2>
      <p>Şirketin mevcut müşterilerinden referans isteyin ve online yorumları okuyun.</p>

      <h2>2. Sigorta ve Lisans</h2>
      <p>Şirketin gerekli sigorta ve lisanslara sahip olduğundan emin olun. Bu, olası hasarlarda korunmanızı sağlar.</p>

      <h2>3. Deneyim</h2>
      <p>Sektörde kaç yıldır faaliyet gösterdiğini ve uzmanlaştığı alanları öğrenin.</p>

      <h2>4. Kullanılan Ürünler</h2>
      <p>Çevre dostu ve sağlık açısından güvenli ürünler kullanan şirketleri tercih edin.</p>

      <h2>5. Şeffaf Fiyatlandırma</h2>
      <p>Gizli maliyetler olmadan, net ve anlaşılır fiyat teklifi sunan şirketleri seçin.</p>

      <h2>6. Personel Güvenliği</h2>
      <p>Çalışanların güvenlik araştırmasından geçip geçmediğini sorun.</p>

      <h2>7. Esneklik</h2>
      <p>İhtiyaçlarınıza göre özelleştirilmiş hizmet sunabilen şirketleri tercih edin.</p>

      <p>Vera Temizlik olarak, 12 yıllık deneyimimiz ve 5000+ mutlu müşterimizle bu kriterlerin tamamını karşılıyoruz.</p>
    `,
        image: 'https://images.unsplash.com/photo-1527515545081-5db817172677?w=1200&h=600&fit=crop',
        category: 'Rehber',
        date: '5 Ocak 2024',
        readTime: '5 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
    'mutfak-temizligi-adim-adim': {
        title: 'Mutfak Temizliği: Adım Adım Rehber',
        excerpt: 'Mutfağınızı profesyonel gibi temizlemek için detaylı adım adım rehberimiz.',
        content: `
      <p>Mutfak, evinizin en çok kullanılan ve en hızlı kirlenen alanlarından biridir. İşte mutfağınızı profesyonel gibi temizlemek için adım adım rehberimiz.</p>

      <h2>Adım 1: Hazırlık</h2>
      <p>Tezgahları boşaltın, bulaşıkları toplayın ve çöpleri atın. Temizlik için alan açın.</p>

      <h2>Adım 2: Yukarıdan Başlayın</h2>
      <p>Davlumbaz ve üst dolaplardan başlayın. Yağ sökücü ürünlerle silin.</p>

      <h2>Adım 3: Tezgahlar</h2>
      <p>Tüm tezgahları uygun temizleyiciyle silin. Kesme tahtalarını dezenfekte edin.</p>

      <h2>Adım 4: Ev Aletleri</h2>
      <p>Buzdolabı, fırın, mikrodalga ve diğer cihazları iç ve dıştan temizleyin.</p>

      <h2>Adım 5: Lavabo</h2>
      <p>Lavabo ve musluğu kireç çözücü ile temizleyin. Giderleri dezenfekte edin.</p>

      <h2>Adım 6: Zemin</h2>
      <p>Son olarak zemini süpürün ve uygun temizleyici ile paspas yapın.</p>

      <h2>Profesyonel Mutfak Temizliği</h2>
      <p>Ayda bir profesyonel derin mutfak temizliği yaptırmak, zorlu yağ birikintilerini ve bakteri üremesini önler. Vera Temizlik olarak mutfaklarınızı pırıl pırıl yapıyoruz.</p>
    `,
        image: 'https://images.unsplash.com/photo-1556909114-44e3e9699e2b?w=1200&h=600&fit=crop',
        category: 'Temizlik İpuçları',
        date: '3 Ocak 2024',
        readTime: '7 dk',
        author: { name: 'Vera Temizlik', avatar: 'VT' },
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) {
        return { title: 'Yazı Bulunamadı' };
    }

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default async function BlogDetayPage({ params }: Props) {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) {
        notFound();
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section
                className={styles.hero}
                style={{ backgroundImage: `url(${post.image})` }}
            >
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <Link href="/blog" className={styles.backLink}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Blog&apos;a Dön
                        </Link>
                        <span className={styles.category}>{post.category}</span>
                        <h1 className={styles.title}>{post.title}</h1>
                        <div className={styles.meta}>
                            <div className={styles.author}>
                                <div className={styles.authorAvatar}>{post.author.avatar}</div>
                                <span>{post.author.name}</span>
                            </div>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime} okuma</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className={styles.content}>
                <div className={styles.container}>
                    <article
                        className={styles.article}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share */}
                    <div className={styles.shareBox}>
                        <span>Bu yazıyı paylaş:</span>
                        <div className={styles.shareLinks}>
                            <a href="#" className={styles.shareLink} aria-label="Twitter'da Paylaş">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.shareLink} aria-label="Facebook'ta Paylaş">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.shareLink} aria-label="LinkedIn'de Paylaş">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                    <circle cx="4" cy="4" r="2" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className={styles.ctaBox}>
                        <h3>Profesyonel Temizlik Hizmeti İster Misiniz?</h3>
                        <p>Vera Temizlik olarak evinizi veya ofisinizi pırıl pırıl yapıyoruz.</p>
                        <Link href="/teklif-al" className="btn btn-primary btn-lg">
                            Ücretsiz Teklif Al
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
