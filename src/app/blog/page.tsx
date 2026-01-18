'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPublishedPosts, BlogPost } from '@/lib/blogStore';
import styles from './blog.module.css';

const categories = ['Tümü', 'Temizlik İpuçları', 'Sürdürülebilirlik', 'İş Hayatı', 'Rehber'];

export default function BlogPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('Tümü');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Blog yazılarını yükle
        const loadPosts = () => {
            const publishedPosts = getPublishedPosts();
            setPosts(publishedPosts);
            setIsLoading(false);
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

    const filteredPosts = selectedCategory === 'Tümü'
        ? posts
        : posts.filter(post => post.category === selectedCategory);

    const featuredPost = filteredPosts.find(post => post.featured);
    const regularPosts = filteredPosts.filter(post => !post.featured || post.id !== featuredPost?.id);

    if (isLoading) {
        return (
            <div className={styles.page}>
                <section className={styles.hero}>
                    <div className={styles.heroOverlay}></div>
                    <div className={styles.container}>
                        <div className={styles.heroContent}>
                            <span className={styles.badge}>Blog</span>
                            <h1 className={styles.heroTitle}>Temizlik Dünyası</h1>
                            <p className={styles.heroDescription}>
                                Temizlik ipuçları, sektör haberleri ve ev bakım önerileri
                            </p>
                        </div>
                    </div>
                </section>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Yükleniyor...</p>
                </div>
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
                        <span className={styles.badge}>Blog</span>
                        <h1 className={styles.heroTitle}>Temizlik Dünyası</h1>
                        <p className={styles.heroDescription}>
                            Temizlik ipuçları, sektör haberleri ve ev bakım önerileri
                        </p>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className={styles.featured}>
                    <div className={styles.container}>
                        <Link href={`/blog/${featuredPost.slug}`} className={styles.featuredCard}>
                            <div
                                className={styles.featuredImage}
                                style={{ backgroundImage: `url(${featuredPost.image})` }}
                            >
                                <span className={styles.featuredBadge}>Öne Çıkan</span>
                            </div>
                            <div className={styles.featuredContent}>
                                <span className={styles.postCategory}>{featuredPost.category}</span>
                                <h2 className={styles.featuredTitle}>{featuredPost.title}</h2>
                                <p className={styles.featuredExcerpt}>{featuredPost.excerpt}</p>
                                <div className={styles.postMeta}>
                                    <span>{featuredPost.date}</span>
                                    <span>•</span>
                                    <span>{featuredPost.readTime} okuma</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className={styles.categoriesSection}>
                <div className={styles.container}>
                    <div className={styles.categories}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.categoryBtn} ${category === selectedCategory ? styles.active : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className={styles.posts}>
                <div className={styles.container}>
                    {regularPosts.length > 0 ? (
                        <div className={styles.postsGrid}>
                            {regularPosts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className={styles.postCard}>
                                    <div
                                        className={styles.postImage}
                                        style={{ backgroundImage: `url(${post.image})` }}
                                    />
                                    <div className={styles.postContent}>
                                        <span className={styles.postCategory}>{post.category}</span>
                                        <h3 className={styles.postTitle}>{post.title}</h3>
                                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                                        <div className={styles.postMeta}>
                                            <span>{post.date}</span>
                                            <span>•</span>
                                            <span>{post.readTime} okuma</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noPosts}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            <h3>Henüz blog yazısı yok</h3>
                            <p>Bu kategoride yayınlanmış blog yazısı bulunmuyor.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className={styles.newsletter}>
                <div className={styles.container}>
                    <div className={styles.newsletterCard}>
                        <div className={styles.newsletterContent}>
                            <h3>Temizlik İpuçlarını Kaçırmayın!</h3>
                            <p>Haftalık bültenimize abone olun, en güncel temizlik ipuçlarını e-postanıza gönderelim.</p>
                        </div>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="E-posta adresiniz"
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className="btn btn-primary">
                                Abone Ol
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
