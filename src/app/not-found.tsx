import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.icon}>404</div>
                <h1>Sayfa Bulunamadı</h1>
                <p>Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
                <div className={styles.actions}>
                    <Link href="/" className="btn btn-primary btn-lg">
                        Ana Sayfaya Dön
                    </Link>
                    <Link href="/iletisim" className="btn btn-secondary btn-lg">
                        İletişime Geç
                    </Link>
                </div>
            </div>
        </div>
    );
}
