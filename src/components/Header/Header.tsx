'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

// SVG Icons for services
const serviceIcons = {
  ev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  ofis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  disCephe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  insaat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  merdiven: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M4 20h4v-4h4v-4h4V8h4V4" />
      <path d="M4 20v-4h4v-4h4V8h4V4h4" />
    </svg>
  ),
  yangin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
    </svg>
  ),
  villa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M3 21h18" />
      <path d="M5 21V7l8-4 8 4v14" />
      <path d="M9 21v-6h6v6" />
      <path d="M10 10h4" />
      <path d="M10 14h4" />
    </svg>
  ),
  koltuk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
      <path d="M20 12v-2a2 2 0 00-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v2C2 12 2 14 4 14v4a2 2 0 002 2h2a2 2 0 002-2v-2h4v2a2 2 0 002 2h2a2 2 0 002-2v-4c2 0 2-2 2-2z" />
      <path d="M4 10h16" />
    </svg>
  ),
};

const services = [
  { name: 'Ev Temizliği', slug: 'ev-temizligi', icon: serviceIcons.ev },
  { name: 'Yerinde Koltuk Yıkama', slug: 'yerinde-koltuk-yikama', icon: serviceIcons.koltuk },
  { name: 'Ofis Temizliği', slug: 'ofis-temizligi', icon: serviceIcons.ofis },
  { name: 'Dış Cephe Temizliği', slug: 'dis-cephe-temizligi', icon: serviceIcons.disCephe },
  { name: 'İnşaat Sonrası Temizlik', slug: 'insaat-sonrasi-temizlik', icon: serviceIcons.insaat },
  { name: 'Merdiven Temizliği', slug: 'merdiven-temizligi', icon: serviceIcons.merdiven },
  { name: 'Yangın Sonrası Temizlik', slug: 'yangin-sonrasi-temizlik', icon: serviceIcons.yangin },
  { name: 'Villa Temizliği', slug: 'villa-temizligi', icon: serviceIcons.villa },
];


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
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
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Ana Sayfa</Link>
            </li>
            <li
              className={`${styles.navItem} ${styles.hasDropdown}`}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button className={styles.navLink}>
                Hizmetlerimiz
                <svg className={`${styles.dropdownIcon} ${isServicesOpen ? styles.open : ''}`} viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`${styles.dropdown} ${isServicesOpen ? styles.open : ''}`}>
                <div className={styles.dropdownContent}>
                  {services.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/hizmetler/${service.slug}`}
                      className={styles.dropdownItem}
                    >
                      <span className={styles.dropdownIcon}>{service.icon}</span>
                      <span>{service.name}</span>
                    </Link>
                  ))}
                  <Link href="/hizmetler" className={styles.dropdownViewAll}>
                    Tüm Hizmetleri Gör →
                  </Link>
                </div>
              </div>
            </li>
            <li className={styles.navItem}>
              <Link href="/hakkimizda" className={styles.navLink}>Hakkımızda</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/projeler" className={styles.navLink}>Projeler</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/blog" className={styles.navLink}>Blog</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/iletisim" className={styles.navLink}>İletişim</Link>
            </li>
          </ul>
        </nav>

        {/* CTA Button */}
        <Link href="/teklif-al" className={`${styles.ctaButton} btn btn-primary`}>
          <svg viewBox="0 0 24 24" fill="none" width="18" height="18">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Hızlı Teklif Al
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={`${styles.mobileToggle} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Menüyü Aç/Kapat"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <Link href="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Ana Sayfa
          </Link>

          <div className={styles.mobileDropdown}>
            <button
              className={styles.mobileNavLink}
              onClick={() => setIsServicesOpen(!isServicesOpen)}
            >
              Hizmetlerimiz
              <svg className={`${styles.mobileDropdownIcon} ${isServicesOpen ? styles.open : ''}`} viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className={`${styles.mobileDropdownContent} ${isServicesOpen ? styles.open : ''}`}>
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/hizmetler/${service.slug}`}
                  className={styles.mobileDropdownItem}
                  onClick={closeMobileMenu}
                >
                  <span>{service.icon}</span>
                  <span>{service.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <Link href="/hakkimizda" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Hakkımızda
          </Link>
          <Link href="/projeler" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Projeler
          </Link>
          <Link href="/blog" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            Blog
          </Link>
          <Link href="/iletisim" className={styles.mobileNavLink} onClick={closeMobileMenu}>
            İletişim
          </Link>

          <Link href="/teklif-al" className={styles.mobileCta} onClick={closeMobileMenu}>
            Hızlı Teklif Al
          </Link>
        </nav>

        {/* Mobile Contact Info */}
        <div className={styles.mobileContact}>
          <a href="tel:+905443127798" className={styles.mobileContactItem}>
            <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            0544 312 77 98
          </a>
          <a href="https://wa.me/905443127798" className={styles.mobileContactItem}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
