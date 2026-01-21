'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBlogPostBySlug, getPublishedPosts, BlogPost } from '@/lib/blogStore';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import styles from './blog-detay.module.css';

export default function BlogDetailPage() {
    const params = useParams();
    const slug = params.slug as string;

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadPost = () => {
            const foundPost = getBlogPostBySlug(slug);
            setPost(foundPost || null);

            if (foundPost) {
                // Get related posts from same category
                const allPosts = getPublishedPosts();
                const related = allPosts
                    .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
                    .slice(0, 3);
                setRelatedPosts(related);

                // Update page title dynamically
                document.title = `${foundPost.title} | Vera Temizlik Blog`;

                // Update meta description
                const metaDesc = document.querySelector('meta[name="description"]');
                if (metaDesc) {
                    metaDesc.setAttribute('content', foundPost.excerpt);
                } else {
                    const newMeta = document.createElement('meta');
                    newMeta.name = 'description';
                    newMeta.content = foundPost.excerpt;
                    document.head.appendChild(newMeta);
                }
            }

            setIsLoading(false);
        };

        loadPost();

        // Listen for updates
        const handleUpdate = () => loadPost();
        window.addEventListener('blogPostsUpdated', handleUpdate);
        window.addEventListener('storage', handleUpdate);

        return () => {
            window.removeEventListener('blogPostsUpdated', handleUpdate);
            window.removeEventListener('storage', handleUpdate);
        };
    }, [slug]);

    if (isLoading) {
        return (
            <div className={styles.page}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Yükleniyor...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles.page}>
                <div className={styles.notFound}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                        <line x1="9" y1="9" x2="9.01" y2="9" />
                        <line x1="15" y1="9" x2="15.01" y2="9" />
                    </svg>
                    <h2>Yazı Bulunamadı</h2>
                    <p>Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
                    <Link href="/blog" className={styles.backButton}>
                        Blog&apos;a Dön
                    </Link>
                </div>
            </div>
        );
    }

    // Format date for JSON-LD
    const formatDateForJsonLd = (dateStr: string) => {
        const parts = dateStr.split(' ');
        const months: Record<string, string> = {
            'Ocak': '01', 'Şubat': '02', 'Mart': '03', 'Nisan': '04',
            'Mayıs': '05', 'Haziran': '06', 'Temmuz': '07', 'Ağustos': '08',
            'Eylül': '09', 'Ekim': '10', 'Kasım': '11', 'Aralık': '12'
        };
        if (parts.length >= 3) {
            const day = parts[0].padStart(2, '0');
            const month = months[parts[1]] || '01';
            const year = parts[2];
            return `${year}-${month}-${day}`;
        }
        return new Date().toISOString().split('T')[0];
    };

    return (
        <div className={styles.page}>
            {/* JSON-LD Structured Data */}
            <ArticleJsonLd
                title={post.title}
                description={post.excerpt}
                image={post.image.startsWith('http') ? post.image : `https://veratemizlik.com${post.image}`}
                datePublished={formatDateForJsonLd(post.date)}
                author="Vera Temizlik"
                slug={post.slug}
            />
            <BreadcrumbJsonLd
                items={[
                    { name: 'Ana Sayfa', url: 'https://veratemizlik.com' },
                    { name: 'Blog', url: 'https://veratemizlik.com/blog' },
                    { name: post.title, url: `https://veratemizlik.com/blog/${post.slug}` },
                ]}
            />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroImage} style={{ backgroundImage: `url(${post.image})` }}>
                    <div className={styles.heroOverlay}></div>
                </div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
                            <Link href="/">Ana Sayfa</Link>
                            <span>/</span>
                            <Link href="/blog">Blog</Link>
                            <span>/</span>
                            <span>{post.title}</span>
                        </nav>
                        <span className={styles.category}>{post.category}</span>
                        <h1>{post.title}</h1>
                        <div className={styles.meta}>
                            <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                                {post.date}
                            </span>
                            <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {post.readTime} okuma
                            </span>
                            <span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                {post.author}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <article className={styles.article}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <p className={styles.excerpt}>{post.excerpt}</p>
                        <div
                            className={styles.body}
                            dangerouslySetInnerHTML={{ __html: post.content || '' }}
                        />

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <div className={styles.tags}>
                                <span className={styles.tagsLabel}>Etiketler:</span>
                                {post.tags.map((tag, index) => (
                                    <span key={index} className={styles.tag}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Share Buttons */}
                        <div className={styles.share}>
                            <span>Paylaş:</span>
                            <div className={styles.shareButtons}>
                                <a
                                    href={`https://www.facebook.com/sharer/sharer.php?u=https://veratemizlik.com/blog/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareButton}
                                    aria-label="Facebook'ta Paylaş"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://twitter.com/intent/tweet?url=https://veratemizlik.com/blog/${post.slug}&text=${post.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareButton}
                                    aria-label="Twitter'da Paylaş"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://api.whatsapp.com/send?text=${post.title} https://veratemizlik.com/blog/${post.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareButton}
                                    aria-label="WhatsApp'ta Paylaş"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>
                                <a
                                    href={`https://www.linkedin.com/shareArticle?mini=true&url=https://veratemizlik.com/blog/${post.slug}&title=${post.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.shareButton}
                                    aria-label="LinkedIn'de Paylaş"
                                >
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    {relatedPosts.length > 0 && (
                        <section className={styles.related}>
                            <h2>İlgili Yazılar</h2>
                            <div className={styles.relatedGrid}>
                                {relatedPosts.map((relatedPost) => (
                                    <Link
                                        href={`/blog/${relatedPost.slug}`}
                                        key={relatedPost.id}
                                        className={styles.relatedCard}
                                    >
                                        <div
                                            className={styles.relatedImage}
                                            style={{ backgroundImage: `url(${relatedPost.image})` }}
                                        />
                                        <div className={styles.relatedContent}>
                                            <span className={styles.relatedCategory}>
                                                {relatedPost.category}
                                            </span>
                                            <h3>{relatedPost.title}</h3>
                                            <span className={styles.relatedDate}>{relatedPost.date}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Back to Blog */}
                    <div className={styles.backSection}>
                        <Link href="/blog" className={styles.backLink}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="19" y1="12" x2="5" y2="12" />
                                <polyline points="12 19 5 12 12 5" />
                            </svg>
                            Tüm Yazılar
                        </Link>
                    </div>
                </div>
            </article>
        </div>
    );
}
