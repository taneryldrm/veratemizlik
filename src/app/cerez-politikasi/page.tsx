import { Metadata } from 'next';
import styles from '../gizlilik-politikasi/gizlilik.module.css';

export const metadata: Metadata = {
    title: 'Çerez Politikası',
    description: 'Vera Temizlik çerez politikası. Web sitemizde kullanılan çerezler hakkında bilgi edinin.',
};

export default function CerezPolitikasiPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <h1>Çerez Politikası</h1>
                    <p>Son güncelleme: 15 Ocak 2024</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <h2>1. Çerez Nedir?</h2>
                        <p>
                            Çerezler, web sitelerinin tarayıcınıza yerleştirdiği küçük metin
                            dosyalarıdır. Bu dosyalar, siteyi tekrar ziyaret ettiğinizde sizi
                            tanımak, tercihlerinizi hatırlamak ve size daha iyi bir deneyim
                            sunmak için kullanılır.
                        </p>

                        <h2>2. Kullandığımız Çerez Türleri</h2>

                        <h3>2.1 Zorunlu Çerezler</h3>
                        <p>
                            Bu çerezler, web sitesinin düzgün çalışması için gereklidir. Bunlar
                            olmadan temel işlevler çalışmaz. Bu çerezleri reddedemezsiniz.
                        </p>

                        <h3>2.2 Analitik Çerezler</h3>
                        <p>
                            Ziyaretçilerin siteyi nasıl kullandığını anlamamıza yardımcı olur.
                            Bu bilgiler, siteyi iyileştirmemize katkıda bulunur. Google Analytics
                            gibi hizmetler bu kategoridedir.
                        </p>

                        <h3>2.3 İşlevsel Çerezler</h3>
                        <p>
                            Tercihlerinizi (dil, bölge vb.) hatırlamak için kullanılır. Size
                            kişiselleştirilmiş bir deneyim sunar.
                        </p>

                        <h3>2.4 Pazarlama Çerezler</h3>
                        <p>
                            İlgi alanlarınıza göre reklam göstermek için kullanılır. Üçüncü
                            taraf reklam ağları tarafından yerleştirilebilir.
                        </p>

                        <h2>3. Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
                        <p>
                            Çerezleri tarayıcı ayarlarınızdan yönetebilir veya reddedebilirsiniz.
                            Her tarayıcının çerez yönetimi farklı olabilir:
                        </p>
                        <ul>
                            <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                            <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                            <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                            <li><strong>Edge:</strong> Ayarlar → Gizlilik → Çerezler</li>
                        </ul>

                        <h2>4. Üçüncü Taraf Çerezleri</h2>
                        <p>
                            Sitemiz, aşağıdaki üçüncü taraf hizmetlerinden çerez alabilir:
                        </p>
                        <ul>
                            <li><strong>Google Analytics:</strong> Site analizi için</li>
                            <li><strong>Google Maps:</strong> Harita hizmetleri için</li>
                            <li><strong>Facebook Pixel:</strong> Pazarlama amaçlı</li>
                        </ul>

                        <h2>5. Çerezleri Devre Dışı Bırakmanın Etkileri</h2>
                        <p>
                            Çerezleri devre dışı bırakmak, web sitesinin bazı özelliklerinin
                            düzgün çalışmamasına neden olabilir. Örneğin, form gönderimlerinde
                            sorun yaşayabilir veya tercihleriniz hatırlanmayabilir.
                        </p>

                        <h2>6. Değişiklikler</h2>
                        <p>
                            Bu çerez politikasını gerektiğinde güncelleyebiliriz. Önemli
                            değişikliklerde sizi bilgilendireceğiz.
                        </p>

                        <h2>7. İletişim</h2>
                        <p>
                            Çerez politikamız hakkında sorularınız için:
                        </p>
                        <p>
                            <strong>E-posta:</strong> info@veratemizlik.com<br />
                            <strong>Telefon:</strong> 0242 123 45 67
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
}
