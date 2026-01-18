import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ServiceDetailClient from './ServiceDetailClient';

// Service data
const servicesData: Record<string, {
    title: string;
    description: string;
    longDescription: string;
    features: string[];
    equipment: string[];
    steps: { title: string; description: string }[];
    faq: { question: string; answer: string }[];
    price: string;
    color: string;
}> = {
    'ev-temizligi': {
        title: 'Ev Temizliği',
        description: 'Evinizi profesyonel ekibimiz ve çevre dostu ürünlerle pırıl pırıl yapıyoruz.',
        longDescription: 'Vera Temizlik olarak ev temizliği hizmetimizle, yaşam alanlarınızı sağlıklı ve hijyenik bir ortama dönüştürüyoruz. Uzman ekibimiz, çevre dostu ve sertifikalı temizlik ürünleri kullanarak evinizin her köşesini titizlikle temizler. Düzenli haftalık, iki haftalık veya aylık temizlik paketlerimizle ihtiyacınıza uygun çözümler sunuyoruz.',
        features: ['Salon ve odaların genel temizliği', 'Mutfak derin temizliği', 'Banyo ve tuvalet dezenfeksiyonu', 'Zemin silme ve ovma', 'Toz alma ve mobilya temizliği', 'Cam ve ayna temizliği', 'Yatak düzenleme', 'Çöplerin boşaltılması'],
        equipment: ['Çevre dostu temizlik ürünleri', 'Mikrofiber bezler', 'HEPA filtreli elektrikli süpürge', 'Buhar makinesi', 'Dezenfektan solüsyonlar'],
        steps: [
            { title: 'Değerlendirme', description: 'Evinizi inceleyerek ihtiyaçlarınızı belirliyoruz.' },
            { title: 'Planlama', description: 'Size özel bir temizlik planı oluşturuyoruz.' },
            { title: 'Uygulama', description: 'Profesyonel ekibimiz temizlik işlemini gerçekleştiriyor.' },
            { title: 'Kontrol', description: 'İş bitiminde kalite kontrolü yapıyoruz.' },
        ],
        faq: [
            { question: 'Temizlik ne kadar sürer?', answer: 'Standart bir daire temizliği ortalama 3-4 saat sürmektedir. Evin büyüklüğüne ve durumuna göre bu süre değişebilir.' },
            { question: 'Kendi temizlik malzemeleri mi kullanılır?', answer: 'Evet, tüm temizlik malzemeleri ve ekipmanları tarafımızca sağlanır. Özel talebiniz varsa sizin ürünlerinizi de kullanabiliriz.' },
            { question: 'Evde bulunmam gerekiyor mu?', answer: 'Hayır, güvenilir ekibimiz anahtarınızı teslim alarak temizlik yapabilir. Anahtar teslim hizmeti sunuyoruz.' },
        ],
        price: '₺500\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'yerinde-koltuk-yikama': {
        title: 'Yerinde Koltuk Yıkama',
        description: 'Koltuklarınızı yerinde, profesyonel makinelerle yıkıyor, ilk günkü temizliğine kavuşturuyoruz.',
        longDescription: 'Yerinde koltuk yıkama hizmetimizle, koltuklarınızı taşımadan, evinizde veya ofisinizde profesyonel vakumlu yıkama makineleriyle derinlemesine temizliyoruz. Kumaş türüne özel şampuanlar kullanarak lekeleri çıkarıyor, akarları ve bakterileri yok ediyoruz.',
        features: ['Leke çıkarma işlemi', 'Vakumlu derin temizlik', 'Bakteri ve akar temizliği', 'Koku giderme', 'Hızlı kuruma', 'Kumaş koruma', 'Yerinde hizmet'],
        equipment: ['Sanayi tipi vakumlu yıkama makinesi', 'Kumaşa özel şampuanlar', 'Leke sökücü solüsyonlar', 'Fırçalama makinesi'],
        steps: [
            { title: 'Toz Alma', description: 'Koltuk yüzeyindeki tozları güçlü vakumla çekiyoruz.' },
            { title: 'Leke Müdahalesi', description: 'Varsa zorlu lekelere özel solüsyon uyguluyoruz.' },
            { title: 'Şampuanlama', description: 'Kumaşa uygun şampuanla fırçalama yapıyoruz.' },
            { title: 'Vakumlama', description: 'Kirli suyu güçlü vakumla çekerek duruluyoruz.' },
        ],
        faq: [
            { question: 'Koltuklar ne zaman kurur?', answer: 'Ortam sıcaklığına ve havalandırmaya bağlı olarak ortalama 4-6 saat içinde tamamen kurur.' },
            { question: 'Her türlü leke çıkar mı?', answer: 'Çoğu lekeyi çıkarabiliyoruz ancak kumaşın yapısına işlemiş çok eski veya kimyasal yanığı olan lekeler tamamen çıkmayabilir.' },
            { question: 'Kumaş zarar görür mü?', answer: 'Hayır, kumaş türüne uygun şampuan ve fırça kullanarak hassas bir temizlik yapıyoruz.' },
        ],
        price: '₺750\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'ofis-temizligi': {
        title: 'Ofis Temizliği',
        description: 'İş yeriniz için hijyenik ve profesyonel çalışma ortamı sağlıyoruz.',
        longDescription: 'Ofis temizliği hizmetimizle çalışanlarınız ve müşterileriniz için hijyenik, sağlıklı ve profesyonel bir çalışma ortamı oluşturuyoruz. Günlük, haftalık veya özel programlı temizlik seçeneklerimizle iş akışınızı kesintiye uğratmadan hizmet veriyoruz.',
        features: ['Çalışma alanları temizliği', 'Toplantı odaları temizliği', 'Ortak alan temizliği', 'Mutfak ve pantry temizliği', 'Tuvalet dezenfeksiyonu', 'Zemin bakımı', 'Cam temizliği', 'Çöp yönetimi'],
        equipment: ['Endüstriyel temizlik makineleri', 'Antibakteriyel dezenfektanlar', 'Profesyonel zemin bakım ürünleri', 'Cam temizlik ekipmanları'],
        steps: [
            { title: 'Keşif', description: 'Ofisinizi ziyaret ederek ihtiyaç analizi yapıyoruz.' },
            { title: 'Teklif', description: 'İhtiyaçlarınıza uygun fiyat teklifi sunuyoruz.' },
            { title: 'Program', description: 'Size uygun temizlik programı oluşturuyoruz.' },
            { title: 'Uygulama', description: 'Düzenli ve profesyonel temizlik hizmeti sağlıyoruz.' },
        ],
        faq: [
            { question: 'Mesai saatleri dışında temizlik yapılabilir mi?', answer: 'Evet, hafta sonu veya mesai sonrası temizlik hizmeti sunuyoruz. Çalışma düzeninizi bozmadan hizmet veriyoruz.' },
            { question: 'Günlük temizlik hizmeti var mı?', answer: 'Evet, günlük, haftalık veya aylık temizlik paketlerimiz mevcuttur. İhtiyacınıza göre esnek çözümler sunuyoruz.' },
            { question: 'Bilgisayar ve elektronik cihazlar temizleniyor mu?', answer: 'Evet, özel ekipmanlarımızla bilgisayar, telefon ve diğer elektronik cihazların dış yüzeylerini güvenli bir şekilde temizliyoruz.' },
        ],
        price: '₺750\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'dis-cephe-temizligi': {
        title: 'Dış Cephe Temizliği',
        description: 'Bina dış cephelerinizi endüstriyel ekipmanlarla temizliyoruz.',
        longDescription: 'Dış cephe temizliği hizmetimizle binanızın dış görünümünü yeniliyor, kir, leke ve çevre kirliliğinden kaynaklanan birikintileri profesyonelce temizliyoruz. Yüksek katlı binalar için güvenli çalışma prosedürleri uyguluyoruz.',
        features: ['Yüksek basınçlı yıkama', 'Cam cephe temizliği', 'Kireç ve leke çıkarma', 'Cephe yenileme', 'Koruyucu kaplama', 'Tabela temizliği'],
        equipment: ['Yüksek basınçlı yıkama makineleri', 'İskele sistemleri', 'Güvenlik ekipmanları', 'Özel cephe temizlik solüsyonları'],
        steps: [
            { title: 'Keşif', description: 'Cephe durumunu ve kirlilik seviyesini değerlendiriyoruz.' },
            { title: 'Güvenlik', description: 'Çalışma alanını güvenlik önlemleriyle koruma altına alıyoruz.' },
            { title: 'Temizlik', description: 'Uygun yöntemle cephe temizliğini gerçekleştiriyoruz.' },
            { title: 'Koruma', description: 'İsteğe bağlı koruyucu kaplama uyguluyoruz.' },
        ],
        faq: [
            { question: 'Hangi kat yüksekliğine kadar hizmet veriyorsunuz?', answer: 'Profesyonel ekipmanlarımızla 20 kata kadar güvenli bir şekilde dış cephe temizliği yapabiliyoruz.' },
            { question: 'Cam cephe temizliği dahil mi?', answer: 'Evet, cam cephe temizliği hizmetimize dahildir. Özel cam temizlik solüsyonları kullanıyoruz.' },
            { question: 'Hava koşulları temizliği etkiler mi?', answer: 'Yağmurlu ve çok rüzgarlı havalarda güvenlik nedeniyle çalışma yapılmaz. Bu durumlarda randevu ertelenir.' },
        ],
        price: '₺1.500\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'insaat-sonrasi-temizlik': {
        title: 'İnşaat Sonrası Temizlik',
        description: 'Tadilat ve inşaat sonrası profesyonel temizlik hizmeti.',
        longDescription: 'İnşaat veya tadilat sonrası oluşan toz, moloz, boya lekeleri ve artık malzemeleri profesyonel ekibimiz ve endüstriyel ekipmanlarımızla titizlikle temizliyoruz. Mekanınızı teslim öncesi kusursuz hale getiriyoruz.',
        features: ['İnce toz temizliği', 'Moloz ve artık temizliği', 'Boya lekesi çıkarma', 'Zemin temizliği ve cilalama', 'Cam ve doğrama temizliği', 'Mutfak ve banyo temizliği', 'Balkon ve teras temizliği'],
        equipment: ['Endüstriyel elektrikli süpürgeler', 'Zemin yıkama makineleri', 'Boya sökücü ürünler', 'Özel temizlik kimyasalları'],
        steps: [
            { title: 'Kaba Temizlik', description: 'Büyük moloz ve artıkları kaldırıyoruz.' },
            { title: 'Toz Alma', description: 'Tüm yüzeylerdeki ince tozu temizliyoruz.' },
            { title: 'Detay Temizlik', description: 'Her köşeyi detaylıca temizliyoruz.' },
            { title: 'Final', description: 'Son kontrol ve parlatma işlemi yapıyoruz.' },
        ],
        faq: [
            { question: 'Boya lekeleri çıkarılabiliyor mu?', answer: 'Evet, özel boya sökücü ürünlerimizle yüzeye zarar vermeden boya lekelerini temizliyoruz.' },
            { question: 'İnşaat atıkları da toplanıyor mu?', answer: 'Evet, inşaat atıklarını topluyoruz ancak büyük moloz için ayrı bir hafriyat hizmeti gerekebilir.' },
            { question: 'Fayans arası çimento temizliği yapılıyor mu?', answer: 'Evet, fayans ve seramik aralarındaki çimento kalıntılarını özel solüsyonlarla temizliyoruz.' },
        ],
        price: '₺1.000\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'merdiven-temizligi': {
        title: 'Merdiven Temizliği',
        description: 'Apartman ve site merdiven temizliği hizmeti.',
        longDescription: 'Apartman ve site ortak alanlarınızın hijyenini sağlamak için profesyonel merdiven temizliği hizmeti sunuyoruz. Düzenli bakım programlarımızla yaşam alanlarınızı her zaman temiz tutuyoruz.',
        features: ['Merdiven basamakları temizliği', 'Korkuluk ve tırabzan temizliği', 'Zemin yıkama', 'Cam ve ayna temizliği', 'Asansör alanı temizliği', 'Giriş holü temizliği'],
        equipment: ['Zemin yıkama makinesi', 'Dezenfektan ürünler', 'Mikrofiber mop sistemi', 'Cam temizlik ekipmanları'],
        steps: [
            { title: 'Süpürme', description: 'Kaba kir ve tozları süpürüyoruz.' },
            { title: 'Yıkama', description: 'Zemin ve basamakları yıkıyoruz.' },
            { title: 'Silme', description: 'Korkuluk ve aksesuarları siliyoruz.' },
            { title: 'Dezenfeksiyon', description: 'Temas noktalarını dezenfekte ediyoruz.' },
        ],
        faq: [
            { question: 'Hangi sıklıkta temizlik öneriyorsunuz?', answer: 'Apartmanın kullanım yoğunluğuna göre haftada 1-3 kez temizlik öneriyoruz.' },
            { question: 'Aylık anlaşma yapılıyor mu?', answer: 'Evet, aylık veya yıllık anlaşma ile daha uygun fiyatlar sunuyoruz.' },
            { question: 'Dezenfeksiyon dahil mi?', answer: 'Evet, her temizlikte kapı kolları, korkuluklar ve butonlar dezenfekte edilir.' },
        ],
        price: '₺300\'den başlayan fiyatlar',
        color: '#0056b3',
    },
    'yangin-sonrasi-temizlik': {
        title: 'Yangın Sonrası Temizlik',
        description: 'Yangın hasarı sonrası profesyonel temizlik ve restorasyon.',
        longDescription: 'Yangın sonrası oluşan is, kurum, duman izi ve kokuları profesyonel ekipmanlarla temizliyor, mekanınızı eski haline kavuşturuyoruz. Restorasyon sürecinde sizinle birlikte çalışıyoruz.',
        features: ['İs ve kurum temizliği', 'Duman kokusu giderme', 'Duvar ve tavan temizliği', 'Mobilya temizliği', 'Havalandırma sistemi temizliği', 'Dezenfeksiyon'],
        equipment: ['Ozon jeneratörleri', 'HEPA filtreli hava temizleyiciler', 'Endüstriyel temizlik makineleri', 'Özel is temizleme kimyasalları'],
        steps: [
            { title: 'Hasar Tespiti', description: 'Yangın hasarının boyutunu değerlendiriyoruz.' },
            { title: 'Havalandırma', description: 'Alanı havalandırarak zararlı gazları uzaklaştırıyoruz.' },
            { title: 'Temizlik', description: 'İs, kurum ve kalıntıları temizliyoruz.' },
            { title: 'Koku Giderme', description: 'Ozon tedavisi ile duman kokusunu gideriyoruz.' },
        ],
        faq: [
            { question: 'Duman kokusu tamamen giderilebiliyor mu?', answer: 'Evet, ozon tedavisi ve özel ürünlerle duman kokusunu tamamen giderebiliyoruz. İşlem birkaç gün sürebilir.' },
            { question: 'Sigorta için rapor veriliyor mu?', answer: 'Evet, yapılan işlemler için detaylı rapor hazırlıyoruz.' },
            { question: 'Kurtarılabilir eşyalar temizleniyor mu?', answer: 'Evet, yangından etkilenen ancak kurtarılabilir durumda olan eşyaları da temizliyoruz.' },
        ],
        price: 'Keşif sonrası fiyatlandırma',
        color: '#0056b3',
    },
    'villa-temizligi': {
        title: 'Villa Temizliği',
        description: 'Villalarınız için kapsamlı iç ve dış mekan temizliği.',
        longDescription: 'Villa temizliği hizmetimizle lüks yaşam alanlarınızın her köşesini titizlikle temizliyoruz. İç mekanlardan havuz kenarına, bahçeden terasa kadar tüm alanlar için özel çözümler sunuyoruz.',
        features: ['Tüm iç mekan temizliği', 'Havuz ve çevresi temizliği', 'Bahçe mobilyası temizliği', 'Teras ve balkon temizliği', 'Garaj temizliği', 'Dış mekan yıkama', 'Periyodik bakım'],
        equipment: ['Yüksek basınçlı yıkama makinesi', 'Havuz temizlik ekipmanları', 'Bahçe temizlik araçları', 'Profesyonel iç mekan ekipmanları'],
        steps: [
            { title: 'Planlama', description: 'Villa\'nın tüm alanlarını değerlendiriyoruz.' },
            { title: 'İç Mekan', description: 'Tüm iç mekanları detaylıca temizliyoruz.' },
            { title: 'Dış Mekan', description: 'Bahçe, teras ve havuz alanını temizliyoruz.' },
            { title: 'Kontrol', description: 'Final kontrolü yaparak teslim ediyoruz.' },
        ],
        faq: [
            { question: 'Havuz temizliği dahil mi?', answer: 'Havuz çevresi temizliği dahildir. Havuz içi bakım için ayrı bir hizmet sunuyoruz.' },
            { question: 'Bahçe bakımı yapılıyor mu?', answer: 'Bahçe temizliği yapıyoruz ancak bitki bakımı (budama, sulama) ayrı bir hizmettir.' },
            { question: 'Sezonluk villa temizliği var mı?', answer: 'Evet, yazlık villaların sezon açılışı ve kapanışı için özel paketlerimiz var.' },
        ],
        price: '₺1.200\'den başlayan fiyatlar',
        color: '#0056b3',
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        return {
            title: 'Hizmet Bulunamadı',
        };
    }

    return {
        title: service.title,
        description: service.description,
        openGraph: {
            title: `${service.title} | Vera Temizlik`,
            description: service.description,
        },
    };
}

export async function generateStaticParams() {
    return Object.keys(servicesData).map((slug) => ({
        slug,
    }));
}

export default async function HizmetDetayPage({ params }: Props) {
    const { slug } = await params;
    const service = servicesData[slug];

    if (!service) {
        notFound();
    }

    return <ServiceDetailClient slug={slug} initialService={service} />;
}
