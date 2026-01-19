// Proje tipi
export interface Project {
    id: number;
    title: string;
    category: string;
    location: string;
    beforeImage: string;
    afterImage: string;
    description?: string;
    completedDate?: string;
    featured: boolean;
    status: 'Yayında' | 'Taslak';
}

// Varsayılan projeler
const defaultProjects: Project[] = [
    {
        id: 1,
        title: 'Lara Villaları Derin Temizlik',
        category: 'Villa Temizliği',
        location: 'Lara, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
        description: 'Lara bölgesindeki lüks villada derin temizlik hizmeti verildi.',
        completedDate: '2024-01-15',
        featured: true,
        status: 'Yayında',
    },
    {
        id: 2,
        title: 'Konyaaltı Plaza Ofis Temizliği',
        category: 'Ofis Temizliği',
        location: 'Konyaaltı, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
        description: 'Konyaaltı\'ndaki plaza ofislerinde düzenli temizlik hizmeti.',
        completedDate: '2024-01-10',
        featured: true,
        status: 'Yayında',
    },
    {
        id: 3,
        title: 'Muratpaşa Residence İnşaat Sonrası',
        category: 'İnşaat Sonrası',
        location: 'Muratpaşa, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1503387837-b154d5074bd2?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
        description: 'Yeni tamamlanan residence projesinde inşaat sonrası temizlik.',
        completedDate: '2024-01-05',
        featured: true,
        status: 'Yayında',
    },
    {
        id: 4,
        title: 'Kepez AVM Dış Cephe Temizliği',
        category: 'Dış Cephe',
        location: 'Kepez, Antalya',
        beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
        afterImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
        description: 'AVM dış cephesinin profesyonel temizliği.',
        completedDate: '2023-12-20',
        featured: true,
        status: 'Yayında',
    },
];

// Kategori listesi
export const projectCategories = [
    'Villa Temizliği',
    'Ofis Temizliği',
    'İnşaat Sonrası',
    'Dış Cephe',
    'Ev Temizliği',
    'Merdiven Temizliği',
    'Yangın Sonrası',
    'Koltuk Yıkama',
];

const STORAGE_KEY = 'vera_projects';

// Projeleri localStorage'dan al
export function getProjects(): Project[] {
    if (typeof window === 'undefined') {
        return defaultProjects;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // İlk kez yükleniyorsa varsayılan verileri kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProjects));
        return defaultProjects;
    }

    try {
        return JSON.parse(stored);
    } catch {
        return defaultProjects;
    }
}

// Yayında olan projeleri al
export function getPublishedProjects(): Project[] {
    return getProjects().filter(project => project.status === 'Yayında');
}

// Öne çıkan projeleri al (ana sayfa için)
export function getFeaturedProjects(): Project[] {
    return getPublishedProjects().filter(project => project.featured).slice(0, 4);
}

// Proje ekle
export function addProject(project: Omit<Project, 'id'>): Project {
    const projects = getProjects();
    const newProject: Project = {
        ...project,
        id: Math.max(0, ...projects.map(p => p.id)) + 1,
    };

    projects.unshift(newProject);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('projectsUpdated'));

    return newProject;
}

// Proje güncelle
export function updateProject(id: number, updates: Partial<Project>): Project | null {
    const projects = getProjects();
    const index = projects.findIndex(p => p.id === id);

    if (index === -1) return null;

    projects[index] = { ...projects[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('projectsUpdated'));

    return projects[index];
}

// Proje sil
export function deleteProject(id: number): boolean {
    const projects = getProjects();
    const filteredProjects = projects.filter(p => p.id !== id);

    if (filteredProjects.length === projects.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('projectsUpdated'));

    return true;
}

// ID ile proje bul
export function getProjectById(id: number): Project | null {
    const projects = getProjects();
    return projects.find(p => p.id === id) || null;
}
