import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İletişim',
    description: 'Vera Temizlik ile iletişime geçin. Antalya temizlik hizmetleri için teklif alın veya sorularınızı iletin.',
};

export default function IletisimLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
