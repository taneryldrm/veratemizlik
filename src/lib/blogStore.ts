// Blog yazısı tipi
export interface BlogPost {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content?: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    status: 'Yayında' | 'Taslak';
    views: number;
    featured: boolean;
}

// Varsayılan blog yazıları
const defaultPosts: BlogPost[] = [
    {
        id: 1,
        slug: 'ev-temizliginde-10-altin-kural',
        title: 'Ev Temizliğinde 10 Altın Kural',
        excerpt: 'Profesyonel temizlikçilerden öğrendiğimiz, evinizi her zaman pırıl pırıl tutacak 10 önemli temizlik kuralı.',
        content: `
            <h2>1. Düzenli Bir Temizlik Rutini Oluşturun</h2>
            <p>Her gün küçük temizlik görevleri yapmak, haftalık büyük temizliği çok daha kolay hale getirir.</p>
            
            <h2>2. Yukarıdan Aşağıya Temizleyin</h2>
            <p>Toz ve kirler yerçekimi nedeniyle aşağı düşer. Bu nedenle her zaman tavandan başlayıp zemine doğru inin.</p>
            
            <h2>3. Doğru Temizlik Malzemelerini Kullanın</h2>
            <p>Her yüzey için uygun temizlik ürünleri kullanmak hem daha etkili sonuçlar verir hem de yüzeyleri korur.</p>
        `,
        image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop',
        category: 'Temizlik İpuçları',
        author: 'Admin',
        date: '15 Ocak 2024',
        readTime: '5 dk',
        status: 'Yayında',
        views: 1234,
        featured: true,
    },
    {
        id: 2,
        slug: 'cevre-dostu-temizlik-urunleri',
        title: 'Çevre Dostu Temizlik Ürünleri Neden Önemli?',
        excerpt: 'Sağlığınız ve çevre için neden organik ve doğal temizlik ürünleri tercih etmelisiniz?',
        content: `
            <h2>Sağlığınız İçin</h2>
            <p>Kimyasal temizlik ürünleri, özellikle kapalı alanlarda kullanıldığında solunum yolu problemlerine neden olabilir.</p>
            
            <h2>Çevre İçin</h2>
            <p>Geleneksel temizlik ürünlerindeki kimyasallar su kaynaklarını kirletebilir ve ekosisteme zarar verebilir.</p>
        `,
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
        category: 'Sürdürülebilirlik',
        author: 'Admin',
        date: '12 Ocak 2024',
        readTime: '4 dk',
        status: 'Yayında',
        views: 856,
        featured: false,
    },
    {
        id: 3,
        slug: 'ofis-temizliginin-calisan-verimliligi-uzerine-etkisi',
        title: 'Ofis Temizliğinin Çalışan Verimliliği Üzerine Etkisi',
        excerpt: 'Temiz ve düzenli bir çalışma ortamının iş performansına etkilerini araştırdık.',
        content: `
            <h2>Temiz Ofis = Verimli Çalışan</h2>
            <p>Araştırmalar, temiz ve düzenli bir çalışma ortamının çalışan verimliliğini %15 artırdığını göstermektedir.</p>
        `,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
        category: 'İş Hayatı',
        author: 'Admin',
        date: '10 Ocak 2024',
        readTime: '6 dk',
        status: 'Yayında',
        views: 642,
        featured: false,
    },
    {
        id: 4,
        slug: 'kis-temizligi-icin-oneriler',
        title: 'Kış Aylarında Ev Temizliği İçin Öneriler',
        excerpt: 'Soğuk havalarda evinizdeki hijyeni korumak için pratik temizlik tavsiyeleri.',
        content: `
            <h2>Kış Aylarında Temizlik</h2>
            <p>Kış aylarında ev daha az havalandırıldığı için temizlik daha da önem kazanır.</p>
        `,
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&h=400&fit=crop',
        category: 'Temizlik İpuçları',
        author: 'Admin',
        date: '8 Ocak 2024',
        readTime: '4 dk',
        status: 'Yayında',
        views: 428,
        featured: false,
    },
];

const STORAGE_KEY = 'vera_blog_posts';

// Blog yazılarını localStorage'dan al
export function getBlogPosts(): BlogPost[] {
    if (typeof window === 'undefined') {
        return defaultPosts;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        // İlk kez yükleniyorsa varsayılan verileri kaydet
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPosts));
        return defaultPosts;
    }

    try {
        return JSON.parse(stored);
    } catch {
        return defaultPosts;
    }
}

// Yayında olan blog yazılarını al
export function getPublishedPosts(): BlogPost[] {
    return getBlogPosts().filter(post => post.status === 'Yayında');
}

// Blog yazısı ekle
export function addBlogPost(post: Omit<BlogPost, 'id'>): BlogPost {
    const posts = getBlogPosts();
    const newPost: BlogPost = {
        ...post,
        id: Math.max(0, ...posts.map(p => p.id)) + 1,
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('blogPostsUpdated'));

    return newPost;
}

// Blog yazısı güncelle
export function updateBlogPost(id: number, updates: Partial<BlogPost>): BlogPost | null {
    const posts = getBlogPosts();
    const index = posts.findIndex(p => p.id === id);

    if (index === -1) return null;

    posts[index] = { ...posts[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('blogPostsUpdated'));

    return posts[index];
}

// Blog yazısı sil
export function deleteBlogPost(id: number): boolean {
    const posts = getBlogPosts();
    const filteredPosts = posts.filter(p => p.id !== id);

    if (filteredPosts.length === posts.length) return false;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));

    // Custom event ile değişikliği bildir
    window.dispatchEvent(new CustomEvent('blogPostsUpdated'));

    return true;
}

// Slug ile blog yazısı bul
export function getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = getBlogPosts();
    return posts.find(p => p.slug === slug) || null;
}

// Görüntülenme sayısını artır
export function incrementViews(id: number): void {
    const posts = getBlogPosts();
    const post = posts.find(p => p.id === id);

    if (post) {
        post.views += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
}

// Slug oluştur
export function createSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}
