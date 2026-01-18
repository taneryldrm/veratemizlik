'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addQuoteRequest } from '@/lib/quoteStore';
import styles from './Hero.module.css';

export default function Hero() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Hızlı teklif formu olduğu için diğer alanları boş/varsayılan gönderiyoruz
            addQuoteRequest({
                name: formData.name,
                phone: formData.phone,
                service: formData.service,
                email: '', // Hızlı formda yok
                area: '',
                rooms: '',
                frequency: '',
                address: '',
                notes: 'Hızlı teklif formundan iletildi.',
                preferredDate: '',
                preferredTime: ''
            });

            // Başarılı gönderim
            alert('Talebiniz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.');
            setFormData({ name: '', phone: '', service: '' });
        } catch (error) {
            console.error('Teklif gönderilirken hata oluştu:', error);
            alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className={styles.hero}>
            {/* Background Elements */}
            <div className={styles.background}>
                <div className={styles.overlay}></div>
                <div className={styles.pattern}></div>
                <div className={styles.gradientOrb1}></div>
                <div className={styles.gradientOrb2}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Side - Text Content */}
                    <div className={styles.textContent}>
                        <div className={styles.badge}>
                            <span className={styles.badgeIcon}>✨</span>
                            <span>Antalya&apos;nın Lider Temizlik Markası</span>
                        </div>

                        <h1 className={styles.title}>
                            <span className={styles.titleLine}>Vera Temizlik ile</span>
                            <span className={styles.titleHighlight}>Mükemmeli</span>
                            <span className={styles.titleLine}>Keşfedin</span>
                        </h1>

                        <p className={styles.description}>
                            Antalya&apos;nın her noktasına uzanan profesyonel hizmet ağımızla yaşam alanlarınıza değer katıyoruz.
                            12 yıllık tecrübe, uzman kadro ve %100 müşteri memnuniyeti garantisiyle tanışın.
                            Temizlikte aradığınız kalite ve güven, Vera Temizlik güvencesiyle kapınızda.
                        </p>

                        <div className={styles.features}>
                            <div className={styles.feature}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Garantili Hizmet</span>
                            </div>
                            <div className={styles.feature}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>Sigortalı Personel</span>
                            </div>
                            <div className={styles.feature}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>7/24 Destek</span>
                            </div>
                            <div className={styles.feature}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>Çevre Dostu Ürünler</span>
                            </div>
                        </div>

                        <div className={styles.cta}>
                            <Link href="/teklif-al" className={`${styles.ctaButton} btn btn-primary btn-lg`}>
                                Ücretsiz Keşif İste
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                            <Link href="/hizmetler" className={`${styles.ctaSecondary} btn btn-secondary btn-lg`}>
                                Tüm Hizmetlerimiz
                            </Link>
                        </div>

                        <div className={styles.trust}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustNumber}>5000+</span>
                                <span className={styles.trustLabel}>Mutlu Müşteri</span>
                            </div>
                            <div className={styles.trustDivider}></div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustNumber}>12</span>
                                <span className={styles.trustLabel}>Yıl Deneyim</span>
                            </div>
                            <div className={styles.trustDivider}></div>
                            <div className={styles.trustItem}>
                                <span className={styles.trustNumber}>%100</span>
                                <span className={styles.trustLabel}>Müşteri Memnuniyeti</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Quick Contact Form */}
                    <div className={styles.formWrapper}>
                        <div className={styles.formCard}>
                            <div className={styles.formHeader}>
                                <h3>Hızlı Teklif Al</h3>
                                <p>Formu doldurun, 15 dakika içinde arayalım</p>
                            </div>
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="hero-name" className={styles.formLabel}>Ad Soyad</label>
                                    <input
                                        type="text"
                                        id="hero-name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Adınızı giriniz"
                                        className={styles.formInput}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="hero-phone" className={styles.formLabel}>Telefon</label>
                                    <input
                                        type="tel"
                                        id="hero-phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="0544 312 77 98"
                                        className={styles.formInput}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="hero-service" className={styles.formLabel}>Hizmet Türü</label>
                                    <select
                                        id="hero-service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className={styles.formSelect}
                                        required
                                    >
                                        <option value="">Seçiniz</option>
                                        <option value="ev">Ev Temizliği</option>
                                        <option value="ofis">Ofis Temizliği</option>
                                        <option value="villa">Villa Temizliği</option>
                                        <option value="insaat">İnşaat Sonrası Temizlik</option>
                                        <option value="dis-cephe">Dış Cephe Temizliği</option>
                                        <option value="merdiven">Merdiven Temizliği</option>
                                        <option value="koltuk">Koltuk Yıkama</option>
                                        <option value="diger">Diğer</option>
                                    </select>
                                </div>
                                <button type="submit" className={`${styles.formButton} btn btn-accent btn-lg`} disabled={isSubmitting}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    {isSubmitting ? 'Gönderiliyor...' : 'Hemen Ara'}
                                </button>
                            </form>
                            <div className={styles.formFooter}>
                                <a href="https://wa.me/905443127798" className={styles.whatsappLink}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile iletişime geç
                                </a>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className={styles.floatingBadge1}>
                            <span className={styles.floatingIcon}>🏆</span>
                            <div>
                                <span className={styles.floatingTitle}>12 Yıl</span>
                                <span className={styles.floatingText}>Deneyim</span>
                            </div>
                        </div>
                        <div className={styles.floatingBadge2}>
                            <span className={styles.floatingIcon}>⭐</span>
                            <div>
                                <span className={styles.floatingTitle}>4.9/5</span>
                                <span className={styles.floatingText}>Müşteri Puanı</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={styles.scrollIndicator}>
                <span>Aşağı Kaydır</span>
                <div className={styles.scrollMouse}>
                    <div className={styles.scrollWheel}></div>
                </div>
            </div>
        </section>
    );
}
