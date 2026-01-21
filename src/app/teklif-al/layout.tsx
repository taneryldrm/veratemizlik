import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Teklif Al',
    description: 'Vera Temizlik\'ten ücretsiz teklif alın. Ev, ofis, villa temizliği ve daha fazlası için hemen fiyat teklifi isteyin.',
};

export default function TeklifAlLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
