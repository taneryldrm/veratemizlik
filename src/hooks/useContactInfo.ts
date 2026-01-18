'use client';

import { useState, useEffect, useCallback } from 'react';
import { getSettings, SiteSettings } from '@/lib/settingsStore';

interface UseContactInfoResult {
    settings: SiteSettings;
    whatsappUrl: string;
    phoneUrl: string;
    mobileUrl: string;
    isLoaded: boolean;
}

// Varsayılan ayarlar - sunucu ve istemci tutarlılığı için
const defaultSettings: SiteSettings = {
    siteName: 'Vera Temizlik',
    siteDescription: 'Antalya\'nın En Güvenilir Temizlik Şirketi',
    email: 'info@veratemizlik.com',
    phone: '0544 312 7798',
    mobile: '0544 312 7798',
    whatsapp: '905443127798',
    address: 'Fener Mahallesi, Tekelioğlu Caddesi No: 123, Muratpaşa / Antalya',
    workingHours: 'Pazartesi - Cumartesi: 08:00 - 19:00',
    facebook: 'https://facebook.com/veratemizlik',
    instagram: 'https://instagram.com/veratemizlik',
    twitter: 'https://twitter.com/veratemizlik',
    linkedin: 'https://linkedin.com/company/veratemizlik',
};

// Telefon numaralarını URL formatına çevir
const formatPhoneForUrl = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    // Türkiye numarası ise 90 ile başlat
    if (cleaned.startsWith('0')) {
        return '+9' + cleaned;
    }
    return '+' + cleaned;
};

// WhatsApp URL'i oluştur
const createWhatsAppUrl = (whatsapp: string) => {
    const number = whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent('Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.');
    return `https://wa.me/${number}?text=${message}`;
};

// Hook: İletişim bilgilerini dinamik olarak al
export function useContactInfo(): UseContactInfoResult {
    const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
    const [isLoaded, setIsLoaded] = useState(false);

    const loadSettings = useCallback(() => {
        const loaded = getSettings();
        setSettings(loaded);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        loadSettings();

        // Ayarlar değiştiğinde güncelle (aynı pencere)
        const handleUpdate = () => loadSettings();
        window.addEventListener('siteSettingsUpdated', handleUpdate);

        // Farklı sekmeler arasında senkronizasyon (cross-tab)
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'vera_site_settings') {
                loadSettings();
            }
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('siteSettingsUpdated', handleUpdate);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [loadSettings]);

    return {
        settings,
        whatsappUrl: createWhatsAppUrl(settings.whatsapp),
        phoneUrl: `tel:${formatPhoneForUrl(settings.phone)}`,
        mobileUrl: `tel:${formatPhoneForUrl(settings.mobile)}`,
        isLoaded,
    };
}
