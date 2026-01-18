import { Metadata } from 'next';
import ServiceListClient from './ServiceListClient';

export const metadata: Metadata = {
    title: 'Hizmetlerimiz',
    description: 'Vera Temizlik olarak ev temizliği, ofis temizliği, villa temizliği, dış cephe temizliği, inşaat sonrası temizlik ve daha fazlasını sunuyoruz.',
};

export default function HizmetlerPage() {
    return <ServiceListClient />;
}
