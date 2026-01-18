'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogPosts, deleteBlogPost, updateBlogPost, BlogPost } from '@/lib/blogStore';
import styles from './blog-admin.module.css';

export default function BlogAdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'Yayında' | 'Taslak'>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

    useEffect(() => {
        // Blog yazılarını yükle
        const loadPosts = () => {
            const allPosts = getBlogPosts();
            setPosts(allPosts);
        };

        loadPosts();

        // Blog güncellemelerini dinle
        const handleUpdate = () => loadPosts();
        window.addEventListener('blogPostsUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('blogPostsUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, []);

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: number) => {
        deleteBlogPost(id);
        setPosts(getBlogPosts());
        setDeleteConfirm(null);
    };

    const toggleStatus = (id: number) => {
        const post = posts.find(p => p.id === id);
        if (post) {
            const newStatus = post.status === 'Yayında' ? 'Taslak' : 'Yayında';
            updateBlogPost(id, { status: newStatus });
            setPosts(getBlogPosts());
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div>
                    <h1>Blog Yazıları</h1>
                    <p>Blog içeriklerinizi yönetin</p>
                </div>
                <Link href="/admin/blog/yeni" className="btn btn-primary">
                    + Yeni Yazı Ekle
                </Link>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <div className={styles.searchBox}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Yazı ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.filterButtons}>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'all' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('all')}
                    >
                        Tümü ({posts.length})
                    </button>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'Yayında' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('Yayında')}
                    >
                        Yayında ({posts.filter(p => p.status === 'Yayında').length})
                    </button>
                    <button
                        className={`${styles.filterBtn} ${statusFilter === 'Taslak' ? styles.active : ''}`}
                        onClick={() => setStatusFilter('Taslak')}
                    >
                        Taslak ({posts.filter(p => p.status === 'Taslak').length})
                    </button>
                </div>
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
                        <h3>Yazıyı Sil</h3>
                        <p>Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.</p>
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

            {/* Posts Table */}
            <div className={styles.tableCard}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Başlık</th>
                            <th>Kategori</th>
                            <th>Yazar</th>
                            <th>Tarih</th>
                            <th>Durum</th>
                            <th>Görüntülenme</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post.id}>
                                <td>
                                    <div className={styles.postTitleCell}>
                                        <span className={styles.postTitle}>{post.title}</span>
                                        {post.featured && (
                                            <span className={styles.featuredBadge}>Öne Çıkan</span>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.category}>{post.category}</span>
                                </td>
                                <td>{post.author}</td>
                                <td>{post.date}</td>
                                <td>
                                    <button
                                        className={`${styles.status} ${post.status === 'Yayında' ? styles.published : styles.draft}`}
                                        onClick={() => toggleStatus(post.id)}
                                        title="Durumu değiştirmek için tıklayın"
                                    >
                                        {post.status}
                                    </button>
                                </td>
                                <td>{post.views.toLocaleString()}</td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link
                                            href={`/admin/blog/duzenle/${post.slug}`}
                                            className={styles.actionBtn}
                                            title="Düzenle"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </Link>
                                        <a
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className={styles.actionBtn}
                                            title="Görüntüle"
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                        </a>
                                        <button
                                            className={`${styles.actionBtn} ${styles.danger}`}
                                            title="Sil"
                                            onClick={() => setDeleteConfirm(post.id)}
                                        >
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredPosts.length === 0 && (
                    <div className={styles.noResults}>
                        <p>
                            {searchTerm
                                ? 'Arama kriterinize uygun yazı bulunamadı.'
                                : 'Henüz blog yazısı eklenmemiş.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Stats */}
            <div className={styles.stats}>
                <span className={styles.pageInfo}>
                    Toplam {filteredPosts.length} yazı gösteriliyor
                </span>
            </div>
        </div>
    );
}
