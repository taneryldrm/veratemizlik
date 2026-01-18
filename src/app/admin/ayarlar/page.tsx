'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './ayarlar.module.css';
import { getSettings, saveSettings, SiteSettings } from '@/lib/settingsStore';

export default function AyarlarPage() {
    const [activeTab, setActiveTab] = useState('genel');
    const [settings, setSettings] = useState<SiteSettings>({
        siteName: 'Vera Temizlik',
        siteDescription: 'Antalya\'nın En Güvenilir Temizlik Şirketi',
        email: 'info@veratemizlik.com',
        phone: '0242 123 45 67',
        mobile: '0500 123 45 67',
        whatsapp: '905001234567',
        address: 'Fener Mahallesi, Tekelioğlu Caddesi No: 123, Muratpaşa / Antalya',
        workingHours: 'Pazartesi - Cumartesi: 08:00 - 19:00',
        facebook: 'https://facebook.com/veratemizlik',
        instagram: 'https://instagram.com/veratemizlik',
        twitter: 'https://twitter.com/veratemizlik',
        linkedin: 'https://linkedin.com/company/veratemizlik',
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mevcut ayarları yükle
    const loadSettings = useCallback(() => {
        const loadedSettings = getSettings();
        setSettings(loadedSettings);
        setIsLoaded(true);
    }, []);

     
    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
        setSaved(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Ayarları localStorage'a kaydet
        saveSettings(settings);

        // Küçük bir gecikme ile kullanıcıya geri bildirim ver
        await new Promise(resolve => setTimeout(resolve, 500));

        setIsSaving(false);
        setSaved(true);

        setTimeout(() => setSaved(false), 3000);
    };

    if (!isLoaded) {
        return (
            <div className={styles.page}>
                <div className={styles.header}>
                    <h1>Ayarlar</h1>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1>Ayarlar</h1>
                <p>Site ayarlarını düzenleyin</p>
            </div>

            <div className={styles.content}>
                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'genel' ? styles.active : ''}`}
                        onClick={() => setActiveTab('genel')}
                    >
                        Genel
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'iletisim' ? styles.active : ''}`}
                        onClick={() => setActiveTab('iletisim')}
                    >
                        İletişim
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'sosyal' ? styles.active : ''}`}
                        onClick={() => setActiveTab('sosyal')}
                    >
                        Sosyal Medya
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Genel Tab */}
                    {activeTab === 'genel' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formGroup}>
                                <label htmlFor="siteName">Site Adı</label>
                                <input
                                    type="text"
                                    id="siteName"
                                    name="siteName"
                                    value={settings.siteName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="siteDescription">Site Açıklaması</label>
                                <textarea
                                    id="siteDescription"
                                    name="siteDescription"
                                    value={settings.siteDescription}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                        </div>
                    )}

                    {/* İletişim Tab */}
                    {activeTab === 'iletisim' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="email">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={settings.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="phone">Telefon (Sabit)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={settings.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="mobile">Telefon (Mobil)</label>
                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={settings.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="whatsapp">WhatsApp Numarası</label>
                                    <input
                                        type="text"
                                        id="whatsapp"
                                        name="whatsapp"
                                        value={settings.whatsapp}
                                        onChange={handleChange}
                                        placeholder="905001234567"
                                    />
                                    <span className={styles.hint}>Ülke kodu ile, boşluksuz</span>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Adres</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={settings.address}
                                    onChange={handleChange}
                                    rows={2}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="workingHours">Çalışma Saatleri</label>
                                <input
                                    type="text"
                                    id="workingHours"
                                    name="workingHours"
                                    value={settings.workingHours}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}

                    {/* Sosyal Medya Tab */}
                    {activeTab === 'sosyal' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formGroup}>
                                <label htmlFor="facebook">Facebook</label>
                                <input
                                    type="url"
                                    id="facebook"
                                    name="facebook"
                                    value={settings.facebook}
                                    onChange={handleChange}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="instagram">Instagram</label>
                                <input
                                    type="url"
                                    id="instagram"
                                    name="instagram"
                                    value={settings.instagram}
                                    onChange={handleChange}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="twitter">Twitter / X</label>
                                <input
                                    type="url"
                                    id="twitter"
                                    name="twitter"
                                    value={settings.twitter}
                                    onChange={handleChange}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="linkedin">LinkedIn</label>
                                <input
                                    type="url"
                                    id="linkedin"
                                    name="linkedin"
                                    value={settings.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>
                        </div>
                    )}

                    {/* Submit */}
                    <div className={styles.formActions}>
                        {saved && (
                            <span className={styles.savedMessage}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Kaydedildi!
                            </span>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
