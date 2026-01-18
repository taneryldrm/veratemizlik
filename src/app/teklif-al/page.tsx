'use client';

import { useState } from 'react';
import Link from 'next/link';
import { addQuoteRequest } from '@/lib/quoteStore';
import styles from './teklif-al.module.css';

// SVG Icons for services
const serviceIcons = {
    ev: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    ofis: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    villa: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4 8 4v14" />
            <path d="M9 21v-6h6v6" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
        </svg>
    ),
    insaat: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    disCephe: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    merdiven: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4V8h4V4" />
            <path d="M4 20v-4h4v-4h4V8h4V4h4" />
        </svg>
    ),
    yangin: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
        </svg>
    ),
    koltuk: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20 12v-2a2 2 0 00-2-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v2a2 2 0 00-2 2v2C2 12 2 14 4 14v4a2 2 0 002 2h2a2 2 0 002-2v-2h4v2a2 2 0 002 2h2a2 2 0 002-2v-4c2 0 2-2 2-2z" />
            <path d="M4 10h16" />
        </svg>
    ),
};

const services = [
    { id: 'ev', name: 'Ev Temizliği', icon: serviceIcons.ev },
    { id: 'ofis', name: 'Ofis Temizliği', icon: serviceIcons.ofis },
    { id: 'villa', name: 'Villa Temizliği', icon: serviceIcons.villa },
    { id: 'insaat', name: 'İnşaat Sonrası Temizlik', icon: serviceIcons.insaat },
    { id: 'dis-cephe', name: 'Dış Cephe Temizliği', icon: serviceIcons.disCephe },
    { id: 'merdiven', name: 'Merdiven Temizliği', icon: serviceIcons.merdiven },
    { id: 'yangin', name: 'Yangın Sonrası Temizlik', icon: serviceIcons.yangin },
    { id: 'yerinde-koltuk-yikama', name: 'Yerinde Koltuk Yıkama', icon: serviceIcons.koltuk },
];

// Hizmete özel sorular ve yapılandırmalar
const getServiceQuestions = (serviceId: string) => {
    switch (serviceId) {
        case 'ev':
        case 'villa':
            return {
                showFrequency: true,
                showArea: true,
                showRooms: true,
                roomsLabel: 'Oda Sayısı',
                areaLabel: 'Ev Büyüklüğü (m²)',
            };
        case 'ofis':
            return {
                showFrequency: true,
                showArea: true,
                showRooms: true,
                roomsLabel: 'Bölüm/Oda Sayısı',
                areaLabel: 'Ofis Büyüklüğü (m²)',
            };
        case 'insaat':
            return {
                showFrequency: false,
                showArea: true,
                showRooms: true,
                roomsLabel: 'Oda Sayısı',
                areaLabel: 'Alan Büyüklüğü (m²)',
                extraInfo: 'İnşaat/Tadilat durumu hakkında kısa bilgi notlara ekleyiniz.'
            };
        case 'yerinde-koltuk-yikama':
            return {
                showFrequency: false,
                showArea: false,
                showRooms: false,
                showSeatDetails: true, // Özel alan
            };
        case 'dis-cephe':
            return {
                showFrequency: false,
                showArea: true, // Cephe alanı olarak kullanılabilir
                areaLabel: 'Cephe Alanı (m²) - Tahmini',
                showBuildingFloors: true, // Özel alan
            };
        case 'merdiven':
            return {
                showFrequency: true,
                showFloors: true, // Kat sayısı
                showApartmentCount: true, // Daire sayısı
            };
        case 'yangin':
            return {
                showFrequency: false,
                showArea: true,
                extraInfo: 'Hasar durumu hakkında detaylı bilgiyi notlar kısmına yazınız.'
            };
        default:
            return {
                showFrequency: true,
                showArea: true,
                showRooms: true,
            };
    }
};

const frequencies = [
    { id: 'tek', name: 'Tek Seferlik' },
    { id: 'haftalik', name: 'Haftalık' },
    { id: 'iki-haftalik', name: 'İki Haftada Bir' },
    { id: 'aylik', name: 'Aylık' },
];

