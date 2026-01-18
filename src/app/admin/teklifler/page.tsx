'use client';

import { useState, useEffect } from 'react';
import { getQuoteRequests, updateQuoteStatus, deleteQuoteRequest, getPendingCount, QuoteRequest } from '@/lib/quoteStore';
import styles from './teklifler.module.css';

export default function TekliflerPage() {
    const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
    const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
    const [pendingCount, setPendingCount] = useState(0);
    const [statusFilter, setStatusFilter] = useState<'all' | 'Bekliyor' | 'Onaylandı' | 'Tamamlandı'>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        // Teklif taleplerini yükle
        const loadQuotes = () => {
            const allQuotes = getQuoteRequests();
            setQuotes(allQuotes);
            setPendingCount(getPendingCount());
        };

        loadQuotes();

        // Teklif güncellemelerini dinle
        const handleUpdate = () => loadQuotes();
        window.addEventListener('quoteRequestsUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('quoteRequestsUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const filteredQuotes = statusFilter === 'all'
        ? quotes
        : quotes.filter(q => q.status === statusFilter);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'Bekliyor': return styles.pending;
            case 'Onaylandı': return styles.approved;
            case 'Tamamlandı': return styles.completed;
            case 'İptal': return styles.cancelled;
            default: return '';
        }
    };

    const handleStatusChange = (id: number, newStatus: QuoteRequest['status']) => {
        updateQuoteStatus(id, newStatus);
        setQuotes(getQuoteRequests());
        setPendingCount(getPendingCount());

        // Seçili teklifi güncelle
        if (selectedQuote?.id === id) {
            setSelectedQuote({ ...selectedQuote, status: newStatus });
        }
    };

    const handleDelete = (id: number) => {
        deleteQuoteRequest(id);
        setQuotes(getQuoteRequests());
        setPendingCount(getPendingCount());
        setDeleteConfirm(null);

        // Seçili teklifi temizle
        if (selectedQuote?.id === id) {
            setSelectedQuote(null);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Teklif Talepleri</h1>
                    <p>Gelen teklif taleplerini görüntüleyin ve yönetin</p>
                </div>
                <div className={styles.headerStats}>
                    <div className={styles.statBadge}>
                        <span className={styles.statNumber}>{pendingCount}</span>
                        <span className={styles.statLabel}>Bekleyen</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <button
                    className={`${styles.filterBtn} ${statusFilter === 'all' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('all')}
                >
                    Tümü ({quotes.length})
                </button>
                <button
                    className={`${styles.filterBtn} ${statusFilter === 'Bekliyor' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('Bekliyor')}
                >
                    Bekliyor ({quotes.filter(q => q.status === 'Bekliyor').length})
                </button>
                <button
                    className={`${styles.filterBtn} ${statusFilter === 'Onaylandı' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('Onaylandı')}
                >
                    Onaylandı ({quotes.filter(q => q.status === 'Onaylandı').length})
                </button>
                <button
                    className={`${styles.filterBtn} ${statusFilter === 'Tamamlandı' ? styles.active : ''}`}
                    onClick={() => setStatusFilter('Tamamlandı')}
                >
                    Tamamlandı ({quotes.filter(q => q.status === 'Tamamlandı').length})
                </button>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirm !== null && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalIcon}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <h3>Teklifi Sil</h3>
                        <p>Bu teklif talebini silmek istediğinizden emin misiniz?</p>
                        <div className={styles.modalActions}>
                            <button
                                className={styles.modalCancel}
                                onClick={() => setDeleteConfirm(null)}
                            >
                                İptal
                            </button>
                            <button
                                className={styles.modalDelete}
                                onClick={() => handleDelete(deleteConfirm)}
                            >
                                Evet, Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.content}>
                {/* Quotes List */}
                <div className={styles.quotesList}>
                    {filteredQuotes.length > 0 ? (
                        filteredQuotes.map((quote) => (
                            <div
                                key={quote.id}
                                className={`${styles.quoteCard} ${selectedQuote?.id === quote.id ? styles.active : ''}`}
                                onClick={() => setSelectedQuote(quote)}
                            >
                                <div className={styles.quoteHeader}>
                                    <span className={styles.quoteName}>{quote.name}</span>
                                    <span className={`${styles.quoteStatus} ${getStatusClass(quote.status)}`}>
                                        {quote.status}
                                    </span>
                                </div>
                                <div className={styles.quoteService}>{quote.serviceName}</div>
                                <div className={styles.quoteMeta}>
                                    <span>{quote.address}</span>
                                    <span>{quote.date}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noQuotes}>
                            <p>Henüz teklif talebi yok.</p>
                        </div>
                    )}
                </div>

                {/* Quote Details */}
                <div className={styles.quoteDetails}>
                    {selectedQuote ? (
                        <>
                            <div className={styles.detailsHeader}>
                                <h2>{selectedQuote.name}</h2>
                                <div className={styles.detailsHeaderActions}>
                                    <span className={`${styles.quoteStatus} ${getStatusClass(selectedQuote.status)}`}>
                                        {selectedQuote.status}
                                    </span>
                                    <button
                                        className={styles.deleteBtn}
                                        onClick={() => setDeleteConfirm(selectedQuote.id)}
                                        title="Sil"
                                    >
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.detailsGrid}>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Telefon</span>
                                    <a href={`tel:${selectedQuote.phone}`} className={styles.detailValue}>
                                        {selectedQuote.phone}
                                    </a>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>E-posta</span>
                                    <a href={`mailto:${selectedQuote.email}`} className={styles.detailValue}>
                                        {selectedQuote.email || '-'}
                                    </a>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Hizmet</span>
                                    <span className={styles.detailValue}>{selectedQuote.serviceName}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Alan</span>
                                    <span className={styles.detailValue}>{selectedQuote.area} m²</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Sıklık</span>
                                    <span className={styles.detailValue}>{selectedQuote.frequencyName}</span>
                                </div>
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Adres</span>
                                    <span className={styles.detailValue}>{selectedQuote.address}</span>
                                </div>
                                {selectedQuote.rooms && (
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailLabel}>Oda Sayısı</span>
                                        <span className={styles.detailValue}>{selectedQuote.rooms}</span>
                                    </div>
                                )}
                                <div className={styles.detailItem}>
                                    <span className={styles.detailLabel}>Talep Tarihi</span>
                                    <span className={styles.detailValue}>{selectedQuote.date}</span>
                                </div>
                            </div>

                            {selectedQuote.notes && (
                                <div className={styles.notesSection}>
                                    <span className={styles.detailLabel}>Notlar</span>
                                    <p>{selectedQuote.notes}</p>
                                </div>
                            )}

                            <div className={styles.statusSection}>
                                <span className={styles.detailLabel}>Durumu Değiştir</span>
                                <div className={styles.statusButtons}>
                                    <button
                                        className={`${styles.statusBtn} ${selectedQuote.status === 'Bekliyor' ? styles.active : ''}`}
                                        onClick={() => handleStatusChange(selectedQuote.id, 'Bekliyor')}
                                    >
                                        Bekliyor
                                    </button>
                                    <button
                                        className={`${styles.statusBtn} ${selectedQuote.status === 'Onaylandı' ? styles.active : ''}`}
                                        onClick={() => handleStatusChange(selectedQuote.id, 'Onaylandı')}
                                    >
                                        Onayla
                                    </button>
                                    <button
                                        className={`${styles.statusBtn} ${selectedQuote.status === 'Tamamlandı' ? styles.active : ''}`}
                                        onClick={() => handleStatusChange(selectedQuote.id, 'Tamamlandı')}
                                    >
                                        Tamamlandı
                                    </button>
                                </div>
                            </div>

                            <div className={styles.detailsActions}>
                                <a href={`tel:${selectedQuote.phone}`} className={`btn btn-primary ${styles.actionBtn}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    Ara
                                </a>
                                <a
                                    href={`https://wa.me/${selectedQuote.phone.replace(/\s/g, '').replace(/^0/, '90')}`}
                                    target="_blank"
                                    className={`btn btn-accent ${styles.actionBtn}`}
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    WhatsApp
                                </a>
                                {selectedQuote.email && (
                                    <a href={`mailto:${selectedQuote.email}`} className={`btn btn-secondary ${styles.actionBtn}`}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                        E-posta
                                    </a>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className={styles.noSelection}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                            <p>Detaylarını görüntülemek için bir teklif seçin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
