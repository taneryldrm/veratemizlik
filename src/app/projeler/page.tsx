'use client';

import { useState, useEffect, useMemo } from 'react';
import { getPublishedProjects, projectCategories, Project } from '@/lib/projectStore';
import styles from './projeler.module.css';

export default function ProjelerPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [activeSliders, setActiveSliders] = useState<{ [key: number]: number }>({});

    // Projeleri yükle
    useEffect(() => {
        setProjects(getPublishedProjects());

        const handleUpdate = () => {
            setProjects(getPublishedProjects());
        };

        window.addEventListener('projectsUpdated', handleUpdate);
        return () => window.removeEventListener('projectsUpdated', handleUpdate);
    }, []);

    // Dinamik kategorileri oluştur
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(projects.map(p => p.category))];
        return ['Tümü', ...uniqueCategories];
    }, [projects]);

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
                                    {project.description && (
                                        <p className={styles.projectDescription}>{project.description}</p>
                                    )}
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
