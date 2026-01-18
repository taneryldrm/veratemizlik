
export interface ServiceData {
    id: string; // Slug'ı ID olarak kullanmak daha mantıklı olabilir ama admin panelinde sayısal ID var. Mevcut yapıya sadık kalalım veya slug kullanalım. Admin panelinde ID var.
    name: string;
    slug: string;
    price: string;
    status: 'Aktif' | 'Pasif';
}

const defaultServices: ServiceData[] = [
    { id: '1', name: 'Ev Temizliği', slug: 'ev-temizligi', price: "₺500'den başlayan fiyatlar", status: 'Aktif' },
    { id: '2', name: 'Ofis Temizliği', slug: 'ofis-temizligi', price: "₺750'den başlayan fiyatlar", status: 'Aktif' },
    { id: '3', name: 'Dış Cephe Temizliği', slug: 'dis-cephe-temizligi', price: "₺1.500'den başlayan fiyatlar", status: 'Aktif' },
    { id: '4', name: 'İnşaat Sonrası Temizlik', slug: 'insaat-sonrasi-temizlik', price: "₺1.000'den başlayan fiyatlar", status: 'Aktif' },
    { id: '5', name: 'Merdiven Temizliği', slug: 'merdiven-temizligi', price: "₺300'den başlayan fiyatlar", status: 'Aktif' },
    { id: '6', name: 'Yangın Sonrası Temizlik', slug: 'yangin-sonrasi-temizlik', price: 'Keşif sonrası fiyatlandırma', status: 'Aktif' },
    { id: '7', name: 'Villa Temizliği', slug: 'villa-temizligi', price: "₺1.200'den başlayan fiyatlar", status: 'Aktif' },
    { id: '8', name: 'Yerinde Koltuk Yıkama', slug: 'yerinde-koltuk-yikama', price: "₺750'den başlayan fiyatlar", status: 'Aktif' },
];

const STORAGE_KEY = 'vera_services';

export function getServices(): ServiceData[] {
    if (typeof window === 'undefined') return defaultServices;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // İlk kez yükleniyorsa varsayılanları kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultServices));
        return defaultServices;
    }

    try {
        const parsed = JSON.parse(stored);
        // Merging logic might be needed if structure changes, but for now simple return
        // Slug eşleşmesi için varsayılanlarla birleştirmeyi garanti edelim
        // Varsayılan servisler eksik kalmasın (yeni servis eklenirse kod tarafında)
        const combined = [...defaultServices];
        parsed.forEach((p: ServiceData) => {
            const index = combined.findIndex(d => d.slug === p.slug);
            if (index !== -1) {
                combined[index] = { ...combined[index], ...p };
            } else {
                // Eğer slug kod tarafında yoksa ama storage'da varsa (eskimiş olabilir), yine de ekleyebiliriz veya yoksayabiliriz.
                // Şimdilik sadece var olanları güncelleyelim.
            }
        });
        return combined;
    } catch {
        return defaultServices;
    }
}

export function updateService(slug: string, data: Partial<ServiceData>) {
    const services = getServices();
    const index = services.findIndex(s => s.slug === slug);

    if (index !== -1) {
        services[index] = { ...services[index], ...data };
        saveServices(services);
    }
}

export function saveServices(services: ServiceData[]) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    window.dispatchEvent(new CustomEvent('servicesUpdated', { detail: services }));
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return getServices().find(s => s.slug === slug);
}
