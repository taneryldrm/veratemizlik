import { Metadata } from 'next';
import styles from './gizlilik.module.css';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası',
    description: 'Vera Temizlik gizlilik politikası. Kişisel verilerinizin nasıl işlendiği hakkında bilgi edinin.',
};

export default function GizlilikPolitikasiPage() {
    return (
        <div className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <h1>Gizlilik Politikası</h1>
                    <p>Son güncelleme: 15 Ocak 2024</p>
                </div>
            </section>

            <section className={styles.content}>
                <div className={styles.container}>
                    <article className={styles.article}>
                        <h2>1. Giriş</h2>
                        <p>
                            Vera Temizlik olarak (&quot;Şirket&quot;, &quot;biz&quot;, &quot;bizim&quot;), kişisel verilerinizin korunmasını
                            ciddiye alıyoruz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde ve
                            hizmetlerimizi kullandığınızda topladığımız, kullandığımız ve paylaştığımız
                            bilgileri açıklamaktadır.
                        </p>

                        <h2>2. Topladığımız Bilgiler</h2>
                        <p>Web sitemizi ve hizmetlerimizi kullandığınızda aşağıdaki bilgileri toplayabiliriz:</p>
                        <ul>
                            <li><strong>Kişisel Bilgiler:</strong> Ad, e-posta adresi, telefon numarası, adres</li>
                            <li><strong>İletişim Bilgileri:</strong> Form doldurmalarında sağladığınız bilgiler</li>
                            <li><strong>Teknik Bilgiler:</strong> IP adresi, tarayıcı türü, cihaz bilgileri</li>
                            <li><strong>Kullanım Bilgileri:</strong> Site içi gezinme verileri, tıklama bilgileri</li>
                        </ul>

                        <h2>3. Bilgilerin Kullanımı</h2>
                        <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
                        <ul>
                            <li>Hizmetlerimizi sağlamak ve yönetmek</li>
                            <li>Sizinle iletişim kurmak ve sorularınızı yanıtlamak</li>
                            <li>Teklif hazırlamak ve hizmet randevusu oluşturmak</li>
                            <li>Hizmet kalitemizi iyileştirmek</li>
                            <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                        </ul>

                        <h2>4. Bilgilerin Paylaşımı</h2>
                        <p>
                            Kişisel bilgilerinizi üçüncü taraflarla satmıyoruz. Ancak aşağıdaki
                            durumlarda bilgilerinizi paylaşabiliriz:
                        </p>
                        <ul>
                            <li>Yasal zorunluluklar nedeniyle</li>
                            <li>Hizmet sağlayıcılarımızla (ödeme işlemleri vb.)</li>
                            <li>Açık rızanız olduğunda</li>
                        </ul>

                        <h2>5. Çerezler</h2>
                        <p>
                            Web sitemiz, deneyiminizi iyileştirmek için çerezler kullanmaktadır.
                            Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır. Tarayıcı
                            ayarlarınızdan çerezleri yönetebilir veya reddedebilirsiniz.
                        </p>

                        <h2>6. Veri Güvenliği</h2>
                        <p>
                            Kişisel verilerinizi korumak için uygun teknik ve organizasyonel
                            güvenlik önlemleri alıyoruz. Ancak internet üzerinden hiçbir veri
                            iletimi veya depolama yöntemi %100 güvenli değildir.
                        </p>

                        <h2>7. Haklarınız</h2>
                        <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                        <ul>
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                            <li>Verilerin düzeltilmesini veya silinmesini isteme</li>
                            <li>İşlemenin kısıtlanmasını talep etme</li>
                            <li>Veri taşınabilirliği hakkı</li>
                        </ul>

                        <h2>8. İletişim</h2>
                        <p>
                            Gizlilik politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <p>
                            <strong>E-posta:</strong> info@veratemizlik.com<br />
                            <strong>Telefon:</strong> 0242 123 45 67<br />
                            <strong>Adres:</strong> Fener Mahallesi, Tekelioğlu Caddesi No: 123, Muratpaşa / Antalya
                        </p>

                        <h2>9. Değişiklikler</h2>
                        <p>
                            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli
                            değişiklikler yapıldığında sizi bilgilendireceğiz.
                        </p>
                    </article>
                </div>
            </section>
        </div>
    );
}
