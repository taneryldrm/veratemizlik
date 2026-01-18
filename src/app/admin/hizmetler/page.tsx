'use client';

import { useState } from 'react';
import styles from './hizmetler-admin.module.css';

// SVG Icons
// ... (imports)
import { useEffect } from 'react';
import { getServices, saveServices, ServiceData } from '@/lib/servicesStore';
// SVG Icons (Mevcut ikonlar kalacak)
const icons = {
    'ev-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    'ofis-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    'dis-cephe-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    'insaat-sonrasi-temizlik': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    'merdiven-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4V8h4V4" />
            <path d="M4 20v-4h4v-4h4V8h4V4h4" />
        </svg>
    ),
    'yangin-sonrasi-temizlik': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
        </svg>
    ),
    'villa-temizligi': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4 8 4v14" />
            <path d="M9 21v-6h6v6" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
        </svg>
    ),
    'yerinde-koltuk-yikama': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 12v-2a2 2 0 00-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v2C2 12 2 14 4 14v4a2 2 0 002 2h2a2 2 0 002-2v-2h4v2a2 2 0 002 2h2a2 2 0 002-2v-4c2 0 2-2 2-2z" />
            <path d="M4 10h16" />
        </svg>
    ),
};

export default function HizmetlerAdminPage() {
    const [services, setServices] = useState<ServiceData[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState({ name: '', price: '' });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setServices(getServices());
        setIsLoaded(true);
    }, []);

    const startEdit = (service: ServiceData) => {
        setEditingId(service.id);
        setEditData({ name: service.name, price: service.price });
    };

    const saveEdit = (id: string) => {
        const updatedServices = services.map(s =>
            s.id === id ? { ...s, name: editData.name, price: editData.price } : s
        );
        setServices(updatedServices);
        saveServices(updatedServices);
        setEditingId(null);
    };

    const toggleStatus = (id: string) => {
        const updatedServices = services.map(s =>
            s.id === id ? { ...s, status: (s.status === 'Aktif' ? 'Pasif' : 'Aktif') as 'Aktif' | 'Pasif' } : s
        );
        setServices(updatedServices);
        saveServices(updatedServices);
    };

    if (!isLoaded) {
        return <div className={styles.page}>Yükleniyor...</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Hizmetler</h1>
                    <p>Hizmet bilgilerini düzenleyin</p>
                </div>
            </div>

            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>İkon</th>
                            <th>Hizmet Adı</th>
                            <th>Slug</th>
                            <th>Başlangıç Fiyatı</th>
                            <th>Durum</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>
                                    <span className={styles.icon}>
                                        {icons[service.slug as keyof typeof icons] || <span>?</span>}
                                    </span>
                                </td>
                                <td>
                                    {editingId === service.id ? (
                                        <input
                                            type="text"
                                            value={editData.name}
                                            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                            className={styles.editInput}
                                        />
                                    ) : (
                                        <span className={styles.serviceName}>{service.name}</span>
                                    )}
                                </td>
                                <td>
                                    <code className={styles.slug}>{service.slug}</code>
                                </td>
                                <td>
                                    {editingId === service.id ? (
                                        <input
                                            type="text"
                                            value={editData.price}
                                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                            className={styles.editInput}
                                        />
                                    ) : (
                                        <span className={styles.price}>{service.price}</span>
                                    )}
                                </td>
                                <td>
                                    <button
                                        className={`${styles.statusBadge} ${service.status === 'Aktif' ? styles.active : styles.inactive}`}
                                        onClick={() => toggleStatus(service.id)}
                                    >
                                        {service.status}
                                    </button>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        {editingId === service.id ? (
                                            <>
                                                <button
                                                    className={`${styles.actionBtn} ${styles.save}`}
                                                    onClick={() => saveEdit(service.id)}
                                                    title="Kaydet"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </button>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => setEditingId(null)}
                                                    title="İptal"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <line x1="18" y1="6" x2="6" y2="18" />
                                                        <line x1="6" y1="6" x2="18" y2="18" />
                                                    </svg>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className={styles.actionBtn}
                                                    onClick={() => startEdit(service)}
                                                    title="Düzenle"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <a
                                                    href={`/hizmetler/${service.slug}`}
                                                    target="_blank"
                                                    className={styles.actionBtn}
                                                    title="Görüntüle"
                                                >
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                        <circle cx="12" cy="12" r="3" />
                                                    </svg>
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className={styles.infoBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <p>
                    Artık buradan yaptığınız fiyat ve isim değişiklikleri sitede otomatik güncellenecektir.
                    Detaylı içerik değişikliği için yazılımcı ile görüşünüz.
                </p>
            </div>
        </div>
    );
}
