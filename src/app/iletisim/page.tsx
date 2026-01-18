'use client';

import { useState } from 'react';
import { useContactInfo } from '@/hooks/useContactInfo';
import styles from './iletisim.module.css';

export default function IletisimPage() {
    const { settings, whatsappUrl, phoneUrl, mobileUrl } = useContactInfo();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);

        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        }, 3000);
    };

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Bize Ulaşın</span>
                        <h1 className={styles.heroTitle}>İletişim</h1>
                        <p className={styles.heroDescription}>
                            Sorularınız, önerileriniz veya teklif talepleriniz için
                            bizimle iletişime geçebilirsiniz.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className={styles.contact}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Contact Info */}
                        <div className={styles.info}>
                            <h2>İletişim Bilgileri</h2>
                            <p className={styles.infoDescription}>
                                Aşağıdaki iletişim kanallarından bize 7/24 ulaşabilirsiniz.
                            </p>

                            <div className={styles.infoCards}>
                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Adres</h4>
                                        <p>{settings.address}</p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Telefon</h4>
                                        <p>
                                            <a href={phoneUrl}>{settings.phone}</a><br />
                                            <a href={mobileUrl}>{settings.mobile}</a>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>E-posta</h4>
                                        <p><a href={`mailto:${settings.email}`}>{settings.email}</a></p>
                                    </div>
                                </div>

                                <div className={styles.infoCard}>
                                    <div className={styles.infoIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4>Çalışma Saatleri</h4>
                                        <p>{settings.workingHours}<br />Pazar: Kapalı</p>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Contact Buttons */}
                            <div className={styles.quickContact}>
                                <a href={mobileUrl} className={styles.phoneButton}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    Hemen Ara
                                </a>
                                <a
                                    href={whatsappUrl}
                                    className={styles.whatsappButton}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp
                                </a>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className={styles.formWrapper}>
                            <div className={styles.formCard}>
                                <h3>Mesaj Gönderin</h3>

                                {isSubmitted ? (
                                    <div className={styles.successMessage}>
                                        <div className={styles.successIcon}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                        <h4>Mesajınız Alındı!</h4>
                                        <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className={styles.form}>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="name">Ad Soyad *</label>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Adınızı giriniz"
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="phone">Telefon *</label>
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="0544 312 77 98"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="email">E-posta</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="ornek@email.com"
                                            />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="subject">Konu *</label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Seçiniz</option>
                                                <option value="bilgi">Bilgi Almak İstiyorum</option>
                                                <option value="teklif">Teklif Talebi</option>
                                                <option value="sikayet">Şikayet / Öneri</option>
                                                <option value="isbirligi">İş Birliği Teklifi</option>
                                                <option value="diger">Diğer</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="message">Mesajınız *</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Mesajınızı yazınız..."
                                                rows={5}
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className={styles.spinner}></span>
                                                    Gönderiliyor...
                                                </>
                                            ) : (
                                                <>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="22" y1="2" x2="11" y2="13" />
                                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                                    </svg>
                                                    Mesaj Gönder
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className={styles.map}>
                <div className={styles.mapContainer}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d102238.0193937519!2d30.62453621262287!3d36.88448698050396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39aaeddadadc1%3A0x95c69f73f9e32e33!2sAntalya%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1705600000000!5m2!1str!2str"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Vera Temizlik Konum"
                    ></iframe>
                </div>
            </section>
        </div>
    );
}
