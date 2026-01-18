'use client';

import { useState } from 'react';
import styles from './projeler.module.css';

const categories = ['Tümü', 'Ev', 'Ofis', 'Villa', 'İnşaat Sonrası', 'Dış Cephe'];

const projects = [
    {
        id: 1,
        title: 'Lara Villaları Derin Temizlik',
        category: 'Villa',
        location: 'Lara, Antalya',
        description: '1500 m² villa kompleksinin kapsamlı derin temizliği. Havuz alanı, bahçe ve tüm iç mekanlar dahil.',
        beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    },
    {
        id: 2,
        title: 'Konyaaltı Plaza Ofis Temizliği',
        category: 'Ofis',
        location: 'Konyaaltı, Antalya',
        description: '2000 m² ofis alanının günlük temizlik programı. 50+ çalışan için hijyenik ortam.',
        beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
    },
    {
        id: 3,
        title: 'Muratpaşa Residence İnşaat Sonrası',
        category: 'İnşaat Sonrası',
        location: 'Muratpaşa, Antalya',
        description: '48 daireli sitenin teslim öncesi temizliği. Ortak alanlar dahil tam temizlik.',
        beforeImage: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    },
    {
        id: 4,
        title: 'Kepez AVM Dış Cephe Temizliği',
        category: 'Dış Cephe',
        location: 'Kepez, Antalya',
        description: 'Alışveriş merkezinin cam cephe ve dış yüzey temizliği. Yüksek basınçlı yıkama.',
        beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    },
    {
        id: 5,
        title: 'Güzeloba Villası Premium Temizlik',
        category: 'Villa',
        location: 'Güzeloba, Antalya',
        description: 'Lüks villa için sezonluk kapsamlı temizlik. Mobilya bakımı dahil.',
        beforeImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
    },
    {
        id: 6,
        title: 'Antalya Merkez Daire Temizliği',
        category: 'Ev',
        location: 'Merkez, Antalya',
        description: '3+1 dairenin taşınma sonrası derin temizliği. Tüm odalar ve balkon dahil.',
        beforeImage: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    },
    {
        id: 7,
        title: 'Teknoloji Şirketi Ofis Temizliği',
        category: 'Ofis',
        location: 'Lara, Antalya',
        description: 'Modern teknoloji ofisinin haftalık temizlik programı. Dezenfeksiyon dahil.',
        beforeImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop',
    },
    {
        id: 8,
        title: 'Belek Tatil Köyü Temizliği',
        category: 'Villa',
        location: 'Belek, Antalya',
        description: 'Tatil köyü villalarının sezon açılışı temizliği. 20 villa, 3 günde tamamlandı.',
        beforeImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&h=400&fit=crop',
    },
];

export default function ProjelerPage() {
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [activeSliders, setActiveSliders] = useState<{ [key: number]: number }>({});

    const filteredProjects = activeCategory === 'Tümü'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const handleSliderChange = (projectId: number, value: number) => {
        setActiveSliders(prev => ({ ...prev, [projectId]: value }));
    };

    return (
        <div className={styles.page}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.container}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Portföyümüz</span>
                        <h1 className={styles.heroTitle}>Projelerimiz</h1>
                        <p className={styles.heroDescription}>
                            Antalya genelinde gerçekleştirdiğimiz temizlik projelerinden
                            önce/sonra görselleri ile kalitemizi görün.
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter */}
            <section className={styles.filterSection}>
                <div className={styles.container}>
                    <div className={styles.filters}>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
                                onClick={() => setActiveCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className={styles.projects}>
                <div className={styles.container}>
                    <div className={styles.projectsGrid}>
                        {filteredProjects.map((project) => (
                            <div key={project.id} className={styles.projectCard}>
                                <div className={styles.imageContainer}>
                                    {/* Before Image */}
                                    <div
                                        className={styles.beforeImage}
                                        style={{ backgroundImage: `url(${project.beforeImage})` }}
                                    >
                                        <span className={styles.imageLabel}>Önce</span>
                                    </div>

                                    {/* After Image with Clip */}
                                    <div
                                        className={styles.afterImage}
                                        style={{
                                            backgroundImage: `url(${project.afterImage})`,
                                            clipPath: `inset(0 ${100 - (activeSliders[project.id] ?? 50)}% 0 0)`
                                        }}
                                    >
                                        <span className={styles.imageLabel}>Sonra</span>
                                    </div>

                                    {/* Slider */}
                                    <div
                                        className={styles.sliderLine}
                                        style={{ left: `${activeSliders[project.id] ?? 50}%` }}
                                    >
                                        <div className={styles.sliderHandle}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={activeSliders[project.id] ?? 50}
                                        onChange={(e) => handleSliderChange(project.id, Number(e.target.value))}
                                        className={styles.sliderInput}
                                        aria-label="Önce/Sonra karşılaştırma"
                                    />
                                </div>

                                <div className={styles.projectInfo}>
                                    <span className={styles.projectCategory}>{project.category}</span>
                                    <h3 className={styles.projectTitle}>{project.title}</h3>
                                    <p className={styles.projectDescription}>{project.description}</p>
                                    <p className={styles.projectLocation}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        {project.location}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className={styles.noResults}>
                            <p>Bu kategoride henüz proje bulunmamaktadır.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
