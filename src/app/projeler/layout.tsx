import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Vera Temizlik tamamlanan projeler galerisi. Ev, ofis ve villa temizliği projelerimizi önce/sonra görselleriyle inceleyin.',
};

export default function ProjelerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
