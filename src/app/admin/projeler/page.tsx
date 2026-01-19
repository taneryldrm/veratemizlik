'use client';

import { useState, useEffect } from 'react';
import {
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    projectCategories,
    Project
} from '@/lib/projectStore';
import styles from './projeler.module.css';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        location: '',
        beforeImage: '',
        afterImage: '',
        description: '',
        completedDate: '',
        featured: false,
        status: 'Yayında' as 'Yayında' | 'Taslak',
    });

    // Projeleri yükle
    useEffect(() => {
        setProjects(getProjects());

        const handleUpdate = () => {
            setProjects(getProjects());
        };

        window.addEventListener('projectsUpdated', handleUpdate);
        return () => window.removeEventListener('projectsUpdated', handleUpdate);
    }, []);

    // Form değişikliklerini yönet
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    // Yeni proje ekleme modalını aç
    const openAddModal = () => {
        setEditingProject(null);
        setFormData({
            title: '',
            category: '',
            location: '',
            beforeImage: '',
            afterImage: '',
            description: '',
            completedDate: '',
            featured: false,
            status: 'Yayında',
        });
        setIsModalOpen(true);
    };

    // Düzenleme modalını aç
    const openEditModal = (project: Project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            category: project.category,
            location: project.location,
            beforeImage: project.beforeImage,
            afterImage: project.afterImage,
            description: project.description || '',
            completedDate: project.completedDate || '',
            featured: project.featured,
            status: project.status,
        });
        setIsModalOpen(true);
    };

    // Formu gönder
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProject) {
            updateProject(editingProject.id, formData);
        } else {
            addProject(formData);
        }

        setIsModalOpen(false);
    };

    // Proje sil
    const handleDelete = (id: number) => {
        if (confirm('Bu projeyi silmek istediğinize emin misiniz?')) {
            deleteProject(id);
        }
    };

    // Durumu değiştir
    const toggleStatus = (project: Project) => {
        updateProject(project.id, {
            status: project.status === 'Yayında' ? 'Taslak' : 'Yayında'
        });
    };

    // Öne çıkarma durumunu değiştir
    const toggleFeatured = (project: Project) => {
        updateProject(project.id, { featured: !project.featured });
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Projeler</h1>
                    <p className={styles.subtitle}>Tamamlanan projeleri yönetin</p>
                </div>
                <button className={styles.addBtn} onClick={openAddModal}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    Yeni Proje
                </button>
            </div>

            {/* Proje Listesi */}
            <div className={styles.projectGrid}>
                {projects.map(project => (
                    <div key={project.id} className={styles.projectCard}>
                        <div className={styles.imagePreview}>
                            <div className={styles.beforeAfter}>
                                <div className={styles.imageHalf}>
                                    <img src={project.beforeImage} alt="Önce" />
                                    <span className={styles.imageLabel}>Önce</span>
                                </div>
                                <div className={styles.imageHalf}>
                                    <img src={project.afterImage} alt="Sonra" />
                                    <span className={styles.imageLabel}>Sonra</span>
                                </div>
                            </div>
                            {project.featured && (
                                <span className={styles.featuredBadge}>⭐ Öne Çıkan</span>
                            )}
                        </div>

                        <div className={styles.cardContent}>
                            <div className={styles.cardHeader}>
                                <span className={styles.category}>{project.category}</span>
                                <span className={`${styles.status} ${project.status === 'Yayında' ? styles.published : styles.draft}`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className={styles.cardTitle}>{project.title}</h3>
                            <p className={styles.location}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                {project.location}
                            </p>
                            {project.description && (
                                <p className={styles.description}>{project.description}</p>
                            )}
                        </div>

                        <div className={styles.cardActions}>
                            <button
                                className={`${styles.actionBtn} ${styles.featuredBtn}`}
                                onClick={() => toggleFeatured(project)}
                                title={project.featured ? 'Öne çıkarmayı kaldır' : 'Öne çıkar'}
                            >
                                {project.featured ? '⭐' : '☆'}
                            </button>
                            <button
                                className={`${styles.actionBtn} ${styles.statusBtn}`}
                                onClick={() => toggleStatus(project)}
                                title={project.status === 'Yayında' ? 'Taslağa al' : 'Yayınla'}
                            >
                                {project.status === 'Yayında' ? '👁️' : '👁️‍🗨️'}
                            </button>
                            <button
                                className={`${styles.actionBtn} ${styles.editBtn}`}
                                onClick={() => openEditModal(project)}
                            >
                                ✏️
                            </button>
                            <button
                                className={`${styles.actionBtn} ${styles.deleteBtn}`}
                                onClick={() => handleDelete(project.id)}
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className={styles.emptyState}>
                    <p>Henüz proje eklenmemiş.</p>
                    <button className={styles.addBtn} onClick={openAddModal}>
                        İlk Projeyi Ekle
                    </button>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>{editingProject ? 'Proje Düzenle' : 'Yeni Proje Ekle'}</h2>
                            <button
                                className={styles.closeBtn}
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label htmlFor="title">Proje Başlığı *</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="Örn: Lara Villaları Derin Temizlik"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="category">Kategori *</label>
                                    <select
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Seçiniz</option>
                                        {projectCategories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="location">Konum *</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Örn: Lara, Antalya"
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="completedDate">Tamamlanma Tarihi</label>
                                    <input
                                        type="date"
                                        id="completedDate"
                                        name="completedDate"
                                        value={formData.completedDate}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label htmlFor="beforeImage">Önce Görseli URL *</label>
                                    <input
                                        type="url"
                                        id="beforeImage"
                                        name="beforeImage"
                                        value={formData.beforeImage}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        required
                                    />
                                    {formData.beforeImage && (
                                        <div className={styles.imagePreviewSmall}>
                                            <img src={formData.beforeImage} alt="Önce önizleme" />
                                        </div>
                                    )}
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label htmlFor="afterImage">Sonra Görseli URL *</label>
                                    <input
                                        type="url"
                                        id="afterImage"
                                        name="afterImage"
                                        value={formData.afterImage}
                                        onChange={handleChange}
                                        placeholder="https://..."
                                        required
                                    />
                                    {formData.afterImage && (
                                        <div className={styles.imagePreviewSmall}>
                                            <img src={formData.afterImage} alt="Sonra önizleme" />
                                        </div>
                                    )}
                                </div>

                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label htmlFor="description">Açıklama</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Proje hakkında kısa bir açıklama..."
                                        rows={3}
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="status">Durum</label>
                                    <select
                                        id="status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Yayında">Yayında</option>
                                        <option value="Taslak">Taslak</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={formData.featured}
                                            onChange={handleChange}
                                        />
                                        <span>Öne Çıkan Proje</span>
                                    </label>
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    İptal
                                </button>
                                <button type="submit" className={styles.submitBtn}>
                                    {editingProject ? 'Güncelle' : 'Ekle'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
