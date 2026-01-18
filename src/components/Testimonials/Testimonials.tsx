'use client';

import { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
    {
        id: 1,
        name: 'Ayşe Yılmaz',
        role: 'Ev Sahibi',
        location: 'Lara, Antalya',
        image: 'AY',
        rating: 5,
        text: 'Vera Temizlik ile çalışmak çok keyifli. Ekipleri profesyonel, dakik ve son derece titiz. Evim her zaman pırıl pırıl! Kesinlikle tavsiye ediyorum.',
    },
    {
        id: 2,
        name: 'Mehmet Kaya',
        role: 'İşletme Sahibi',
        location: 'Konyaaltı, Antalya',
        image: 'MK',
        rating: 5,
        text: 'Ofisimizin günlük temizliği için Vera Temizlik\'i tercih ediyoruz. 2 yıldır çalışıyoruz ve memnuniyetimiz her geçen gün artıyor. Profesyonel hizmet!',
    },
    {
        id: 3,
        name: 'Fatma Demir',
        role: 'Villa Sahibi',
        location: 'Belek, Antalya',
        image: 'FD',
        rating: 5,
        text: 'Villamızın düzenli temizliği için Vera Temizlik\'i seçtik. Havuz kenarından bahçeye, tuvaletten yatak odalarına kadar her yeri kusursuz temizliyorlar.',
    },
    {
        id: 4,
        name: 'Ali Öztürk',
        role: 'Müteahhit',
        location: 'Kepez, Antalya',
        image: 'AO',
        rating: 5,
        text: 'İnşaat projelerimizin teslim öncesi temizliklerini hep Vera Temizlik yapıyor. Hızlı, kaliteli ve güvenilir. İş ortaklarımız olmaktan memnunuz.',
    },
    {
        id: 5,
        name: 'Zeynep Aksoy',
        role: 'Otel Müdürü',
        location: 'Muratpaşa, Antalya',
        image: 'ZA',
        rating: 5,
        text: 'Otelimizin genel temizlik hizmetlerini Vera Temizlik\'e devrettik. Misafirlerimizden sürekli olumlu geri bildirim alıyoruz. Harika bir ekip!',
    },
];

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index: number) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Müşteri Yorumları</span>
                    <h2 className={styles.title}>
                        Müşterilerimiz <span className={styles.highlight}>Ne Diyor?</span>
                    </h2>
                </div>

                <div className={styles.sliderContainer}>
                    <div className={styles.slider}>
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                className={`${styles.slide} ${index === activeIndex ? styles.active : ''}`}
                            >
                                <div className={styles.card}>
                                    <div className={styles.quoteIcon}>
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                        </svg>
                                    </div>

                                    <div className={styles.rating}>
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} viewBox="0 0 24 24" fill={i < testimonial.rating ? 'currentColor' : 'none'} stroke="currentColor">
                                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                            </svg>
                                        ))}
                                    </div>

                                    <p className={styles.text}>&ldquo;{testimonial.text}&rdquo;</p>

                                    <div className={styles.author}>
                                        <div className={styles.avatar}>
                                            {testimonial.image}
                                        </div>
                                        <div className={styles.authorInfo}>
                                            <span className={styles.authorName}>{testimonial.name}</span>
                                            <span className={styles.authorRole}>{testimonial.role}</span>
                                            <span className={styles.authorLocation}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                    <circle cx="12" cy="10" r="3" />
                                                </svg>
                                                {testimonial.location}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevSlide} aria-label="Önceki yorum">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>
                    <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextSlide} aria-label="Sonraki yorum">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className={styles.dots}>
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                className={`${styles.dot} ${index === activeIndex ? styles.active : ''}`}
                                onClick={() => goToSlide(index)}
                                aria-label={`Yorum ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Trust Badges */}
                <div className={styles.trustBadges}>
                    <div className={styles.trustItem}>
                        <span className={styles.trustValue}>4.9</span>
                        <div className={styles.trustStars}>
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            ))}
                        </div>
                        <span className={styles.trustLabel}>Google Reviews</span>
                    </div>
                    <div className={styles.trustDivider}></div>
                    <div className={styles.trustItem}>
                        <span className={styles.trustValue}>500+</span>
                        <span className={styles.trustLabel}>Olumlu Yorum</span>
                    </div>
                    <div className={styles.trustDivider}></div>
                    <div className={styles.trustItem}>
                        <span className={styles.trustValue}>%98</span>
                        <span className={styles.trustLabel}>Tavsiye Oranı</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
