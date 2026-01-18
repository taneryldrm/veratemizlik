'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';
import { getQuoteRequests, QuoteRequest } from '@/lib/quoteStore';
import { getBlogPosts, BlogPost } from '@/lib/blogStore';

interface DashboardStats {
    pendingQuotes: number;
    completedThisMonth: number;
    totalBlogPosts: number;
    totalCustomers: number;
}

export default function AdminDashboard() {
    const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [stats, setStats] = useState<DashboardStats>({
        pendingQuotes: 0,
        completedThisMonth: 0,
        totalBlogPosts: 0,
        totalCustomers: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Verileri yükle
    const loadData = useCallback(() => {
        const allQuotes = getQuoteRequests();
        const allPosts = getBlogPosts();

        // İstatistikleri hesapla
        const pendingQuotes = allQuotes.filter(q => q.status === 'Bekliyor').length;
        const completedThisMonth = allQuotes.filter(q => q.status === 'Tamamlandı').length;
        const totalBlogPosts = allPosts.length;

        // Benzersiz müşteri sayısını hesapla (email veya telefon bazlı)
        const uniqueCustomers = new Set(allQuotes.map(q => q.email || q.phone));
        const totalCustomers = uniqueCustomers.size;

        setQuotes(allQuotes);
        setPosts(allPosts);
        setStats({
            pendingQuotes,
            completedThisMonth,
            totalBlogPosts,
            totalCustomers,
        });
        setIsLoading(false);
    }, []);

     
    useEffect(() => {
        loadData();

        // Store değişikliklerini dinle
        const handleQuotesUpdate = () => loadData();
        const handlePostsUpdate = () => loadData();

        window.addEventListener('quoteRequestsUpdated', handleQuotesUpdate);
        window.addEventListener('blogPostsUpdated', handlePostsUpdate);

        return () => {
            window.removeEventListener('quoteRequestsUpdated', handleQuotesUpdate);
            window.removeEventListener('blogPostsUpdated', handlePostsUpdate);
        };
    }, [loadData]);

    // Son 5 teklif talebi
    const recentQuotes = quotes.slice(0, 5);

    // Son 3 blog yazısı
    const recentPosts = posts.slice(0, 3);

    // İstatistik kartları
    const statsCards = [
        { label: 'Bekleyen Teklif', value: stats.pendingQuotes, icon: '📋', color: '#0056b3' },
        { label: 'Tamamlanan', value: stats.completedThisMonth, icon: '✅', color: '#28a745' },
        { label: 'Blog Yazısı', value: stats.totalBlogPosts, icon: '📝', color: '#17a2b8' },
        { label: 'Toplam Müşteri', value: stats.totalCustomers, icon: '👥', color: '#6f42c1' },
    ];

    if (isLoading) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.header}>
                    <h1>Dashboard</h1>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <div className={styles.header}>
                <h1>Dashboard</h1>
                <p>Hoş geldiniz! İşte bugünkü özet.</p>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {statsCards.map((stat, index) => (
                    <div
                        key={index}
                        className={styles.statCard}
                        style={{ '--stat-color': stat.color } as React.CSSProperties}
                    >
                        <div className={styles.statIcon}>{stat.icon}</div>
                        <div className={styles.statContent}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.contentGrid}>
                {/* Recent Quotes */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Son Teklif Talepleri</h2>
                        <Link href="/admin/teklifler" className={styles.viewAll}>
                            Tümünü Gör →
                        </Link>
                    </div>
                    {recentQuotes.length > 0 ? (
                        <div className={styles.tableWrapper}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Müşteri</th>
                                        <th>Hizmet</th>
                                        <th>Tarih</th>
                                        <th>Durum</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentQuotes.map((quote) => (
                                        <tr key={quote.id}>
                                            <td>{quote.name}</td>
                                            <td>{quote.serviceName}</td>
                                            <td>{quote.date.split(' - ')[0]}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[quote.status.toLowerCase().replace('ı', 'i')]}`}>
                                                    {quote.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Henüz teklif talebi bulunmuyor.</p>
                        </div>
                    )}
                </div>

                {/* Recent Posts */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Son Blog Yazıları</h2>
                        <Link href="/admin/blog" className={styles.viewAll}>
                            Tümünü Gör →
                        </Link>
                    </div>
                    {recentPosts.length > 0 ? (
                        <div className={styles.postsList}>
                            {recentPosts.map((post) => (
                                <div key={post.id} className={styles.postItem}>
                                    <div className={styles.postInfo}>
                                        <h4>{post.title}</h4>
                                        <span>{post.date}</span>
                                    </div>
                                    <div className={styles.postViews}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        {post.views}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <p>Henüz blog yazısı bulunmuyor.</p>
                        </div>
                    )}
                    <Link href="/admin/blog/yeni" className={styles.addButton}>
                        + Yeni Yazı Ekle
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
                <h2>Hızlı İşlemler</h2>
                <div className={styles.actionsGrid}>
                    <Link href="/admin/blog/yeni" className={styles.actionCard}>
                        <span className={styles.actionIcon}>📝</span>
                        <span>Yeni Blog Yazısı</span>
                    </Link>
                    <Link href="/admin/teklifler" className={styles.actionCard}>
                        <span className={styles.actionIcon}>📋</span>
                        <span>Teklifleri Görüntüle</span>
                    </Link>
                    <Link href="/admin/hizmetler" className={styles.actionCard}>
                        <span className={styles.actionIcon}>🛠️</span>
                        <span>Hizmetleri Düzenle</span>
                    </Link>
                    <Link href="/admin/ayarlar" className={styles.actionCard}>
                        <span className={styles.actionIcon}>⚙️</span>
                        <span>Site Ayarları</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
