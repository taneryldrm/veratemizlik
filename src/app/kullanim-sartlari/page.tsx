import { Metadata } from 'next';
import styles from '../gizlilik-politikasi/gizlilik.module.css';

export const metadata: Metadata = {
    title: 'Kullanım Şartları',
    description: 'Vera Temizlik kullanım şartları. Web sitemizi kullanırken uyulması gereken kurallar ve koşullar.',
};

export default function KullanimSartlariPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <h1>Kullanım Şartları</h1>
                    <p>Son güncelleme: 15 Ocak 2024</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <h2>1. Genel Şartlar</h2>
                        <p>
                            Bu web sitesini (&quot;Site&quot;) kullanarak, aşağıdaki kullanım şartlarını
                            kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız, lütfen Siteyi
                            kullanmayın. Vera Temizlik, bu şartları herhangi bir zamanda değiştirme
                            hakkını saklı tutar.
                        </p>

                        <h2>2. Hizmet Tanımı</h2>
                        <p>
                            Vera Temizlik, Antalya ve çevresinde profesyonel temizlik hizmetleri
                            sunan bir şirkettir. Bu Site, hizmetlerimiz hakkında bilgi vermek,
                            teklif talepleri almak ve müşterilerimizle iletişim kurmak amacıyla
                            işletilmektedir.
                        </p>

                        <h2>3. Kullanıcı Yükümlülükleri</h2>
                        <p>Site kullanıcıları olarak:</p>
                        <ul>
                            <li>Doğru ve güncel bilgiler sağlamayı</li>
                            <li>Siteyi yalnızca yasal amaçlarla kullanmayı</li>
                            <li>Başkalarının haklarına saygı göstermeyi</li>
                            <li>Sitenin güvenliğini tehlikeye atacak eylemlerden kaçınmayı</li>
                            <li>Spam veya zararlı içerik paylaşmamayı</li>
                        </ul>
                        <p>kabul etmiş sayılırsınız.</p>

                        <h2>4. Fikri Mülkiyet Hakları</h2>
                        <p>
                            Bu Sitedeki tüm içerik, tasarım, logolar, metinler, görseller ve diğer
                            materyaller Vera Temizlik&apos;in mülkiyetindedir veya lisanslı kullanım
                            hakkına sahiptir. İçeriklerin izinsiz kopyalanması, çoğaltılması veya
                            dağıtılması yasaktır.
                        </p>

                        <h2>5. Teklif ve Fiyatlandırma</h2>
                        <p>
                            Sitede belirtilen fiyatlar tahmini olup, kesin fiyat teklifi hizmet
                            değerlendirmesi sonrasında sunulur. Vera Temizlik, fiyatları önceden
                            haber vermeksizin değiştirme hakkını saklı tutar. Tüm fiyatlara KDV dahildir.
                        </p>

                        <h2>6. Randevu ve İptal</h2>
                        <p>
                            Randevular, karşılıklı onay ile kesinleşir. İptal veya değişiklik
                            talepleri, randevu saatinden en az 24 saat önce bildirilmelidir.
                            Son dakika iptalleri veya no-show durumlarında hizmet bedeli talep
                            edilebilir.
                        </p>

                        <h2>7. Sorumluluk Sınırlaması</h2>
                        <p>
                            Vera Temizlik, hizmetlerini en yüksek standartlarda sunmaya çalışır.
                            Ancak, doğal aşınma, mevcut hasar veya kontrol dışı faktörlerden
                            kaynaklanan durumlar için sorumluluk kabul edilmez. Tüm hizmetlerimiz
                            sigortalıdır.
                        </p>

                        <h2>8. Bağlantılar</h2>
                        <p>
                            Bu Site, üçüncü taraf web sitelerine bağlantılar içerebilir. Bu
                            bağlantılar yalnızca bilgi amaçlıdır ve Vera Temizlik, bu sitelerin
                            içeriklerinden sorumlu değildir.
                        </p>

                        <h2>9. Uygulanacak Hukuk</h2>
                        <p>
                            Bu kullanım şartları, Türkiye Cumhuriyeti kanunlarına tabidir.
                            Her türlü uyuşmazlık için Antalya Mahkemeleri ve İcra Daireleri yetkilidir.
                        </p>

                        <h2>10. İletişim</h2>
                        <p>
                            Kullanım şartları hakkında sorularınız için bizimle iletişime geçebilirsiniz:
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
