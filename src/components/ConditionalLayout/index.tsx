'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isAdminPage = pathname?.startsWith('/admin');

    if (isAdminPage) {
        // Admin sayfaları için sadece children render et (admin kendi layout'unu kullanıyor)
        return <>{children}</>;
    }

    // Normal sayfalar için Header, Footer ve WhatsApp butonu göster
    return (
        <>
            <LoadingScreen />
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
        </>
    );
}
