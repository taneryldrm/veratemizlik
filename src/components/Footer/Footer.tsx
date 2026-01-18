'use client';

import { useContactInfo } from '@/hooks/useContactInfo';
import Link from 'next/link';
import styles from './Footer.module.css';

const services = [
    { name: 'Ev Temizliği', slug: 'ev-temizligi' },
    { name: 'Ofis Temizliği', slug: 'ofis-temizligi' },
    { name: 'Dış Cephe Temizliği', slug: 'dis-cephe-temizligi' },
    { name: 'İnşaat Sonrası Temizlik', slug: 'insaat-sonrasi-temizlik' },
    { name: 'Villa Temizliği', slug: 'villa-temizligi' },
];

const quickLinks = [
    { name: 'Ana Sayfa', href: '/' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Projeler', href: '/projeler' },
    { name: 'Blog', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
    { name: 'Teklif Al', href: '/teklif-al' },
];

export default function Footer() {
    const { settings, whatsappUrl, phoneUrl, mobileUrl } = useContactInfo();

    return (
        <footer className={styles.footer}>
            {/* Stats Section */}
            <div className={styles.stats}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>5000+</span>
                            <span className={styles.statLabel}>Mutlu Müşteri</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>8500+</span>
                            <span className={styles.statLabel}>Tamamlanan Proje</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>50+</span>
                            <span className={styles.statLabel}>Uzman Personel</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statNumber}>12</span>
                            <span className={styles.statLabel}>Yıllık Deneyim</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer */}
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.grid}>
                        {/* Company Info */}
                        <div className={styles.column}>
                            <div className={styles.logo}>
                                <div className={styles.logoIcon}>
                                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
                                        <path d="M12 20C12 15.5817 15.5817 12 20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                        <path d="M20 28C24.4183 28 28 24.4183 28 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className={styles.logoText}>
                                    <span className={styles.logoMain}>Vera</span>
                                    <span className={styles.logoSub}>Temizlik</span>
                                </div>
                            </div>
                            <p className={styles.description}>
                                Antalya&apos;nın lider profesyonel temizlik şirketi olarak, ev, ofis ve endüstriyel temizlik hizmetlerinde
                                çevre dostu ürünler ve uzman kadromuzla hizmetinizdeyiz.
                            </p>
                            <div className={styles.socials}>
                                <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Instagram">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                                    </svg>
                                </a>
                                <a href={settings.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Hızlı Bağlantılar</h4>
                            <ul className={styles.linkList}>
                                {quickLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className={styles.link}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>Hizmetlerimiz</h4>
                            <ul className={styles.linkList}>
                                {services.map((service) => (
                                    <li key={service.slug}>
                                        <Link href={`/hizmetler/${service.slug}`} className={styles.link}>
                                            {service.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className={styles.column}>
                            <h4 className={styles.columnTitle}>İletişim</h4>
                            <div className={styles.contactList}>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    <div>
                                        <p>{settings.address.split(',').slice(0, 2).join(',')}</p>
                                        <p>{settings.address.split(',').slice(2).join(',')}</p>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    <div>
                                        <a href={phoneUrl}>{settings.phone}</a>
                                        <a href={mobileUrl}>{settings.mobile}</a>
                                    </div>
                                </div>
                                <div className={styles.contactItem}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                    <a href={`mailto:${settings.email}`}>{settings.email}</a>
                                </div>
                                <a href={whatsappUrl} className={styles.whatsappButton}>
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile İletişime Geç
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={styles.bottom}>
                <div className={styles.container}>
                    <p className={styles.copyright}>
                        © {new Date().getFullYear()} {settings.siteName}. Tüm hakları saklıdır.
                    </p>
                    <div className={styles.bottomLinks}>
                        <Link href="/gizlilik-politikasi">Gizlilik Politikası</Link>
                        <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
                        <Link href="/cerez-politikasi">Çerez Politikası</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

