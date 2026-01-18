'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
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

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: '',
            });
        }, 3000);
    };

    return (
        <section className={styles.contact} id="iletisim">
            <div className={styles.container}>
                <div className={styles.content}>
                    {/* Left Side - Info */}
                    <div className={styles.info}>
                        <span className={styles.badge}>Bize Ulaşın</span>
                        <h2 className={styles.title}>
                            Temizlik İhtiyaçlarınız İçin <span className={styles.highlight}>Bizimle İletişime Geçin</span>
                        </h2>
                        <p className={styles.description}>
                            Sorularınız, önerileriniz veya teklif talepleriniz için formu doldurun.
                            Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                        </p>

                        <div className={styles.contactMethods}>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Adres</span>
                                    <p>Fener Mahallesi, Tekelioğlu Caddesi<br />No: 123, Muratpaşa / Antalya</p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Telefon</span>
                                    <p>
                                        <a href="tel:+905443127798">0544 312 77 98</a>
                                    </p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>E-posta</span>
                                    <p><a href="mailto:info@veratemizlik.com">info@veratemizlik.com</a></p>
                                </div>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                    </svg>
                                </div>
                                <div className={styles.contactText}>
                                    <span className={styles.contactLabel}>Çalışma Saatleri</span>
                                    <p>Pazartesi - Cumartesi: 08:00 - 19:00<br />Pazar: Kapalı</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className={styles.formWrapper}>
                        <div className={styles.formCard}>
                            {isSubmitted ? (
                                <div className={styles.successMessage}>
                                    <div className={styles.successIcon}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <h3>Mesajınız Alındı!</h3>
                                    <p>En kısa sürede sizinle iletişime geçeceğiz.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="contact-name" className={styles.formLabel}>Ad Soyad *</label>
                                            <input
                                                type="text"
                                                id="contact-name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Adınızı giriniz"
                                                className={styles.formInput}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="contact-phone" className={styles.formLabel}>Telefon *</label>
                                            <input
                                                type="tel"
                                                id="contact-phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="0544 312 77 98"
                                                className={styles.formInput}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="contact-email" className={styles.formLabel}>E-posta</label>
                                            <input
                                                type="email"
                                                id="contact-email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="ornek@email.com"
                                                className={styles.formInput}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="contact-service" className={styles.formLabel}>Hizmet Türü *</label>
                                            <select
                                                id="contact-service"
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
                                                <option value="yangin">Yangın Sonrası Temizlik</option>
                                                <option value="diger">Diğer</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="contact-message" className={styles.formLabel}>Mesajınız *</label>
                                        <textarea
                                            id="contact-message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Temizlik ihtiyacınızı detaylı olarak açıklayın..."
                                            className={styles.formTextarea}
                                            rows={4}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className={`${styles.formButton} btn btn-primary btn-lg`}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className={styles.spinner}></span>
                                                Gönderiliyor...
                                            </>
                                        ) : (
                                            <>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
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
    );
}
