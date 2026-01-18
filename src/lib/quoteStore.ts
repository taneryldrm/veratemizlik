// Teklif talebi tipi
export interface QuoteRequest {
    id: number;
    name: string;
    phone: string;
    email: string;
    service: string;
    serviceName: string;
    area: string;
    rooms: string;
    frequency: string;
    frequencyName: string;
    address: string;
    notes: string;
    preferredDate: string;
    preferredTime: string;
    date: string;
    status: 'Bekliyor' | 'Onaylandı' | 'Tamamlandı' | 'İptal';
}

// Hizmet isimleri
const serviceNames: Record<string, string> = {
    'ev': 'Ev Temizliği',
    'ofis': 'Ofis Temizliği',
    'villa': 'Villa Temizliği',
    'insaat': 'İnşaat Sonrası Temizlik',
    'dis-cephe': 'Dış Cephe Temizliği',
    'merdiven': 'Merdiven Temizliği',
    'yangin': 'Yangın Sonrası Temizlik',
    'koltuk': 'Yerinde Koltuk Yıkama',
    'yerinde-koltuk-yikama': 'Yerinde Koltuk Yıkama',
    'diger': 'Diğer',
};

// Sıklık isimleri
const frequencyNames: Record<string, string> = {
    'tek': 'Tek Seferlik',
    'haftalik': 'Haftalık',
    'iki-haftalik': 'İki Haftada Bir',
    'aylik': 'Aylık',
};

// Varsayılan teklif talepleri (demo amaçlı)
const defaultQuotes: QuoteRequest[] = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        phone: '0532 123 45 67',
        email: 'ahmet@email.com',
        service: 'ev',
        serviceName: 'Ev Temizliği',
        area: '120',
        rooms: '3+1',
        frequency: 'haftalik',
        frequencyName: 'Haftalık',
        address: 'Lara, Antalya',
        notes: 'Hafta içi sabah saatleri tercih edilir.',
        preferredDate: '',
        preferredTime: '',
        date: '17 Ocak 2024 - 14:30',
        status: 'Bekliyor',
    },
    {
        id: 2,
        name: 'Fatma Kaya',
        phone: '0542 234 56 78',
        email: 'fatma@email.com',
        service: 'villa',
        serviceName: 'Villa Temizliği',
        area: '350',
        rooms: '5+',
        frequency: 'aylik',
        frequencyName: 'Aylık',
        address: 'Belek, Antalya',
        notes: 'Havuz alanı da dahil edilmeli.',
        preferredDate: '',
        preferredTime: '',
        date: '17 Ocak 2024 - 11:15',
        status: 'Onaylandı',
    },
    {
        id: 3,
        name: 'Mehmet Demir',
        phone: '0555 345 67 89',
        email: 'mehmet@firma.com',
        service: 'ofis',
        serviceName: 'Ofis Temizliği',
        area: '200',
        rooms: 'ofis',
        frequency: 'haftalik',
        frequencyName: 'Haftalık',
        address: 'Konyaaltı, Antalya',
        notes: 'Mesai saatleri dışında yapılmalı.',
        preferredDate: '',
        preferredTime: '',
        date: '16 Ocak 2024 - 16:45',
        status: 'Bekliyor',
    },
];

const STORAGE_KEY = 'vera_quote_requests';

// Teklif taleplerini localStorage'dan al
export function getQuoteRequests(): QuoteRequest[] {
    if (typeof window === 'undefined') {
        return defaultQuotes;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // İlk kez yükleniyorsa varsayılan verileri kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultQuotes));
        return defaultQuotes;
    }

    try {
        return JSON.parse(stored);
    } catch {
        return defaultQuotes;
    }
}

// Yeni teklif talebi ekle
export function addQuoteRequest(quote: {
    name: string;
    phone: string;
    email: string;
    service: string;
    area: string;
    rooms: string;
    frequency: string;
    address: string;
    notes: string;
    preferredDate: string;
    preferredTime: string;
}): QuoteRequest {
    const quotes = getQuoteRequests();

    const now = new Date();
    const dateStr = now.toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('tr-TR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    const newQuote: QuoteRequest = {
        ...quote,
        id: Math.max(0, ...quotes.map(q => q.id)) + 1,
        serviceName: serviceNames[quote.service] || quote.service,
        frequencyName: frequencyNames[quote.frequency] || quote.frequency,
        date: `${dateStr} - ${timeStr}`,
        status: 'Bekliyor',
    };

    quotes.unshift(newQuote);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('quoteRequestsUpdated'));

    return newQuote;
}

// Teklif talebinin durumunu güncelle
export function updateQuoteStatus(id: number, status: QuoteRequest['status']): QuoteRequest | null {
    const quotes = getQuoteRequests();
    const index = quotes.findIndex(q => q.id === id);

    if (index === -1) return null;

    quotes[index].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('quoteRequestsUpdated'));

    return quotes[index];
}

// Teklif talebini sil
export function deleteQuoteRequest(id: number): boolean {
    const quotes = getQuoteRequests();
    const filteredQuotes = quotes.filter(q => q.id !== id);

    if (filteredQuotes.length === quotes.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredQuotes));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('quoteRequestsUpdated'));

    return true;
}

// Bekleyen teklif sayısını al
export function getPendingCount(): number {
    return getQuoteRequests().filter(q => q.status === 'Bekliyor').length;
}

// ID ile teklif talebi bul
export function getQuoteById(id: number): QuoteRequest | null {
    const quotes = getQuoteRequests();
    return quotes.find(q => q.id === id) || null;
}
