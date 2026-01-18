import React from 'react';

export type ServiceIconType =
    | 'ev'
    | 'ofis'
    | 'dis-cephe'
    | 'insaat'
    | 'merdiven'
    | 'yangin'
    | 'villa'
    | 'diger';

interface ServiceIconProps {
    type: ServiceIconType;
    className?: string;
    size?: number;
}

const icons: Record<ServiceIconType, React.ReactNode> = {
    ev: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    ),
    ofis: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
    ),
    'dis-cephe': (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>
    ),
    insaat: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    merdiven: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20h4v-4h4v-4h4V8h4V4" />
            <path d="M4 20v-4h4v-4h4V8h4V4h4" />
        </svg>
    ),
    yangin: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22c-4.97 0-9-2.582-9-7v-.088C3 12.794 4.338 11.1 6.375 10c.194 3.177 2.063 5.5 5.625 5.5 1.5 0 2.727-.593 3.516-1.583C16.587 12.583 17 11 17 9c0-3.98-2.125-6.485-5-8 2.875 2.64 3.875 5.516 2 8.758-.592 1.024-1 1.742-1 2.742 0 1.5.625 2.5 1.5 3 .875-.5 1.5-1.5 1.5-3 0-.694-.25-1.229-.625-1.854C17.25 7.625 18 4.875 18 2c2.875 3 4 6.516 4 10v.088c0 4.418-4.03 7.912-10 9.912z" />
        </svg>
    ),
    villa: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18" />
            <path d="M5 21V7l8-4 8 4v14" />
            <path d="M9 21v-6h6v6" />
            <path d="M10 10h4" />
            <path d="M10 14h4" />
        </svg>
    ),
    diger: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
        </svg>
    ),
};

export default function ServiceIcon({ type, className, size = 24 }: ServiceIconProps) {
    return (
        <span
            className={className}
            style={{
                display: 'inline-flex',
                width: size,
                height: size,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            {icons[type] || icons.diger}
        </span>
    );
}

// Helper function to get icon type from slug
export function getIconTypeFromSlug(slug: string): ServiceIconType {
    const mapping: Record<string, ServiceIconType> = {
        'ev-temizligi': 'ev',
        'ofis-temizligi': 'ofis',
        'dis-cephe-temizligi': 'dis-cephe',
        'insaat-sonrasi-temizlik': 'insaat',
        'merdiven-temizligi': 'merdiven',
        'yangin-sonrasi-temizlik': 'yangin',
        'villa-temizligi': 'villa',
    };
    return mapping[slug] || 'diger';
}
