'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Projects.module.css';

const projects = [
    {
        id: 1,
        title: 'Lara Villaları Derin Temizlik',
        category: 'Villa Temizliği',
        location: 'Lara, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
    },
    {
        id: 2,
        title: 'Konyaaltı Plaza Ofis Temizliği',
        category: 'Ofis Temizliği',
        location: 'Konyaaltı, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
    },
    {
        id: 3,
        title: 'Muratpaşa Residence İnşaat Sonrası',
        category: 'İnşaat Sonrası',
        location: 'Muratpaşa, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
    },
    {
        id: 4,
        title: 'Kepez AVM Dış Cephe Temizliği',
        category: 'Dış Cephe',
        location: 'Kepez, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
    },
];

export default function Projects() {
    const [activeSliders, setActiveSliders] = useState<{ [key: number]: number }>({});

    const handleSliderChange = (projectId: number, value: number) => {
        setActiveSliders(prev => ({ ...prev, [projectId]: value }));
    };

    return (
        <section className={styles.projects}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.badge}>Projelerimiz</span>
                    <h2 className={styles.title}>
                        Gerçekleştirdiğimiz <span className={styles.highlight}>Başarılı İşler</span>
                    </h2>
                    <p className={styles.subtitle}>
                        Antalya genelinde tamamladığımız projelerden önce/sonra görselleri ile
                        kalitemizi görmenizi istiyoruz.
                    </p>
                </div>

                <div className={styles.grid}>
                    {projects.map((project) => (
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

                <div className={styles.cta}>
                    <Link href="/projeler" className="btn btn-primary btn-lg">
                        Tüm Projeleri Gör
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
