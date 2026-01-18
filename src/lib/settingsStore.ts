// Site ayarları tipi
export interface SiteSettings {
    siteName: string;
    siteDescription: string;
    email: string;
    phone: string;
    mobile: string;
    whatsapp: string;
    address: string;
    workingHours: string;
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
}

// Varsayılan ayarlar
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

const STORAGE_KEY = 'vera_site_settings';

// Ayarları localStorage'dan al
export function getSettings(): SiteSettings {
    if (typeof window === 'undefined') {
        return defaultSettings;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // İlk kez yükleniyorsa varsayılan ayarları kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
        return defaultSettings;
    }

    try {
        // Mevcut ayarlarla varsayılanları birleştir (yeni alanlar için)
        const parsed = JSON.parse(stored);
        return { ...defaultSettings, ...parsed };
    } catch {
        return defaultSettings;
    }
}

// Ayarları kaydet
export function saveSettings(settings: SiteSettings): void {
    if (typeof window === 'undefined') return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('siteSettingsUpdated', { detail: settings }));
}

// Tek bir ayarı al
export function getSetting<K extends keyof SiteSettings>(key: K): SiteSettings[K] {
    return getSettings()[key];
}

// WhatsApp numarasını al (formatlı)
export function getWhatsAppNumber(): string {
    const settings = getSettings();
    // Sadece rakamları al
    return settings.whatsapp.replace(/\D/g, '');
}

// WhatsApp URL'i oluştur
export function getWhatsAppUrl(message?: string): string {
    const number = getWhatsAppNumber();
    const defaultMessage = 'Merhaba, temizlik hizmeti hakkında bilgi almak istiyorum.';
    const encodedMessage = encodeURIComponent(message || defaultMessage);
    return `https://wa.me/${number}?text=${encodedMessage}`;
}
