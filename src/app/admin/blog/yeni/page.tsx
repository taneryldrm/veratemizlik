'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addBlogPost, createSlug } from '@/lib/blogStore';
import styles from './yeni-blog.module.css';

const categories = [
    'Temizlik İpuçları',
    'Sürdürülebilirlik',
    'İş Hayatı',
    'Rehber',
    'Haberler',
];

export default function YeniBlogPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: '',
        excerpt: '',
        content: '',
        status: 'Taslak' as 'Yayında' | 'Taslak',
        featuredImage: '',
        featured: false,
        readTime: '5 dk',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            // Auto-generate slug from title
            ...(name === 'title' && {
                slug: createSlug(value)
            }),
        }));
    };

    const handleSubmit = async (e: React.FormEvent, publishNow: boolean = true) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Yeni blog yazısı ekle
        const now = new Date();
        const dateStr = now.toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        addBlogPost({
            slug: formData.slug || createSlug(formData.title),
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            image: formData.featuredImage || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
            category: formData.category,
            author: 'Admin',
            date: dateStr,
            readTime: formData.readTime,
            status: publishNow ? 'Yayında' : 'Taslak',
            views: 0,
            featured: formData.featured,
        });

        setIsSubmitting(false);

        // Redirect to blog list
        router.push('/admin/blog');
    };

    const saveDraft = (e: React.MouseEvent) => {
        e.preventDefault();
        handleSubmit(e as unknown as React.FormEvent, false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <Link href="/admin/blog" className={styles.backLink}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Geri
                    </Link>
                    <h1>Yeni Blog Yazısı</h1>
                </div>
                <div className={styles.headerActions}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={saveDraft}
                        disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.category}
                    >
                        Taslak Kaydet
                    </button>
                    <button
                        type="submit"
                        form="blogForm"
                        className="btn btn-primary"
                        disabled={isSubmitting || !formData.title || !formData.excerpt || !formData.category}
                    >
                        {isSubmitting ? 'Kaydediliyor...' : 'Yayınla'}
                    </button>
                </div>
            </div>

            <form id="blogForm" onSubmit={(e) => handleSubmit(e, true)} className={styles.form}>
                <div className={styles.formGrid}>
                    {/* Main Content */}
                    <div className={styles.mainContent}>
                        <div className={styles.formGroup}>
                            <label htmlFor="title">Başlık *</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Yazı başlığı"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="slug">URL Slug</label>
                            <div className={styles.slugInput}>
                                <span>/blog/</span>
                                <input
                                    type="text"
                                    id="slug"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="yazi-slug"
                                />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="excerpt">Özet *</label>
                            <textarea
                                id="excerpt"
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleChange}
                                placeholder="Yazının kısa özeti (SEO için önemli)"
                                rows={3}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="content">İçerik *</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Yazı içeriğini buraya yazın... (HTML desteklenir)"
                                rows={15}
                                required
                            />
                            <span className={styles.hint}>HTML etiketleri kullanabilirsiniz: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, vb.</span>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className={styles.sidebar}>
                        <div className={styles.sidebarCard}>
                            <h3>Kategori *</h3>
                            <div className={styles.formGroup}>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Seçiniz</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.sidebarCard}>
                            <h3>Okuma Süresi</h3>
                            <div className={styles.formGroup}>
                                <select
                                    id="readTime"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                >
                                    <option value="2 dk">2 dakika</option>
                                    <option value="3 dk">3 dakika</option>
                                    <option value="4 dk">4 dakika</option>
                                    <option value="5 dk">5 dakika</option>
                                    <option value="6 dk">6 dakika</option>
                                    <option value="7 dk">7 dakika</option>
                                    <option value="10 dk">10 dakika</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles.sidebarCard}>
                            <h3>Öne Çıkan Görsel</h3>
                            <div className={styles.formGroup}>
                                <input
                                    type="url"
                                    id="featuredImage"
                                    name="featuredImage"
                                    value={formData.featuredImage}
                                    onChange={handleChange}
                                    placeholder="https://example.com/image.jpg"
                                />
                                <span className={styles.hint}>Görsel URL&apos;si girin</span>
                            </div>
                            {formData.featuredImage && (
                                <div className={styles.imagePreviewWrapper}>
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.featuredImage}
                                        alt="Önizleme"
                                        className={styles.imagePreview}
                                        onError={(e) => (e.currentTarget.style.display = 'none')}
                                    />
                                </div>
                            )}
                        </div>

                        <div className={styles.sidebarCard}>
                            <h3>Seçenekler</h3>
                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkbox}>
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <span className={styles.checkmark}></span>
                                    Öne çıkan yazı olarak işaretle
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
