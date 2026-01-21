import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Temizlik ipuçları, ev bakım önerileri ve sektör haberleri. Vera Temizlik blog sayfasında profesyonel temizlik bilgilerine ulaşın.',
    openGraph: {
        title: 'Blog | Vera Temizlik',
        description: 'Temizlik dünyasından güncel bilgiler, pratik ipuçları ve profesyonel öneriler.',
    },
    alternates: {
        canonical: '/blog',
    },
};

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
