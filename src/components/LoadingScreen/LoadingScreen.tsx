'use client';

import { useState, useEffect } from 'react';
import styles from './LoadingScreen.module.css';

export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [targetPos, setTargetPos] = useState({ top: '18px', left: '24px' });

    useEffect(() => {
        const handleLoad = () => {
            // Header'daki logonun gerçek konumunu bul
            // Header içindeki container'ı bulmaya çalışıyoruz
            // CSS modules olduğu için class ismi değişebilir, yapısal seçici kullanıyoruz
            const headerContainer = document.querySelector('header > div') as HTMLElement;

            if (headerContainer) {
                const rect = headerContainer.getBoundingClientRect();
                const computedStyle = window.getComputedStyle(headerContainer);
                const paddingLeft = parseFloat(computedStyle.paddingLeft);

                // Container'ın sol kenarı + padding = Logonun başlangıcı
                // Header yüksekliği (80px) - Logo yüksekliği (44px) / 2 = 18px (Top)
                // Bu değerleri dinamik alıyoruz

                setTargetPos({
                    top: '18px', // Genelde sabittir ama hassas ayar gerekirse rect.top + padding kullanılabilir
                    left: `${rect.left + paddingLeft}px`
                });
            }

            // Sayfa tamamen yüklendiğinde animasyonu başlat
            setIsAnimatingOut(true);

            // Logo yerine gitme ve sayfa açılma animasyonu süresi (1.5s)
            setTimeout(() => {
                setIsLoading(false);
            }, 1500);
        };

        // Eğer sayfa zaten yüklendiyse hemen başlat
        if (document.readyState === 'complete') {
            // Elementlerin render olması için kısa bir bekleme
            setTimeout(handleLoad, 100);
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (!isLoading) return null;

    return (
        <div
            className={`${styles.loadingScreen} ${isAnimatingOut ? styles.animatingOut : ''}`}
            style={{
                '--target-left': targetPos.left,
                '--target-top': targetPos.top
            } as React.CSSProperties}
        >
            <div className={`${styles.logoContainer} ${isAnimatingOut ? styles.moveUp : ''}`}>
                {/* Logo */}
                <div className={styles.logo}>
                    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2.5" />
                        <path d="M12 20C12 15.5817 15.5817 12 20 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M20 28C24.4183 28 28 24.4183 28 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="20" cy="20" r="4" fill="currentColor" />
                    </svg>
                </div>

                {/* Logo Text */}
                <div className={styles.logoText}>
                    <span className={styles.logoMain}>Vera</span>
                    <span className={styles.logoSub}>TEMİZLİK</span>
                </div>
            </div>

            {/* Loading indicator */}
            <div className={`${styles.loadingIndicator} ${isAnimatingOut ? styles.fadeOut : ''}`}>
                <span>Yükleniyor</span>
                <div className={styles.dots}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
}