export default function TeklifAlPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        service: '',
        frequency: '',
        area: '',
        rooms: '',
        floors: '', // Kat sayısı
        apartmentCount: '', // Daire sayısı
        seatDetails: '', // Koltuk detayları
        buildingFloors: '', // Bina kat sayısı (dış cephe için)
        name: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
        preferredDate: '',
        preferredTime: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleServiceSelect = (serviceId: string) => {
        // Hizmet değiştiğinde formu temizle
        setFormData({
            ...formData,
            service: serviceId,
            frequency: '',
            area: '',
            rooms: '',
            floors: '',
            apartmentCount: '',
            seatDetails: '',
            buildingFloors: '',
        });
    };

    const handleFrequencySelect = (frequencyId: string) => {
        setFormData({ ...formData, frequency: frequencyId });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Özel alanları notlara ekle veya uygun alanlara map et
        let finalNotes = formData.notes;
        let finalArea = formData.area;
        let finalRooms = formData.rooms;

        if (formData.service === 'yerinde-koltuk-yikama') {
            finalNotes = `Koltuk Detayları: ${formData.seatDetails}\n\n${formData.notes}`;
            finalArea = '-'; // Zorunlu alan değilse
            finalRooms = '-';
        } else if (formData.service === 'merdiven') {
            finalNotes = `Kat Sayısı: ${formData.floors}, Daire Sayısı: ${formData.apartmentCount}\n\n${formData.notes}`;
        } else if (formData.service === 'dis-cephe') {
            finalNotes = `Bina Kat Sayısı: ${formData.buildingFloors}\n\n${formData.notes}`;
        }

        // Teklif talebini kaydet
        addQuoteRequest({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            service: formData.service,
            area: finalArea || '-',
            rooms: finalRooms || '-',
            frequency: formData.frequency || 'Belirtilmedi',
            address: formData.address,
            notes: finalNotes,
            preferredDate: formData.preferredDate,
            preferredTime: formData.preferredTime,
        });

        // Kısa bir bekleme süresi
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    // Validasyon Mantığı
    const config = getServiceQuestions(formData.service);

    const canProceedStep1 = formData.service !== '';

    const canProceedStep2 = (() => {
        if (!config) return false;

        if (config.showFrequency && !formData.frequency) return false;
        if (config.showArea && !formData.area) return false;
        // Rooms opsiyonel olabilir veya zorunlu, şimdilik opsiyonel bırakalım veya basit kontrol:
        // if (config.showRooms && !formData.rooms) return false; 

        if (formData.service === 'yerinde-koltuk-yikama' && !formData.seatDetails) return false;
        if (formData.service === 'merdiven' && (!formData.floors || !formData.apartmentCount)) return false;
        if (formData.service === 'dis-cephe' && (!formData.buildingFloors || !formData.area)) return false; // Dış cephede m2 ve kat sayısı önemli

        return true;
    })();

    const canSubmit = formData.name !== '' && formData.phone !== '' && formData.address !== '';

    if (isSubmitted) {
        return (
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.container}>
                        <div className={styles.successCard}>
                            <div className={styles.successIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            </div>
                            <h1>Teklif Talebiniz Alındı!</h1>
                            <p>En geç 24 saat içinde sizinle iletişime geçeceğiz.</p>
                            <div className={styles.successActions}>
                                <Link href="/" className="btn btn-primary btn-lg">
                                    Ana Sayfaya Dön
                                </Link>
                                <a href="tel:+905443127798" className="btn btn-secondary btn-lg">
                                    Hemen Ara: 0544 312 77 98
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Ücretsiz Teklif</span>
                        <h1 className={styles.heroTitle}>Hızlı Teklif Alın</h1>
                        <p className={styles.heroDescription}>
                            İhtiyacınıza uygun hizmeti seçin, size özel fiyat teklifimizi hemen hazırlayalım.
                        </p>
                    </div>
                </div>
            </section>

            {/* Form Section */}
            <section className={styles.formSection}>
                <div className={styles.container}>
                    {/* Progress Steps */}
                    <div className={styles.progress}>
                        <div className={`${styles.progressStep} ${step >= 1 ? styles.active : ''} ${step > 1 ? styles.completed : ''}`}>
                            <div className={styles.progressNumber}>1</div>
                            <span>Hizmet</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 2 ? styles.active : ''} ${step > 2 ? styles.completed : ''}`}>
                            <div className={styles.progressNumber}>2</div>
                            <span>Detaylar</span>
                        </div>
                        <div className={styles.progressLine}></div>
                        <div className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}>
                            <div className={styles.progressNumber}>3</div>
                            <span>İletişim</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <div className={styles.stepContent}>
                                <h2>Hangi hizmeti almak istiyorsunuz?</h2>
                                <p>Lütfen ihtiyacınız olan temizlik hizmetini seçin.</p>

                                <div className={styles.serviceGrid}>
                                    {services.map((service) => (
                                        <button
                                            key={service.id}
                                            type="button"
                                            className={`${styles.serviceCard} ${formData.service === service.id ? styles.selected : ''}`}
                                            onClick={() => handleServiceSelect(service.id)}
                                        >
                                            <span className={styles.serviceIcon}>{service.icon}</span>
                                            <span className={styles.serviceName}>{service.name}</span>
                                            {formData.service === service.id && (
                                                <div className={styles.checkmark}>
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                <div className={styles.stepActions}>
                                    <button
                                        type="button"
                                        className={`btn btn-primary btn-lg ${styles.nextBtn}`}
                                        onClick={nextStep}
                                        disabled={!canProceedStep1}
                                    >
                                        Devam Et
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Details */}
                        {step === 2 && (
                            <div className={styles.stepContent}>
                                <h2>Hizmet Detayları</h2>
                                <p>Size en doğru teklifi verebilmemiz için lütfen detayları belirtin.</p>

                                <div className={styles.detailsGrid}>

                                    {/* Sıklık Seçimi */}
                                    {config.showFrequency && (
                                        <div className={styles.detailSection}>
                                            <h4>Temizlik Sıklığı</h4>
                                            <div className={styles.frequencyGrid}>
                                                {frequencies.map((freq) => (
                                                    <button
                                                        key={freq.id}
                                                        type="button"
                                                        className={`${styles.frequencyCard} ${formData.frequency === freq.id ? styles.selected : ''}`}
                                                        onClick={() => handleFrequencySelect(freq.id)}
                                                    >
                                                        {freq.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className={styles.detailSection}>
                                        <h4>{formData.service === 'yerinde-koltuk-yikama' ? 'Eşya Bilgileri' : 'Alan Bilgileri'}</h4>
                                        <div className={styles.inputRow}>
                                            {/* Alan Büyüklüğü */}
                                            {config.showArea && (
                                                <div className={`${styles.inputGroup} ${!config.showRooms && !config.showBuildingFloors ? styles.fullWidth : ''}`}>
                                                    <label htmlFor="area">{config.areaLabel || 'Metrekare (m²)'} *</label>
                                                    <input
                                                        type="number"
                                                        id="area"
                                                        name="area"
                                                        value={formData.area}
                                                        onChange={handleChange}
                                                        placeholder="Örn: 120"
                                                        min="1"
                                                    />
                                                </div>
                                            )}

                                            {/* Oda Sayısı */}
                                            {config.showRooms && (
                                                <div className={styles.inputGroup}>
                                                    <label htmlFor="rooms">{config.roomsLabel || 'Oda Sayısı'}</label>
                                                    <select
                                                        id="rooms"
                                                        name="rooms"
                                                        value={formData.rooms}
                                                        onChange={handleChange}
                                                    >
                                                        <option value="">Seçiniz</option>
                                                        <option value="1+0">1+0 (Stüdyo)</option>
                                                        <option value="1+1">1+1</option>
                                                        <option value="2+1">2+1</option>
                                                        <option value="3+1">3+1</option>
                                                        <option value="4+1">4+1</option>
                                                        <option value="5+">5+ ve üzeri</option>
                                                        <option value="dublex">Dubleks/Villa</option>
                                                        <option value="isyeri">İş Yeri / Ofis</option>
                                                    </select>
                                                </div>
                                            )}

                                            {/* Kat Sayısı (Merdiven İçin) */}
                                            {/* @ts-ignore - TS kontrolünü basitleştirmek için */}
                                            {config.showFloors && (
                                                <div className={styles.inputGroup}>
                                                    <label htmlFor="floors">Kat Sayısı *</label>
                                                    <input
                                                        type="number"
                                                        id="floors"
                                                        name="floors"
                                                        value={formData.floors}
                                                        onChange={handleChange}
                                                        placeholder="Merdiven temizlenecek kat sayısı"
                                                        min="1"
                                                    />
                                                </div>
                                            )}

                                            {/* Daire Sayısı (Merdiven İçin) */}
                                            {/* @ts-ignore */}
                                            {config.showApartmentCount && (
                                                <div className={styles.inputGroup}>
                                                    <label htmlFor="apartmentCount">Toplam Daire Sayısı *</label>
                                                    <input
                                                        type="number"
                                                        id="apartmentCount"
                                                        name="apartmentCount"
                                                        value={formData.apartmentCount}
                                                        onChange={handleChange}
                                                        placeholder="Binadaki toplam daire"
                                                        min="1"
                                                    />
                                                </div>
                                            )}

                                            {/* Bina Kat Sayısı (Dış Cephe İçin) */}
                                            {/* @ts-ignore */}
                                            {config.showBuildingFloors && (
                                                <div className={styles.inputGroup}>
                                                    <label htmlFor="buildingFloors">Bina Kat Sayısı *</label>
                                                    <input
                                                        type="number"
                                                        id="buildingFloors"
                                                        name="buildingFloors"
                                                        value={formData.buildingFloors}
                                                        onChange={handleChange}
                                                        placeholder="Binanın toplam katı"
                                                        min="1"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Koltuk Yıkama Detayları */}
                                        {/* @ts-ignore */}
                                        {config.showSeatDetails && (
                                            <div className={`${styles.inputGroup} ${styles.fullWidth}`} style={{ marginTop: '1rem' }}>
                                                <label htmlFor="seatDetails">Yıkanacak Eşyalar Nelerdir? *</label>
                                                <textarea
                                                    id="seatDetails"
                                                    name="seatDetails"
                                                    value={formData.seatDetails}
                                                    onChange={handleChange}
                                                    placeholder="Örn: 1 adet L koltuk, 2 adet tekli berjer, 6 adet sandalye..."
                                                    rows={3}
                                                />
                                                <p className={styles.hintText}>Lütfen yıkanacak tüm koltuk, yatak veya sandalyeleri adetleriyle birlikte belirtin.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.detailSection}>
                                        <h4>Tercih Edilen Tarih</h4>
                                        <div className={styles.inputRow}>
                                            <div className={styles.inputGroup}>
                                                <label htmlFor="preferredDate">Tarih</label>
                                                <input
                                                    type="date"
                                                    id="preferredDate"
                                                    name="preferredDate"
                                                    value={formData.preferredDate}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className={styles.inputGroup}>
                                                <label htmlFor="preferredTime">Saat Aralığı</label>
                                                <select
                                                    id="preferredTime"
                                                    name="preferredTime"
                                                    value={formData.preferredTime}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Seçiniz</option>
                                                    <option value="08-10">08:00 - 10:00</option>
                                                    <option value="10-12">10:00 - 12:00</option>
                                                    <option value="12-14">12:00 - 14:00</option>
                                                    <option value="14-16">14:00 - 16:00</option>
                                                    <option value="16-18">16:00 - 18:00</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.stepActions}>
                                    <button type="button" className={`btn btn-secondary btn-lg`} onClick={prevStep}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12" />
                                            <polyline points="12 19 5 12 12 5" />
                                        </svg>
                                        Geri
                                    </button>
                                    <button
                                        type="button"
                                        className={`btn btn-primary btn-lg ${styles.nextBtn}`}
                                        onClick={nextStep}
                                        disabled={!canProceedStep2}
                                    >
                                        Devam Et
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="5" y1="12" x2="19" y2="12" />
                                            <polyline points="12 5 19 12 12 19" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Contact Info */}
                        {step === 3 && (
                            <div className={styles.stepContent}>
                                <h2>İletişim Bilgileriniz</h2>
                                <p>Size ulaşabilmemiz için bilgilerinizi girin.</p>

                                <div className={styles.contactGrid}>
                                    <div className={styles.inputGroup}>
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

                                    <div className={styles.inputGroup}>
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

                                    <div className={styles.inputGroup}>
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

                                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                        <label htmlFor="address">Adres *</label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Mahalle, cadde, sokak, no vb."
                                            required
                                        />
                                    </div>

                                    <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                        <label htmlFor="notes">Ek Notlar</label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Varsa eklemek istediğiniz detayları yazın..."
                                            rows={4}
                                        />
                                    </div>
                                </div>

                                <div className={styles.stepActions}>
                                    <button type="button" className={`btn btn-secondary btn-lg`} onClick={prevStep}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <line x1="19" y1="12" x2="5" y2="12" />
                                            <polyline points="12 19 5 12 12 5" />
                                        </svg>
                                        Geri
                                    </button>
                                    <button
                                        type="submit"
                                        className={`btn btn-accent btn-lg ${styles.submitBtn}`}
                                        disabled={!canSubmit || isSubmitting}
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
                                                Teklif İste
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>

                    {/* Help Box */}
                    <div className={styles.helpBox}>
                        <h4>Yardıma mı ihtiyacınız var?</h4>
                        <p>Form doldurmadan doğrudan bizi arayabilirsiniz.</p>
                        <a href="tel:+905443127798" className={styles.helpPhone}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            0544 312 77 98
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
